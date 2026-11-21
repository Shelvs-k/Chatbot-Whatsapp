import test from "node:test";
import assert from "node:assert/strict";
import { GerenciadorComandos } from "../commands/GerenciadorComandos.js";
import { type Comando } from "../commands/Comando.js";
import { criarComando } from "./helpers/criarComando.js";

test.describe("Gerenciador de Comandos", () => {
    test.it("Adicionar um comando", () => {
        const testeComando = new GerenciadorComandos();
        const comando: Comando = criarComando()
        assert.equal(testeComando.adicionar(comando), true);
    })

    test.it("Buscar um comando existente", () => {
        const testeComando = new GerenciadorComandos();
        const comando: Comando = criarComando()
        testeComando.adicionar(comando)
        assert.deepEqual(testeComando.buscar("Teste"), comando)
    })

    test.it("Buscar um comando por alias", () => {
        const testeComando = new GerenciadorComandos();
        const comando: Comando = criarComando()
        testeComando.adicionar(comando)
        assert.deepEqual(testeComando.buscar("Testando"), comando)
    })

    test.it("Buscar um comando inexistente", () => {
        const testeComando = new GerenciadorComandos();
        assert.equal(testeComando.buscar("Teste Inexistente"), undefined);
    })

    test.it("Adicionar um comando com nome repetido", () => {
        const testeComando = new GerenciadorComandos();
        const comando: Comando = criarComando()
        testeComando.adicionar(comando);
        const comandoSecundario: Comando = criarComando({
            nome: "Teste",
            alias: ["Testando 2", "Teste Unitário 2"]
        })
        assert.equal(testeComando.adicionar(comandoSecundario), false);
    })

    test.it("Adicionar um comando com alias repetido", () => {
        const testeComando = new GerenciadorComandos();
        const comando: Comando = criarComando()
        testeComando.adicionar(comando);
        const comandoSecundario: Comando = criarComando({
            nome: "Teste 2",
            alias: ["Testando", "Teste Unitário 2"]
        })
        assert.equal(testeComando.adicionar(comandoSecundario), false);
    })

    test.it("Adicionar um comando com alias igual o nome", () => {
        const testeComando = new GerenciadorComandos();
        const comandoSecundario: Comando = criarComando({
            nome: "Teste",
            alias: ["Teste", "Teste Unitário"]
        })
        assert.equal(testeComando.adicionar(comandoSecundario), false);
    })

    test.it("Adicionar um comando com alias duplicados", () => {
        const testeComando = new GerenciadorComandos();
        const comandoSecundario: Comando = criarComando({
            nome: "Teste 2",
            alias: ["Teste", "Teste"]
        })
        assert.equal(testeComando.adicionar(comandoSecundario), false);
    })

    test.it("Busca do gerenciador não diferencia maiúsculas com minúsculas", () => {
        const testeComando = new GerenciadorComandos();
        const comando: Comando = criarComando();
        testeComando.adicionar(comando);
        assert.deepEqual(testeComando.buscar("TeSTe"), comando)
    })
})