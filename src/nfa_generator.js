const _ = require('lodash');
const epsilon = 'e';

exports.nfa_generator = function (language) {
    return function (inputString) {
        var outputStates = stateReducer(inputString, language.transitionFunc, language.initialState);
        return isFinalState(outputStates, language.finalStates);
    };
};

var isFinalState = function (outputStates, finalStates) {
    return finalStates.intersection(outputStates).isNotEmpty();
};

var stateReducer = function (inputString, transitions, initialState) {
    var epsilonStates = getEpsilonStates([initialState], transitions);
    return inputString.split('').reduce(function (states, currentAlphabet) {
        return stateMapper(states, transitions, currentAlphabet);
    }, epsilonStates);
};

var stateMapper = function (states, transitions, currentAlphabet) {
    var statesOnCurrentAlphabet = states.map(function (state) {
        return transitions[state] && transitions[state][currentAlphabet] || [];
    }).flatten();
    return getEpsilonStates(statesOnCurrentAlphabet, transitions)
};

var getEpsilonStates = function (states, transitions) {
    var epsilonStates = states.map(function (state) {
        return containsEpsilon(transitions, state) && transitions[state][epsilon] || [];
    }).flatten();

    if (epsilonStates.isSubsetOf(states)) return states;
    var unionStates = epsilonStates.union(states);
    return getEpsilonStates(unionStates, transitions);
};

var containsEpsilon = function (transitions, state) {
    return (transitions[state] && transitions[state][epsilon]);
};

var isSubsetOf = function (subSet, superSet) {
    return subSet.every(function (element) {
        return _.includes(superSet, element);
    })
};

Array.prototype.isSubsetOf = function (array) {
    return isSubsetOf(this, array);
};

Array.prototype.union = function (array) {
    return _.union(this, array);
};

Array.prototype.intersection = function (array) {
    return _.intersection(this, array);
};

Array.prototype.flatten = function () {
    return _.flatten(this);
};

Array.prototype.isNotEmpty = function () {
    return !_.isEmpty(this);
};
