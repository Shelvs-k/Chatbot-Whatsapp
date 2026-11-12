import { Bot } from "./core/Bot.js";
import { type Comando } from "./commands/Comando.js";
import { GerenciadorComandos } from "./commands/GerenciadorComandos.js";
import { Interpretador } from "./commands/InterpretadorComandos.js";
import { Ajuda } from "./commands/Ajuda.js";
import { Ping } from "./commands/Ping.js";
import { Say } from "./commands/Say.js";
import { Roll } from "./commands/Roll.js";
import { Choose } from "./commands/Choose.js";
import { EightBall } from "./commands/8ball.js";

const meuBot = new Bot("GensokyoBot", "1.0.0");
const comandos = new GerenciadorComandos();
const interpretador = new Interpretador(comandos);

const ping = new Ping();
const ajuda = new Ajuda(comandos);
const say = new Say();
const roll = new Roll();
const choose = new Choose();
const eightball = new EightBall()

const lista_de_comandos: Comando[] = [
    ping,
    ajuda,
    say,
    roll,
    choose,
    eightball
]

for (const comando of lista_de_comandos) {
    if (comandos.adicionar(comando)) {
        console.log(`Comando ${comando.nome} adicionado com sucesso`);
    } else {
        console.log(`Não foi possível adicionar o comando ${comando.nome}`);
    }
}