/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:44 AM
 */

import {registerEnumType} from "@tngraphql/graphql";

export enum OperatorEnumType {
    eq = "=",
    ne = "<>",
    gte = ">=",
    gt = ">",
    lte = "<=",
    lt = "<",
    not = "<>",
    is = "=",
    in = "in",
    notIn = "not in",
    like = "like",
    notLike = "not like",
    between = "between",
    notBetween = "not between",
    contains = "like",
    and = "AND",
    AND = "AND",
    or = "OR",
    OR = "OR"
}

registerEnumType(OperatorEnumType, {name: 'Operator'});