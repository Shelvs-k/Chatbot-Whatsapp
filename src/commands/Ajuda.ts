import { GerenciadorComandos } from "./GerenciadorComandos.js";
import { type Comando } from "./Comando.js";
import type { ContextoComando } from "./ContextoComando.js";

class Ajuda implements Comando {
    nome: string;
    alias: string[];
    descricao: string;
    uso: string;
    exemplos: string[];
    private gerenciador: GerenciadorComandos;
    
    constructor(gerenciador: GerenciadorComandos) {
        this.nome = "ajuda";
        this.alias = ["help", "?"];
        this.descricao = "Lista todos os comandos com sua descrição";
        this.gerenciador = gerenciador;
        this.uso = "/ajuda [comando]";
        this.exemplos = ["/ajuda", "/ajuda ping", "/ajuda say"];
    }

    public async executar(argumentos: string[], contexto: ContextoComando): Promise<string> {
        let mensagem = "";
        if (argumentos.length > 0) {
            const comando = this.gerenciador.buscar(argumentos[0]!)
            if (comando) {
                mensagem += `\n${comando.nome} - ${comando.descricao}\n`;
                mensagem += `Uso: ${comando.uso}\n`;
                if (comando.alias.length > 0) {
                    mensagem += "Aliases:\n";
                    for (const alias of comando.alias) {
                        mensagem += `  /${alias}\n`
                    }
                }
                mensagem += "\nExemplos:\n"
                for (const exemplo of comando.exemplos){
                    mensagem += `${exemplo}\n`
                }
            } else 
                mensagem += `O comando "${argumentos[0]}" não foi encontrado\n`
        } else {
            mensagem += "Comandos disponíveis:\n";
            for (const comando of this.gerenciador.listar()) {
                mensagem += `  /${comando.nome} - ${comando.descricao}\n`
            }
        }
        return mensagem
    }
}

export { Ajuda }