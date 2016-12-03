import test from 'ava';
import {expect} from 'chai';
import {pagedInterval} from '..';

const π1 = pagedInterval(1);
const π2 = pagedInterval(2);
const π3 = pagedInterval(3);
const π5 = pagedInterval(5);

test('π1(0, 0)', () => expect(π1(0, 0)).to.deep.equal([0, 0]));
test('π2(0, 0)', () => expect(π2(0, 0)).to.deep.equal([0, 0]));
test('π3(0, 0)', () => expect(π3(0, 0)).to.deep.equal([0, 0]));
test('π5(0, 0)', () => expect(π5(0, 0)).to.deep.equal([0, 0]));

test('π1(0, 1)', () => expect(π1(0, 1)).to.deep.equal([0, 1]));
test('π2(0, 1)', () => expect(π2(0, 1)).to.deep.equal([0, 2]));
test('π3(0, 1)', () => expect(π3(0, 1)).to.deep.equal([0, 3]));
test('π5(0, 1)', () => expect(π5(0, 1)).to.deep.equal([0, 5]));

test('π1(0, 2)', () => expect(π1(0, 2)).to.deep.equal([0, 2]));
test('π2(0, 2)', () => expect(π2(0, 2)).to.deep.equal([0, 2]));
test('π3(0, 2)', () => expect(π3(0, 2)).to.deep.equal([0, 3]));
test('π5(0, 2)', () => expect(π5(0, 2)).to.deep.equal([0, 5]));

test('π1(0, 3)', () => expect(π1(0, 3)).to.deep.equal([0, 3]));
test('π2(0, 3)', () => expect(π2(0, 3)).to.deep.equal([0, 4]));
test('π3(0, 3)', () => expect(π3(0, 3)).to.deep.equal([0, 3]));
test('π5(0, 3)', () => expect(π5(0, 3)).to.deep.equal([0, 5]));

test('π1(0, 4)', () => expect(π1(0, 4)).to.deep.equal([0, 4]));
test('π2(0, 4)', () => expect(π2(0, 4)).to.deep.equal([0, 4]));
test('π3(0, 4)', () => expect(π3(0, 4)).to.deep.equal([0, 6]));
test('π5(0, 4)', () => expect(π5(0, 4)).to.deep.equal([0, 5]));

test('π1(0, 5)', () => expect(π1(0, 5)).to.deep.equal([0, 5]));
test('π2(0, 5)', () => expect(π2(0, 5)).to.deep.equal([0, 6]));
test('π3(0, 5)', () => expect(π3(0, 5)).to.deep.equal([0, 6]));
test('π5(0, 5)', () => expect(π5(0, 5)).to.deep.equal([0, 5]));

test('π1(10, 10)', () => expect(π1(10, 10)).to.deep.equal([10, 10]));
test('π2(10, 10)', () => expect(π2(10, 10)).to.deep.equal([10, 10]));
test('π3(10, 10)', () => expect(π3(10, 10)).to.deep.equal([9, 12]));
test('π5(10, 10)', () => expect(π5(10, 10)).to.deep.equal([10, 10]));

test('π1(9, 10)', () => expect(π1(9, 10)).to.deep.equal([9, 10]));
test('π2(9, 10)', () => expect(π2(9, 10)).to.deep.equal([8, 10]));
test('π3(9, 10)', () => expect(π3(9, 10)).to.deep.equal([9, 12]));
test('π5(9, 10)', () => expect(π5(9, 10)).to.deep.equal([5, 10]));

test('π1(8, 10)', () => expect(π1(8, 10)).to.deep.equal([8, 10]));
test('π2(8, 10)', () => expect(π2(8, 10)).to.deep.equal([8, 10]));
test('π3(8, 10)', () => expect(π3(8, 10)).to.deep.equal([6, 12]));
test('π5(8, 10)', () => expect(π5(8, 10)).to.deep.equal([5, 10]));

test('π1(7, 10)', () => expect(π1(7, 10)).to.deep.equal([7, 10]));
test('π2(7, 10)', () => expect(π2(7, 10)).to.deep.equal([6, 10]));
test('π3(7, 10)', () => expect(π3(7, 10)).to.deep.equal([6, 12]));
test('π5(7, 10)', () => expect(π5(7, 10)).to.deep.equal([5, 10]));

test('π1(6, 10)', () => expect(π1(6, 10)).to.deep.equal([6, 10]));
test('π2(6, 10)', () => expect(π2(6, 10)).to.deep.equal([6, 10]));
test('π3(6, 10)', () => expect(π3(6, 10)).to.deep.equal([6, 12]));
test('π5(6, 10)', () => expect(π5(6, 10)).to.deep.equal([5, 10]));

test('π1(5, 10)', () => expect(π1(5, 10)).to.deep.equal([5, 10]));
test('π2(5, 10)', () => expect(π2(5, 10)).to.deep.equal([4, 10]));
test('π3(5, 10)', () => expect(π3(5, 10)).to.deep.equal([3, 12]));
test('π5(5, 10)', () => expect(π5(5, 10)).to.deep.equal([5, 10]));
