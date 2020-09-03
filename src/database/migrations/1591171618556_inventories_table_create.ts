import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class InventoriesTableCreate extends BaseSchema {
    protected $tableName = 'inventories'

    public async up() {
        this.schema.raw(`CREATE TABLE \`inventories\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`product_master_id\` int(11) DEFAULT NULL,
  \`product_branch_id\` int(11) DEFAULT NULL,
  \`quantity\` float DEFAULT NULL,
  \`inventory_policy\` varchar(255) DEFAULT NULL,
  \`inventory_management\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`inventories_product_master_id\` (\`product_master_id\`),
  KEY \`inventories_product_branch_id\` (\`product_branch_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
