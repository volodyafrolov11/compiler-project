// ASTVisitor.ts
import {
    ProgramNode,
    VariableDeclarationNode,
    IdentifierNode,
    AssignmentNode,
    WriteStatementNode,
    UnaryExpressionNode,
    BinaryExpressionNode,
    ParenthesizedExpressionNode,
    ConstantNode,
} from "./ASTNodes";

export interface ASTVisitor {
    visitProgramNode(node: ProgramNode): void;
    visitVariableDeclarationNode(node: VariableDeclarationNode): void;
    visitIdentifierNode(node: IdentifierNode): void;
    visitAssignmentNode(node: AssignmentNode): void;
    visitWriteStatementNode(node: WriteStatementNode): void;
    visitUnaryExpressionNode(node: UnaryExpressionNode): void;
    visitBinaryExpressionNode(node: BinaryExpressionNode): void;
    visitParenthesizedExpressionNode(node: ParenthesizedExpressionNode): void;
    visitConstantNode(node: ConstantNode): void;
}