import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import {AlterTableBuilder, CreateTableBuilder} from 'knex';

export default class ProductTypeUpdate extends BaseSchema {
    protected $tableName = 'product_types'

    public async up() {
        this.schema.table(this.$tableName, (table: AlterTableBuilder) => {
            table.text('content');
        });
    }

    public async down() {
        this.schema.table(this.$tableName, (table: AlterTableBuilder) => {
            table.dropColumn('content');
        });
    }
}
