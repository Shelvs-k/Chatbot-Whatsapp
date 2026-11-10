interface Comando {
    nome: string,
    descricao: string,
    executar(argumentos: string[]): void;
}
export {type Comando};