import { ArgsType, Field } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:40 PM
 */

@ArgsType()
export class ContactCreateArgsType {
    @Field()
    @Rules([
        'required'
    ])
    public name: string

    @Field()
    @Rules([
        'required',
        'email'
    ])
    public email: string;

    @Field()
    @Rules([
        'between:9,10',
        'regex:/^[0-9]+$/'
    ])
    public phone: string;

    @Field()
    @Rules([])
    public address: string;

    @Field()
    @Rules([
        'required'
    ])
    public content: string;

    @Field()
    @Rules([])
    public subject: string;
}