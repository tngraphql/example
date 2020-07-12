/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import {Inject, Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../Repositories/Lucid/BaseRepository";
import {ModelAttributes} from "@tngraphql/lucid/build/src/Contracts/Model/LucidRow";
import {ContactRepository} from "./ContactRepository";
import ContactReplyModel from "./ContactReplyModel";
import {ContactReplyMail} from "../../Mail/ContactReplyMail";
import {Mail} from "@tngraphql/mail/dist/src/Mail";

@Service()
export class ContactReplyRepository extends BaseRepository<ContactReplyModel> {

    @Inject(() => ContactRepository)
    protected contact: ContactRepository

    public model(): typeof ContactReplyModel {
        return ContactReplyModel;
    }

    public async create(data: Partial<ModelAttributes<ContactReplyModel>>) {
        return this.transaction(async () => {
            const contactReply = await super.create(data);

            await this.contact.update({ status: 'read' }, contactReply.contactId);

            const contact = await this.contact.firstBy(contactReply.contactId);
            await Mail.to(contact).send(new ContactReplyMail(data))

            return contactReply;
        });
    }
}
