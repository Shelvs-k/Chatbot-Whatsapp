import type { Comando } from "../commands/Comando.js";
import type { ContextoComando } from "../commands/ContextoComando.js";
import { GerenciadorComandos } from "../commands/GerenciadorComandos.js";
import { Interpretador } from "../commands/InterpretadorComandos.js";
import { type Mensageiro } from "../messaging/Mensageiro.js";

type EstadoBot = "online" | "offline" | "paused";

class Bot {
    public nome: string;
    public versao: string;
    private _estado: EstadoBot;
    private _gerenciador: GerenciadorComandos;
    private _interpretador: Interpretador;
    private _contexto: ContextoComando;

    constructor(nome: string, versao: string, gerenciador: GerenciadorComandos, mensageiro: Mensageiro) {
        this.nome = nome;
        this.versao = versao;
        this._estado = "online";
        this._gerenciador = gerenciador;
        this._contexto = {mensageiro}
        this._interpretador = new Interpretador(this._gerenciador, this._contexto);
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

    public async receberMensagem(mensagem: string): Promise<void> {
        try {
        if (this.estaOnline)
            await this._interpretador.interpretar(mensagem);
        } catch (erro) {
            console.log(erro);
        }
    }

    public adicionarComando(comando: Comando): boolean {
        return this._gerenciador.adicionar(comando);
    }
}

export { Bot, type EstadoBot };