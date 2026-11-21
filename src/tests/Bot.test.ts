
import test from "node:test";
import assert from "node:assert/strict";
import { Bot } from "../core/Bot.js";
import { GerenciadorComandos } from "../commands/GerenciadorComandos.js";
import type { Mensageiro } from "../messaging/Mensageiro.js";
import type { MensagemRecebida } from "../messaging/MensagemRecebida.js";
import { criarComando } from "./helpers/criarComando.js";

function criarBotTeste(autorizados = new Set<string>()) {
    const gerenciador = new GerenciadorComandos();
    const mensagens: string[] = [];

    const mensageiro: Mensageiro = {
        async enviar(_destino, mensagem) {
            mensagens.push(mensagem);
        }
    };

    const bot = new Bot(
        "teste",
        "0",
        gerenciador,
        mensageiro,
        autorizados
    );

    return { bot, gerenciador, mensagens };
}

function criarMensagem(
    opcoes: Partial<MensagemRecebida> = {}
): MensagemRecebida {
    return {
        conteudo: "/teste",
        idConversa: "grupo-1",
        origem: "whatsapp",
        tipoConversa: "grupo",
        ...opcoes
    };
}

test.describe("Bot", () => {
    test.it("Bot começa online", () => {
        const { bot } = criarBotTeste();
        assert.equal(bot.estado, "online");
        assert.equal(bot.estaOnline, true);
    });

    test.it("Altera estado corretamente", () => {
        const { bot } = criarBotTeste();

        assert.equal(bot.alterarEstado("offline"), true);
        assert.equal(bot.estado, "offline");
        assert.equal(bot.estaOnline, false);

        assert.equal(bot.alterarEstado("paused"), true);
        assert.equal(bot.estado, "paused");

        assert.equal(bot.alterarEstado("online"), true);
        assert.equal(bot.estaOnline, true);
    });

    test.it("Não altera para o mesmo estado", () => {
        const { bot } = criarBotTeste();

        assert.equal(bot.alterarEstado("online"), false);
        assert.equal(bot.estado, "online");
    });

    test.it("Adiciona comando válido", () => {
        const { bot } = criarBotTeste();
        assert.equal(bot.adicionarComando(criarComando()), true);
    });

    test.it("Não adiciona comando duplicado", () => {
        const { bot } = criarBotTeste();
        const comando = criarComando();

        bot.adicionarComando(comando);
        assert.equal(bot.adicionarComando(comando), false);
    });

    test.it("Processa mensagem de grupo autorizado", async () => {
        const { bot, mensagens } = criarBotTeste(
            new Set(["grupo-1"])
        );

        bot.adicionarComando(criarComando());

        await bot.receberMensagem(criarMensagem());

        assert.deepEqual(mensagens, ["teste"]);
    });

    test.it("Ignora mensagens quando offline ou pausado", async () => {
        for (const estado of ["offline", "paused"] as const) {
            const { bot, mensagens } = criarBotTeste(
                new Set(["grupo-1"])
            );

            bot.adicionarComando(criarComando());
            bot.alterarEstado(estado);

            await bot.receberMensagem(criarMensagem());

            assert.deepEqual(mensagens, []);
        }
    });

    test.it("Ignora grupo não autorizado", async () => {
        const { bot, mensagens } = criarBotTeste();

        bot.adicionarComando(criarComando());

        await bot.receberMensagem(criarMensagem());

        assert.deepEqual(mensagens, []);
    });

    test.it("Ignora conversas privadas", async () => {
        const { bot, mensagens } = criarBotTeste(
            new Set(["grupo-1"])
        );

        bot.adicionarComando(criarComando());

        await bot.receberMensagem(
            criarMensagem({ tipoConversa: "privado" })
        );

        assert.deepEqual(mensagens, []);
    });

    test.it("Aceita mensagens originadas do terminal", async () => {
        const { bot, mensagens } = criarBotTeste();

        bot.adicionarComando(criarComando());

        await bot.receberMensagem(
            criarMensagem({
                origem: "terminal",
                tipoConversa: "privado"
            })
        );

        assert.deepEqual(mensagens, ["teste"]);
    });
});
