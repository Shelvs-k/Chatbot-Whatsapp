import { type Comando } from "./Comando.js";

class Roll implements Comando {
    nome: string;
    alias: string[];
    descricao: string;
    uso: string;
    exemplos: string[];

    constructor() {
        this.nome = "roll";
        this.alias = ["dado", "rolar", "d"];
        this.descricao = "Rola um dado com X lados e gera um número aleatório entre 1 e X, X é 20 por padrão"
        this.uso = "/roll [lados]"
        this.exemplos = ["/roll", "/roll 50", "/roll 100"]
    }

    public executar(argumentos: string[]): void {
        let lados: number = 20;
        if (argumentos.length > 0) {
            lados = Number(argumentos[0]);
            if (Number.isNaN(lados) || lados <= 0 || !Number.isFinite(lados) || !Number.isInteger(lados)) {
                console.log("Insira um número válido de lados");
                return;
            }
        }
        const numAleatorio: number = Math.floor(Math.random() * lados) + 1;
        console.log(`${numAleatorio}!`);
    }
}

export { Roll }