/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/27/2020
 * Time: 4:16 PM
 */

export interface IWriteRepository {

    create(data: any): Promise<any>;

    update(data: any, id: any, attribute?: string): Promise<any>;

    delete(id: any): Promise<any>;

    destroy(ids: any): Promise<any>;


}