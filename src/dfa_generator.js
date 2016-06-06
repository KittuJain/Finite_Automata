exports.dfa_generator = function (language) {

    return function (inputString) {
        var alphabets = inputString.split('');
        var computedFinalState = alphabets.reduce(function (currentState, currentAlphabet) {
                return language.transitionFunc[currentState][currentAlphabet];
            }, language.initialState
        );
        return areFinalStatesEqual(language.finalStates, computedFinalState);
    };
};

var areFinalStatesEqual = function (finalStates, computedFinalState) {
    return finalStates.some(function (state) {
        return state == computedFinalState
    });
};