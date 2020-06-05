import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class RoleUserTableCreate extends BaseSchema {
    protected $tableName = 'role_user'

    public async up () {
        this.schema.raw(`CREATE TABLE \`role_user\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`user_id\` int(11) DEFAULT NULL,
  \`role_id\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`role_user_user_id\` (\`user_id\`),
  KEY \`role_user_role_id\` (\`role_id\`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;`)
        this.schema.raw(`INSERT INTO \`role_user\` VALUES (1, 1, 1);`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
