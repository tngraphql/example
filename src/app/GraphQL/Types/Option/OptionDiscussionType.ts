/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 9:42 AM
 */
import {Field, Int, InterfaceType, ObjectType, Root} from "@tngraphql/graphql";
import {ID} from "../UidScalerType";

@ObjectType('OptionDiscussion')
@InterfaceType()
export class OptionDiscussionType {
    @Field()
    public defaultCommentStatus(@Root() parent): boolean {
        return !! Number(parent.defaultCommentStatus);
    }

    @Field({description: 'Sắp xếp theo.'})
    public commentOrder: string;

    @Field({description: 'Yêu cầu phải kiểm duyệt trước khi đăng bình luận.',})
    public commentModeration(@Root() parent): boolean {
        return !! Number(parent.commentModeration);
    }

    @Field({description: 'Các từ nhạy cảm'})
    public commentModerationKeys: string;

    @Field({description: 'Các từ cấm'})
    public commentBlacklistKeys: string;

    @Field(returns => Int,{description: 'Nếu quá nhiều liên kết trong 1 bình luận thì chuyển nó tới kiểm duyệt.'})
    public commentMaxLinks: number;

}