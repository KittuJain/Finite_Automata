var combinatorics = require('js-combinatorics');

exports.combinations = function (set) {
    return combinatorics.power(set).toArray();
};

