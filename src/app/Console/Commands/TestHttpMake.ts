import {BaseCommand, flags, Inject} from "@tngraphql/illuminate";
import {args} from "@tngraphql/console";
import {GeneratorCommand} from "@tngraphql/illuminate/dist/Foundation";
import {join} from 'path'
import * as _ from 'lodash'
import * as fs from "fs";
import {GeneratorFile} from "@tngraphql/console/dist/Generator/File";
import {UserModel} from "../../UserModel";

export class TestHttpMake extends GeneratorCommand {
    protected getStub(): string {
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
        await this.generateFile('./TestCmd', {
            model: 'UserModel',
            queryName: 'role',
            name: 'role',
            attribute: []
        }, {})

        // const compiled = _.template(fs.readFileSync(this.getStub(), {encoding: 'utf8'}));
        //
        // const contents = compiled({
        //     model: 'UserModel',
        //     queryName: 'role',
        //     name: 'role',
        //     attribute: [
        //
        //     ]
        // });
        // console.log(contents)
        // await this.put('./TestCmd', contents);
        return Promise.resolve(undefined);
    }

    async generateFile(filePath: any, template: any, options: any) {
        const file = new GeneratorFile(this.buildClass(this.name), options);
        file.destinationDir(filePath);
        file.stub(this.getStub());
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

        const contents = compiled({
            model: 'RoleModel',
            queryName: 'role',
            name: 'role',
            attributes: Array.from(UserModel.$columnsDefinitions.keys()).filter(x => !['createdAt', 'updatedAt', 'deletedAt'].includes(x))
        });


        await this.put(fileJSON.filepath, contents);
        this.logger.create(fileJSON.relativepath);
    }
}