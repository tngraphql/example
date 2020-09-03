import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class ProductReviewTableCreate extends BaseSchema {
    protected $tableName = 'product_review'

    public async up() {
        this.schema.raw(`CREATE TABLE \`product_review\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`product_master_id\` int(11) DEFAULT NULL,
  \`customer_id\` int(11) DEFAULT NULL,
  \`author\` varchar(64) DEFAULT NULL,
  \`rating\` int(11) DEFAULT NULL,
  \`status\` varchar(64) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`product_review_product_master_id\` (\`product_master_id\`),
  KEY \`product_review_customer_id\` (\`customer_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
