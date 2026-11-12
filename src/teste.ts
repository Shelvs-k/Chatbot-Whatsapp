import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

const resposta = await rl.question("Digite alguma coisa: ");

console.log("Terminal interativo:", process.stdin.isTTY);
console.log("Entrada encerrada:", process.stdin.destroyed);
console.log(`Você digitou: ${resposta}`);

rl.close();