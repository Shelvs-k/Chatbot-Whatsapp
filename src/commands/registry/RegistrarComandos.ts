import { GerenciadorComandos } from "../GerenciadorComandos.js";
import * as Comando from "./ComandosGerados.js"

function registrarComandos(gerenciador: GerenciadorComandos): void {
    for (const comando of Object.values(Comando)) {
        const instancia = new comando(gerenciador)
        gerenciador.adicionar(instancia)
    }
}

export { registrarComandos }