import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';
import {Hash} from "@tngraphql/illuminate/dist/Support/Facades/Hash";

export default class OrderStatusTableCreate extends BaseSchema {
    protected $tableName = 'order_status'

    public async up () {
        this.schema.raw(`CREATE TABLE \`order_status\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`color\` varchar(20) DEFAULT NULL,
  \`name\` varchar(191) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`order_status_name\` (\`name\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)

        let data = [{
            color: 'primary',
            name: 'Open',
            created_at: new Date(),
            updated_at: new Date()
            },
            {
                color: 'orange',
                name: 'Invoice sent',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                color: 'green',
                name: 'Completed',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                color: 'default',
                name: 'Draft',
                created_at: new Date(),
                updated_at: new Date()
            }];

        this.defer(db => {
            return db.table(this.$tableName).insert(data);
        });
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
