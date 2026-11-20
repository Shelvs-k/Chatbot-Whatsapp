import { Lexer } from "./calculator/Lexer.js";
import { Parsee } from "./calculator/Parser.js";
import { Evaluator } from "./calculator/Evaluator.js";

const token = Lexer.tokenizar("2.5 ^ 2.5 * 2")
if (token){
    const parsee = new Parsee(token)
    const tree = parsee.parse()
    console.log(Evaluator.avaliar(tree))
} else 
    console.log("Erro")