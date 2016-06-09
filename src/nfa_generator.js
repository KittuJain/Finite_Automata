var _ = require('lodash');
var epsilon = 'e';

exports.nfa_generator = function (language) {
    return function (inputString) {
        var reducedStates = stateReducer(inputString, language.transitionFunc, language.initialState);
        var outputStates = mapForEpsilonAtEnd(reducedStates, language.transitionFunc, null);
        return _.intersection(language.finalStates, outputStates).length > 0;
    }
};

var stateReducer = function (inputString, transitions, initialState) {
    var transitionOnEpsilon = transitions[initialState][epsilon];
    if (inputString.length == 0)
        return (transitionOnEpsilon ? transitionOnEpsilon : [initialState]);
    return inputString.split('').reduce(function (states, currentAlphabet) {
        return stateMapper(states, transitions, currentAlphabet);
    }, [initialState]);

};

var stateMapper = function (states, transitions, currentAlphabet) {
    return _.flatten(states.map(function (state) {
        var stateOnCurrentAlphabet = transitions[state][currentAlphabet] || [];
        if (containsEpsilon(transitions, state)) {
            return stateOnCurrentAlphabet.concat(stateMapper(transitions[state][epsilon], transitions, currentAlphabet));
        }
        return transitions[state] && stateOnCurrentAlphabet || states;
    }));
};

var containsEpsilon = function (transitions, state) {
    return (!_.isEmpty(Object.keys(transitions[state])) && _.includes(Object.keys(transitions[state]), epsilon));
};

var mapForEpsilonAtEnd = function (states, transitions) {
    return _.flatten(states.map(function (state) {
        if (containsEpsilon(transitions, state))
            return transitions[state][epsilon];
        else
            return states;
    }));
};