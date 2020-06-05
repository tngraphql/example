import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

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
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
