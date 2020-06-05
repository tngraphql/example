import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class CategoriesTableCreate extends BaseSchema {
    protected $tableName = 'categories'

    public async up () {
        this.schema.raw(`CREATE TABLE \`categories\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) DEFAULT NULL,
  \`description\` varchar(255) DEFAULT NULL,
  \`parent_id\` varchar(255) DEFAULT NULL,
  \`slug\` varchar(191) DEFAULT NULL,
  \`category_order\` int(11) DEFAULT NULL,
  \`language\` int(11) DEFAULT NULL,
  \`language_master\` int(11) DEFAULT NULL,
  \`seo_title\` varchar(255) DEFAULT NULL,
  \`seo_description\` varchar(255) DEFAULT NULL,
  \`seo_keyword\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  \`deleted_at\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`categories_slug_deleted_at\` (\`slug\`,\`deleted_at\`),
  KEY \`categories_parent_id\` (\`parent_id\`(191)),
  KEY \`categories_language\` (\`language\`),
  KEY \`categories_language_master\` (\`language_master\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
