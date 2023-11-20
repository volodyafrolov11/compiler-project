import {ASTVisitor} from "./ASTVisitor";

export abstract class ASTNode {
    abstract accept(visitor: ASTVisitor): void;
}

export class ProgramNode extends ASTNode {
    constructor(public declarations: VariableDeclarationNode[], public statements: StatementNode[]) {
        super();
    }

    accept(visitor: ASTVisitor): void {
        visitor.visitProgramNode(this);
    }
}

export class VariableDeclarationNode extends ASTNode {
    constructor(public type: string, public variables: IdentifierNode[]) {
        super();
    }

    accept(visitor: ASTVisitor): void {
        visitor.visitVariableDeclarationNode(this);
    }
}

export class IdentifierNode extends ASTNode {
    constructor(public name: string) {
        super();
    }

    accept(visitor: ASTVisitor): void {
        visitor.visitIdentifierNode(this);
    }
}

export abstract class StatementNode extends ASTNode {}

export class AssignmentNode extends StatementNode {
    constructor(public identifier: IdentifierNode, public expression: ExpressionNode) {
        super();
    }

    accept(visitor: ASTVisitor): void {
        visitor.visitAssignmentNode(this);
    }
}

export class WriteStatementNode extends StatementNode {
    constructor(public expression: ExpressionNode) {
        super();
    }

    accept(visitor: ASTVisitor): void {
        visitor.visitWriteStatementNode(this);
    }
}

export abstract class ExpressionNode extends ASTNode {}

export class UnaryExpressionNode extends ExpressionNode {
    constructor(public operator: string, public operand: ExpressionNode) {
        super();
    }

    accept(visitor: ASTVisitor): void {
        visitor.visitUnaryExpressionNode(this);
    }
}

export class BinaryExpressionNode extends ExpressionNode {
    constructor(public operator: string, public left: ExpressionNode, public right: ExpressionNode) {
        super();
    }

    accept(visitor: ASTVisitor): void {
        visitor.visitBinaryExpressionNode(this);
    }
}

export class ParenthesizedExpressionNode extends ExpressionNode {
    constructor(public expression: ExpressionNode) {
        super();
    }

    accept(visitor: ASTVisitor): void {
        visitor.visitParenthesizedExpressionNode(this);
    }
}

export class ConstantNode extends ExpressionNode {
    constructor(public value: string) {
        super();
    }

    accept(visitor: ASTVisitor): void {
        visitor.visitConstantNode(this);
    }
}


