import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class PermissionRoleTableCreate extends BaseSchema {
    protected $tableName = 'permission_role'

    public async up() {
        this.schema.raw(`CREATE TABLE \`permission_role\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`permission_id\` int(11) DEFAULT NULL,
  \`role_id\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`permission_role_permission_id\` (\`permission_id\`),
  KEY \`permission_role_role_id\` (\`role_id\`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;`)

        const data = `INSERT INTO \`permission_role\` VALUES (1, 1, 1);
INSERT INTO \`permission_role\` VALUES (2, 2, 1);
INSERT INTO \`permission_role\` VALUES (3, 3, 1);
INSERT INTO \`permission_role\` VALUES (4, 4, 1);
INSERT INTO \`permission_role\` VALUES (5, 5, 1);
INSERT INTO \`permission_role\` VALUES (6, 6, 1);
INSERT INTO \`permission_role\` VALUES (7, 7, 1);
INSERT INTO \`permission_role\` VALUES (8, 8, 1);
INSERT INTO \`permission_role\` VALUES (9, 9, 1);
INSERT INTO \`permission_role\` VALUES (10, 10, 1);
INSERT INTO \`permission_role\` VALUES (11, 11, 1);
INSERT INTO \`permission_role\` VALUES (12, 12, 1);
INSERT INTO \`permission_role\` VALUES (13, 13, 1);
INSERT INTO \`permission_role\` VALUES (14, 14, 1);
INSERT INTO \`permission_role\` VALUES (15, 15, 1);
INSERT INTO \`permission_role\` VALUES (16, 16, 1);
INSERT INTO \`permission_role\` VALUES (17, 17, 1);
INSERT INTO \`permission_role\` VALUES (18, 18, 1);
INSERT INTO \`permission_role\` VALUES (19, 19, 1);
INSERT INTO \`permission_role\` VALUES (20, 20, 1);
INSERT INTO \`permission_role\` VALUES (21, 21, 1);
INSERT INTO \`permission_role\` VALUES (22, 1, 2);
INSERT INTO \`permission_role\` VALUES (23, 2, 2);
INSERT INTO \`permission_role\` VALUES (24, 3, 2);
INSERT INTO \`permission_role\` VALUES (25, 4, 2);
INSERT INTO \`permission_role\` VALUES (26, 5, 2);
INSERT INTO \`permission_role\` VALUES (27, 6, 2);
INSERT INTO \`permission_role\` VALUES (28, 7, 2);
INSERT INTO \`permission_role\` VALUES (29, 8, 2);
INSERT INTO \`permission_role\` VALUES (30, 9, 2);
INSERT INTO \`permission_role\` VALUES (31, 13, 2);
INSERT INTO \`permission_role\` VALUES (32, 14, 2);
INSERT INTO \`permission_role\` VALUES (33, 15, 2);
INSERT INTO \`permission_role\` VALUES (34, 16, 2);
INSERT INTO \`permission_role\` VALUES (35, 17, 2);
INSERT INTO \`permission_role\` VALUES (36, 18, 2);
INSERT INTO \`permission_role\` VALUES (37, 19, 2);
INSERT INTO \`permission_role\` VALUES (38, 20, 2);
INSERT INTO \`permission_role\` VALUES (39, 21, 2);
INSERT INTO \`permission_role\` VALUES (40, 4, 3);
INSERT INTO \`permission_role\` VALUES (43, 7, 3);
INSERT INTO \`permission_role\` VALUES (46, 13, 3);`
        data.split(';').filter(x => !! x.trim()).forEach(value => {
            this.schema.raw(value);
        })
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
