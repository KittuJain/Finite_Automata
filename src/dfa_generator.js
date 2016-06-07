var _ = require('lodash');

exports.dfa_generator = function (language) {
    return function (inputString) {
        areInputsValid(language, inputString);
        var computedFinalState = stateReducer(inputString, language.transitionFunc, language.initialState);
        return language.finalStates.indexOf(computedFinalState) >= 0;
    };
};

var stateReducer = function (inputString, transitions, initialState) {
    return inputString.split('').reduce(function (currentState, currentAlphabet) {
            return transitions[currentState][currentAlphabet];
        }, initialState);
};

var isInputValid = function (inputString, alphabets) {
    var uniqueAlphabets = _.uniq(inputString.split(''));
    return isSubsetOf(uniqueAlphabets, alphabets);
};

var isSubsetOf = function (subSet, superSet) {
    return subSet.every(function (element) {
        return _.includes(superSet, element);
    })
};

var isTransitionFunctionValid = function (transitionFunc, states, alphabets) {
    var transitionElements = _.flatten(Object.keys(transitionFunc).map(function (state) {
        return Object.keys(transitionFunc[state])
    }));
    return (isSubsetOf(Object.keys(transitionFunc), states) && isSubsetOf(transitionElements, alphabets));
};


var isInitialStateValid = function (initialState, states) {
    return (initialState.length > 0 && isSubsetOf([initialState], states));
};


var areFinalStatesValid = function (finalStates, states) {
    return (finalStates.length > 0 && isSubsetOf(finalStates, states));
};

var areInputsValid = function(language, inputString) {
    if (!isInputValid(inputString, language.alphabets)) {
        throw ("Invalid Input, String should only contain " + language.alphabets.join(',') + " alphabets");
    }

    if (!isInitialStateValid(language.initialState, language.states)) {
        throw ("Invalid initial state");
    }

    if (!areFinalStatesValid(language.finalStates, language.states)) {
        throw ("Invalid final States");
    }

    if (!isTransitionFunctionValid(language.transitionFunc, language.states, language.alphabets)) {
        throw ("Invalid transition function");
    }
};