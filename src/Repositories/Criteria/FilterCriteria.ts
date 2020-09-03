/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/28/2020
 * Time: 4:58 PM
 */
import { Criteria } from './Criteria';
import { ModelQueryBuilderContract } from '@tngraphql/lucid/build/src/Contracts/Model/ModelQueryBuilderContract';
import { LucidModel } from '@tngraphql/lucid/build/src/Contracts/Model/LucidModel';
import { BaseRepository } from '../Lucid/BaseRepository';
import { FilterContract } from '../../Contracts/FilterContract';
import { OperatorEnumType } from '../../app/GraphQL/Types/OperatorEnumType';
import Arr from '../../lib/Arr';

const whereMethod = {
    [OperatorEnumType.AND]: 'where',
    [OperatorEnumType.OR]: 'orWhere'
}

export class FilterCriteria extends Criteria {
    constructor(protected _filters: FilterContract) {
        super();
    }

    public apply(query: ModelQueryBuilderContract<LucidModel>, repository: BaseRepository) {
        FilterCriteria.filter(query, this._filters);
    }

    public static filter(query: ModelQueryBuilderContract<LucidModel>, filters: FilterContract, method = whereMethod[OperatorEnumType.AND]) {
        if ( ! filters || typeof filters !== 'object' ) {
            return;
        }

        if ( this.is_group(filters) && filters.groups.filter((group) => this.is_item(group)).length ) {
            return query[method](query => {
                filters.groups.map((x) => {
                    return this.filter(query, x as FilterContract, whereMethod[filters.operator]);
                })
            });
        } else if ( this.is_item(filters) && filters.items.filter((item) => this.is_item(item) || this.is_group(item) || this.is_where(item)).length ) {
            return query[method](query => {
                filters.items.map((x) => {
                    return this.filter(query, x as FilterContract, whereMethod[filters.operator]);
                })
            });
        } else if ( this.is_where(filters) ) {
            return this.where(query, filters, method);
        }
    }

    public static where(query: ModelQueryBuilderContract<LucidModel>, filter: FilterContract, method) {
        const array = [
            OperatorEnumType.between,
            OperatorEnumType.notBetween,
            OperatorEnumType.in,
            OperatorEnumType.notIn
        ];

        let value = array.indexOf(filter.operator as OperatorEnumType) !== -1
            ? filter.value
            : this.toStr(Arr.array_wrap(filter.value))

        if ( filter.value === null ) {
            value = filter.value;
        }

        if ( typeof filter.field === 'function' ) {
            const field = filter.field(value, filter.operator);

            if ( typeof field === 'string' && field.includes('.') ) {
                return query[method](this.queryHas(field, filter.operator, value));
            }

            if ( typeof field === 'string' ) {
                return query[method](builder => builder.whereRaw(field));
            }

            if ( typeof field === 'function' ) {
                return query[method](field);
            }

            return query[method](field.field, filter.operator, field.value);
        }

        if ( typeof filter.field === 'string' && filter.field.includes('.') ) {
            return query[method](this.queryHas(filter.field, filter.operator, value));
        }

        if ( [OperatorEnumType.not, OperatorEnumType.ne].includes(filter.operator as any) && value === null ) {
            const methodNotNull = method + 'NotNull';

            if ( typeof query[methodNotNull] === 'function' ) {
                return query[methodNotNull](filter.field, value);
            }
        }

        if ( [OperatorEnumType.eq, OperatorEnumType.is].includes(filter.operator as any) ) {
            const methodNull = method + 'Null';
            if ( typeof query[methodNull] === 'function' ) {
                return query[method](filter.field, value);
            }
        }

        return query[method](filter.field, filter.operator, value);
    }

    protected static queryHas(field, op, value) {
        return query => {
            const relations = field.split('.');
            const fieldName = relations.pop();

            query.whereHas(relations.join('.'), query => {
                query.where(query.qualifyColumn(fieldName), op, value);
            });
        }
    }

    protected static toStr(value: any[]) {
        if ( value.length > 1 ) return value.join('');
        return value[0];
    }

    public static is_item(item) {
        return (item.items && item.operator);
    }

    public static is_group(group) {
        return group.groups && group.operator;
    }

    public static is_where(where) {
        if ( ! where ) {
            return false;
        }

        return where.field && 'value' in where && where.operator;
    }
}