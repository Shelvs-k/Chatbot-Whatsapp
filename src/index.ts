import { Bot } from "./core/Bot.js";
import { GerenciadorComandos } from "./commands/GerenciadorComandos.js";
import { Interpretador } from "./commands/InterpretadorComandos.js";
import { Ajuda } from "./commands/Ajuda.js";
import { Ping } from "./commands/Ping.js";
import { Say } from "./commands/Say.js";

const meuBot = new Bot("GensokyoBot", "1.0.0");
const comandos = new GerenciadorComandos();
const interpretador = new Interpretador(comandos);

const ping = new Ping();
const ajuda = new Ajuda(comandos);
const say = new Say

console.log(`Nome do bot: ${meuBot.nome}`);
console.log(`Versão do bot: ${meuBot.versao}`);
console.log(`Estado do bot: ${meuBot.estado}`);
meuBot.alterarEstado("paused");

if (comandos.adicionar(ping)) {
    console.log("Comando ping adicionado")
}
if (comandos.adicionar(ajuda)) {
    console.log("Comando ajuda adicionado");
}
if (comandos.adicionar(say)) {
    console.log("Comando ajuda adicionado");
}
interpretador.interpretar("/ajuda ajuda")
interpretador.interpretar("/ping")
interpretador.interpretar("/say Olá Gensokyo! Tudo bom?")