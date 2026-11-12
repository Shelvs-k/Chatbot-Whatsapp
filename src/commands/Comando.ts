interface Comando {
    nome: string,
    alias: string[],
    descricao: string,
    uso: string,
    exemplos: string[],
    executar(argumentos: string[]): void;
}
export {type Comando};