import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class MediaTableCreate extends BaseSchema {
    protected $tableName = 'media'

    public async up () {
        this.schema.raw(`CREATE TABLE \`media\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`status\` varchar(64) DEFAULT NULL,
  \`title\` varchar(500) DEFAULT NULL,
  \`guid\` varchar(1500) DEFAULT NULL,
  \`src\` varchar(1000) DEFAULT NULL,
  \`src_md5\` varchar(128) DEFAULT NULL,
  \`root_id\` int(11) DEFAULT NULL,
  \`filesize\` int(11) DEFAULT NULL,
  \`mine_type\` varchar(128) DEFAULT NULL,
  \`folder_name\` varchar(128) DEFAULT NULL,
  \`data\` text,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`media_status\` (\`status\`),
  KEY \`media_root_id\` (\`root_id\`),
  KEY \`media_src_md5\` (\`src_md5\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
