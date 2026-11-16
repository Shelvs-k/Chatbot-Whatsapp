interface MensagemRecebida {
    conteudo: string;
    idConversa: string;
    origem: "terminal" | "simulador" | "whatsapp"
    tipoConversa: "grupo" | "privado";
}

export { type MensagemRecebida };