# Компилятор для собственного языка программирования

Проект посвящен Computer Science и представляет из себя написанный с использованием Typescript и Node.js компилятор для собственного языка программирования. Он включает в себя лексический анализатор (Лексер) и синтаксический анализатор (Парсер).

---
### БНФ языка:
```
<Программа> ::= <Объявление переменных> <Описание вычислений>
<Описание вычислений> ::= Begin <Список присваиваний> End
<Объявление переменных> ::=  Int <Список переменных> | Int  <Список переменных><Объявление переменных>
<Список переменных> ::= <Идент>; | <Идент> , <Список переменных>
<Список присваиваний>::= <Присваивание> | <Присваивание> <Список присваиваний>
<Присваивание> ::=<Идент> := <Выражение>;
<Выражение> ::= <Ун.оп.> <Подвыражение> | <Подвыражение>
<Подвыражение> ::= ( <Выражение> ) |  <Операнд> | <Подвыражение > <Бин.оп.> <Подвыражение>
<Ун.оп.> ::= "-"
<Бин.оп.> ::= "-"  | "+" | "*" | "/"
<Операнд> ::= <Идент>  | <Константа>
<Идент> ::= <Буква> <Идент> | <Буква>
<Константа> ::= <Цифра> <Константа> |  <Цифра>
<Оператор вывода> ::= Write <Идент> ";"
```

Переменные задаются повторяющимся набором символов латинского алфавита: [a-z]*; 

Значения переменных - целые числа от 0 до 9: [0-9]*.

---
### Пример кода по БНФ:
```
Int x, y;
Begin
    x := 5;
    y := 3;
    Int result;
    result := (x + 5) / 2;
    Write result;
End
```
---
## Лексер

[Лексер](src/Lexer/Lexer.ts) представляет из себя класс, экземпляр которого в конструкторе принимает исходный код. Данный класс содержит следующие методы:

- `analysisHandler` - выполняет лексический анализ, возвращая массив токенов;
- `checkNextToken` - проверяет следующий токен по регулярке и добавляет его в массив токенов.

---
## Парсер

[Парсер](src/Parser/Parser.ts) представляет из себя класс, экземпляр которого в конструкторе принимает массив токенов. Данный класс содержит следующие методы:

- `parse` - выполняет парсинг программы, возвращая объект, содержащий абстрактное синтаксическое дерево (тип: ProgramNode);
- `parseDeclarations` - выполняет парсинг объявления переменных оператором “Int”, возвращая соответствующий массив узлов AST-дерева типа VariableDeclarationNode;
- `parseVariableDeclaration` - выполняет парсинг конкретной объявленной переменной, возвращая узел AST-дерева типа VariableDeclarationNode и определяя ее название со значением внутри объекта scope;
- `parseIdentifierList` - выполняет парсинг идентификаторов объявленных переменных, возвращая массив узлов AST-дерева типа IdentifierNode;
- `parseIdentifier` - выполняет парсинг конкретного идентификатора переменной, возвращая узел AST-дерева типа IdentifierNode;
- `parseStatements` - выполняет парсинг инструкций внутри тела программы (Begin … End), возвращая массив узлов AST-дерева типа StatementNode;
- `parseStatement` - выполняет парсинг инструкции (объявление переменных, присвоение значения, вывод в консоль), возвращая узел AST-дерева типа StatementNode;
- `parseWriteStatement` - выполняет парсинг унарного оператора “Write” для вывода значения в консоль, возвращая узел AST-дерева типа WriteStatementNode;
- `parseAssignment` - выполняет парсинг оператора присвоения “=:”, возвращая узел AST-дерева типа AssingmentNode;
- `parseExpression` выполняет парсинг бинарного оператора выражения (формулы), возвращая при этом узел AST-дерева типа ExpressionNode;
- `parseTerm` и `parseFactor` нужны для раскрытия формулы с определенной вложенностью в необходимом порядке;
- `parseConstant` - выполняет парсинг целочисленного значения, возвращая при этом узел AST-дерева типа ConstantNode;
- `evaluateExpression` - решает выражение, возвращая число;
- `getCurrentToken` - возвращает текущий токен;
- `match` - проверяет текущий тип токена, инкрементируя позицию парсера на единицу.

Типы узлов абстрактного синтаксического дерева содержатся в файле [ASTNodes.ts](src/Parser/AST/ASTNodes.ts).

---
## Отчеты

Программа  содержит [скрипты](src/scripts), которые позволяют генерировать отчеты:
- JSON файл с массивом токенов исходного кода на созданном языке программирования, полученный в ходе лексического анализа ([generateJSONTokens.ts](src/scripts/generateJsonTokens.ts));
- JSON файл, содержащий объект абстрактного синтаксического дерева, полученный в ходе синтаксического анализа ([generateJSONAst.ts](src/scripts/generateJsonAST.ts)) ;
- HTML файл, предназначенный для визуализации абстрактного синтаксического дерева ([generateHtmlAST.ts](src/scripts/generateHtmlAST.ts)).

Отчеты сохраняются в папке [reports](src/reports)

---
## Скрипты

- `npm start` - Запуск комплилятора (в [папке](src) с иходным кодом должен быть файл содержащий конструкции на проектируемом языке программирования с расширением ".frol")
- `npm run start:dev` - Запуск компилятора в режиме разработчика с nodemon

---