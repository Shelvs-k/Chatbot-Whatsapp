import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { Bot } from "./core/Bot.js";
import { type Comando } from "./commands/Comando.js";
import { MensageiroTerminal } from './messaging/implementations/MensageiroTerminal.js';
import { GerenciadorComandos } from "./commands/GerenciadorComandos.js";
import { Ajuda } from "./commands/Ajuda.js";
import { Ping } from "./commands/Ping.js";
import { Say } from "./commands/Say.js";
import { Roll } from "./commands/Roll.js";
import { Choose } from "./commands/Choose.js";
import { EightBall } from "./commands/8ball.js";
import { Coinflip } from "./commands/Coinflip.js";

const comandos = new GerenciadorComandos();
const mensageiro = new MensageiroTerminal();
const meuBot = new Bot("GensokyoBot", "1.0.0", comandos, mensageiro);

const ping = new Ping();
const ajuda = new Ajuda(comandos);
const say = new Say();
const roll = new Roll();
const choose = new Choose();
const eightball = new EightBall()
const coinflip = new Coinflip();

const lista_de_comandos: Comando[] = [
    say
]

async function ler() {
    const rl = readline.createInterface({ input, output });
    let msg: string = "";
    while (msg !== "/sair") {
        console.log(`${meuBot.nome} está ${meuBot.estaOnline ? "online" : "offline"}`);
        msg = await rl.question("Digite um comando: ");
        meuBot.receberMensagem(msg);
    }
    rl.close();
}

for (const comando of lista_de_comandos) {
    if (meuBot.adicionarComando(comando)) {
        console.log(`Comando ${comando.nome} adicionado com sucesso`);
    } else {
        console.log(`Não foi possível adicionar o comando ${comando.nome}`);
    }
}

ler();