import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class ProductBranchToAttributeTableCreate extends BaseSchema {
    protected $tableName = 'product_branch_to_attribute'

    public async up() {
        this.schema.raw(`CREATE TABLE \`product_branch_to_attribute\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`attribute_group_id\` int(11) DEFAULT NULL,
  \`attribute_id\` int(11) DEFAULT NULL,
  \`product_branch_id\` int(11) DEFAULT NULL,
  \`product_master_id\` int(11) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`product_branch_to_attribute_attribute_group_id\` (\`attribute_group_id\`),
  KEY \`product_branch_to_attribute_attribute_id\` (\`attribute_id\`),
  KEY \`product_branch_to_attribute_product_master_id\` (\`product_master_id\`),
  KEY \`product_branch_to_attribute_product_branch_id\` (\`product_branch_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
