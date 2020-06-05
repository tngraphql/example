import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class ContactRepliesTableCreate extends BaseSchema {
    protected $tableName = 'contact_replies'

    public async up () {
        this.schema.raw(`CREATE TABLE \`contact_replies\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`message\` varchar(255) DEFAULT NULL,
  \`contact_id\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`contact_replies_contact_id\` (\`contact_id\`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
