import * as fs from 'node:fs/promises'

import { Bot } from "./core/Bot.js";
import { GerenciadorComandos } from "./commands/GerenciadorComandos.js";
import { SimuladorWhatsapp } from './simulator/SimuladorWhatsapp.js';
import { MensageiroSimulador } from './messaging/implementations/MensageiroSimulador.js';
import { registrarComandos } from './commands/registry/RegistrarComandos.js';

interface Grupo {
    id: string;
    nome: string;
    autorizado: boolean;
}

interface Configuracao {
    grupos: Grupo[];
}

function validarGrupo(grupo: unknown): grupo is Grupo {
    if (typeof grupo === "object" && grupo !== null && "id" in grupo && "nome" in grupo && "autorizado" in grupo){
        if (typeof grupo.id !== "string" || grupo.id.trim() === "")
            return false
        if (typeof grupo.nome !== "string" || grupo.nome.trim() === "")
            return false
        if (typeof grupo.autorizado !== "boolean")
            return false
        return true
    }
    return false
}

function validarConfig(valor: unknown, erros: string[]): valor is Configuracao {
    if (typeof valor === "object" && valor !== null && "grupos" in valor && Array.isArray(valor.grupos)){
        for (let i: number = 0; i < valor.grupos.length; i++)
            if (!validarGrupo(valor.grupos[i]))
                erros.push(`Há um grupo inválido na posição ${i}`)
        if (erros.length > 0)
            return false
        return true
    }
    erros.push("A estrutura é inválida")
    return false
}

async function JsonParsee(): Promise<Configuracao> {
    const dados = await fs.readFile("src/config/grupos.json", "utf8")
    const config: unknown = JSON.parse(dados);
    const arrayErros: string[] = []
    const idsEncontrados = new Set<string>();
    if (!validarConfig(config, arrayErros))
        throw new Error(arrayErros.join("\n"))
    for (const grupo of config.grupos){
        if (idsEncontrados.has(grupo.id.trim()))
            arrayErros.push(`Há um ID duplicado: ${grupo.id}`);
        else
            idsEncontrados.add(grupo.id.trim());
    }
    if (arrayErros.length > 0)
        throw new Error(arrayErros.join("\n"))
    return config;
}

const comandos = new GerenciadorComandos();

const colecao = new Map<string, string>();
const autorizados = new Set<string>();

const mensageiro = new MensageiroSimulador(colecao);

async function main() {
    try {
        const config = await JsonParsee();
        for (const grupo of config.grupos) {
            colecao.set(grupo.id, grupo.nome)
            if (grupo.autorizado)
                autorizados.add(grupo.id)
        }
        const meuBot = new Bot("GensokyoBot", "1.0.0", comandos, mensageiro, autorizados);

        const simulador = new SimuladorWhatsapp(meuBot, colecao)

        registrarComandos(comandos)

        await simulador.main()
    } catch (erro) {
        console.log(erro)
    }
}

await main()