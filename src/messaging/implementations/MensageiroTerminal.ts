import { type Mensageiro } from "../Mensageiro.js";

class MensageiroTerminal implements Mensageiro {
    async enviar(destino: string, mensagem: string): Promise<void> {
        console.log(mensagem);
    }
}

export { MensageiroTerminal };