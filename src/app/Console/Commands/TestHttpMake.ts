import {BaseCommand, flags, Inject} from "@tngraphql/illuminate";
import {args} from "@tngraphql/console";
import {GeneratorCommand} from "@tngraphql/illuminate/dist/Foundation";
import {join} from 'path'
import * as _ from 'lodash'
import * as fs from "fs";
import {GeneratorFile} from "@tngraphql/console/dist/Generator/File";
import {UserModel} from "../../UserModel";
import RoleModel from "../../Models/RoleModel";
import {RoleCreateArgsType} from "../../GraphQL/Types/Role/RoleCreateArgsType";
import {RoleUpdateArgsType} from "../../GraphQL/Types/Role/RoleUpdateArgsType";
import {RoleDeleteArgsType} from "../../GraphQL/Types/Role/RoleDeleteArgsType";
import {compileRules, handlerRulers} from "@tngraphql/illuminate/dist/Foundation/Validate/helpers";
import {ruleToString} from "../../../lib/utils";
import TagModel from "../../Features/Tag/TagModel";
import ContactModel from "../../Features/Contact/ContactModel";
import ContactReplyModel from "../../Features/Contact/ContactReplyModel";
import FavoriteModel from "../../Features/Favorite/FavoriteModel";
import CategoryModel from "../../Features/Category/CategoryModel";
import {PostModel} from "../../Features/Post/PostModel";
import CommentModel from "../../Features/Comment/CommentModel";
import {ProductTypeModel} from "../../Features/Product/Models/ProductTypeModel";
import {ProductVendorModel} from "../../Features/Product/Models/ProductVendorModel";
import {ProductMasterModel} from "../../Features/Product/Models/ProductMasterModel";
import {ProductBranchModel} from "../../Features/Product/Models/ProductBranchModel";

export class TestHttpMake extends GeneratorCommand {
    protected getStub(): string {
        // return join(__dirname, 'stub/file.auth.spec.stub');
        return join(__dirname, 'stub/file.spec.stub');
    }

    protected getSuffix(): string {
        return "";
    }

    static commandName = 'testhttp';

    @Inject('db') private db: any

    @args.string()
    public name: string;

    @flags.boolean()
    public force: boolean;


    async handle(...args: any[]): Promise<any> {

        const instance = handlerRulers(RoleCreateArgsType, args)
        const validate = Object.entries(ruleToString(compileRules(instance)));

        await this.generateFile('./tests/functional', {
            model: 'ProductBranchModel',
            queryName: 'product_branch',
            name: 'productBranch',
            attributes: Array.from(ProductBranchModel.$columnsDefinitions.keys())
                .filter(x => !['createdAt', 'updatedAt', 'deletedAt'].includes(x)),
            create: {
                validate
            },
            update: RoleUpdateArgsType,
            delete: RoleDeleteArgsType
        }, {});

        return Promise.resolve(undefined);
    }

    async generateFile(filePath: any, template: any, options: any) {
        const file = new GeneratorFile(this.buildClass(this.name), options);
        file.destinationDir(filePath);
        file.stub(this.getStub(), {raw: true});
        if (template) {
            file.apply(template);
        }
        const fileJSON = file.toJSON();
        const exists = await this.alreadyExists(fileJSON.filepath);
        if (exists && !this['force']) {
            this.logger.skip(`${fileJSON.relativepath} already exists`);
            return false;
        }

        const compiled = _.template(fs.readFileSync(this.getStub(), {encoding: 'utf8'}));

        const contents = compiled(template);

        const filePathString = fileJSON.filepath.replace('.ts', '.spec.ts');

        await this.put(filePathString, contents);
        this.logger.create(filePathString);
    }
}