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
        this.uso = "/calc <num1> (+, -, /, *, ^) <num2> (+, -, /, *, ^) [num3] ..."
        this.exemplos = ["/calc 5 + 3", "/calc 4 * 3^2 + 2", "/calc (80 - 30) * 2"]
    }

    public async executar(argumentos: string[], contexto: ContextoComando): Promise<void> {
        
    }
}