/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import {Inject, Service} from "@tngraphql/illuminate";
import ContactModel from "./ContactModel";
import {BaseRepository} from "../../../Repositories/Lucid/BaseRepository";
import {UserRepository} from "../../../Repositories/Lucid/UserRepository";
import {ContactReplyRepository} from "./ContactReplyRepository";
import {forwardRef} from "@tngraphql/illuminate/dist/Decorators/forwardRef";
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {Mail} from "@tngraphql/mail/dist/src/Mail";
import {ContactMail} from "../../Mail/ContactMail";

@Service()
export class ContactRepository extends BaseRepository<ContactModel> {

    @Inject(UserRepository)
    protected user: UserRepository

    @Inject(() => ContactReplyRepository)
    protected contactReply: ContactReplyRepository

    public model(): typeof ContactModel {
        return ContactModel;
    }

    public async create(data) {
        return this.transaction(async () => {
            data.status = 'unRead';

            const contact = await super.create(data);

            const user = await this.user.firstBy('1', 'id', ['id', 'name', 'email']);

            await Mail.to(4).send(new ContactMail(data));

            return contact;
        })
    }

    public async delete(id: any, attribute: string = this.getKeyName()) {
        return this.transaction(async () => {
            if (id instanceof BaseModel) {
                await this.contactReply.delete(id['id'], 'contactId');

                return id.delete();
            }
            await this.contactReply.delete(id, 'contactId');

            return super.delete(id, attribute);
        })
    }
}
