import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class TagsTableCreate extends BaseSchema {
    protected $tableName = 'tags'

    public async up() {
        this.schema.raw(`CREATE TABLE \`tags\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(191) DEFAULT NULL,
  \`slug\` varchar(191) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  \`deleted_at\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`tags_name_deleted_at\` (\`name\`,\`deleted_at\`),
  UNIQUE KEY \`tags_slug_deleted_at\` (\`slug\`,\`deleted_at\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
