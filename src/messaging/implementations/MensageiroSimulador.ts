import type { Mensageiro } from "../Mensageiro.js";

class MensageiroSimulador implements Mensageiro {
    private colecao: Map<string, string>;

    constructor(colecao: Map<string, string>) {
        this.colecao = colecao;
    }

    async enviar(destino: string, mensagem: string): Promise<void> {
        if (!this.colecao.has(destino)) {
            console.log("O destino não está disponível");
            return;
        }
        const nome = this.colecao.get(destino);
        if (nome)
            console.log(`[${nome}] ${mensagem}`);
    }
}

export {MensageiroSimulador}