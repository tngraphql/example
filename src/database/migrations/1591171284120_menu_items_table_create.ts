import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class MenuItemTableCreate extends BaseSchema {
    protected $tableName = 'menu_items'

    public async up() {
        this.schema.raw(`CREATE TABLE \`menu_items\` (
  \`id\` varchar(191) NOT NULL,
  \`menu_id\` int(11) DEFAULT NULL,
  \`title\` varchar(255) DEFAULT NULL,
  \`link\` varchar(255) DEFAULT NULL,
  \`icon\` varchar(255) DEFAULT NULL,
  \`class_name\` varchar(255) DEFAULT NULL,
  \`target\` varchar(255) DEFAULT NULL,
  \`object_type\` varchar(255) DEFAULT NULL,
  \`object_id\` int(11) DEFAULT NULL,
  \`parent_id\` varchar(191) DEFAULT NULL,
  \`sort\` int(11) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`menu_items_parent_id\` (\`parent_id\`),
  KEY \`menu_items_object_id\` (\`object_id\`),
  KEY \`menu_items_object_type\` (\`object_type\`(191)),
  KEY \`menu_items_menu_id\` (\`menu_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
