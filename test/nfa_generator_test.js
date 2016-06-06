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
                    "q3": {"1": ["q4"]}
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

        it('strings ending with exactly two 1s or even number of 1s', function () {
            var language = {
                states: ["q1", "q2", "q3", "q4", "q5", "q6"],
                alphabets: ["1", "0", "E"],
                transitionFunc: {
                    "q1": {"1": ["q2", "q4"], "E": ["q4"]},
                    "q2": {"1": ["q3"]},
                    "q4": {"0": ["q5"]},
                    "q5": {"0": ["q6"]}
                },
                initialState: "q1",
                finalStates: ["q3", "q6"]
            };
            var nfa = nfa_generator(language);
            assert.isFalse(nfa("01"));
            assert.isTrue(nfa("11"));
        });

    });
});