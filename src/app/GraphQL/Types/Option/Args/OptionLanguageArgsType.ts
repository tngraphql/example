/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 9:57 AM
 */
import {ArgsType, Field, Int, InterfaceType, ObjectType} from "@tngraphql/graphql";
import { ID } from '../../UidScalerType';

@ArgsType()
export class OptionLanguageArgsType {
    @Field(returns => ID, {description: 'Ngôn ngữ mặc định'})
    public defaultLanguage: string;

    @Field({ description: 'Ẩn ngôn ngữ mặc định khỏi url'})
    public hideDefaultLanguage: boolean;

    @Field(returns => Int,{description: 'Hiển thị ngôn ngữ: 1- all name and flag, 2: name only, 3: flag only'})
    public displayLanguage: number;

    @Field(returns => [ID],{description: 'Ẩn ngôn ngữ ( Ẩn các ngôn ngữ mà bạn không muốn hiển thị hoặc đang trong quá trình dịch )'})
    public hideLanguage(value): string {
        return JSON.stringify(value);
    }

    @Field({description: 'Show ra ngôn ngữ mặc định nếu nó không tồn tại trong ngôn ngữ hiện tại.'})
    public showItemDefaultLanguage: boolean;
}