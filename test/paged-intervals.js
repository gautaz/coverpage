import test from 'ava';
import {expect} from 'chai';
import {pagedIntervals} from '..';

const πs = pagedIntervals;

test('πs([])(7)', () => expect(πs([])(7)).to.deep.equal([]));
test('πs([[9, 15]])(7)', () => expect(πs([[9, 15]])(7)).to.deep.equal([[7, 21, 0, 1]]));
test('πs([[9, 15], [30, 45]])(7)]', () => expect(πs([[9, 15], [30, 45]])(7)).to.deep.equal([[7, 21, 0, 1], [28, 49, 1, 2]]));
test('πs([[9, 15], [20, 34]])(7)', () => expect(πs([[9, 15], [20, 34]])(7)).to.deep.equal([[7, 35, 0, 2]]));
