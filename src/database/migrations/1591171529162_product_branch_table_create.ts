import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class ProductBranchTableCreate extends BaseSchema {
    protected $tableName = 'product_branch'

    public async up () {
        this.schema.raw(`CREATE TABLE \`product_branch\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`fullname\` varchar(255) DEFAULT NULL,
  \`sku\` varchar(255) DEFAULT NULL,
  \`code\` varchar(255) DEFAULT NULL,
  \`taxable\` int(11) DEFAULT NULL,
  \`product_master_id\` int(11) DEFAULT NULL,
  \`product_type_id\` int(11) DEFAULT NULL,
  \`product_vendor_id\` int(11) DEFAULT NULL,
  \`unit_value\` float DEFAULT NULL,
  \`unit_name\` varchar(255) DEFAULT NULL,
  \`price\` float DEFAULT NULL,
  \`price_sale\` float DEFAULT NULL,
  \`requires_shipping\` varchar(255) DEFAULT NULL,
  \`hs_code\` varchar(255) DEFAULT NULL,
  \`weight\` float DEFAULT NULL,
  \`weight_class\` varchar(255) DEFAULT NULL,
  \`length\` float DEFAULT NULL,
  \`width\` float DEFAULT NULL,
  \`height\` float DEFAULT NULL,
  \`length_class\` varchar(255) DEFAULT NULL,
  \`inventory_management\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  \`deleted_at\` datetime DEFAULT NULL,
  \`is_master\` enum('1','2') DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`product_branch_sku\` (\`sku\`(191)),
  KEY \`product_branch_code\` (\`code\`(191)),
  KEY \`product_branch_product_master_id\` (\`product_master_id\`),
  KEY \`product_branch_product_type_id\` (\`product_type_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
