import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class PostsTableCreate extends BaseSchema {
    protected $tableName = 'posts'

    public async up() {
        this.schema.raw(`CREATE TABLE \`posts\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) DEFAULT NULL,
  \`author_id\` varchar(255) DEFAULT NULL,
  \`parent_id\` int(11) DEFAULT '0',
  \`avatar\` text,
  \`type\` varchar(255) DEFAULT NULL,
  \`description\` text,
  \`content\` text,
  \`seo_title\` varchar(255) DEFAULT NULL,
  \`seo_description\` varchar(255) DEFAULT NULL,
  \`seo_keyword\` varchar(255) DEFAULT NULL,
  \`post_status\` varchar(100) DEFAULT NULL,
  \`comment_status\` varchar(100) DEFAULT NULL,
  \`post_password\` varchar(100) DEFAULT NULL,
  \`comment_count\` float DEFAULT NULL,
  \`language\` int(11) DEFAULT NULL,
  \`language_master\` int(11) DEFAULT NULL,
  \`published_at\` datetime DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  \`deleted_at\` datetime DEFAULT NULL,
  \`format\` int(11) DEFAULT NULL,
  \`thumbnail_id\` int(11) DEFAULT NULL,
  \`is_featured\` int(11) DEFAULT NULL,
  \`views\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`posts_author_id\` (\`author_id\`(191)),
  KEY \`posts_parent_id\` (\`parent_id\`),
  KEY \`posts_type\` (\`type\`(191)),
  KEY \`posts_post_status\` (\`post_status\`),
  KEY \`posts_language\` (\`language\`),
  KEY \`posts_language_master\` (\`language_master\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
