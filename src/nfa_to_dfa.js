var _ = require('lodash');
var combinations = require('./combinations').combinations;
var getEpsilonStates = require('./nfa_generator').getEpsilonStates;

var findInitialState = function (transitions, initialState) {
    return getEpsilonStates([initialState], transitions);
};

var findFinalStates = function (possibleCombinations, finalState) {
    return possibleCombinations.filter(function (combination) {
        return containsFinalState(combination, finalState);
    });

};

var containsFinalState = function (states_candidates, states) {
    return states_candidates.intersection(states).isNotEmpty();
};

Array.prototype.isNotEmpty = function () {
    return !_.isEmpty(this);
};

Array.prototype.intersection = function (array) {
    return _.intersection(this, array);
};

module.exports = {
    findInitialState: findInitialState,
    findFinalStates: findFinalStates,
    nfaToDfa: nfaToDfa
};