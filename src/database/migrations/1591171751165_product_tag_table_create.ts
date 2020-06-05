import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class ProductTagTableCreate extends BaseSchema {
    protected $tableName = 'product_tag'

    public async up () {
        this.schema.raw(`CREATE TABLE \`product_tag\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`product_master_id\` int(11) DEFAULT NULL,
  \`tag_id\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`product_tag_product_master_id\` (\`product_master_id\`),
  KEY \`product_tag_tag_id\` (\`tag_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
