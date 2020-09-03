import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class PostmetaTableCreate extends BaseSchema {
    protected $tableName = 'postmeta'

    public async up() {
        this.schema.raw(`CREATE TABLE \`postmeta\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`post_id\` int(11) DEFAULT NULL,
  \`meta_key\` varchar(191) DEFAULT NULL,
  \`meta_value\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`postmeta_post_id_meta_key\` (\`post_id\`,\`meta_key\`),
  KEY \`postmeta_post_id\` (\`post_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
