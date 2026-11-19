import { Lexer } from "./calculator/Lexer.js";
import { Parsee } from "./calculator/Parser.js";

const token = Lexer.tokenizar("10 ^")
console.log(token)
if (token){
    const parsee = new Parsee(token)
    const tree = parsee.parse()
    console.dir(tree, {depth: null})
} else 
    console.log("Erro")