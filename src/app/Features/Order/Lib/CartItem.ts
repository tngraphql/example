/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 3:12 PM
 */
import {convertStringToNumber} from "./utils";

const _ = require('lodash');

export class CartItem {
    public discount: number;

    public discountType: number;

    public price: number;

    public de: any;

    public id: any;
    public fullname: any;
    public quantity: any;

    constructor(data, callback) {
        this.discount = 0;
        this.discountType = 1;
        this.price = 0;

        for( const i in data ) {
            this[i] = data[i];
        }

        console.log(this);
        console.log(data);

        this.de = _.debounce((name, qty) => {
            callback && callback();
            this[name] = qty;
        }, 300);
    }

    public getId() {
        return String(this.id);
    }

    public getImage() {
        return _.get(this, 'images.0.image', null);
    }

    public getName() {
        return this.fullname;
    }

    public getQuantity() {
        return convertStringToNumber(this.quantity);
    }

    public setQuantity(qty) {
        this.de('quantity', qty);
    }

    public setDiscount({ discount, discountType }) {
        this.discountType = discountType;
        this.discount = convertStringToNumber(discount);
        // this.de('discount', convertStringToNumber(discount))
    }

    public getDiscount() {
        return convertStringToNumber(this.discount);
    }

    public getDiscountValue() {
        if ( this.discountType === 1 ) {
            return this.getDiscount();
        }
        return this.getPrice() * this.getDiscount() / 100;
    }

    public getPrice() {
        return convertStringToNumber(this.price);
    }

    public getPriceSell() {
        const sell = convertStringToNumber(this.price) - this.getDiscountValue();
        return sell < 0 ? 0 : sell;
    }

    public getTotal() {
        try {
            return (this.getPriceSell() * this.getQuantity());
        } catch (e) {
            return 0;
        }
    }
}
