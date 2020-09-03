import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class FavoritesTableCreate extends BaseSchema {
    protected $tableName = 'favorites'

    public async up() {
        this.schema.raw(`CREATE TABLE \`favorites\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`favoriteable_id\` int(11) DEFAULT NULL,
  \`favoriteable_type\` varchar(100) DEFAULT NULL,
  \`user_id\` int(11) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`favorites_favoriteable_id_favoriteable_type_user_id\` (\`favoriteable_id\`,\`favoriteable_type\`,\`user_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
