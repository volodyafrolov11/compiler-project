import Token from "../Token/Token";
import { tokenTypeList } from "../Token/TokenType";

export class Lexer {
    private code: string;
    private position: number = 0;
    private tokenList: Token[] = [];

    constructor(code: string) {
        this.code = code;
    };

    analysisHandler(): Token[] {
        while (this.checkNextToken()) {};
        this.tokenList = this.tokenList.filter(token => token.type.name !== tokenTypeList.SPACE.name);
        return this.tokenList
    };

    private checkNextToken(): boolean {
        if(this.position >= this.code.length) {
            return false;
        };

        const tokenTypeValues = Object.values(tokenTypeList);

        for (let i = 0; i < tokenTypeValues.length; i++) {
            const regex = new RegExp('^' + tokenTypeValues[i].regex);
            const result = this.code.substring(this.position).match(regex);
            if(result && result[0]) {
                const token = new Token(tokenTypeValues[i], result[0], this.position);
                this.position += result[0].length;
                this.tokenList.push(token);
                return true;
            }
        }

        console.log(this.code.substring(this.position));
        throw new Error(`На позиции ${this.position} обнаружена ошибка!`);
    };
};