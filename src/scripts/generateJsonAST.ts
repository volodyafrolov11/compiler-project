import fs from "fs";
import {ProgramNode} from "../Parser/AST/ASTNodes";

export function generateJsonAST(AST: ProgramNode, path: string, filename: string) {
    const jsonAST = JSON.stringify(AST, null, 4);
    fs.writeFileSync(`${path}/${filename}.json`, jsonAST);
}