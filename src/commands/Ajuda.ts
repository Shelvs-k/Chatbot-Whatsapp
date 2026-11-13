import { GerenciadorComandos } from "./GerenciadorComandos.js";
import { type Comando } from "./Comando.js";

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

    public executar(argumentos: string[]): void {
        if (argumentos.length > 0) {
            const comando = this.gerenciador.buscar(argumentos[0]!)
            if (comando) {
                console.log(`\n${comando.nome} - ${comando.descricao}`);
                console.log(`Uso: ${comando.uso}`);
                if (comando.alias.length > 0) {
                    console.log("Aliases:");
                    for (const alias of comando.alias) {
                        console.log(`  /${alias}`);
                    }
                }
                console.log("\nExemplos:");
                for (const exemplo of comando.exemplos){
                    console.log(`${exemplo}`);
                }
                return;
            }
            console.log(`O comando "${argumentos[0]}" não foi encontrado`);
        } else {
            console.log("Comandos disponíveis:");
            for (const comando of this.gerenciador.listar()) {
                console.log(`  /${comando.nome} - ${comando.descricao}`);
            }
        }
    }
}

export { Ajuda }