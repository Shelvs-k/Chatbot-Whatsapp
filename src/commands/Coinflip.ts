import { type Comando } from "./Comando.js";
import type { ContextoComando } from "./ContextoComando.js";

class Coinflip implements Comando {
    nome: string;
    alias: string[];
    descricao: string;
    uso: string;
    exemplos: string[];

    constructor() {
       this.nome = "coinflip";
       this.alias = ["moeda", "caraoucoroa", "flip"];
       this.descricao = "Gira uma moeda e decide aleatoriamente entre cara ou coroa";
       this.uso = "/coinflip";
       this.exemplos = ["/coinflip"];
    }

    public async executar(argumentos: string[], contexto: ContextoComando): Promise<void> {
        const moeda = Math.random();
        if (moeda >= 0.5)
            await contexto.mensageiro.enviar(contexto.destino, "Cara!");
        else 
            await contexto.mensageiro.enviar(contexto.destino, "Coroa!");
    }
}

export { Coinflip }