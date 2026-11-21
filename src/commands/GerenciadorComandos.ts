import { Gerenciador } from "../core/Manager.js";
import { type Comando } from "./Comando.js";

class GerenciadorComandos extends Gerenciador<Comando> {
    public adicionar(elemento: Comando): boolean {
        if (this.buscar(elemento.nome)){
            return false
        }
        for (const alias of elemento.alias) {
            if (this.buscar(alias) || alias === elemento.nome) {
                return false;
            }
        }
        const aliasesUnicos: Set<string> = new Set(elemento.alias);
        if (aliasesUnicos.size < elemento.alias.length) {
            return false;
        }
        return super.adicionar(elemento);
    }
    public buscar(nome: string): Comando | undefined {
        for (const comando of this.listar()) {
            if (nome.toLowerCase() === comando.nome.toLowerCase()) {
                return comando
            }
            for (const alias of comando.alias) {
                if (nome.toLowerCase() === alias.toLowerCase()) {
                    return comando
                }
            }
        }
        return undefined;
    }
}

export { GerenciadorComandos };