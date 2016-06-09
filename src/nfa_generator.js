var _ = require('lodash');
var epsilon = 'ε';

exports.nfa_generator = function (language) {
    return function (inputString) {
        var reducedStates = stateReducer(inputString, language.transitionFunc, language.initialState);
        var outputStates = epsilonStatesMapper(language.transitionFunc, reducedStates);
        return _.intersection(language.finalStates, reducedStates.concat(outputStates)).length > 0;
    }
};

var stateReducer = function (inputString, transitions, initialState) {
    if (inputString.length == 0)
        return getEpsilonStates(transitions, initialState).concat(initialState);
    return inputString.split('').reduce(function (states, currentAlphabet) {
        return stateMapper(states, transitions, currentAlphabet);
    }, [initialState]);
};

var getEpsilonStates = function (transitions, state) {
    var transitionOnEpsilon = transitions[state][epsilon];
    return (containsEpsilon(transitions, state) && transitionOnEpsilon || []);
};

var stateMapper = function (states, transitions, currentAlphabet) {
    return _.flatten(states.map(function (state) {
        var stateOnCurrentAlphabet = transitions[state] && transitions[state][currentAlphabet] || [];
        if (containsEpsilon(transitions, state))
            return stateOnCurrentAlphabet.concat(stateMapper(transitions[state][epsilon], transitions, currentAlphabet));
        return stateOnCurrentAlphabet;
    }));
};

var containsEpsilon = function (transitions, state) {
    return (transitions[state] && transitions[state][epsilon]);
};

var epsilonStatesMapper = function (transitions, states) {
    return _.flatten(states.map(function (state) {
        return getEpsilonStates(transitions, state).concat(state);
    }));
};


