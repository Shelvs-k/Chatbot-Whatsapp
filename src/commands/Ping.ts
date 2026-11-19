import { type Comando } from "./Comando.js";
import type { ContextoComando } from "./ContextoComando.js";

class Ping implements Comando {
    nome: string;
    alias: string[];
    descricao: string;
    uso: string;
    exemplos: string[];

    constructor() {
        this.nome = "ping";
        this.alias = ["latencia"];
        this.descricao = "Verifica se o bot está respondendo";
        this.uso = "/ping";
        this.exemplos = ["/ping"];
    }

    public async executar(argumentos: string[], contexto: ContextoComando): Promise<void> {
        const inicio = contexto.inicioProcessamento;
        try {
            await contexto.mensageiro.enviar(contexto.destino, "Pong!");
        } catch (erro) {
            console.error("Não foi possível enviar a mensagem Pong");
            console.error(erro);
            return;
        }
        const final = performance.now();
        const delay = final - inicio;
        try {
            await contexto.mensageiro.enviar(contexto.destino, `${delay.toFixed(2)}ms`);
        } catch (erro) {
            console.error("Não foi possível enviar a latência");
            console.error(erro);
        }
    }
}

export {Ping};