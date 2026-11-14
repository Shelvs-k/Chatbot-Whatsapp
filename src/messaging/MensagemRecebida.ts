interface MensagemRecebida {
    conteudo: string;
    idConversa: string;
    origem: "terminal" | "simulador" | "whatsapp"
}

export { type MensagemRecebida };