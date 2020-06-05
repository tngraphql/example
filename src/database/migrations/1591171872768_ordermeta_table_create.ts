import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class OrdermetaTableCreate extends BaseSchema {
    protected $tableName = 'ordermeta'

    public async up () {
        this.schema.raw(`CREATE TABLE \`ordermeta\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`order_id\` int(11) DEFAULT NULL,
  \`meta_key\` varchar(191) DEFAULT NULL,
  \`meta_value\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`ordermeta_meta_key\` (\`meta_key\`),
  KEY \`ordermeta_order_id\` (\`order_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
