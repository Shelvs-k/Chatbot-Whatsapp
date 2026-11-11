import { type Comando } from "./Comando.js";

class Say implements Comando {
    nome: string;
    descricao: string;
    uso: string;
    exemplos: string[];

    constructor() {
        this.nome = "say";
        this.descricao = "Envia uma mensagem escolhida pelo usuário";
        this.uso = "/say <mensagem>";
        this.exemplos = ["/say Olá!", "/say Até mais, tchau!", "/say Bem vindo!"]
    }

    public executar(argumentos: string[]): void {
        if (argumentos.length > 0) {
            const mensagem = argumentos.join(" ");
            console.log(mensagem);
        } else {
            console.log("Você precisa colocar uma mensagem");
        }
    }
}

export {Say}