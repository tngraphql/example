import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import {AlterTableBuilder, CreateTableBuilder} from 'knex';

export default class ProductTypeContent2Update extends BaseSchema {
    protected $tableName = 'product_types'

    public async up() {
        this.schema.table(this.$tableName, (table: AlterTableBuilder) => {
            table.text('content2');
        });
    }

    public async down() {
        this.schema.table(this.$tableName, (table: AlterTableBuilder) => {
            table.dropColumn('content2');
        });
    }
}
