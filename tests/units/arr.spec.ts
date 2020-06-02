/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/30/2020
 * Time: 7:28 PM
 */

import '../support';
import {expect} from 'chai';

import Arr from "../../src/lib/Arr";

describe('Array', () => {
    it('array_wrap', async () => {
        expect(Arr.array_wrap('')).to.deep.eq([]);
        expect(Arr.array_wrap(undefined)).to.deep.eq([]);
        expect(Arr.array_wrap(null)).to.deep.eq([]);
        expect(Arr.array_wrap(1)).to.deep.eq([1]);
        expect(Arr.array_wrap(0)).to.deep.eq([0]);
        expect(Arr.array_wrap(false)).to.deep.eq([false]);
        expect(Arr.array_wrap('1,2,3', ',')).to.deep.eq(['1','2','3']);
    });
});