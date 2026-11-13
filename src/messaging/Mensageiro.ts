interface Mensageiro {
    enviar(destino: string, mensagem: string): Promise<void>;
}

export { type Mensageiro };