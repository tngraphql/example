/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 11:35 AM
 */
import { Mailable } from '@tngraphql/mail';
import { Application } from '@tngraphql/illuminate';

const app = Application.getInstance();

export class ResetPassword extends Mailable {
    protected data: any = {
        outroLines: [],
        introLines: []
    };

    /**
     * Create a new message instance.
     */
    public constructor(data) {
        super();
        this.data.actionUrl = data.actionUrl;
    }

    /**
     * Build the message.
     */
    public build(): void {
        this.subject('Yêu cầu lấy lại mật khẩu');

        this.data.introLines = [
            'Xin chào bạn,',
            'You are receiving this email because we received a password reset request for your account.'
        ];

        this.data.outroLines = [
            `This password reset link will expire in ${ app.make('config').get('auth.passwords.expire') } minutes.`,
            'If you did not request a password reset, no further action is required.',
        ]
        this.htmlView('password-reset', this.data)
    }
}
