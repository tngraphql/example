import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class CategorymetaTableCreate extends BaseSchema {
    protected $tableName = 'categorymeta'

    public async up() {
        this.schema.raw(`CREATE TABLE \`categorymeta\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`category_id\` int(11) DEFAULT NULL,
  \`meta_key\` varchar(191) DEFAULT NULL,
  \`meta_value\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`categorymeta_category_id_meta_key\` (\`category_id\`,\`meta_key\`),
  KEY \`categorymeta_category_id\` (\`category_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
