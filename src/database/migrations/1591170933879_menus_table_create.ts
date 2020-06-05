import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class MenusTableCreate extends BaseSchema {
    protected $tableName = 'menus'

    public async up () {
        this.schema.raw(`CREATE TABLE \`menus\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(191) DEFAULT NULL,
  \`alias\` varchar(191) DEFAULT NULL,
  \`slug\` varchar(191) DEFAULT NULL,
  \`status\` varchar(191) DEFAULT NULL,
  \`description\` varchar(255) DEFAULT NULL,
  \`language\` int(11) DEFAULT NULL,
  \`language_master\` int(11) DEFAULT NULL,
  \`automantically_menu\` enum('0','1') DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  \`deleted_at\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`menus_name_deleted_at\` (\`name\`,\`deleted_at\`),
  UNIQUE KEY \`menus_slug_deleted_at\` (\`slug\`,\`deleted_at\`),
  KEY \`menus_alias\` (\`alias\`),
  KEY \`menus_language\` (\`language\`),
  KEY \`menus_language_master\` (\`language_master\`),
  KEY \`menus_status\` (\`status\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
