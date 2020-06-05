import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class AttributesTableCreate extends BaseSchema {
    protected $tableName = 'attributes'

    public async up () {
        this.schema.raw(`CREATE TABLE \`attributes\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(191) DEFAULT NULL,
  \`attribute_group_id\` int(11) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`attributes_name_attribute_group_id\` (\`name\`,\`attribute_group_id\`),
  KEY \`attributes_attribute_group_id\` (\`attribute_group_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
