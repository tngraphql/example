import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class CommentsTableCreate extends BaseSchema {
    protected $tableName = 'comments'

    public async up () {
        this.schema.raw(`CREATE TABLE \`comments\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`author_name\` varchar(255) DEFAULT NULL,
  \`author_email\` varchar(255) DEFAULT NULL,
  \`author_url\` varchar(255) DEFAULT NULL,
  \`author_ip\` varchar(255) DEFAULT NULL,
  \`author_id\` int(11) DEFAULT NULL,
  \`parent_id\` int(11) DEFAULT NULL,
  \`body\` text,
  \`status\` varchar(191) DEFAULT NULL,
  \`commentable_type\` varchar(255) DEFAULT NULL,
  \`commentable_id\` int(11) DEFAULT NULL,
  \`published_at\` datetime DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  \`deleted_at\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`comments_author_id\` (\`author_id\`),
  KEY \`comments_status\` (\`status\`),
  KEY \`comments_commentable_type\` (\`commentable_type\`(191)),
  KEY \`comments_commentable_id\` (\`commentable_id\`),
  KEY \`comments_commentable_type_commentable_id\` (\`commentable_type\`(191),\`commentable_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
