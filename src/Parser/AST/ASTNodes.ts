export abstract class ASTNode {}

export class ProgramNode extends ASTNode {
    constructor(public declarations: VariableDeclarationNode[], public statements: StatementNode[]) {
        super();
    }
}

export class VariableDeclarationNode extends ASTNode {
    constructor(public variables: IdentifierNode[]) {
        super();
    }
}

export class IdentifierNode extends ASTNode {
    constructor(public name: string) {
        super();
    }
}

export abstract class StatementNode extends ASTNode {}

export class AssignmentNode extends StatementNode {
    constructor(public identifier: IdentifierNode, public expression: ExpressionNode) {
        super();
    }
}

export class WriteStatementNode extends StatementNode {
    constructor(public expression: ExpressionNode) {
        super();
    }
}

export abstract class ExpressionNode extends ASTNode {}

export class UnaryExpressionNode extends ExpressionNode {
    constructor(public operator: string, public operand: ExpressionNode) {
        super();
    }
}

export class BinaryExpressionNode extends ExpressionNode {
    constructor(public operator: string, public left: ExpressionNode, public right: ExpressionNode) {
        super();
    }
}

export class ParenthesizedExpressionNode extends ExpressionNode {
    constructor(public expression: ExpressionNode) {
        super();
    }
}

export class ConstantNode extends ExpressionNode {
    constructor(public value: string) {
        super();
    }
}


