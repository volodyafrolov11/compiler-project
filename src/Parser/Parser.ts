import Token from "../Token/Token";
import {
    AssignmentNode, BinaryExpressionNode, ConstantNode,
    ExpressionNode,
    IdentifierNode, ParenthesizedExpressionNode,
    ProgramNode,
    StatementNode, UnaryExpressionNode,
    VariableDeclarationNode, WriteStatementNode
} from "./AST/ASTNodes";
import {TokenTypeName} from "../Token/TokenType";

export class Parser {
    private tokens: Token[];
    private currentTokenIndex: number = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    parse(): ProgramNode {
        const declarations = this.parseDeclarations();
        const statements = this.parseStatements();
        return new ProgramNode(declarations, statements);
    }

    private parseDeclarations(): VariableDeclarationNode[] {
        const declarations: VariableDeclarationNode[] = [];
        while (this.getCurrentToken().type.name === 'INT') {
            declarations.push(this.parseVariableDeclaration());
        }
        return declarations;
    }

    private parseVariableDeclaration(): VariableDeclarationNode {
        this.match("INT");
        const variables = this.parseIdentifierList();
        this.match("SEMICOLON");
        return new VariableDeclarationNode(variables);
    }

    private parseIdentifierList(): IdentifierNode[] {
        const identifiers: IdentifierNode[] = [];
        identifiers.push(this.parseIdentifier());
        while (this.getCurrentToken().type.name === "COMMA") {
            this.match("COMMA");
            identifiers.push(this.parseIdentifier());
        }
        return identifiers;
    }

    private parseIdentifier(): IdentifierNode {
        const currentToken = this.getCurrentToken();
        this.match("VARIABLE");
        return new IdentifierNode(currentToken.text);
    }

    private parseStatements(): StatementNode[] {
        const statements: StatementNode[] = [];
        this.match("BEGIN");
        while (this.getCurrentToken().type.name !== "END") {
            statements.push(this.parseStatement());
        }
        this.match("END");
        return statements;
    }

    private parseStatement(): StatementNode {
        switch (this.getCurrentToken().type.name) {
            case "INT":
                return this.parseVariableDeclaration();
            case "VARIABLE":
                return this.parseAssignment();
            case "WRITE":
                return this.parseWriteStatement(); // ЕСЛИ ЧТО УДАЛИИИИИИИТЬ КЕЙС ЭТОТ И ВСЕ!!!
            default:
                throw new Error(`Неожиданный токен: ${this.getCurrentToken().type.name}`);
        }
    }


    private parseWriteStatement(): WriteStatementNode {
        this.match("WRITE");
        const expression = this.parseExpression();
        this.match("SEMICOLON");
        return new WriteStatementNode(new UnaryExpressionNode("WRITE", expression));
    }

    private parseAssignment(): AssignmentNode {
        const identifier = this.parseIdentifier();
        this.match("ASSIGN_OPERATOR");
        const expression = this.parseExpression();
        this.match("SEMICOLON");
        return new AssignmentNode(identifier, expression);
    }

    private parseExpression(): ExpressionNode {
        const term = this.parseTerm();
        if(this.getCurrentToken().type.name === "PLUS_OPERATOR" || this.getCurrentToken().type.name === "MINUS_OPERATOR") {
            const operator = this.getCurrentToken().type.name;
            this.match(operator);
            const nextTerm = this.parseTerm();
            return new BinaryExpressionNode(operator, term, nextTerm);
        } else {
            return term;
        }
    }

    private parseTerm(): ExpressionNode {
        const factor = this.parseFactor();
        if(this.getCurrentToken().type.name === "MULTIPLY_OPERATOR" || this.getCurrentToken().type.name === "DIVISION_OPERATOR") {
            const operator = this.getCurrentToken().type.name;
            this.match(operator);
            const term = this.parseTerm();
            return new BinaryExpressionNode(operator, factor, term);
        } else {
            return factor;
        }
    }

    private parseFactor(): ExpressionNode {
        switch (this.getCurrentToken().type.name) {
            case "L_PARENTHESIS":
                this.match("L_PARENTHESIS");
                const expression = this.parseExpression();
                this.match("R_PARENTHESIS");
                return new ParenthesizedExpressionNode(expression);
            case "MINUS_OPERATOR":
                this.match("MINUS_OPERATOR");
                return new UnaryExpressionNode("MINUS_OPERATOR", this.parseFactor());
            case "VARIABLE":
                return this.parseIdentifier();
            case "NUMBER":
                return this.parseConstant();
            default:
                throw new Error(`Неожиданный токен: ${this.getCurrentToken().type.name}`);
        }
    }


    private parseConstant(): ConstantNode {
        const currentToken = this.getCurrentToken();
        this.match("NUMBER");
        return new ConstantNode(currentToken.text);
    }

    private getCurrentToken(): Token {
        return this.tokens[this.currentTokenIndex];
    }

    private match(expectedType: TokenTypeName) {
        const currentToken = this.getCurrentToken();
        if(currentToken.type.name === expectedType) {
            this.currentTokenIndex++;
        } else {
            throw new Error(`Ожидалось ${expectedType}, но было получено ${currentToken.type.name}`);
        }
    }
}