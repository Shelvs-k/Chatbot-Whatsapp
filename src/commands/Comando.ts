interface Comando {
    nome: string,
    descricao: string,
    uso: string,
    exemplos: string[],
    executar(argumentos: string[]): void;
}
export {type Comando};