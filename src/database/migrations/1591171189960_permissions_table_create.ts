import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class PermissionsTableCreate extends BaseSchema {
    protected $tableName = 'permissions'

    public async up() {
        this.schema.raw(`CREATE TABLE \`permissions\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(191) DEFAULT NULL,
  \`display_name\` varchar(255) DEFAULT NULL,
  \`description\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`permissions_name\` (\`name\`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;`);

        const data = `INSERT INTO \`permissions\` VALUES (1, 'user-create', 'Create User', 'Create New User', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (2, 'user-update', 'Update User', 'Update User', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (3, 'user-delete', 'Delete User', 'Delete User', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (4, 'post-create', 'Create Post', 'Create New Post', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (5, 'post-update', 'Update Post', 'Update Post', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (6, 'post-delete', 'Delete Post', 'Delete Post', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (7, 'category-create', 'Create Category', 'Create New Category', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (8, 'category-update', 'Update Category', 'Update Category', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (9, 'category-delete', 'Delete Category', 'Delete Category', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (10, 'role-create', 'Create Role', 'Create New Role', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (11, 'role-update', 'Update Role', 'Update Role', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (12, 'role-delete', 'Delete Role', 'Delete Role', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (13, 'tag-create', 'Create Tag', 'Create New Tag', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (14, 'tag-update', 'Update Tag', 'Update Tag', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (15, 'tag-delete', 'Delete Tag', 'Delete Tag', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (16, 'page-create', 'Create Page', 'Create New Page', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (17, 'page-update', 'Update Page', 'Update Page', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (18, 'page-delete', 'Delete Page', 'Delete Page', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (19, 'menu-create', 'Create Menu', 'Create New Menu', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (20, 'menu-update', 'Update Menu', 'Update Menu', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (21, 'menu-delete', 'Delete Menu', 'Delete Menu', '2020-06-03 07:49:10', '2020-06-03 07:49:10');`
        data.split(';').filter(x => !! x.trim()).forEach(value => {
            this.schema.raw(value);
        })
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
