/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/27/2020
 * Time: 4:15 PM
 */

export interface IReadRepository {
    limit(limit?: number): this;

    offset(offset?: number): this;

    orderBy(column: string, direction?: 'asc' | 'desc')

    all(columns?: any): Promise<any>;

    first(columns?: any): Promise<any>;

    paginate(perPage?: number, columns?: any, page?: number): Promise<any>;
}