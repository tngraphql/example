import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class ProductImageTableCreate extends BaseSchema {
    protected $tableName = 'product_image'

    public async up () {
        this.schema.raw(`CREATE TABLE \`product_image\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`product_master_id\` int(11) DEFAULT NULL,
  \`product_branch_id\` int(11) DEFAULT NULL,
  \`image\` varchar(255) DEFAULT NULL,
  \`sort_order\` int(11) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  \`thumbnail_id\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`product_image_product_master_id\` (\`product_master_id\`),
  KEY \`product_image_product_branch_id\` (\`product_branch_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
