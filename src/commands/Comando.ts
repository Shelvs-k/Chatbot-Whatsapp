import { type ContextoComando } from "./ContextoComando.js"

interface Comando {
    nome: string,
    alias: string[],
    descricao: string,
    uso: string,
    exemplos: string[],
    executar(argumentos: string[], contexto: ContextoComando): Promise<void>;
}
export {type Comando};