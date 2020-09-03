import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class ProductTypeMetaTableCreate extends BaseSchema {
    protected $tableName = 'product_type_meta'

    public async up() {
        this.schema.raw(`CREATE TABLE \`product_type_meta\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`product_type_id\` int(11) DEFAULT NULL,
  \`meta_key\` varchar(191) DEFAULT NULL,
  \`meta_value\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`product_type_meta_product_type_id_meta_key\` (\`product_type_id\`,\`meta_key\`),
  KEY \`product_type_meta_product_type_id\` (\`product_type_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
