import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';

export default class OptionModel extends BaseModel {
    static table = 'options'

    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string;

    @column()
    public value: string;

    @column()
    public autoload: string;

    public static $columns: Pick<OptionModel, 'id' | 'name' | 'value' | 'autoload'>
}
