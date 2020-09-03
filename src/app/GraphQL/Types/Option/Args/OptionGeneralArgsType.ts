/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 9:52 AM
 */
import { ArgsType, Field, InterfaceType, ObjectType, Root } from '@tngraphql/graphql';

@ArgsType()
export class OptionGeneralArgsType {
    @Field({ description: 'Địa chỉ trang quản trị' })
    public siteurl: string;

    @Field({ description: 'Địa chỉ trang web' })
    public home: string;

    @Field({ description: 'Tên trang web' })
    public blogname: string;

    @Field({ description: 'Logo' })
    public logo: string;

    @Field({ description: 'Favicon' })
    public favicon: string;

    @Field({ description: 'Mô tả trang web' })
    public blogdescription: string;

    @Field({ description: 'Có được phép đăng ký thành viên', })
    public usersCanRegister: boolean

    @Field({ description: 'Email của quản trị viên.' })
    public adminEmail: string;

    @Field({ description: 'New User Default Role' })
    public defaultRole: string;

    @Field({ description: 'Tracking code' })
    public analyticsTrackingCode: string;

    @Field({ description: 'view id' })
    public analyticsViewId: string;

    @Field({ description: 'address company' })
    public address: string;

    @Field({ description: 'address city' })
    public addressCity: string;

    @Field({ description: 'zip postal code' })
    public zipcode: string;

    @Field({ description: 'tax code' })
    public taxcode: string;

    @Field({ description: 'link youtube' })
    public youtubeLink: string;

}