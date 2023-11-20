import Token from "../Token/Token";
import fs from "fs";

export function generateJsonTokens(tokens: Token[], path: string, filename: string) {
    const jsonTokens = JSON.stringify(tokens, null, 4);
    fs.writeFileSync(`${path}/${filename}.json`, jsonTokens);
}