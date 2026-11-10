import { Gerenciador } from "../core/Manager.js";
import { type Comando } from "./Comando.js";

class GerenciadorComandos extends Gerenciador<Comando> {
    public adicionar(elemento: Comando): boolean {
        if (this.buscar(elemento.nome)){
            return false
        }
        return super.adicionar(elemento);
    }
    public buscar(nome: string): Comando | undefined {
        for (const comando of this.listar()) {
            if (comando.nome === nome) {
                return comando;
            }
        }
        return undefined;
    }
}

export { GerenciadorComandos };