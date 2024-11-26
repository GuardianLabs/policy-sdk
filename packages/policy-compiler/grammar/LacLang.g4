grammar LacLang;

program: statement* EOF;

statement
    : varDeclaration
    | constantDeclaration
    | artifactDeclaration
    | instanceDeclaration
    | evaluateStatement
    ;

varDeclaration
    : 'var' injectionModifier? dataType IDENTIFIER ';'
    ;

injectionModifier
    : 'inject' '(' STRING_LITERAL ')'
    ;

constantDeclaration
    : 'constant' dataType IDENTIFIER '=' literal ';'
    ;

// todo: maybe allow address reference?
artifactDeclaration
    : 'artifact' IDENTIFIER '=' ADDRESS_LITERAL ';'
    ;

instanceDeclaration
    : 'instance' dataType IDENTIFIER 'of' identifier_or_literal 'takes' '(' argumentsList? ')' ( 'with' '(' constantsList? ')' )? ';'
    ;

evaluateStatement
    : 'evaluate' IDENTIFIER ';'
    ;

dataType
    : 'bool'
    | 'number'
    | 'string'
    | 'bytes'
    | 'address'
    ;

constantsList : argumentsList;

argumentsList
    : identifier_or_literal (',' identifier_or_literal)*
    ;

identifier_or_literal : IDENTIFIER | literal;

literal
    : BOOL_LITERAL
    | NUMBER_LITERAL
    | STRING_LITERAL
    | BYTES_LITERAL
    | ADDRESS_LITERAL
    ;

ADDRESS_LITERAL
    : '0x' HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT
          HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT
          HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT
          HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT
          HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT
    ;

fragment HEX_DIGIT
    : [0-9a-fA-F]
    ;

BOOL_LITERAL
    : 'true' | 'false'
    ;

NUMBER_LITERAL
    : [0-9]+
    ;

STRING_LITERAL
    : '"' .*? '"'
    ;

BYTES_LITERAL
    : '\'' .*? '\''
    ;

IDENTIFIER
    : [a-zA-Z_][a-zA-Z_0-9]*
    ;

WHITESPACE
    : [ \t\r\n]+ -> skip
    ;

COMMENT
    : '//' ~[\r\n]* -> skip
    ;