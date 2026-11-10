import { GerenciadorComandos } from "./GerenciadorComandos.js";
class Interpretador {
    private gerenciador: GerenciadorComandos;

    constructor( gerenciador: GerenciadorComandos) {
        this.gerenciador = gerenciador;
    }

    public interpretar(mensagem: string): void {
        const partes = mensagem.trim().split(/\s+/); // "/\s+/" é uma expressão regular (Regex) que identifica um padrão de 1 ou mais espaços vazios
        if (partes[0]?.startsWith("/")) {
            const comando = partes[0].slice(1);
            if (comando === "") {
                console.log("O comando não pode estar vazio");
                return
            }
            const execucao = this.gerenciador.buscar(comando);
            if (execucao) {
                const argumentos = partes.slice(1);
                execucao.executar(argumentos);
            } else {
                console.log("O comando não foi encontrado");
            }
        }
    }
}

export {Interpretador}