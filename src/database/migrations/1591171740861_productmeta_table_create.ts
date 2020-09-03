import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class ProductmetaTableCreate extends BaseSchema {
    protected $tableName = 'productmeta'

    public async up() {
        this.schema.raw(`CREATE TABLE \`productmeta\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`product_master_id\` int(11) DEFAULT NULL,
  \`meta_key\` varchar(191) DEFAULT NULL,
  \`meta_value\` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`productmeta_product_master_id_meta_key\` (\`product_master_id\`,\`meta_key\`),
  KEY \`productmeta_product_master_id\` (\`product_master_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
