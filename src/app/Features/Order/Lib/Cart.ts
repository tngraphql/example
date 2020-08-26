/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 3:12 PM
 */
import { CartItem } from './CartItem';
import {convertStringToNumber} from "./utils";

const _ = require('lodash');

export class Cart {
    public callback: () => any;
    public items: any[];
    public discount: number;
    public discountType: any;
    public shipping: any;
    public taxes: any;
    public taxValue: any;

    constructor(data: any[], callback?: () => any) {
        this.callback = callback;
        this.items = [];
        this.discount = 0;
        this.discountType = 1;
        this.shipping = {
            id: undefined,
            name: undefined,
            price: 0
        };
        this.taxes = true;
        this.taxValue = 10;

        if ( data instanceof Cart ) {
            // this.items = data.items;
            // this.callback = data.callback;
            for( const i in data ) {
                this[i] = data[i];
            }
        } else if ( Array.isArray(data) ) {
            for( const item of data ) {
                this.push(item);
            }
        } else {
            this.push(data);
        }
    }

    public multiple(data) {
        if ( Array.isArray(data) ) {
            for( const item of data ) {
                this.push(item);
            }
        } else {
            this.push(data);
        }
        return this;
    }

    public push(cartItem) {
        if ( ! cartItem || ! cartItem.quantity) {
            return;
        }
        if ( cartItem instanceof CartItem ) {
            this.items.push(cartItem);
        } else {
            this.items.push(new CartItem(cartItem, this.callback));
        }
    }

    public getQuantity() {
        const reduce = (amount, value) => (amount + value.getQuantity());
        return this.items.reduce(reduce, 0);
    }

    public getTotal() {
        return this.getSubtotal() + this.getTax() + this.getPriceShipping();
    }

    public getTax() {
        if ( ! this.taxes ) {
            return 0;
        }

        return this.getSubtotal() * this.taxValue / 100;
    }

    public getSubtotal() {
        return (this.getTotalOrigin() - this.getDiscountValue());
    }

    public getTotalOrigin() {
        const reduce = (amount, value) => (amount + value.getTotal());
        return this.items.reduce(reduce, 0);
    }

    public getDiscountValue() {
        if ( this.discountType === 1 ) {
            return this.getDiscount();
        }
        return this.getTotalOrigin() * this.getDiscount() / 100;
    }

    public getDiscount() {
        if ( this.discount > this.getTotalOrigin() ) {
            return this.getTotalOrigin();
        }

        return this.discount || 0;
    }

    public setDiscount({ discount, discountType }) {
        this.discountType = discountType;
        this.discount = convertStringToNumber(discount);
    }

    public getPriceShipping() {
        return convertStringToNumber(this.shipping.price);
    }

    public setShipping(shipping) {
        this.shipping = shipping;
    }

    public resetShipping() {
        this.shipping = {
            id: undefined,
            name: undefined,
            price: 0
        };
    }

    public resetTaxes() {
        this.taxes = true;
    }

    public setTaxes(taxes) {
        this.taxes = taxes;
    }
}
