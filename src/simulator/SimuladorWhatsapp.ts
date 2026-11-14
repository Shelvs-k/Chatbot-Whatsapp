import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { Bot } from "../core/Bot.js";
import type { MensagemRecebida } from '../messaging/MensagemRecebida.js';

class SimuladorWhatsapp {
    private bot: Bot;
    private collection: Map<string, string>;
    private interface_rl: readline.Interface;

    constructor (bot: Bot, colecao: Map<string, string>) {
        this.bot = bot;
        this.collection = colecao;
        this.interface_rl = readline.createInterface({input, output});
    }

    public async main(): Promise<void> {
        if (!this.collection) {
            console.log("Não há grupos aqui");
            return;
        }
        while (true) {
            console.log("SIMULADOR DE WHATSAPP");
            for (const conversas of this.collection) {
                const [id, nome] = conversas;
                console.log(`${id} - ${nome}`);
            }
            const id = await this.ler_opcao()
            if (id) {
                console.clear();
                await this.ler_mensagem(id);
            } else {
                this.interface_rl.close();
                break;
            }
        }
    }

    private async ler_mensagem(conversa: string): Promise<void> {
        let msg: string = "";
        while (msg !== "/sair") {
            console.log(`${this.bot.nome} está ${this.bot.estaOnline ? "online" : "offline"} em ${this.collection.get(conversa)}`);
            msg = await this.interface_rl.question("Digite um comando: ");
            const mensagem: MensagemRecebida = {
                conteudo: msg,
                idConversa: conversa,
                origem: "simulador"
            };
            await this.bot.receberMensagem(mensagem);
        }
    }

    private async ler_opcao(): Promise<string | undefined> {
        let id: string = "";
        while (true) {
            id = await this.interface_rl.question("Escolha um grupo: ");
            if (id === "0"){
                console.log("Saindo...");
                this.interface_rl.close();
                return;
            } else if (!this.collection.has(id)) {
                console.log("ID Inválido");
            } else {
                break;
            }
        }
        return id;
    }
}

export {SimuladorWhatsapp}