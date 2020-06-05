import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class NotificationsTableCreate extends BaseSchema {
    protected $tableName = 'notifications'

    public async up () {
        this.schema.raw(`CREATE TABLE \`notifications\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`user_id\` int(11) DEFAULT NULL,
  \`send_id\` int(11) DEFAULT NULL,
  \`type\` varchar(255) DEFAULT NULL,
  \`data\` text,
  \`notificationable_type\` varchar(255) DEFAULT NULL,
  \`notificationable_id\` int(11) DEFAULT NULL,
  \`read_at\` datetime DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  \`deleted_at\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`notifications_user_id\` (\`user_id\`),
  KEY \`notifications_send_id\` (\`send_id\`),
  KEY \`notifications_type\` (\`type\`(191)),
  KEY \`notifications_notificationable_type\` (\`notificationable_type\`(191)),
  KEY \`notifications_notificationable_id\` (\`notificationable_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
