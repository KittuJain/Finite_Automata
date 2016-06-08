var assert = require('chai').assert;
var dfa_generator = require('../src/dfa_generator.js').dfa_generator;

describe('dfa-test', function () {
    describe('Language w | w is any string', function () {
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
        it("should pass for empty string", function () {
            assert.ok(dfa(""));
        });
        it("should pass for 0", function () {
            assert.ok(dfa("0"));
        });
        it("should pass for 1", function () {
            assert.ok(dfa("1"));
        });
        it("should pass for 11", function () {
            assert.ok(dfa("11"));
        });
    });

    describe('Language w | w is the string that contains at least one character', function () {
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
        it("should pass for string with length 1", function () {
            assert.ok(dfa("0"));
            assert.ok(dfa("1"));
        });
        it("should pass for string with length 2", function () {
            assert.ok(dfa("00"));
            assert.ok(dfa("10"));
            assert.ok(dfa("11"));
        });
        it("should fail for empty string", function () {
            assert.notOk(dfa(""));
        });

        it("should pass for string with bigger lengths", function () {
            assert.ok(dfa("111111"));
        });
    });

    describe('Language w | w is the string that contains at least one 0', function () {
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
        it("should pass for two 0s", function () {
            assert.ok(dfa("00"));
        });
        it("should pass for one 0", function () {
            assert.ok(dfa("10"));
        });
        it("should pass for three 0s", function () {
            assert.ok(dfa("100011"));
        });
        it("should not pass for strings not containing 0s", function () {
            assert.notOk(dfa("11"));
            assert.notOk(dfa("111111"));
        });
    });

    describe('Language w | w is the string containing even number of 0s', function () {
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
        it("should pass for two 0s", function () {
            assert.ok(dfa("00"));
        });
        it("should fail for one 0", function () {
            assert.notOk(dfa("10"));
        });
        it("should fail for three 0s", function () {
            assert.notOk(dfa("100011"));
        });
        it("should pass for four 0s", function () {
            assert.ok(dfa("1001010"));
        });
    });

    describe('Language w | w is the string ending with 1', function () {
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

        it("should fail for 00", function () {
            assert.notOk(dfa("00"));
        });
        it("should pass for 101", function () {
            assert.ok(dfa("101"));
        });
        it("should pass for 10011", function () {
            assert.ok(dfa("10011"));
        });
        it("should fail for 1001010", function () {
            assert.notOk(dfa("1001010"));
        });
    });

    describe('Language w | w is the string whose length is divisible by 2 or 3', function () {
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
        it("should pass for 111", function () {
            assert.ok(dfa("111"));
        });
        it("should pass for 1010", function () {
            assert.ok(dfa("1010"));
        });
        it("should fail for 1", function () {
            assert.notOk(dfa("1"));
        });
        it("should fail for 10010", function () {
            assert.notOk(dfa("10010"));
        });
        it("should pass for 111111", function () {
            assert.ok(dfa("111111"));
        });
    });
});