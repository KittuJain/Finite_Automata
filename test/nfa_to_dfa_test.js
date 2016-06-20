var assert = require('chai').assert;
var findInitialState = require('../src/nfa_to_dfa.js').findInitialState;
var findFinalState = require('../src/nfa_to_dfa.js').findFinalStates;

var assertList = function (expected, actual) {
    return expected.length == actual.length && expected.every(function (elementExpected) {
        return actual.every(function (actualElem) {
            return elementExpected.indexOf(actualElem) >= 0;
        });
    });
};

describe('nfa-to-dfa-test', function () {
    describe('findInitialState', function () {
        it('should get the initial state for a DFA from an NFA', function () {
            var transitionFunc = {
                "q1": {"0": ["q1"], "1": ["q1", "q2"]},
                "q2": {"0": ["q3"]},
                "q3": {"1": ["q4"]},
                "q4": {}
            };
            var initialState = 'q1';
            assertList(['q1'], findInitialState(transitionFunc, initialState));
        });

        it('should get the initial state for a DFA from an NFA having epsilons', function () {
            var transitionFunc = {
                "q1": {"e": ["q2"]},
                "q2": {"e": ["q3"]},
                "q3": {"0": ["q3", "q4"], "1": ["q3"]},
                "q4": {}
            };
            var initialState = 'q1';
            assertList(['q1', 'q2', 'q3'], findInitialState(transitionFunc, initialState));
        });

        it('should get the initial state for a DFA from an NFA having epsilons at start', function () {
            var transitionFunc = {
                'q1': {'e': ['q2', 'q4']},
                'q2': {'a': ['q3']},
                'q3': {'a': ['q3']},
                'q4': {'a': ['q5'], 'e': ['q6']},
                'q5': {'b': ['q6']},
                'q6': {'e': ['q4', 'q7']},
                'q7': {'b': ['q8'], 'e': ['q9']},
                'q8': {'a': ['q9']},
                'q9': {'e': ['q7']}
            };
            var initialState = 'q1';
            assertList(['q1', 'q2', 'q4', 'q6', 'q7', 'q9'], findInitialState(transitionFunc, initialState));
        });
    });

    describe('findFinalStates', function () {
        it('should get the final state for a DFA from an NFA', function () {
            var possibleCombinations = [['q1'], ['q2'], ['q3'], ['q1', 'q2'], ['q1', 'q2', 'q3'], ['q2', 'q3']];
            var finalStates = ['q1', 'q3'];
            var expectedFinalStates = [['q1'], ['q3'], ['q1', 'q2'], ['q1', 'q2', 'q3'], ['q2', 'q3']];
            assertList(expectedFinalStates, findFinalState(possibleCombinations, finalStates));
        });
    });
});
