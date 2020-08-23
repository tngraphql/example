/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 11:35 AM
 */
import {Mailable} from "@tngraphql/mail";

export class ResetPassword extends Mailable {

    /**
     * Create a new message instance.
     */
    public constructor(data) {
        super();
    }

    /**
     * Build the message.
     */
    public build(): void {
        this.to('nguyenpl117@gmail.com')
            .text('plain mail');
    }
}
