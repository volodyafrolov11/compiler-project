import * as fs from 'fs';

export function generateHtmlAST(ast: any, path: string, fileName: string): void {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>AST Visualization</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 20px;
                background-color: #f8f8f8;
            }
            h1 {
                color: #333;
            }
            ul {
                list-style-type: none;
                padding-left: 20px;
                border-left: 2px solid #555;
            }
            li {
                margin-bottom: 8px;
            }
            .ast-node {
                color: #333;
                font-weight: bold;
            }
            div {
                margin-left: 20px;
            }
        </style>
    </head>
    <body>
        <h1>Abstract Syntax Tree</h1>
        <div id="ast">${generateNodeHtml(ast)}</div>
    </body>
    </html>
    `;

    const filePath = `${path}/${fileName}.html`;

    fs.writeFileSync(filePath, htmlContent, 'utf-8');
    console.log(`HTML file with AST visualization generated: ${filePath}`);
}

function generateNodeHtml(node: any): string {
    if (node instanceof Array) {
        const childrenHtml = node.map(child => generateNodeHtml(child)).join('');
        return `<ul>${childrenHtml}</ul>`;
    } else if (node && typeof node === 'object') {
        const keys = Object.keys(node);
        const childrenHtml = keys.map(key => {
            return `<li><span class="ast-node">${key}</span>${generateNodeHtml(node[key])}</li>`;
        }).join('');
        return `<ul>${childrenHtml}</ul>`;
    } else {
        return `<div>${node}</div>`;
    }
}
