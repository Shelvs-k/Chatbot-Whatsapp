import { type Mensageiro } from "../messaging/Mensageiro.js";

interface ContextoComando {
    mensageiro: Mensageiro;
    destino: string;
    inicioProcessamento: number;
}

export { type ContextoComando };