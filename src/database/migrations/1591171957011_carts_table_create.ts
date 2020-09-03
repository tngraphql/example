import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class CartsTableCreate extends BaseSchema {
    protected $tableName = 'carts'

    public async up() {
        this.schema.raw(`CREATE TABLE \`carts\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`session_id\` varchar(191) DEFAULT NULL,
  \`prouct_id\` int(11) DEFAULT NULL,
  \`quantity\` float DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`carts_session_id\` (\`session_id\`),
  KEY \`carts_prouct_id\` (\`prouct_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
