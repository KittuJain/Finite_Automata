var _ = require('lodash');
var epsilon = 'ε';

exports.nfa_generator = function (language) {
    return function (inputString) {
        var outputStates = stateReducer(inputString, language.transitionFunc, language.initialState);
        return _.intersection(language.finalStates, outputStates).length > 0;
    }
};

var stateReducer = function (inputString, transitions, initialState) {
    var transitionOnEpsilon = transitions[initialState][epsilon];
    if(inputString.length == 0)
        return (transitionOnEpsilon ? transitionOnEpsilon : [initialState]);
    return inputString.split('').reduce(function (states, currentAlphabet) {
        return stateMapper(states, transitions, currentAlphabet);
    }, [initialState]);
};

var stateMapper = function (states, transitions, currentAlphabet) {
    return _.flatten(states.map(function (state) {
        if (!_.isEmpty(Object.keys(transitions[state])) && _.includes(Object.keys(transitions[state]), epsilon)) {
            return stateMapper(transitions[state][epsilon], transitions, currentAlphabet)
        }
        return transitions[state][currentAlphabet] || []
    }));
};