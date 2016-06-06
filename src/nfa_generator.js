var _ = require('lodash');

exports.nfa_generator = function (language) {
  return function (inputString) {
      var alphabets = inputString.split('');
      var outputStates = alphabets.reduce(function (states, currentAlphabet) {
          return _.flatten(states.map(function (state) {
              return language.transitionFunc[state][currentAlphabet] || [];
          }));
      }, [language.initialState]);
      return _.intersection(language.finalStates, outputStates).length > 0;
  }
};