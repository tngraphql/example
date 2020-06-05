import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class ProductRewardTableCreate extends BaseSchema {
    protected $tableName = 'product_reward'

    public async up () {
        this.schema.raw(`CREATE TABLE \`product_reward\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`product_master_id\` int(11) DEFAULT NULL,
  \`product_branch_id\` int(11) DEFAULT NULL,
  \`custom_group_id\` int(11) DEFAULT NULL,
  \`points\` float DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  \`deleted_at\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`product_reward_product_master_id\` (\`product_master_id\`),
  KEY \`product_reward_product_branch_id\` (\`product_branch_id\`),
  KEY \`product_reward_custom_group_id\` (\`custom_group_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
