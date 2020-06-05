import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class LanguageTableCreate extends BaseSchema {
    protected $tableName = 'languages'

    public async up () {
        this.schema.raw(`CREATE TABLE \`languages\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(500) DEFAULT NULL,
  \`locale\` varchar(20) DEFAULT NULL,
  \`code\` varchar(20) DEFAULT NULL,
  \`direction\` enum('1','2') DEFAULT NULL,
  \`flag\` text,
  \`position\` int(11) DEFAULT NULL,
  \`status\` enum('publish','draft') DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  \`deleted_at\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`languages_locale_deleted_at\` (\`locale\`,\`deleted_at\`),
  UNIQUE KEY \`languages_code_deleted_at\` (\`code\`,\`deleted_at\`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;`)
        this.schema.raw(`INSERT INTO \`languages\` VALUES (1, 'Tiếng Việt', 'vi', 'vi', '1', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Flag_of_North_Vietnam_%281955%E2%80%931975%29.svg/800px-Flag_of_North_Vietnam_%281955%E2%80%931975%29.svg.png', 0, 'publish', '2020-06-03 07:49:10', '2020-06-03 07:49:10', NULL);`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
