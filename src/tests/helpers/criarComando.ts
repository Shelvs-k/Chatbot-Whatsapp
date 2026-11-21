import { type Comando } from "../../commands/Comando.js";

function criarComando(opcoes: Partial<Comando> = {}): Comando {
    return {
        nome: "teste",
        alias: ["testando", "teste Unitário"],
        uso: "/teste",
        descricao: "Comando de teste",
        exemplos: ["/teste"],
        async executar() {
            return "teste"
        },
        ...opcoes
    }
}

export {criarComando}