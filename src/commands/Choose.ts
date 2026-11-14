import { type Comando } from "./Comando.js";
import type { ContextoComando } from "./ContextoComando.js";

class Choose implements Comando {
    nome: string;
    alias: string[];
    descricao: string;
    uso: string;
    exemplos: string[];

    constructor() {
        this.nome = "choose";
        this.alias = ["escolher", "random"];
        this.descricao = "Escolhe aleatóriamente um valor dentre os fornecidos. São necessáios 2 valores no mínimo";
        this.uso = "/choose <valor1> <valor2> ... [valorN]";
        this.exemplos = ["/choose 20 30", "/choose pastel hamburguer pizza", "/choose 30 dois coelho"]
    }

    public async executar(argumentos: string[], contexto: ContextoComando): Promise<void> {
        if (argumentos.length > 1) {
            const randomIndice = Math.floor(Math.random() * argumentos.length);
            await contexto.mensageiro.enviar(contexto.destino, `${argumentos[randomIndice]}`);
        } else {
            await contexto.mensageiro.enviar(contexto.destino, "Você precisa inserir pelo menos 2 valores");
        }
    }
}

export {Choose}