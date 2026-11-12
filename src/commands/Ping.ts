import { type Comando } from "./Comando.js";

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

    public executar(argumentos: string[]): void {
        const inicio = performance.now();
        console.log("Pong!");
        const final = performance.now();
        const delay = final - inicio;
        console.log(`${delay.toFixed(2)}ms`);
    }
}

export {Ping};