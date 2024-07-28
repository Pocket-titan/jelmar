import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t, styleTags } from "@lezer/highlight";

export const syntaxColors = syntaxHighlighting(
  HighlightStyle.define(
    [
      { tag: t.name, class: "tok-name" },
      { tag: t.variableName, class: "tok-variableName" },
      { tag: t.propertyName, class: "tok-propertyName" },
      {
        tag: t.definition(t.variableName),
        class: "tok-definition tok-variableName",
      },
      { tag: t.comment, class: "tok-comment" },
      { tag: t.atom, class: "tok-atom" },

      { tag: t.literal, class: "tok-literal" },
      { tag: t.number, class: "tok-number" },
      { tag: t.unit, class: "tok-unit" },
      { tag: t.typeName, class: "tok-typeName" },
      { tag: t.null, class: "tok-null" },

      { tag: t.tagName, class: "tok-tagName" },

      { tag: [t.keyword, t.controlKeyword], class: "tok-keyword" },
      { tag: t.punctuation, class: "tok-punctuation" },
      { tag: t.derefOperator },
      { tag: t.definition(t.className), class: "tok-className" },
      { tag: t.bool, class: "tok-bool" },

      {
        tag: [t.function(t.variableName), t.function(t.propertyName)],
        class: "tok-function",
      },
      {
        tag: t.function(t.definition(t.variableName)),
        class: "tok-definition tok-function",
      },
      { tag: t.definition(t.moduleKeyword), class: "tok-importName" },

      { tag: t.operator, class: "tok-operator" },
      { tag: t.self, class: "tok-self" },
      { tag: t.function(t.punctuation), class: "tok-punctuation" },
      { tag: t.special(t.logicOperator), class: "tok-logicOperator" },
      { tag: t.moduleKeyword, class: "tok-moduleKeyword tok-keyword" },
      { tag: t.controlOperator, class: "tok-controlOperator" },

      { tag: t.special(t.variableName), class: "tok-builtIn tok-variableName" },
    ]
    // { all: { color: "var(--mono-1)" } }
  )
);

export const pythonHighlighting = styleTags({
  'async "*" "**" FormatConversion FormatSpec': t.modifier,
  "for while if elif else try except finally return raise break continue with pass assert await yield match case":
    t.controlKeyword,
  "in not and or is del": t.operatorKeyword,
  "from def class global nonlocal lambda": t.definitionKeyword,
  import: t.moduleKeyword,
  "with as print": t.keyword,
  Boolean: t.bool,
  None: t.null,
  VariableName: t.variableName,

  "TypeDef/VariableName TypeDef/MemberExpression/VariableName TypeDef/None":
    t.typeName,
  "CallExpression/VariableName": t.function(t.variableName),
  "FunctionDefinition/VariableName": t.definition(t.function(t.variableName)),
  "ClassDefinition/VariableName": t.definition(t.className),
  // "ImportStatement/VariableName": t.definition(t.moduleKeyword),

  PropertyName: t.propertyName,
  "CallExpression/MemberExpression/PropertyName": t.function(t.propertyName),
  Comment: t.lineComment,
  Number: t.number,
  String: t.string,
  FormatString: t.special(t.string),
  UpdateOp: t.updateOperator,
  "ArithOp!": t.arithmeticOperator,
  BitOp: t.bitwiseOperator,
  CompareOp: t.compareOperator,
  AssignOp: t.definitionOperator,
  Ellipsis: t.punctuation,
  At: t.meta,
  "( )": t.paren,
  "[ ]": t.squareBracket,
  "{ }": t.brace,
  ".": t.derefOperator,
  ", ;": t.separator,

  "int float range": t.special(t.variableName),
});

export const jsHighlighting = styleTags({
  "get set async static": t.modifier,
  "for while do if else switch try catch finally return throw break continue default case":
    t.controlKeyword,
  "in of await yield void typeof delete instanceof": t.operatorKeyword,
  "let var const using function class extends": t.definitionKeyword,
  "import export from": t.moduleKeyword,
  "with debugger as new": t.keyword,
  TemplateString: t.special(t.string),
  super: t.atom,
  BooleanLiteral: t.bool,
  this: t.self,
  null: t.null,
  Star: t.modifier,
  VariableName: t.variableName,
  "CallExpression/VariableName TaggedTemplateExpression/VariableName":
    t.function(t.variableName),
  VariableDefinition: t.definition(t.variableName),
  Label: t.labelName,
  PropertyName: t.propertyName,
  PrivatePropertyName: t.special(t.propertyName),
  "CallExpression/MemberExpression/PropertyName": t.function(t.propertyName),
  "FunctionDeclaration/VariableDefinition": t.function(
    t.definition(t.variableName)
  ),
  "ClassDeclaration/VariableDefinition": t.definition(t.className),
  PropertyDefinition: t.definition(t.propertyName),
  PrivatePropertyDefinition: t.definition(t.special(t.propertyName)),
  UpdateOp: t.updateOperator,
  "LineComment Hashbang": t.lineComment,
  BlockComment: t.blockComment,
  Number: t.number,
  String: t.string,
  Escape: t.escape,
  ArithOp: t.arithmeticOperator,
  LogicOp: t.logicOperator,
  BitOp: t.bitwiseOperator,
  CompareOp: t.compareOperator,
  RegExp: t.regexp,
  Equals: t.definitionOperator,
  Arrow: t.function(t.punctuation),
  ": Spread": t.punctuation,
  "( )": t.paren,
  "[ ]": t.squareBracket,
  "{ }": t.brace,
  "InterpolationStart InterpolationEnd": t.special(t.brace),
  ".": t.derefOperator,
  ", ;": t.separator,
  "@": t.meta,

  TypeName: t.typeName,
  TypeDefinition: t.definition(t.typeName),
  "type enum interface implements namespace module declare":
    t.definitionKeyword,
  "abstract global Privacy readonly override": t.modifier,
  "is keyof unique infer": t.operatorKeyword,

  JSXAttributeValue: t.attributeValue,
  JSXText: t.content,
  "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": t.angleBracket,
  "JSXIdentifier JSXNameSpacedName": t.tagName,
  "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": t.attributeName,
  "JSXBuiltin/JSXIdentifier": t.standard(t.tagName),

  // Own additions
  "PatternProperty/VariableDefinition": t.propertyName,
});

export const rustHighlighting = styleTags({
  "const macro_rules struct union enum type fn impl trait let static":
    t.definitionKeyword,
  "mod use crate": t.moduleKeyword,
  "pub unsafe async mut extern default move": t.modifier,
  "for if else loop while match continue break return await": t.controlKeyword,
  "as in ref": t.operatorKeyword,
  "where _ crate super dyn": t.keyword,
  self: t.self,
  String: t.string,
  Char: t.character,
  RawString: t.special(t.string),
  Boolean: t.bool,
  Identifier: t.variableName,
  "CallExpression/Identifier": t.function(t.variableName),
  BoundIdentifier: t.definition(t.variableName),
  "FunctionItem/BoundIdentifier": t.function(t.definition(t.variableName)),
  LoopLabel: t.labelName,
  FieldIdentifier: t.propertyName,
  "CallExpression/FieldExpression/FieldIdentifier": t.function(t.propertyName),
  Lifetime: t.special(t.variableName),
  ScopeIdentifier: t.namespace,
  TypeIdentifier: t.typeName,
  "MacroInvocation/Identifier MacroInvocation/ScopedIdentifier/Identifier":
    t.macroName,
  "MacroInvocation/TypeIdentifier MacroInvocation/ScopedIdentifier/TypeIdentifier":
    t.macroName,
  '"!"': t.macroName,
  UpdateOp: t.updateOperator,
  LineComment: t.lineComment,
  BlockComment: t.blockComment,
  Integer: t.integer,
  Float: t.float,
  ArithOp: t.arithmeticOperator,
  LogicOp: t.logicOperator,
  BitOp: t.bitwiseOperator,
  CompareOp: t.compareOperator,
  "=": t.definitionOperator,
  ".. ... => ->": t.punctuation,
  "( )": t.paren,
  "[ ]": t.squareBracket,
  "{ }": t.brace,
  ". DerefOp": t.derefOperator,
  "&": t.operator,
  ", ; ::": t.separator,
  "Attribute/...": t.meta,
});
