var ohm = require('ohm-js');

const grammar = `
myGrammar {
    EXP = AND_EXP | VAR
    AND_EXP = EXP AND EXP
    VAR = ID DOT ID
    ID = (UNDERSCORE | LETTER) (UNDERSCORE | LETTER | NUMBER)*
    NUMBER = digit+
    LETTER = "A".."z"
    UNDERSCORE = "_"
    DOT = "."
    AND = "&&"
}`;

var dict = {};

var actions = {
    EXP: function(expr) {
        expr.eval();
    },
    AND_EXP: function(expr1, _, expr2) {
        expr1.eval();
        expr2.eval();
    },
    VAR: function(database, _, column) {
        console.log(database.sourceString, column.sourceString);
        if (dict[database.sourceString]) {
            dict[database.sourceString].push(column.sourceString);
        } else {
            dict[database.sourceString] = [column.sourceString];
        }
    },
};

var grammar0 = ohm.grammar(grammar);

var semantics = grammar0.createSemantics();

semantics.addOperation('eval', actions);

module.exports = { 
    evaluate: function (input) {
        var matchResult = grammar0.match(input);
        return matchResult.succeeded();
    },
    query: function (input) {
        var matchResult = grammar0.match(input);
        var adapter = semantics(matchResult);
        dict = {};
        adapter.eval();
        return dict;
    }
};