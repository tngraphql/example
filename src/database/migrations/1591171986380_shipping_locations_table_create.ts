import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class ShippingLocationsTableCreate extends BaseSchema {
    protected $tableName = 'shipping_locations'

    public async up() {
        this.schema.raw(`CREATE TABLE \`shipping_locations\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`zone_id\` int(11) DEFAULT NULL,
  \`code\` varchar(255) DEFAULT NULL,
  \`type\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
