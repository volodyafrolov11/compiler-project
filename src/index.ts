import path from "path";
import fs from "fs";
import {Lexer} from "./Lexer/Lexer";
import {Parser} from "./Parser/Parser";
import {generateJsonAST} from "./scripts/generateJsonAST";
import {generateJsonTokens} from "./scripts/generateJsonTokens";
import {generateHtmlAST} from "./scripts/generateHtmlAST";

// const codeFile = path.resolve(__dirname, 'code.frol');
// const code = fs.readFileSync(codeFile, 'utf-8');

// development feature
const code = 'Int x, y;\n' +
    '\n' +
    'Begin\n' +
    '    x := 5;\n' +
    '    y := 3;\n' +
    '    Int result;\n' +
    '    result := (x + 5) / -2;\n' +
    '    Write result;\n' +
    'End';

const lexer = new Lexer(code);
const tokenList = lexer.analysisHandler();

const parser = new Parser(tokenList);
const ast = parser.parse();

const jsonTokensReportPath = path.resolve(__dirname, 'reports')
generateJsonTokens(tokenList, jsonTokensReportPath, 'tokens')

const jsonASTReportPath = path.resolve(__dirname, 'reports');
generateJsonAST(ast, jsonASTReportPath, 'ast');

const htmlASTReportPath = path.resolve(__dirname, 'reports');
generateHtmlAST(ast, htmlASTReportPath, 'ast');


