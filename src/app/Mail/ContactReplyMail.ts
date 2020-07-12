import {Mailable} from "@tngraphql/mail";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 10:42 PM
 */

export class ContactReplyMail extends Mailable {

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