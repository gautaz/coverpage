import test from 'ava';
import pageslicer from '..';

const intervals = (maxIntervals, maxIntervalSize, maxIntervalGap) => () => {
	const result = [];
	const nbOfIntervals = maxIntervals; // ~~(maxIntervals * Math.random());
	for (let i = 0, boundary = 0; i < nbOfIntervals; ++i) {
		const interval = [];
		interval.push(boundary += ~~(maxIntervalGap * Math.random()));
		interval.push(boundary += ~~(maxIntervalSize * Math.random()));
		result.push(interval);
	}
	return result;
};

const πCost = (pageCost, indexCost) => pageSize => {
	const sizeCost = (pageCost / pageSize) + indexCost;
	return π => sizeCost * (π[1] - π[0]);
};

const bug = [
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

const is = intervals(100, 100, 100);
const slicer = pageslicer(πCost(1, 1));

test('sandbox', () => slicer(is()));
test('bug', () => slicer(bug));
