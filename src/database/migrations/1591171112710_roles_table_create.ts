import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class RolesTableCreate extends BaseSchema {
    protected $tableName = 'roles'

    public async up () {
        this.schema.raw(`CREATE TABLE \`roles\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(191) DEFAULT NULL,
  \`display_name\` varchar(255) DEFAULT NULL,
  \`description\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`roles_name\` (\`name\`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;`)
        const data = `INSERT INTO \`roles\` VALUES (1, 'owner', 'Project Owner', 'User is the owner of a given project', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`roles\` VALUES (2, 'admin', 'Quản trị viên', 'User is allowed to manage and edit other users', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`roles\` VALUES (3, 'member', 'Thành viên', 'User is allowed to manage and edit other users', '2020-06-03 07:49:10', '2020-06-03 07:49:10');`;
        data.split(';').filter(x => !!x.trim()).forEach(value => {
            this.schema.raw(value);
        })
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
