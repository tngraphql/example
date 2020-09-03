/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 10:00 AM
 */
import { Field, Int, InterfaceType, ObjectType } from '@tngraphql/graphql';
import { ID } from '../UidScalerType';

@ObjectType('OptionEmail')
@InterfaceType()
export class OptionEmailType {

    @Field({ description: 'Host' })
    public SMTPHost: string

    @Field({ description: 'Encryption' })
    public SMTPEncryption: string

    @Field({ description: 'port' })
    public SMTPPort: string

    @Field({ description: 'username' })
    public SMTPUsername: string

    @Field({ description: 'password' })
    public SMTPPassword(): string {
        return null;
    }

    @Field({ description: 'Sender name' })
    public SMTPSenderName: string

    @Field({ description: 'Sender email' })
    public SMTPSenderEmail: string
}

