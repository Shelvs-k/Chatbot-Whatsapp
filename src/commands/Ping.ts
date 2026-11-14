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
        const inicio = performance.now();
        await contexto.mensageiro.enviar(contexto.destino, "Pong!");
        const final = performance.now();
        const delay = final - inicio;
        await contexto.mensageiro.enviar(contexto.destino, `${delay.toFixed(2)}ms`);
    }
}

export {Ping};