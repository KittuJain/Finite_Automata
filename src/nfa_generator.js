var _ = require('lodash');
var epsilon = 'ε';

exports.nfa_generator = function (language) {
    return function (inputString) {
        var initialStatesOnEpsilons = getInitialEpsilonStates([language.initialState], language.transitionFunc);
        var reducedStates = stateReducer(inputString, language.transitionFunc, initialStatesOnEpsilons);
        var epsilonStatesAtEnd = epsilonStatesMapper(language.transitionFunc, reducedStates);
        return isFinalState(reducedStates.concat(epsilonStatesAtEnd), language.finalStates);
    }
};

var getInitialEpsilonStates = function (initialStates, transitions) {
  return (initialStates.map(function (state) {
      if(containsEpsilon(transitions, state))
        return [state].concat(getInitialEpsilonStates(transitions[state][epsilon], transitions));
      return [state];
  })).flatten();
};

var isFinalState = function (outputStates, finalStates) {
    return isNotEmpty(finalStates.intersection(outputStates));
};

var isNotEmpty = function (item) {
    return !_.isEmpty(item)
};

var stateReducer = function (inputString, transitions, initialState) {
    return inputString.split('').reduce(function (states, currentAlphabet) {
        return stateMapper(states, transitions, currentAlphabet);
    }, initialState);
};

var stateMapper = function (states, transitions, currentAlphabet) {
    return states.map(function (state) {
        var stateOnCurrentAlphabet = transitions[state] && transitions[state][currentAlphabet] || [];
        if (containsEpsilon(transitions, state))
            return stateOnCurrentAlphabet.concat(stateMapper(transitions[state][epsilon], transitions, currentAlphabet));
        return stateOnCurrentAlphabet;
    }).flatten();
};

var containsEpsilon = function (transitions, state) {
    return (transitions[state] && transitions[state][epsilon]);
};

var epsilonStatesMapper = function (transitions, states) {
    return states.map(function (state) {
        return getEpsilonStates(transitions, state);
    }).flatten();
};

var getEpsilonStates = function (transitions, state) {
    return (containsEpsilon(transitions, state) ? transitions[state][epsilon] : [])
};

Array.prototype.intersection = function (array) {
    return _.intersection(this, array);
};

Array.prototype.flatten = function () {
    return _.flatten(this);
};
