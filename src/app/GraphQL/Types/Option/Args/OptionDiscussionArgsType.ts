/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 9:42 AM
 */
import {ArgsType, Field, Int, Root} from "@tngraphql/graphql";

@ArgsType()
export class OptionDiscussionArgsType {
    @Field()
    public defaultCommentStatus: boolean

    @Field({description: 'Sắp xếp theo.'})
    public commentOrder: string;

    @Field({description: 'Yêu cầu phải kiểm duyệt trước khi đăng bình luận.',})
    public commentModeration: boolean

    @Field({description: 'Các từ nhạy cảm'})
    public commentModerationKeys: string;

    @Field({description: 'Các từ cấm'})
    public commentBlacklistKeys: string;

    @Field(returns => Int,{description: 'Nếu quá nhiều liên kết trong 1 bình luận thì chuyển nó tới kiểm duyệt.'})
    public commentMaxLinks: number;
}