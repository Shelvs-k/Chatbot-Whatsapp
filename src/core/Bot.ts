import type { Comando } from "../commands/Comando.js";
import type { ContextoComando } from "../commands/ContextoComando.js";
import { GerenciadorComandos } from "../commands/GerenciadorComandos.js";
import { Interpretador } from "../commands/InterpretadorComandos.js";
import { type Mensageiro } from "../messaging/Mensageiro.js";
import type { MensagemRecebida } from "../messaging/MensagemRecebida.js";

type EstadoBot = "online" | "offline" | "paused";

class Bot {
    public nome: string;
    public versao: string;
    private _estado: EstadoBot;
    private _mensageiro: Mensageiro;
    private _gerenciador: GerenciadorComandos;
    private _interpretador: Interpretador;
    private _conversasAutorizadas: Set<string>;

    constructor(nome: string, versao: string, gerenciador: GerenciadorComandos, mensageiro: Mensageiro, autorizados: Set<string>) {
        this.nome = nome;
        this.versao = versao;
        this._estado = "online";
        this._gerenciador = gerenciador;
        this._mensageiro = mensageiro;
        this._interpretador = new Interpretador(this._gerenciador);
        this._conversasAutorizadas = autorizados;
    }

    get estado(): EstadoBot {
        return this._estado;
    }

    get estaOnline(): boolean {
        return this._estado === "online";
    }   

    public alterarEstado(novoEstado: EstadoBot): boolean {
        if (this.estado === novoEstado) {
            console.log(`O bot já está no estado "${novoEstado}".`);
            return false;
        }
        this._estado = novoEstado;
        return true;
    }

    private conversaAutorizada(mensagem: MensagemRecebida): boolean {
        if ((!this._conversasAutorizadas.has(mensagem.idConversa) || mensagem.tipoConversa !== "grupo") && mensagem.origem !== "terminal")
            return false;
        return true;
    }

    public async receberMensagem(mensagem: MensagemRecebida): Promise<void> {
        try {
            if (!this.estaOnline)
                return;
            if (!this.conversaAutorizada(mensagem))
                return;
            const contexto: ContextoComando = {
                mensageiro: this._mensageiro,
                destino: mensagem.idConversa,
                inicioProcessamento: performance.now()
            }
            await this._interpretador.interpretar(mensagem.conteudo, contexto);
        } catch (erro) {
            console.log(erro);
        }
    }

    public adicionarComando(comando: Comando): boolean {
        return this._gerenciador.adicionar(comando);
    }
}

export { Bot, type EstadoBot };