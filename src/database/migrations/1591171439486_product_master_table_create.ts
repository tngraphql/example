import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class ProductMasterTableCreate extends BaseSchema {
    protected $tableName = 'product_master'

    public async up() {
        this.schema.raw(`CREATE TABLE \`product_master\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`kind\` varchar(255) DEFAULT NULL,
  \`image_type\` varchar(255) DEFAULT NULL,
  \`avatar\` text,
  \`name\` varchar(255) DEFAULT NULL,
  \`description\` text,
  \`is_featured\` int(11) DEFAULT NULL,
  \`views\` int(11) DEFAULT NULL,
  \`content\` longtext,
  \`product_type_id\` int(11) DEFAULT NULL,
  \`product_vendor_id\` int(11) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  \`deleted_at\` datetime DEFAULT NULL,
  \`thumbnail_id\` int(11) DEFAULT NULL,
  \`comment_status\` varchar(100) DEFAULT NULL,
  \`comment_count\` float DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`product_master_product_type_id\` (\`product_type_id\`),
  KEY \`product_master_product_vendor_id\` (\`product_vendor_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
