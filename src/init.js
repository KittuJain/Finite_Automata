var dfa_generator =  require('./dfa_generator.js').dfa_generator;
var language = require('../dfa.json');

var dfa_for_strings_ending_with_1 = dfa_generator(language);

console.log(dfa_for_strings_ending_with_1('00'));