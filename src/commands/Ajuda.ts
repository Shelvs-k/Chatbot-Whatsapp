import { GerenciadorComandos } from "./GerenciadorComandos.js";
import { type Comando } from "./Comando.js";

class Ajuda implements Comando {
    nome: string;
    descricao: string;
    private gerenciador: GerenciadorComandos;
    
    constructor(gerenciador: GerenciadorComandos) {
        this.nome = "ajuda";
        this.descricao = "Lista todos os comandos com sua descrição";
        this.gerenciador = gerenciador;
    }

    public executar(argumentos: string[]): void {
        console.log("Comandos disponíveis:")
        for (const comando of this.gerenciador.listar()) {
            console.log(`  /${comando.nome} - ${comando.descricao}`)
        }
    }
}

export { Ajuda }