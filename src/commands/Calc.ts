import { Evaluator } from "../calculator/Evaluator.js";
import { Lexer } from "../calculator/Lexer.js";
import { Parsee } from "../calculator/Parser.js";
import type { Comando } from "./Comando.js";
import type { ContextoComando } from "./ContextoComando.js";

class Calc implements Comando {
    nome: string;
    alias: string[];
    descricao: string;
    uso: string;
    exemplos: string[];

    constructor () {
        this.nome = "calc"
        this.alias = ["calculadora", "calcular", "equação"]
        this.descricao = "Realiza uma operação matemática simples"
        this.uso = "/calc <num1> (+, -, /, *, ^) [num2] (+, -, /, *, ^) [num3] ..."
        this.exemplos = ["/calc 5 + 3", "/calc 4 * 3^2 + 2", "/calc (80 - 30) * 2"]
    }

    public async executar(argumentos: string[], contexto: ContextoComando): Promise<string> {
        let mensagem = ""
        if (argumentos.length > 0) {
            const expressao = argumentos.join(" ");
            const tokens = Lexer.tokenizar(expressao)
            if (tokens){
                const parsee = new Parsee(tokens)
                try {
                    mensagem += `${Evaluator.avaliar(parsee.parse())}\n`;
                } catch (erro) {
                    console.log(erro)
                    if (erro instanceof Error)
                        return erro.message
                    return "Houve um erro desconhecido"
                }
            } else 
                mensagem += "Há um erro na expressão algébrica\n"
        } else
            mensagem += "Insira pelo menos um número\n"
        return mensagem
    }
}

export { Calc }