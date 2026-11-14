import { type Comando } from "./Comando.js";
import type { ContextoComando } from "./ContextoComando.js";

class Roll implements Comando {
    nome: string;
    alias: string[];
    descricao: string;
    uso: string;
    exemplos: string[];

    constructor() {
        this.nome = "roll";
        this.alias = ["dado", "rolar", "d"];
        this.descricao = "Rola um dado com X lados e gera um número aleatório entre 1 e X, X é 20 por padrão.\nTambém é possível adicionar um número para ser somado no resultado final no argumento 2";
        this.uso = "/roll [lados] [soma]"
        this.exemplos = ["/roll", "/roll 50 20", "/roll 100 -10"]
    }

    public async executar(argumentos: string[], contexto: ContextoComando): Promise<void> {
        let lados: number = 20;
        let soma: number = 0;
        if (argumentos.length > 0) {
            lados = Number(argumentos[0]);
            if (Number.isNaN(lados) || lados <= 0 || !Number.isFinite(lados) || !Number.isInteger(lados)) {
                await contexto.mensageiro.enviar(contexto.destino, "Insira um número válido de lados");
                return;
            }
            if (argumentos.length > 1) {
                soma = Number(argumentos[1]);
                if (Number.isNaN(soma) || !Number.isFinite(soma)) {
                    await contexto.mensageiro.enviar(contexto.destino, "Insira um número válido para a soma");
                    return;
                }
            }
        }
        const numAleatorio: number = Math.floor(Math.random() * lados) + 1 + soma;
        await contexto.mensageiro.enviar(contexto.destino, `${numAleatorio}!`);
    }
}

export { Roll }