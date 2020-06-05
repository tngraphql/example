import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class UserSocialsTableCreate extends BaseSchema {
    protected $tableName = 'user_socials'

    public async up () {
        this.schema.raw(`CREATE TABLE \`user_socials\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`provider\` varchar(255) DEFAULT NULL,
  \`provider_id\` varchar(255) DEFAULT NULL,
  \`user_id\` varchar(255) DEFAULT NULL,
  \`url\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
