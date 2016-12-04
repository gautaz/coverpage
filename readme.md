# coverpage

Many APIs giving access to list of items use the concept of pages.
Some of them enforce you to request these lists of items by giving a page size and a page index.

What if you only knows which items indexes you want to obtain and you want to know the optimal set of pages you need to request in order to get all of these items?

`coverpage` tries to answer this question by providing you this minimal API:

```javascript
const coverpage = require('coverpage')(pageSize => π => {
  // compute the cost of the paged interval π knowing its boundaries and the page size
  return cost;
});

coverpage(I1, I2, ..., IN) // Ix are integer pairs [lower bound, upper bound]
```

> The cost function is entirely up to you, see further for what data is bound to a paged interval.
>
> Note that it first takes the page size as its only argument and then should return a function taking a paged interval as its only argument, this later function must finally return the cost as a number.
>
> Also note that the upper bound of an interval is the lowest integer greater than any element of the interval and is thus not part of the interval.

The following prerequisite on integer intervals passed in argument is required: `I1 < I2 < ... < IN`.
Which means that the intervals must be disjoint and passed in ascending order.
`coverpage` will throw an error if this prerequisite is not fulfilled.

Given all these intervals, `coverpage` will return a set of objects having the following structure:

```javascript
{
  pageSize: pageSize, // the size of all pages used by the paged intervals
  cost: cost, // the cost of this current set of paged intervals computed with the cost function given to coverpage
  pagedIntervals: [
    [lowerBound1, upperBound1, lowerIntervalIndex1, upperIntervalIndex1],
    // ...
    [lowerBoundM, upperBoundM, lowerIntervalIndexM, upperIntervalIndexM]
  ]
]
```

Each **paged interval** is a tuple (an array) with four elements:

- the first element is the lowest integer in the paged interval and is by construct a multiple of the page size
- the second element is the lowest integer that is greater than any element in the paged interval and is also by construct a multiple of the page size
- the third element is the lowest index of the interval passed as argument that is covered by the current paged interval
- the fourth element is the lowest index of the interval that is greater than the current paged interval

In order to get page indexes, you can just divide the first and second elements by the page size:

- the first one will provide the first page index from the paged interval
- the second one will provide the first page index that is not part anymore of the paged interval
