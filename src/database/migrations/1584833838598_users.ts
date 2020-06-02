import { CreateTableBuilder } from 'knex';
import {Application} from "@tngraphql/illuminate";
import {Schema} from "@tngraphql/lucid/build/src/Schema";

export default class Users extends Schema {
    protected $tableName = 'users'

    public async up() {
        this.schema.createTable(this.$tableName, (table: CreateTableBuilder) => {
            table.increments('id')
            table.string('name', 121);
            table.string('password', 255);
            table.timestamps(true);
        });

        this.defer(db => {
            return db.table(this.$tableName).insert({
                name: 'nguyen',
                password: Application.getInstance().use('hash').make('123456')
            });
        });
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
