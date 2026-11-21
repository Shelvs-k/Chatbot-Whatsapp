import { criarContextoComando } from "./helpers/criarContextoComando.js";
import test from "node:test";
import { Interpretador } from "../commands/InterpretadorComandos.js";
import { GerenciadorComandos } from "../commands/GerenciadorComandos.js";
import assert from "node:assert/strict";
import { criarComando } from "./helpers/criarComando.js";

test.describe("Interpretador de Comandos", () => {
    test.it("Ignorar mensagens que não são comandos", async () => {
        const gerenciador = new GerenciadorComandos();
        const interpretador = new Interpretador(gerenciador);
        const mensagem = "teste";
        const contexto = criarContextoComando();
        await interpretador.interpretar(mensagem, contexto.contexto)
        assert.deepEqual(contexto.mensagens, [])
    })

    test.it("Comando executado com sucesso", async () => {
        const gerenciador = new GerenciadorComandos();
        const interpretador = new Interpretador(gerenciador);
        let executado = false;
        const comando = criarComando({
            async executar() {executado = true; return "teste"}
        });
        gerenciador.adicionar(comando)
        const mensagem = "/teste"
        const contexto = criarContextoComando();
        await interpretador.interpretar(mensagem, contexto.contexto)
        assert.equal(executado, true)
        assert.deepEqual(contexto.mensagens, ["teste"])
        assert.deepEqual(contexto.destinos, ["destino"])
    })

    test.it("Comando executado por alias com sucesso", async () => {
        const gerenciador = new GerenciadorComandos();
        const interpretador = new Interpretador(gerenciador);
        let executado = false;
        const comando = criarComando({
            async executar() {executado = true; return "teste"}
        });
        gerenciador.adicionar(comando)
        const mensagem = "/testando"
        const contexto = criarContextoComando();
        await interpretador.interpretar(mensagem, contexto.contexto)
        assert.equal(executado, true)
        assert.deepEqual(contexto.mensagens, ["teste"]);
        assert.deepEqual(contexto.destinos, ["destino"]);
    })

    test.it("Entrega de argumentos", async () => {
        const gerenciador = new GerenciadorComandos();
        const interpretador = new Interpretador(gerenciador);
        let executado = false;
        const comando = criarComando({
            async executar(argumentos) {executado = true; return argumentos[0]!}
        });
        gerenciador.adicionar(comando)
        const mensagem = "/testando 20"
        const contexto = criarContextoComando();
        await interpretador.interpretar(mensagem, contexto.contexto)
        assert.equal(executado, true)
        assert.deepEqual(contexto.mensagens, ["20"]);
        assert.deepEqual(contexto.destinos, ["destino"]);
    })

    test.it("Comando inexistente", async () => {
        const gerenciador = new GerenciadorComandos();
        const interpretador = new Interpretador(gerenciador);
        const mensagem = "/banana"
        const contexto = criarContextoComando();
        await interpretador.interpretar(mensagem, contexto.contexto)
        assert.deepEqual(contexto.mensagens, [ 'Opa! Parece que esse comando não existe ou foi digitado errado\nVerifique com /ajuda todos os comandos existentes' ]);
        assert.deepEqual(contexto.destinos, ["destino"]);
    })

    test.it("Comando vazio não executado", async () => {
        const gerenciador = new GerenciadorComandos();
        const interpretador = new Interpretador(gerenciador);
        let executado = false;
        const comando = criarComando({
            async executar() {executado = true; return "teste"}
        });
        gerenciador.adicionar(comando)
        const mensagem = "/"
        const contexto = criarContextoComando();
        await interpretador.interpretar(mensagem, contexto.contexto)
        assert.equal(executado, false)
        assert.deepEqual(contexto.mensagens, []);
        assert.deepEqual(contexto.destinos, []);
    })

    test.it("Comando com vários espaços", async () => {
        const gerenciador = new GerenciadorComandos();
        const interpretador = new Interpretador(gerenciador);
        let executado = false;
        const comando = criarComando({
            async executar(argumentos) {executado = true; return argumentos[0]!}
        });
        gerenciador.adicionar(comando)
        const mensagem = "      /teste       20      "
        const contexto = criarContextoComando();
        await interpretador.interpretar(mensagem, contexto.contexto)
        assert.equal(executado, true)
        assert.deepEqual(contexto.mensagens, ["20"]);
        assert.deepEqual(contexto.destinos, ["destino"]);
    })

    test.it("Argumentos sem alteração", async () => {
        const gerenciador = new GerenciadorComandos();
        const interpretador = new Interpretador(gerenciador);
        let executado = false;
        const comando = criarComando({
            async executar(argumentos) {executado = true; return argumentos[0]!}
        });
        gerenciador.adicionar(comando)
        const mensagem = "/teste MarISa"
        const contexto = criarContextoComando();
        await interpretador.interpretar(mensagem, contexto.contexto)
        assert.equal(executado, true)
        assert.deepEqual(contexto.mensagens, ["MarISa"]);
        assert.deepEqual(contexto.destinos, ["destino"]);
    })

    test.it("Argumentos separados corretamente", async () => {
        const gerenciador = new GerenciadorComandos();
        const interpretador = new Interpretador(gerenciador);
        let executado = false;
        const comando = criarComando({
            async executar(argumentos) {executado = true; return argumentos.join("!")}
        });
        gerenciador.adicionar(comando)
        const mensagem = "/teste Master Spark"
        const contexto = criarContextoComando();
        await interpretador.interpretar(mensagem, contexto.contexto)
        assert.equal(executado, true)
        assert.deepEqual(contexto.mensagens, ["Master!Spark"]);
        assert.deepEqual(contexto.destinos, ["destino"]);
    })

    test.it("Lançamento de erros", async () => {
        const gerenciador = new GerenciadorComandos();
        const interpretador = new Interpretador(gerenciador);
        const comando = criarComando({
            async executar() {throw Error("Erro teste")}
        });
        gerenciador.adicionar(comando)
        const mensagem = "/teste"
        const contexto = criarContextoComando();
        await assert.rejects(async () => {
            await interpretador.interpretar(mensagem, contexto.contexto)
        }, /Erro teste/)
        assert.deepEqual(contexto.mensagens, []);
        assert.deepEqual(contexto.destinos, []);
    })
})