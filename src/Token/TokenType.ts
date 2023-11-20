export type TokenTypeName =
    'NUMBER' |
    'VARIABLE' |
    'SPACE' |
    'BEGIN' |
    'END' |
    'SEMICOLON' |
    'COMMA' |
    'ASSIGN_OPERATOR' |
    'L_PARENTHESIS' |
    'R_PARENTHESIS' |
    'MINUS_OPERATOR' |
    'PLUS_OPERATOR' |
    'MULTIPLY_OPERATOR' |
    'DIVISION_OPERATOR' |
    'INT' |
    'WRITE';

export interface TokenType {
    name: TokenTypeName;
    regex: string;
};

export const tokenTypeList: Record<TokenTypeName, TokenType> = {
    NUMBER: {
        name: 'NUMBER',
        regex: '[0-9]*',
    },
    VARIABLE: {
        name: 'VARIABLE',
        regex: '[a-z]*',
    },
    SPACE: {
        name: 'SPACE',
        regex: '[ \\n\\t\\r]*',
    },
    BEGIN: {
        name: 'BEGIN',
        regex: 'Begin',
    },
    END: {
        name: 'END',
        regex: 'End',
    },
    SEMICOLON: {
        name: 'SEMICOLON',
        regex: ';'
    },
    COMMA: {
        name: 'COMMA',
        regex: ',',
    },
    ASSIGN_OPERATOR: {
        name: 'ASSIGN_OPERATOR',
        regex: ':=',
    },
    L_PARENTHESIS: {
        name: 'L_PARENTHESIS',
        regex: '\\(',
    },
    R_PARENTHESIS: {
        name: 'R_PARENTHESIS',
        regex: '\\)',
    },
    PLUS_OPERATOR: {
        name: 'PLUS_OPERATOR',
        regex: '\\+',
    },
    MINUS_OPERATOR: {
        name: 'MINUS_OPERATOR',
        regex: '\\-',
    },
    MULTIPLY_OPERATOR: {
        name: 'MULTIPLY_OPERATOR',
        regex: '\\*',
    },
    DIVISION_OPERATOR: {
        name: 'DIVISION_OPERATOR',
        regex: '\\/',
    },
    INT: {
        name: 'INT',
        regex: 'Int',
    },
    WRITE: {
        name: 'WRITE',
        regex: 'Write',
    }
};