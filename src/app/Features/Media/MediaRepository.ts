/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import { BaseRepository } from '../../../Repositories/Lucid/BaseRepository';
import MediaModel from './MediaModel';
import { Application, Service } from '@tngraphql/illuminate';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';

const fs = require('fs');

@Service()
export class MediaRepository extends BaseRepository<MediaModel, typeof MediaModel> {
    public model(): typeof MediaModel {
        return MediaModel;
    }

    async update(data, value: any, attribute: string = this.getKeyName()): Promise<MediaModel> {
        return this.transaction(async () => {
            const instance = await this.newQuery().where(attribute, '=', value).firstOrFail();
            instance.merge(data, true);

            const { title: folderName } = instance.$dirty;
            if ( folderName ) {
                await this.newQuery().where('folderName', instance.$original.title)
                          .update({ folderName })
                          .exec();
            }

            await instance.save();

            return instance;
        });
    }

    async delete(id: any, attribute: string = this.getKeyName()): Promise<number> {
        return this.transaction(async () => {
            let info: MediaModel;
            if ( id instanceof BaseModel ) {
                info = id as any;
            } else {
                const query = this.newQuery();

                info = await query.where(attribute, id).first();
            }

            if ( info.mineType !== 'folder' ) {
                this.unlink(info);

                return super.delete(id, attribute);
            }

            let f = '';

            if ( info.folderName ) {
                f = info.folderName + '/' + info.title;
            } else {
                f = info.title;
            }

            const listAllFile = await this.newQuery()
                                          .allFolder(f)
                                          .exec();


            await super.delete(info);

            return Promise.all(listAllFile.map(x => {
                this.unlink(x);

                return super.delete(x);
            }));
        })
        return super.delete(id, attribute);
    }

    protected unlink(item) {
        const folderUploads = Application.getInstance().basePath('../uploads')

        try {
            let data: any = {};
            try {
                data = JSON.parse(item.data) || {};
            } catch (e) {
                // code
                data = {};
            }

            if ( data && data.sizes ) {
                const files = [];

                for( const value of Object.values(data.sizes) ) {
                    // @ts-ignore
                    const pathFile = path.join(folderUploads + decodeURI(item.src), '..', value.file);

                    if ( ! files.includes(pathFile) ) {
                        files.push(pathFile);

                        fs.unlinkSync(pathFile);
                    }
                }
            }

            return fs.unlinkSync(folderUploads + decodeURI(item.src));
        } catch (e) {
            // code
            console.log(e);
        }
    }
}
