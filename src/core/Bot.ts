import type { Comando } from "../commands/Comando.js";
import { GerenciadorComandos } from "../commands/GerenciadorComandos.js";
import { Interpretador } from "../commands/InterpretadorComandos.js";

type EstadoBot = "online" | "offline" | "paused";

class Bot {
    public nome: string;
    public versao: string;
    private _estado: EstadoBot;
    private _gerenciador: GerenciadorComandos;
    private _interpretador: Interpretador;

    constructor(nome: string, versao: string, gerenciador: GerenciadorComandos) {
        this.nome = nome;
        this.versao = versao;
        this._estado = "online";
        this._gerenciador = gerenciador;
        this._interpretador = new Interpretador(this._gerenciador);
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

    public receberMensagem(mensagem: string): void {
        if (this.estaOnline)
            this._interpretador.interpretar(mensagem);
    }

    public adicionarComando(comando: Comando): boolean {
        return this._gerenciador.adicionar(comando);
    }
}

export { Bot, type EstadoBot };