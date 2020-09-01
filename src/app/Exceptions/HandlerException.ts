/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/27/2020
 * Time: 2:29 PM
 */
import {Handler} from "@tngraphql/illuminate/dist/Foundation/Exceptions/Handler";
import {GraphQLError} from "graphql";
import {Application, Service} from "@tngraphql/illuminate";
import {AuthenticationException} from "@tngraphql/auth/dist/src/Exception/AuthenticationException";

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
    render(error: GraphQLError | any): any {
        console.log(error.originalError);
        if (error.originalError.sqlState) {
            error.type = error.originalError.code;
            error.code = error.originalError.errno;
            error.message = 'Xin lỗi quý khách, kết nối đến hệ thống tạm thời bị gián đoạn. Vui lòng thử lại sau.';
        }
        if (error.originalError instanceof AuthenticationException) {
            error.type = 'AuthException';
            error.code = 290;
        }
        return super.render(error);
    }
}