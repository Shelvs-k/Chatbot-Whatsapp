import { type Comando } from "./Comando.js";

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

    public executar(argumentos: string[]): void {
        const moeda = Math.random();
        if (moeda >= 0.5)
            console.log("Cara!");
        else 
            console.log("Coroa!");
    }
}

export { Coinflip }