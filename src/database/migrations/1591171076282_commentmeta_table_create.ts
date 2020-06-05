import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class CommentmetaTableCreate extends BaseSchema {
    protected $tableName = 'commentmeta'

    public async up () {
        this.schema.raw(`CREATE TABLE \`commentmeta\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`comment_id\` int(11) DEFAULT NULL,
  \`meta_key\` varchar(191) DEFAULT NULL,
  \`meta_value\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`commentmeta_comment_id_meta_key\` (\`comment_id\`,\`meta_key\`),
  KEY \`commentmeta_comment_id\` (\`comment_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
