import {Mailable} from "@tngraphql/mail";
import {Application} from "@tngraphql/illuminate";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 10:42 PM
 */
const app = Application.getInstance();

export class ContactReplyMail extends Mailable {

    /**
     * Create a new message instance.
     */
    public constructor(protected data) {
        super();
    }

    /**
     * Build the message.
     */
    public build(): void {
        this.subject(app.config.get('app.name') + ' trả lời tin nhắn liên hệ.');
        this.from(app.config.get('mail.from.address'), 'Hỗ trợ ' + app.config.get('app.name'));
        this.htmlView('contact-reply',  this.data)
    }
}