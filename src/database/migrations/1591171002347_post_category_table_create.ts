import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class PostCategoryTableCreate extends BaseSchema {
    protected $tableName = 'post_category'

    public async up () {
        this.schema.raw(`CREATE TABLE \`post_category\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`post_id\` int(11) DEFAULT NULL,
  \`category_id\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`post_category_post_id\` (\`post_id\`),
  KEY \`post_category_category_id\` (\`category_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
