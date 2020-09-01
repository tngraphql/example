/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 9/1/2020
 * Time: 8:16 AM
 */

import {Service, ServiceProvider} from "@tngraphql/illuminate";
import * as path from "path";
import {Repository} from "@tngraphql/illuminate/dist/Contracts/Config/Repository";

@Service()
export class ViewServiceProvider extends ServiceProvider {
    register() {
        this.app.singleton('view', () => {
            const edge = require('edge.js')

            edge.registerViews(path.join(process.cwd(), 'resources/views'));

            const config = this.app.make<Repository>('config')

            edge.global('config', function(key, defaultValue = '') {
                return config.get(key, defaultValue);
            });

            const translator = this.app.make('translator')

            edge.tag({
                tagName: 't',
                isBlock: false,
                compile: (compiler, lexer, buffer, {body, childs, lineno}) => {
                    compiler.compileString(translator.__(body));
                },
                run() {

                }
            });


            const inlineCss = require('inline-css');

            return {
                render: async (template, data) => {
                    // if (data && typeof data === "object") {
                    //     for (let i in data) {
                    //         edge.global(i, data[i]);
                    //     }
                    // }
                    return inlineCss(edge.render(template, data), {url: config.get('app.url')});
                }
            };
        })
    }
}