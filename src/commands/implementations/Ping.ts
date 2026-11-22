import { type Comando } from "../Comando.js";
import type { ContextoComando } from "../ContextoComando.js";
import type { GerenciadorComandos } from "../GerenciadorComandos.js";

class Ping implements Comando {
    nome: string;
    alias: string[];
    descricao: string;
    uso: string;
    exemplos: string[];

    constructor(gerenciador: GerenciadorComandos) {
        this.nome = "ping";
        this.alias = ["latencia"];
        this.descricao = "Verifica se o bot está respondendo";
        this.uso = "/ping";
        this.exemplos = ["/ping"];
    }

    public async executar(argumentos: string[], contexto: ContextoComando): Promise<string> {
        const inicio = contexto.inicioProcessamento;
        let mensagem = ""
        mensagem += "Pong!\n"
        const final = performance.now();
        const delay = final - inicio;
        mensagem += `${delay.toFixed(2)}ms`
        return mensagem
    }
}

export {Ping};