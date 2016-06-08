var _ = require('lodash');

exports.nfa_generator = function (language) {
    return function (inputString) {
        var outputStates = stateReducer(inputString, language.transitionFunc, language.initialState);
        return _.intersection(language.finalStates, outputStates).length > 0;
    }
};

var stateReducer = function (inputString, transitions, initialState) {
    return inputString.split('').reduce(function (states, currentAlphabet) {
        return stateMapper(states, transitions, currentAlphabet);
    }, [initialState]);
};

var stateMapper = function (states, transitions, currentAlphabet) {
    return _.flatten(states.map(function (state) {
        if (!_.isEmpty(Object.keys(transitions[state])) && _.includes(Object.keys(transitions[state]), 'ε')) {
            return stateMapper(transitions[state]['ε'], transitions, currentAlphabet)
        }
        return transitions[state][currentAlphabet] || []
    }));
};