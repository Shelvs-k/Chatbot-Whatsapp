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

    public async executar(argumentos: string[], contexto: ContextoComando): Promise<void> {
        if (argumentos.length > 0) {
            const comando = this.gerenciador.buscar(argumentos[0]!)
            if (comando) {
                await contexto.mensageiro.enviar(contexto.destino, `\n${comando.nome} - ${comando.descricao}`);
                await contexto.mensageiro.enviar(contexto.destino, `Uso: ${comando.uso}`);
                if (comando.alias.length > 0) {
                    await contexto.mensageiro.enviar(contexto.destino, "Aliases:");
                    for (const alias of comando.alias) {
                        await contexto.mensageiro.enviar(contexto.destino, `  /${alias}`);
                    }
                }
                await contexto.mensageiro.enviar(contexto.destino, "\nExemplos:");
                for (const exemplo of comando.exemplos){
                    await contexto.mensageiro.enviar(contexto.destino, `${exemplo}`);
                }
                return;
            }
            await contexto.mensageiro.enviar(contexto.destino, `O comando "${argumentos[0]}" não foi encontrado`);
        } else {
            await contexto.mensageiro.enviar(contexto.destino, "Comandos disponíveis:");
            for (const comando of this.gerenciador.listar()) {
                await contexto.mensageiro.enviar(contexto.destino, `  /${comando.nome} - ${comando.descricao}`);
            }
        }
    }
}

export { Ajuda }