var assert = require('chai').assert;
var nfa_generator = require('../src/nfa_generator.js').nfa_generator;

describe('nfa-test', function () {
    describe('Language w | w is the string that ends with 101', function () {
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
        it("should fail for empty string", function () {
            assert.notOk(nfa(""));
        });
        it("should fail for 01", function () {
            assert.notOk(nfa("01"));
        });
        it("should pass for 101", function () {
            assert.ok(nfa("101"));
        });
        it("should pass for 0101", function () {
            assert.ok(nfa("0101"));
        });
        it("should pass for 1101", function () {
            assert.ok(nfa("1101"));
        });
    });

    describe('Language w | w is the string containing with an even number of 1s or even number of 0s', function () {
        var language = {
            states: ["q1", "q2", "q3", "q4", "q5"],
            alphabets: ["1", "0"],
            transitionFunc: {
                "q1": {"e": ["q2", "q4"]},
                "q2": {"0": ["q3"], "1": ["q2"]},
                "q3": {"0": ["q2"], "1": ["q3"]},
                "q4": {"0": ["q4"], "1": ["q5"]},
                "q5": {"0": ["q5"], "1": ["q4"]}
            },
            initialState: "q1",
            finalStates: ["q2", "q4"]
        };
        var nfa = nfa_generator(language);

        it("should pass for 11", function () {
            assert.ok(nfa("11"))
        });
        it("should pass for 00", function () {
            assert.ok(nfa("00"))
        });
        it("should fail for 01", function () {
            assert.notOk(nfa("01"))
        });
    });

    describe('Language w | w is the string ending with 0', function () {
        var language = {
            "states": ["q1", "q2", "q3", "q4"],
            "alphabets": ["0", "1"],
            "transitionFunc": {
                "q1": {"e": ["q2"]},
                "q2": {"e": ["q3"]},
                "q3": {"0": ["q3", "q4"], "1": ["q3"]},
                "q4": {}
            },
            "initialState": "q1",
            "finalStates": ["q4"]

        };
        var nfa = nfa_generator(language);
        it("should pass for 00", function () {
            assert.ok(nfa("00"));
        });
        it("should pass for 01110", function () {
            assert.ok(nfa("01110"));
        });
        it("should fail for 11", function () {
            assert.notOk(nfa("11"));
        });
    });

    describe('Language a^n | n is even or divisible by 3', function () {
        var language = {
            "states": ["q1", "q2", "q3", "q4", "q5", "q6"],
            "alphabets": ["a"],
            "transitionFunc": {
                "q1": {"e": ["q2", "q3"]},
                "q2": {"a": ["q4"]},
                "q3": {"a": ["q5"]},
                "q4": {"a": ["q2"]},
                "q5": {"a": ["q6"]},
                "q6": {"a": ["q3"]},
            },
            "initialState": "q1",
            "finalStates": ["q2", "q3"]

        };
        var nfa = nfa_generator(language);
        it("should accept string aa", function () {
            assert.ok(nfa("aa"));
        });
        it("should accept string aaaa", function () {
            assert.ok(nfa("aaaa"));
        });
        it("should not accept string aaaaa", function () {
            assert.notOk(nfa("aaaaa"));
        });
    });

    describe('Language w | w is string with length divisible by 2', function () {
        var language = {
            states: ["q1", "q2", "q3"],
            alphabets: ['0', '1'],
            transitionFunc: {
                'q1': {0: ['q2'], 1: ['q2']},
                'q2': {0: ['q3'], 1: ['q3']},
                'q3': {0: ['q2'], 1: ['q2']}
            },
            initialState: "q1",
            finalStates: ['q1', 'q3']
        };
        var nfa = nfa_generator(language);

        it('should accept string 00', function () {
            assert.ok(nfa('00'));
        });
        it('should accept empty string', function () {
            assert.ok(nfa(''));
        });
        it('should accept even length of string', function () {
            assert.ok(nfa('010110'));
        });
        it('should not accept single character', function () {
            assert.notOk(nfa('0'));
        });
        it('should not accept odd length of character', function () {
            assert.notOk(nfa('10101'));
        });
    });

    describe('Language w | w is string with length divisible by 2 or 3', function () {
        var language = {
            states: ["q1", "q2", "q3", "q4", "q5", "q6"],
            alphabets: ['0', '1'],
            transitionFunc: {
                'q1': {0: ['q2', 'q3'], 1: ['q2', 'q3']},
                'q2': {0: ['q4'], 1: ['q4']},
                'q3': {0: ['q5'], 1: ['q5']},
                'q4': {0: ['q2'], 1: ['q2']},
                'q5': {0: ['q6'], 1: ['q6']},
                'q6': {0: ['q3'], 1: ['q3']}
            },
            initialState: "q1",
            finalStates: ['q1', 'q4', 'q6']
        };
        var nfa = nfa_generator(language);

        it('should accept string with length 2', function () {
            assert.ok(nfa('00'));
        });
        it('should accept string with length 3', function () {
            assert.ok(nfa('010'));
        });
        it('should accept empty string', function () {
            assert.ok(nfa(''));
        });
        it('should accept string with length divisible by both 2 & 3', function () {
            assert.ok(nfa('101010'));
        });
        it('should not accept string with length neither divisible by 2 nor 3', function () {
            assert.notOk(nfa('1'));
            assert.notOk(nfa('10101'));
        });
    });

    describe('Language w | w is string with length divisible by 2 or 3 with epsilon in middle', function () {
        var language = {
            states: ["q1", "q2", "q3", "q4", "q5", "q6"],
            alphabets: ['0', '1'],
            transitionFunc: {
                'q1': {'e': ['q2', 'q3']},
                'q2': {0: ['q4'], 1: ['q4']},
                'q3': {0: ['q5'], 1: ['q5']},
                'q4': {0: ['q2'], 1: ['q2']},
                'q5': {0: ['q6'], 1: ['q6']},
                'q6': {0: ['q3'], 1: ['q3']}
            },
            initialState: "q1",
            finalStates: ['q2', 'q3']
        };
        var nfa = nfa_generator(language);

        it('should accept string with length 2', function () {
            assert.ok(nfa('00'));
        });
        it('should accept string with length 3', function () {
            assert.ok(nfa('010'));
        });
        it('should accept empty string', function () {
            assert.ok(nfa(''));
        });
        it('should accept string with length divisible by both 2 & 3', function () {
            assert.ok(nfa('101010'));
        });
        it('should not accept string with length neither divisible by 2 nor 3', function () {
            assert.notOk(nfa('1'));
            assert.notOk(nfa('10101'));
        });
    });

    describe('Language w | w is string with length divisible by 2 or 3 with epsilon at last', function () {
        var language = {
            states: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"],
            alphabets: ['0', '1'],
            transitionFunc: {
                'q1': {0: ['q2', 'q3'], 1: ['q2', 'q3']},
                'q2': {0: ['q4'], 1: ['q4']},
                'q3': {0: ['q5'], 1: ['q5']},
                'q4': {0: ['q2', 'q7'], 1: ['q2'], 'e': ['q8']},
                'q5': {0: ['q6'], 1: ['q6']},
                'q6': {0: ['q3'], 1: ['q3'], 'e': ['q9', 'q10']},
                'q7': {}, 'q8': {}, 'q9': {}, 'q10': {}
            },
            initialState: "q1",
            finalStates: ['q1', 'q8', 'q9', 'q10']
        };
        var nfa = nfa_generator(language);

        it('should accept string with length 2', function () {
            assert.ok(nfa('00'));
        });
        it('should accept string with length 3', function () {
            assert.ok(nfa('010'));
        });
        it('should accept empty string', function () {
            assert.ok(nfa(''));
        });
        it('should accept string with length divisible by both 2 & 3', function () {
            assert.ok(nfa('101010'));
        });
        it('should not accept string with length neither divisible by 2 nor 3', function () {
            assert.notOk(nfa('1'));
            assert.notOk(nfa('10101'));
        });
    });

    describe('Language w | w is string which accepts only one 1 and any number of 0s', function () {
        var language = {
            states: ["q1", "q2", "q3", "q4", "q5"],
            alphabets: ['1', '0'],
            transitionFunc: {
                'q1': {'e': ['q2'], '0': ['q1']},
                'q2': {'e': ['q3'], '0': ['q2']},
                'q3': {'1': ['q4'], '0': ['q3']},
                'q4': {'e': ['q5'], '0': ['q4']},
                'q5': {}
            },
            initialState: "q1",
            finalStates: ['q5']
        };
        var nfa = nfa_generator(language);

        it('should accept string containing atmost one 1', function () {
            assert.ok(nfa('01'));
            assert.ok(nfa('1'));
        });

        it('should not accept string containing more than one 1', function () {
            assert.notOk(nfa('000000000011'));
        });

    });

    describe('Language w | w is string that satisfies (aaa)* ∪ b(ab)*', function () {
        var language = {
            states: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15"],
            alphabets: ['a', 'b'],
            transitionFunc: {
                'q1': {'e': ['q2', 'q9']},
                'q2': {'e': ['q3']},
                'q3': {'a': ['q4']},
                'q4': {'e': ['q5']},
                'q5': {'a': ['q6']},
                'q6': {'e': ['q7']},
                'q7': {'a': ['q8']},
                'q8': {'e': ['q3']},
                'q9': {'b': ['q10']},
                'q10': {'e': ['q11']},
                'q11': {'e': ['q12']},
                'q12': {'a': ['q13']},
                'q13': {'e': ['q14']},
                'q14': {'b': ['q15']},
                'q15': {'e': ['q12']}
            },
            initialState: "q1",
            finalStates: ['q2', 'q8', 'q11', 'q15']
        };
        var nfa = nfa_generator(language);

        it('should accept empty string', function () {
            assert.ok(nfa(''));
        });
        it('should accept b', function () {
            assert.ok(nfa('b'));
        });
        it('should accept any number of aaa (triple a)', function () {
            assert.ok(nfa('aaa'));
            assert.ok(nfa('aaaaaaaaa'));
        });
        it('should accept b followed by any number of ab', function () {
            assert.ok(nfa("bab"));
            assert.ok(nfa("babababab"));
        });
        it('should not accept string with number of a not divisible by 3 ', function () {
            assert.notOk(nfa('aaaaaaa'));
        });
        it('should not accept string b not followed by ab', function () {
            assert.notOk(nfa('baba'));
        });
        it('should not accept string aaa followed by ab or b', function () {
            assert.notOk(nfa('aaaab'));
            assert.notOk(nfa('aaab'));
        });

    });

    describe('Language w | w is string that satisfies (ab ∪ ba)*', function () {
        var language = {
            states: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"],
            alphabets: ['a', 'b'],
            transitionFunc: {
                'q1': {'e': ['q2']},
                'q2': {'e': ['q3', 'q7']},
                'q3': {'a': ['q4']},
                'q4': {'e': ['q5']},
                'q5': {'b': ['q6']},
                'q6': {'e': ['q2']},
                'q7': {'b': ['q8']},
                'q8': {'e': ['q9']},
                'q9': {'a': ['q10']},
                'q10': {'e': ['q2']}
            },
            initialState: "q1",
            finalStates: ['q1', 'q6', 'q10']
        };
        var nfa = nfa_generator(language);

        it('should accept empty string', function () {
            assert.ok(nfa(''));
        });
        it('should accept ab', function () {
            assert.ok(nfa('ab'));
        });
        it('should accept ba', function () {
            assert.ok(nfa('ba'));
        });
        it('should accept alternate ab combination', function () {
            assert.ok(nfa('ababababab'));
        });
        it('should accept alternate ba combination', function () {
            assert.ok(nfa("babababa"));
        });
        it('should not accept only one character', function () {
            assert.notOk(nfa('aaaaaaaaa'));
        });
    });

    describe('language w | w is the string that satisfies (0*1* ∪ 1*0*) | 2 level e', function () {
        var language = {
            states: ["q1", "q3", "q2", "q5", "q4", "q6", "q7"],
            alphabets: ["1", "0"],
            transitionFunc: {
                "q1": {"e": ["q2", "q4"]},
                "q2": {"0": ["q2"], "e": ["q3"]},
                "q3": {"1": ["q3"]},
                "q4": {"1": ["q4"], "e": ["q5"]},
                "q5": {"0": ["q5"]}
            },
            initialState: "q1",
            finalStates: ["q3", "q5"]
        };
        var nfa = nfa_generator(language);

        it('should accept empty string', function () {
            assert.ok(nfa(''));
        });
        it('should accept 1 or 0', function () {
            assert.ok(nfa('1'));
            assert.ok(nfa('0'));
        });
        it('should accept 00 0r 11', function () {
            assert.ok(nfa('00'));
            assert.ok(nfa('11'));
        });
        it('should accept any number of 1s after any number of 0s', function () {
            assert.ok(nfa('110'));
            assert.ok(nfa("1100"));
            assert.ok(nfa('100'));
        });
        it('should accept any number of 1s after any number of 0s', function () {
            assert.ok(nfa('001'));
            assert.ok(nfa("0011"));
        });
        it('should not accept string starting and ending with same alhabet', function () {
            assert.notOk(nfa('101'));
            assert.notOk(nfa('010'));
            assert.notOk(nfa("00110"));
            assert.notOk(nfa("11001"));
        });
        it('should not accept string where neither all 1s are followed by 0s nor all 0s followed by 1s ', function () {
            assert.notOk(nfa('101'));
            assert.notOk(nfa('010'));
            assert.notOk(nfa("00110"));
            assert.notOk(nfa("11001"));
        });
    });

    describe('language w | w is the string that satisfies (0*1* ∪ 1*0*) | 3 level of e', function () {
        var language = {
            states: ["q1", "q3", "q2", "q5", "q4", "q6", "q7"],
            alphabets: ["1", "0"],
            transitionFunc: {
                "q1": {"e": ["q2", "q4"]},
                "q2": {"0": ["q2"], "e": ["q3"]},
                "q3": {"1": ["q3"], "e": ["q6"]},
                "q4": {"1": ["q4"], "e": ["q5"]},
                "q5": {"0": ["q5"], "e": ["q7"]}
            },
            initialState: "q1",
            finalStates: ["q6", "q7"]
        };
        var nfa = nfa_generator(language);

        it('should accept empty string', function () {
            assert.ok(nfa(''));
        });
        it('should accept 1 or 0', function () {
            assert.ok(nfa('1'));
            assert.ok(nfa('0'));
        });
        it('should accept 00 0r 11', function () {
            assert.ok(nfa('00'));
            assert.ok(nfa('11'));
        });
        it('should accept any number of 1s after any number of 0s', function () {
            assert.ok(nfa('110'));
            assert.ok(nfa("1100"));
            assert.ok(nfa('100'));
        });
        it('should accept any number of 1s after any number of 0s', function () {
            assert.ok(nfa('001'));
            assert.ok(nfa("0011"));
        });
        it('should not accept string starting and ending with same alhabet', function () {
            assert.notOk(nfa('101'));
            assert.notOk(nfa('010'));
            assert.notOk(nfa("00110"));
            assert.notOk(nfa("11001"));
        });
        it('should not accept string where neither all 1s are followed by 0s nor all 0s followed by 1s ', function () {
            assert.notOk(nfa('101'));
            assert.notOk(nfa('010'));
            assert.notOk(nfa("00110"));
            assert.notOk(nfa("11001"));
        });
    });

    describe('Language w | w is string that satisfies (ab)*(ba)* U aa*', function () {
        var language = {
            states: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"],
            alphabets: ['a', 'b'],
            transitionFunc: {
                'q1': {'e': ['q2', 'q4']},
                'q2': {'a': ['q3']},
                'q3': {'a': ['q3']},
                'q4': {'a': ['q5'], 'e': ['q6']},
                'q5': {'b': ['q6']},
                'q6': {'e': ['q4', 'q7']},
                'q7': {'b': ['q8'], 'e': ['q9']},
                'q8': {'a': ['q9']},
                'q9': {'e': ['q7']}
            },
            initialState: "q1",
            finalStates: ['q3', 'q6', 'q9']
        };
        var nfa = nfa_generator(language);

        it("should accept ", function () {
            assert.ok(nfa("a"));
            assert.ok(nfa("aaa"));
            assert.ok(nfa("ab"));
            assert.ok(nfa("ba"));
            assert.ok(nfa("abba"));
        });
        it("should pass for", function () {
            assert.notOk(nfa("b"));
            assert.notOk(nfa("bb"));
            assert.notOk(nfa("bbb"));
            assert.notOk(nfa("bbab"));
            assert.notOk(nfa("abbb"));
        });
    });

    describe('Language w | w is string that satisfies [ab] U (a*b* U b*a*) | epsilon at end', function () {
        var language = {
            states: ["q1", "q2", "q3", "q4", "q5", "q6"],
            alphabets: ['a', 'b'],
            transitionFunc: {
                "q1": {"a": ["q2", "q4"], "b": ["q2", "q4"]},
                "q2": {"a": ["q2"], "e": ["q3"]},
                "q3": {"b": ["q3"], "e": ["q6"]},
                "q4": {"b": ["q4"], "e": ["q5"]},
                "q5": {"a": ["q5"], "e": ["q6"]}
            },
            initialState: "q1",
            finalStates: ['q6']
        };
        var nfa = nfa_generator(language);

        it("should accept", function () {
            assert.ok(nfa("a"));
            assert.ok(nfa("b"));
            assert.ok(nfa("ab"));
            assert.ok(nfa("aa"));
            assert.ok(nfa("ba"));
            assert.ok(nfa("bb"));
            assert.ok(nfa("abba"));
            assert.ok(nfa("aba"));
            assert.ok(nfa("baab"));
            assert.ok(nfa("abaa"));
            assert.ok(nfa("bab"));
            assert.ok(nfa("babb"));
            assert.ok(nfa("baabb"));
            assert.ok(nfa("abbaa"));
        });
        it("should not accept ", function () {
            assert.notOk(nfa(""));
            assert.notOk(nfa("abab"));
            assert.notOk(nfa("baba"));
            assert.notOk(nfa("bbaaba"));
            assert.notOk(nfa("aabbaa"));
        });
    });

});