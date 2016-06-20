var assert = require('chai').assert;
var combinations = require('../src/combinations.js').combinations;

describe('combinations', function () {
    it('all possible combinations of [1,2,3]', function () {
        var allCombinations = combinations([1, 2, 3]);
        var expectedCombinations = [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]];
        assert.deepEqual(expectedCombinations, allCombinations);
    });
});