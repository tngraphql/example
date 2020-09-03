/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import { Inject, Service } from '@tngraphql/illuminate';
import { BaseRepository } from '../../../../Repositories/Lucid/BaseRepository';
import { PageModel } from '../PageModel';
import { ResolveAuth } from '../../../../decorators/ResolveAuth';
import Arr from '../../../../lib/Arr';
import { TagRepository } from '../../Tag/Repositories/Lucid/TagRepository';
import { PostMetaRepository } from './PostMetaRepository';
import { MenuRepository } from '../../Menu/Repositories/MenuRepository';
import { PageCreateArgsType } from '../Types/Page/PageCreateArgsType';
import { PageUpdateArgsType } from '../Types/Page/PageUpdateArgsType';
import { AuthContract } from '@tngraphql/auth/dist/src/Contract/AuthContract';

@Service()
export class PageRepository extends BaseRepository<PageModel> {
    @ResolveAuth()
    protected auth: AuthContract;

    @Inject(type => PostMetaRepository)
    protected meta: PostMetaRepository

    @Inject(type => TagRepository)
    protected tag: TagRepository

    @Inject(type => MenuRepository)
    protected menu: MenuRepository;

    public model(): typeof PageModel {
        return PageModel;
    }

    async create(data: PageCreateArgsType): Promise<PageModel> {
        if ( await this.auth.check() ) {
            data.authorId = await this.auth.id() as string;
        }

        return this.transaction(async () => {
            const instance = await super.create(data);

            const categories = data.categories || ['1'];

            await instance.related('categories').sync(Arr.wrap(categories));

            await instance.related('tags')
                          .sync(await this.tag.upsert(data.tags));

            await this.meta.sync(data.meta, instance);

            await this.menu.appendMenu(instance);

            return instance;
        });
    }

    async update(data: PageUpdateArgsType, value: any, attribute: string = this.getKeyName()): Promise<PageModel> {
        return this.transaction(async () => {
            const instance = await super.update(data, value, attribute);

            if ( data.categories ) {
                await instance.related('categories').sync(Arr.array_wrap(data.categories));
            }

            await instance.related('tags')
                          .sync(await this.tag.upsert(data.tags));

            await this.meta.sync(data.meta, instance);

            return instance;
        });
    }
}
