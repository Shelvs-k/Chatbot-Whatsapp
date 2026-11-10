type EstadoBot = "online" | "offline" | "paused";

class Bot {
    public nome: string;
    public versao: string;
    private _estado: EstadoBot;

    constructor(nome: string, versao: string) {
        this.nome = nome;
        this.versao = versao;
        this._estado = "online";
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

}

export { Bot, type EstadoBot };