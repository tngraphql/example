import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class OrdersTableCreate extends BaseSchema {
    protected $tableName = 'orders'

    public async up() {
        this.schema.raw(`CREATE TABLE \`orders\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`code\` varchar(191) DEFAULT NULL,
  \`order_status_id\` int(11) DEFAULT NULL,
  \`total_origin\` float DEFAULT NULL,
  \`total\` float DEFAULT NULL,
  \`tax_value\` float DEFAULT NULL,
  \`discount\` float DEFAULT NULL,
  \`discount_type\` tinyint(4) DEFAULT NULL,
  \`customer_id\` int(11) DEFAULT NULL,
  \`customer_group_id\` float DEFAULT NULL,
  \`ip\` varchar(255) DEFAULT NULL,
  \`forwarded_ip\` varchar(255) DEFAULT NULL,
  \`user_agent\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  \`deleted_at\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`orders_code_deleted_at\` (\`code\`,\`deleted_at\`),
  KEY \`orders_order_status_id\` (\`order_status_id\`),
  KEY \`orders_customer_id\` (\`customer_id\`),
  KEY \`orders_customer_group_id\` (\`customer_group_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
