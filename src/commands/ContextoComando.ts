import { type Mensageiro } from "../messaging/Mensageiro.js";

interface ContextoComando {
    mensageiro: Mensageiro;
    destino: string;
}

export { type ContextoComando };