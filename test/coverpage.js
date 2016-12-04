import test from 'ava';
import {expect} from 'chai';
import coverpage from '..';

const recurseIntervals = [
	[30, 122],
	[125, 203],
	[258, 279],
	[324, 368],
	[453, 491],
	[563, 571],
	[580, 587],
	[686, 712],
	[764, 785],
	[819, 859]
];

const recursePagedIntervals = [
	{
		pageSize: 29,
		cost: 180,
		pagedIntervals: [[29, 203, 0, 2]]
	},
	{
		pageSize: 8,
		cost: 27,
		pagedIntervals: [[256, 280, 2, 3]]
	},
	{
		pageSize: 46,
		cost: 47,
		pagedIntervals: [[322, 368, 3, 4]]
	},
	{
		pageSize: 41,
		cost: 42,
		pagedIntervals: [[451, 492, 4, 5]]
	},
	{
		pageSize: 11,
		cost: 12,
		pagedIntervals: [[561, 572, 5, 6]]
	},
	{
		pageSize: 4,
		cost: 10,
		pagedIntervals: [[580, 588, 6, 7]]
	},
	{
		pageSize: 14,
		cost: 30,
		pagedIntervals: [[686, 714, 7, 8]]
	},
	{
		pageSize: 6,
		cost: 28,
		pagedIntervals: [[762, 786, 8, 9]]
	},
	{
		pageSize: 21,
		cost: 44,
		pagedIntervals: [[819, 861, 9, 10]]
	}
];

const cover = coverpage(pageSize => {
	const sizeCost = (1 / pageSize) + 1;
	return π => ~~(sizeCost * (π[1] - π[0]));
});

test('non disjoint intervals', () => expect(() => cover([1, 2], [1, 3])).to.throw(Error));
test('non ascending  intervals', () => expect(() => cover([2, 3], [1, 2])).to.throw(Error));
test('non integer intervals', () => expect(() => cover([1.3, 2.5])).to.throw(Error));
test('recurse intervals', () => expect(cover(...recurseIntervals)).to.deep.equal(recursePagedIntervals));
