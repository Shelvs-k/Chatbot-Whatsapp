import { type Comando } from "./Comando.js";
import type { ContextoComando } from "./ContextoComando.js";

class Say implements Comando {
    nome: string;
    alias: string[];
    descricao: string;
    uso: string;
    exemplos: string[];

    constructor() {
        this.nome = "say";
        this.alias = ["msg", "talk"];
        this.descricao = "Envia uma mensagem escolhida pelo usuário";
        this.uso = "/say <mensagem>";
        this.exemplos = ["/say Olá!", "/say Até mais, tchau!", "/say Bem vindo!"]
    }

    public async executar(argumentos: string[], contexto: ContextoComando): Promise<void> {
        if (argumentos.length > 0) {
            const mensagem = argumentos.join(" ");
            await contexto.mensageiro.enviar("terminal", mensagem);
        } else {
            await contexto.mensageiro.enviar("terminal", "Insira uma mensagem para ser enviada");
        }
    }
}

export {Say}