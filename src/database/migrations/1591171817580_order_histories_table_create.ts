import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class OrderHistoriesTableCreate extends BaseSchema {
    protected $tableName = 'order_histories'

    public async up() {
        this.schema.raw(`CREATE TABLE \`order_histories\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`order_id\` int(11) DEFAULT NULL,
  \`order_status_id\` int(11) DEFAULT NULL,
  \`notify\` varchar(255) DEFAULT NULL,
  \`comment\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`order_histories_order_id\` (\`order_id\`),
  KEY \`order_histories_order_status_id\` (\`order_status_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
