import { Schema as BaseSchema } from '@tngraphql/lucid/build/src/Schema';
import { CreateTableBuilder } from 'knex';

export default class OptionsTableCreate extends BaseSchema {
    protected $tableName = 'options'

    public async up () {
        this.schema.raw(`CREATE TABLE \`options\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(191) DEFAULT NULL,
  \`value\` longtext,
  \`autoload\` varchar(20) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`name\` (\`name\`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;`)

        const data = `
        INSERT INTO \`options\` VALUES (1, 'siteurl', 'https://phantrungnguyen.com/', 'yes');
INSERT INTO \`options\` VALUES (2, 'home', 'https://phantrungnguyen.com/', 'yes');
INSERT INTO \`options\` VALUES (3, 'blogname', 'https://phantrungnguyen.com/', 'yes');
INSERT INTO \`options\` VALUES (4, 'logo', '', 'yes');
INSERT INTO \`options\` VALUES (5, 'favicon', '', 'yes');
INSERT INTO \`options\` VALUES (6, 'blogdescription', 'Mô tả blog', 'yes');
INSERT INTO \`options\` VALUES (7, 'usersCanRegister', '0', 'yes');
INSERT INTO \`options\` VALUES (8, 'adminEmail', 'nguyenpl117@gmail.com', 'yes');
INSERT INTO \`options\` VALUES (9, 'defaultRole', 'member', 'yes');
INSERT INTO \`options\` VALUES (10, 'defaultCommentStatus', '1', 'yes');
INSERT INTO \`options\` VALUES (11, 'commentOrder', 'ASC', 'yes');
INSERT INTO \`options\` VALUES (12, 'commentModeration', '0', 'yes');
INSERT INTO \`options\` VALUES (13, 'commentModerationKeys', '', 'no');
INSERT INTO \`options\` VALUES (14, 'commentBlacklistKeys', '', 'no');
INSERT INTO \`options\` VALUES (15, 'commentMaxLinks', '2', 'yes');
INSERT INTO \`options\` VALUES (16, 'headerNavigation', '{\\"1\\":1}', 'yes');
INSERT INTO \`options\` VALUES (17, 'mainNavigation', '{\\"1\\":1}', 'yes');
INSERT INTO \`options\` VALUES (18, 'footerNavigation', '{\\"1\\":1}', 'yes');
INSERT INTO \`options\` VALUES (19, 'defaultLanguage', '1', 'yes');
INSERT INTO \`options\` VALUES (20, 'hideDefaultLanguage', '1', 'yes');
INSERT INTO \`options\` VALUES (21, 'displayLanguage', '1', 'yes');
INSERT INTO \`options\` VALUES (22, 'hideLanguage', '[\\"1\\",\\"2\\"]', 'yes');
INSERT INTO \`options\` VALUES (23, 'showItemDefaultLanguage', '1', 'yes');
INSERT INTO \`options\` VALUES (24, 'SMTPHost', 'smtp.gmail.com', 'yes');
INSERT INTO \`options\` VALUES (25, 'SMTPEncryption', '1', 'yes');
INSERT INTO \`options\` VALUES (26, 'SMTPPort', '587', 'yes');
INSERT INTO \`options\` VALUES (27, 'SMTPUsername', 'example@gmail.com', 'yes');
INSERT INTO \`options\` VALUES (28, 'SMTPPassword', 'cjthfdyxjycnwotw', 'yes');
INSERT INTO \`options\` VALUES (29, 'SMTPSenderName', 'example', 'yes');
INSERT INTO \`options\` VALUES (30, 'SMTPSenderEmail', 'hello@example.com', 'yes');
INSERT INTO \`options\` VALUES (38, 'socialLogin', '1', 'yes');
INSERT INTO \`options\` VALUES (39, 'facebookLoginEnable', '0', 'yes');
INSERT INTO \`options\` VALUES (40, 'facebookClientId', '', 'yes');
INSERT INTO \`options\` VALUES (41, 'facebookClientSecret', '', 'yes');
INSERT INTO \`options\` VALUES (42, 'facebookScopes', '', 'yes');
INSERT INTO \`options\` VALUES (43, 'facebookRedirectURL', '', 'yes');
INSERT INTO \`options\` VALUES (44, 'googleLoginEnable', '0', 'yes');
INSERT INTO \`options\` VALUES (45, 'googleClientId', '', 'yes');
INSERT INTO \`options\` VALUES (46, 'googleClientSecret', '', 'yes');
INSERT INTO \`options\` VALUES (47, 'googleScopes', '', 'yes');
INSERT INTO \`options\` VALUES (48, 'googleRedirectURL', '', 'yes');
INSERT INTO \`options\` VALUES (49, 'githubLoginEnable', '0', 'yes');
INSERT INTO \`options\` VALUES (50, 'githubClientId', '', 'yes');
INSERT INTO \`options\` VALUES (51, 'githubClientSecret', '', 'yes');
INSERT INTO \`options\` VALUES (52, 'githubScopes', '', 'yes');
INSERT INTO \`options\` VALUES (53, 'githubRedirectURL', '', 'yes');
INSERT INTO \`options\` VALUES (54, 'autoRegister', '1', 'yes');
INSERT INTO \`options\` VALUES (55, 'autoRegisterDisabledMessage', 'Registration is disabled for this website. Please contact the administrator for any gql.', 'yes');
INSERT INTO \`options\` VALUES (56, 'socialRegisterRole', '3', 'yes');
`;
        data.split(';').filter(x => !!x.trim()).forEach(value => {
            this.schema.raw(value);
        })
    }

    public async down () {
        this.schema.dropTable(this.$tableName)
    }
}
