import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class PasswordReset extends BaseSchema {
    protected $tableName = 'password_resets'

    public async up() {
        this.schema.createTable(this.$tableName, (table: CreateTableBuilder) => {
            table.increments('id')
            table.string('email', 50).unique()
            table.string('token', 191).unique()
            table.timestamps()
        })
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
