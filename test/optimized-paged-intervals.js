import test from 'ava';
import {expect} from 'chai';
import {optimizedPagedIntervals} from '..';

const oπs = optimizedPagedIntervals(pageSize => {
	const sizeCost = (1 / pageSize) + 1;
	return π => sizeCost * (π[1] - π[0]);
});

[...Array(5).keys()]
	.forEach(last => test(`oπs([[0, ${last + 1}]])`,
		() => expect(oπs([[0, last + 1]])).to.deep.equal({pageSize: last + 1, cost: last + 2, pagedIntervals: [[0, last + 1, 0, 1]]})
	));

test('oπs([[0, 5], [10, 15]])',
	() => expect(oπs([[0, 5], [10, 15]])).to.deep.equal({pageSize: 5, cost: 12, pagedIntervals: [[0, 5, 0, 1], [10, 15, 1, 2]]})
);

test('oπs([[1163, 2326]])',
	() => expect(oπs([[1163, 2326]])).to.deep.equal({pageSize: 1163, cost: 1164, pagedIntervals: [[1163, 2326, 0, 1]]})
);

test('oπs([[6, 15], [27, 42], [999, 1041]])',
	() => expect(oπs([[6, 15], [27, 42], [999, 1041]])).to.deep.equal({pageSize: 3, cost: 88, pagedIntervals: [[6, 15, 0, 1], [27, 42, 1, 2], [999, 1041, 2, 3]]})
);
