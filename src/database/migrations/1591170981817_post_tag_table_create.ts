import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class PostTagTableCreate extends BaseSchema {
    protected $tableName = 'post_tag'

    public async up () {
        this.schema.raw(`CREATE TABLE \`post_tag\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`post_id\` int(11) DEFAULT NULL,
  \`tag_id\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`post_tag_post_id\` (\`post_id\`),
  KEY \`post_tag_tag_id\` (\`tag_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
