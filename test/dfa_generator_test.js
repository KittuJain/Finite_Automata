var assert = require('chai').assert;
var dfa_generator = require('../src/dfa_generator.js').dfa_generator;

describe('dfa-test', function () {
    it('should pass for any string', function () {
        var language = {
            "states": ["q1"],
            "alphabets": ["0", "1"],
            "transitionFunc": {
                "q1": {"0": "q1", "1": "q1"}
            },
            "initialState": "q1",
            "finalStates": ["q1"]
        };
        var dfa = dfa_generator(language);
        assert.isTrue(dfa(""));
        assert.isTrue(dfa("0"));
        assert.isTrue(dfa("1"));
        assert.isTrue(dfa("11"));
        assert.isTrue(dfa("10"));
    });

    it('should pass for at least one character', function () {
        var language = {
            "states": ["q1", "q2"],
            "alphabets": ["0", "1"],
            "transitionFunc": {
                "q1": {"0": "q2", "1": "q2"},
                "q2": {"0": "q2", "1": "q2"}
            },
            "initialState": "q1",
            "finalStates": ["q2"]
        };
        var dfa = dfa_generator(language);
        assert.isTrue(dfa("00"));
        assert.isTrue(dfa("10"));
        assert.isTrue(dfa("11"));
        assert.isTrue(dfa("111111"));
    });

    it('should pass for at least one 0', function () {
        var language = {
            "states": ["q1", "q2"],
            "alphabets": ["0", "1"],
            "transitionFunc": {
                "q1": {"0": "q2", "1": "q1"},
                "q2": {"0": "q2", "1": "q2"}
            },
            "initialState": "q1",
            "finalStates": ["q2"]
        };
        var dfa = dfa_generator(language);
        assert.isTrue(dfa("00"));
        assert.isTrue(dfa("10"));
        assert.isTrue(dfa("100011"));
        assert.isFalse(dfa("11"));
        assert.isFalse(dfa("111111"));
    });

    it('should pass for even number of 0s', function () {
        var language = {
            "states": ["q1", "q2"],
            "alphabets": ["0", "1"],
            "transitionFunc": {
                "q1": {0: "q2", 1: "q1"},
                "q2": {0: "q1", 1: "q2"}
            },
            "initialState": "q1",
            "finalStates": ["q1"]
        };
        var dfa = dfa_generator(language);
        assert.isTrue(dfa("00"));
        assert.isFalse(dfa("10"));
        assert.isFalse(dfa("100011"));
        assert.isTrue(dfa("1001010"));
    });

    it('should pass for strings ending with 1', function () {
        var language = {
            "states": ["q1", "q2"],
            "alphabets": ["0", "1"],
            "transitionFunc": {
                "q1": {0: "q2", 1: "q1"},
                "q2": {0: "q2", 1: "q1"}
            },
            "initialState": "q1",
            "finalStates": ["q1"]
        };
        var dfa = dfa_generator(language);
        assert.equal(dfa("00"), false);
        assert.equal(dfa("101"), true);
        assert.equal(dfa("10011"), true);
        assert.equal(dfa("1001010"), false);
    });

    it('should pass for strings whose lengths divisible by 2 or 3', function () {
        var language = {
            "states": ["q1", "q2", "q3", "q4", "q5", "q6"],
            "alphabets": ["0", "1"],
            "transitionFunc": {
                "q1": {0: "q2", 1: "q2"},
                "q2": {0: "q3", 1: "q3"},
                "q3": {0: "q4", 1: "q4"},
                "q4": {0: "q5", 1: "q5"},
                "q5": {0: "q6", 1: "q6"},
                "q6": {0: "q1", 1: "q1"}
            },
            "initialState": "q1",
            "finalStates": ["q1", "q3", "q4", "q5"]
        };
        var dfa = dfa_generator(language);
        assert.isFalse(dfa("1"));
        assert.isTrue(dfa("111"));
        assert.isTrue(dfa("1010"));
        assert.isFalse(dfa("10010"));
        assert.isTrue(dfa("111111"));
    });
});