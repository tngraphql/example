import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class OrderItemsTableCreate extends BaseSchema {
    protected $tableName = 'order_items'

    public async up() {
        this.schema.raw(`CREATE TABLE \`order_items\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`order_id\` int(11) DEFAULT NULL,
  \`product_branch_id\` int(11) DEFAULT NULL,
  \`sku\` varchar(191) DEFAULT NULL,
  \`code\` varchar(191) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`image\` varchar(255) DEFAULT NULL,
  \`price\` float DEFAULT NULL,
  \`quantity\` float DEFAULT NULL,
  \`total\` float DEFAULT NULL,
  \`discount\` float DEFAULT NULL,
  \`discount_type\` tinyint(4) DEFAULT NULL,
  \`tax\` int(11) DEFAULT NULL,
  \`reward\` varchar(255) DEFAULT NULL,
  \`type\` varchar(255) DEFAULT NULL,
  \`items\` varchar(255) DEFAULT NULL,
  \`method_id\` varchar(191) DEFAULT NULL,
  \`method_type\` int(11) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`order_items_order_id\` (\`order_id\`),
  KEY \`order_items_product_branch_id\` (\`product_branch_id\`),
  KEY \`order_items_sku\` (\`sku\`),
  KEY \`order_items_code\` (\`code\`),
  KEY \`order_items_method_id\` (\`method_id\`),
  KEY \`order_items_method_type\` (\`method_type\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
