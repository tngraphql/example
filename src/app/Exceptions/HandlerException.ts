/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/27/2020
 * Time: 2:29 PM
 */
import {Handler} from "@tngraphql/illuminate/dist/Foundation/Exceptions/Handler";
import {GraphQLError} from "graphql";
import {Application, Service} from "@tngraphql/illuminate";

@Service()
export class HandlerException extends Handler {
    /**
     * A list of the exception types that are not reported.
     */
    protected dontReport: any[] = [

    ];

    constructor(protected app: Application) {
        super(app);
        this.render = this.render.bind(this);
    }

    /**
     * Report or log an exception.
     *
     * @param e
     */
    report(e: any): any {
        return super.report(e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param error
     */
    render(error: GraphQLError): any {
        return super.render(error);
    }
}