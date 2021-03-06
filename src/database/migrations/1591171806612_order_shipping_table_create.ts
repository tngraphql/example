import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class OrderShippingTableCreate extends BaseSchema {
    protected $tableName = 'order_shipping'

    public async up() {
        this.schema.raw(`CREATE TABLE \`order_shipping\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`order_id\` int(11) DEFAULT NULL,
  \`country\` varchar(255) DEFAULT NULL,
  \`company\` varchar(255) DEFAULT NULL,
  \`city\` varchar(255) DEFAULT NULL,
  \`address\` varchar(255) DEFAULT NULL,
  \`address_2\` varchar(255) DEFAULT NULL,
  \`phone\` varchar(255) DEFAULT NULL,
  \`pos_code\` varchar(255) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`note\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`order_shipping_order_id\` (\`order_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
