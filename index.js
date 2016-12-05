/* All indexes are zero based
 * An interval is a paired Array of indexes: [lowerIndex, upperIndex]
 * A paged interval (pi or π) is a tuple of 2 or 4 elements: [lowerIndex, upperIndex(, lowerIntervalIndex, upperIntervalIndex)]
 */

const lowerPagedIndex = pageSize => index => index - (index % pageSize);
const upperPagedIndex = pageSize => index => {
	const offset = index % pageSize;
	return offset ? index - offset + pageSize : index;
};

const pagedInterval = pageSize => {
	const lpi = lowerPagedIndex(pageSize);
	const upi = upperPagedIndex(pageSize);
	return (from, to) => [lpi(from), upi(to)];
};

// intervals must be disjoint and in ascending order
const pagedIntervals = (intervals, lowerIndex = 0) => pageSize => {
	const pi = pagedInterval(pageSize);
	const offset = lowerIndex + 1;
	return intervals.reduce((πs, interval, intervalIndex) => {
		const π = pi(...interval);
		const lastπ = πs[πs.length - 1] || [];
		if (π[0] <= lastπ[1]) {
			lastπ[1] = π[1];
			lastπ[3] = offset + intervalIndex;
		} else {
			πs.push(π.concat(lowerIndex + intervalIndex, offset + intervalIndex));
		}
		return πs;
	}, []);
};

/* πCost = pageSize => π => cost
 * intervals must be disjoint and in ascending order
 */
const optimizedPagedIntervals = πCost => {
	return (intervals, lowerIndex = 0) => {
		const pis = pagedIntervals(intervals, lowerIndex);
		let best = {
			pageSize: 0,
			cost: Infinity,
			pagedIntervals: []
		};
		if (intervals.length === 0) {
			return Object.assign(best, {cost: 0});
		}
		for (let pageSize = 1; pageSize < intervals[intervals.length - 1][1] + 1; ++pageSize) {
			const πs = pis(pageSize);
			const πC = πCost(pageSize);
			const cost = πs.reduce((c, π) => c + πC(π), 0);
			if (cost < best.cost) {
				best = {pageSize, cost, pagedIntervals: πs};
			}
		}
		return best;
	};
};

module.exports = πCost => {
	const oπs = optimizedPagedIntervals(πCost);
	const check = intervals => (intervals.reduce((bound, interval, index) => {
		if (interval[0] < bound) {
			throw new Error(`interval ${interval} passed as argument ${index} must start at least at ${bound}`);
		}
		if ((interval[0] !== ~~interval[0]) || (interval[1] !== ~~interval[1])) {
			throw new Error(`interval ${interval} passed as argument ${index} must be bound by integers`);
		}
		return interval[1];
	}, -Infinity) || true) && intervals;

	function opis(intervals, lowestIndex = 0) {
		const candidate = oπs(intervals, lowestIndex);
		const result = [candidate];
		const πC = πCost(candidate.pageSize);

		if (candidate.pagedIntervals.length > 1) {
			const newPagedIntervals = [];
			let lowerIndex = lowestIndex;

			for (let π of candidate.pagedIntervals) {
				const partialCandidates = opis(intervals.slice(lowerIndex - lowestIndex, π[3] - lowestIndex), lowerIndex);
				const piCost = πC(π);
				if (partialCandidates.reduce((cost, c) => cost + c.cost, 0) < piCost) {
					result.push(...partialCandidates);
					candidate.cost -= piCost;
				} else {
					newPagedIntervals.push(π);
				}
				lowerIndex = π[3];
			}

			if (newPagedIntervals.length === 0) {
				result.shift();
			} else {
				candidate.pagedIntervals = newPagedIntervals;
			}
		}

		return result;
	}

	return (...intervals) => opis(check(intervals)).sort((left, right) => left.pagedIntervals[left.pagedIntervals.length - 1][3] <= right.pagedIntervals[0][2] ?
		-1 : (right.pagedIntervals[right.pagedIntervals.length - 1][3] <= left.pagedIntervals[0][2] ? 1 : 0));
};
module.exports.pagedInterval = pagedInterval;
module.exports.pagedIntervals = pagedIntervals;
module.exports.optimizedPagedIntervals = optimizedPagedIntervals;
