import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class ProductCategoryTableCreate extends BaseSchema {
    protected $tableName = 'product_category'

    public async up() {
        this.schema.raw(`CREATE TABLE \`product_category\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`product_master_id\` int(11) DEFAULT NULL,
  \`category_id\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`product_category_product_master_id\` (\`product_master_id\`),
  KEY \`product_category_category_id\` (\`category_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
