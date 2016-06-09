var _ = require('lodash');
var epsilon = 'e';

exports.nfa_generator = function (language) {
    return function (inputString) {
        var reducedStates = stateReducer(inputString, language.transitionFunc, language.initialState);
        var outputStates = stateMapper(reducedStates, language.transitionFunc, null);
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
        var stateOnCurrentAlphabet = transitions[state][currentAlphabet] || [];
        if (containsEpsilon(transitions, state)) {
            return stateOnCurrentAlphabet.concat(stateMapper(transitions[state][epsilon], transitions, currentAlphabet));
        }
        return transitions[state] && currentAlphabet && stateOnCurrentAlphabet || states;
    }));
};

var containsEpsilon = function (transitions, state) {
    return (!_.isEmpty(Object.keys(transitions[state])) && _.includes(Object.keys(transitions[state]), epsilon));
};