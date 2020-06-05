import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class ShippingMethodsTableCreate extends BaseSchema {
    protected $tableName = 'shipping_methods'

    public async up () {
        this.schema.raw(`CREATE TABLE \`shipping_methods\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`zone_id\` int(11) DEFAULT NULL,
  \`method_type\` varchar(255) DEFAULT NULL,
  \`method_order\` int(11) DEFAULT NULL,
  \`title\` varchar(255) DEFAULT NULL,
  \`requires\` varchar(255) DEFAULT NULL,
  \`value\` varchar(255) DEFAULT NULL,
  \`tax_status\` varchar(255) DEFAULT NULL,
  \`cost\` varchar(255) DEFAULT NULL,
  \`is_enabled\` int(11) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
