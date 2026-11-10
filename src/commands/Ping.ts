import { type Comando } from "./Comando.js";

class Ping implements Comando {
    nome: string;
    descricao: string;

    constructor() {
        this.nome = "ping";
        this.descricao = "Verifica se o bot está respondendo";
    }

    public executar(argumentos: string[]): void {
        for (const parte of argumentos) {
            console.log(`Argumento: ${parte}`)
        }
        console.log("Pong!");
    }
}

export {Ping};