import { type Mensageiro } from "../messaging/Mensageiro.js";

interface ContextoComando {
    mensageiro: Mensageiro;
}

export { type ContextoComando };