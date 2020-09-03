import { Field, InputType, registerEnumType } from '@tngraphql/graphql';
import { OperatorEnumType } from './OperatorEnumType';
import { GraphQLString } from 'graphql';
import { FilterContract, GroupContract } from '../../../Contracts/FilterContract';
import { ValueScalarType } from './ValueScalarType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/31/2020
 * Time: 4:42 PM
 */

class StoreType {
    static data: any = [];

    static add(target, object) {
        this.data.push({ target, object });
    }

    static get(target) {
        return this.data.find(d => d.target === target).object;
    }
}

export function registerFilterEnumType(name, target: any): void {
    registerEnumType(target, { name: `FilterField${ name }` });

    const filterName = name + 'Filter';

    @InputType(`${ name }FilterGroup`)
    class FilterGroupType implements GroupContract {
        @Field()
        operator: string;

        @Field(returns => [FilterType])
        items: FilterContract[];
    }

    @InputType(filterName, { description: 'Phân trang' })
    class FilterType implements FilterContract {
        @Field(returns => [FilterGroupType])
        groups: GroupContract[];

        @Field(returns => OperatorEnumType)
        operator: OperatorEnumType;

        @Field(returns => [ValueScalarType])
        value: any;

        @Field(returns => target)
        field: string;

        @Field(returns => [FilterType])
        items: FilterContract[];
    }

    StoreType.add(target, FilterType);
}

export function filterType<T = any>(target): FilterContract<T> {
    return StoreType.get(target);
}