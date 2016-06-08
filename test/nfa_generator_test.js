var assert = require('chai').assert;
var nfa_generator = require('../src/nfa_generator.js').nfa_generator;

describe('nfa-test', function () {
    describe("should pass for", function () {
        it('all binary strings that ends with 101', function () {
            var language = {
                states: ["q1", "q2", "q3", "q4"],
                alphabets: ["1", "0"],
                transitionFunc: {
                    "q1": {"0": ["q1"], "1": ["q1", "q2"]},
                    "q2": {"0": ["q3"]},
                    "q3": {"1": ["q4"]},
                    "q4": {}
                },
                initialState: "q1",
                finalStates: ["q4"]
            };
            var nfa = nfa_generator(language);
            assert.isFalse(nfa("01"));
            assert.isTrue(nfa("101"));
            assert.isTrue(nfa("0101"));
            assert.isTrue(nfa("1101"));
        });

        it('strings ending with an even number of 1s or even number of 0s', function () {
            var language = {
                states: ["q1", "q2", "q3", "q4", "q5"],
                alphabets: ["1", "0", "ε"],
                transitionFunc: {
                    "q1": {"ε": ["q2", "q4"]},
                    "q2": {"0": ["q3"], "1": ["q2"]},
                    "q3": {"0": ["q2"], "1": ["q3"]},
                    "q4": {"0": ["q4"], "1": ["q5"]},
                    "q5": {"0": ["q5"], "1": ["q4"]}
                },
                initialState: "q1",
                finalStates: ["q2", "q4"]
            };
            var nfa = nfa_generator(language);
            assert.isTrue(nfa("11"));
            assert.isTrue(nfa("00"));
            assert.isFalse(nfa("01"));
        });

        it('strings ending with 0', function () {
            var language = {
                "states": ["q1", "q2", "q3", "q4"],
                "alphabets": ["0", "1", "ε"],
                "transitionFunc": {
                    "q1": {"ε": ["q2"]},
                    "q2": {"ε": ["q3"]},
                    "q3": {"0": ["q3", "q4"], "1": ["q3"]},
                    "q4": {}
                },
                "initialState": "q1",
                "finalStates": ["q4"]

            };
            var nfa = nfa_generator(language);
            assert.isFalse(nfa("11"));
            assert.isTrue(nfa("00"));
            assert.isTrue(nfa("01110"));
        });

        it('1^n | n is even or divisible by 3', function () {
            var language = {
                "states": ["q1", "q2", "q3", "q4", "q5", "q6"],
                "alphabets": ["1", "ε"],
                "transitionFunc": {
                    "q1": {"ε": ["q2", "q3"]},
                    "q2": {"1": ["q4"]},
                    "q3": {"1": ["q5"]},
                    "q4": {"1": ["q2"]},
                    "q5": {"1": ["q6"]},
                    "q6": {"1": ["q3"]},
                },
                "initialState": "q1",
                "finalStates": ["q2", "q3"]

            };
            var nfa = nfa_generator(language);
            assert.isTrue(nfa("11"));
            assert.isTrue(nfa("1111"));
            assert.isFalse(nfa("11111"));
        });


    });
});