import { CreateTableBuilder } from 'knex';
import {Application} from "@tngraphql/illuminate";
import {Schema} from "@tngraphql/lucid/build/src/Schema";
import {Hash} from "@tngraphql/illuminate/dist/Support/Facades/Hash";

export default class Users extends Schema {
    protected $tableName = 'users'

    public async up() {
        this.schema.raw(`CREATE TABLE \`users\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`phone\` varchar(191) DEFAULT NULL,
  \`email\` varchar(191) DEFAULT NULL,
  \`password\` varchar(255) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`avatar\` varchar(255) DEFAULT NULL,
  \`dob\` date DEFAULT NULL,
  \`gender\` enum('1','2') DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  \`deleted_at\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`users_email\` (\`email\`),
  KEY \`users_phone\` (\`phone\`),
  KEY \`users_gender\` (\`gender\`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;`);

        this.defer(db => {
            return db.table(this.$tableName).insert({
                name: 'Phan Trung Nguyên',
                avatar: 'https://phantrungnguyen.com/avatar.png',
                phone: '0357096209',
                password: Hash.make('123456'),
                dob: '2019-01-01',
                email: 'nguyenpl117@gmail.com',
                gender: '2',
                created_at: new Date(),
                updated_at: new Date()
            });
        });
    }

    public async down() {
        this.schema.dropTable(this.$tableName)
    }
}
