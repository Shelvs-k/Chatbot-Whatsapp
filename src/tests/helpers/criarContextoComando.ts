import { type ContextoComando } from "../../commands/ContextoComando.js";

interface ContextoComandoTeste {
    contexto: ContextoComando,
    mensagens: string[],
    destinos: string[]
}

function criarContextoComando (): ContextoComandoTeste {
    const mensagensEnviadas: string[] = [];
    const destinosEnviados: string[] = [];
    const resultado: ContextoComandoTeste = {
        contexto: {
            mensageiro: {async enviar(destino: string, mensagem: string) {
                mensagensEnviadas.push(mensagem); 
                destinosEnviados.push(destino)
            }},
            destino: "destino",
            inicioProcessamento: 0
        },
        mensagens: mensagensEnviadas,
        destinos: destinosEnviados
    }
    return resultado
}

export {criarContextoComando}