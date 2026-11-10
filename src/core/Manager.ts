abstract class Gerenciador<T> {
    private elementos: T[];
    
    constructor() {
        this.elementos = [];
    }

    public adicionar(elemento: T): boolean {
        if (this.elementos.includes(elemento)) {
            return false;
        }
        this.elementos.push(elemento);
        return true;
    }

    public remover(elemento: T): boolean {
        if (!this.elementos.includes(elemento)) {
            return false;
        }
        const elemento_removido = this.elementos.indexOf(elemento);
        this.elementos.splice(elemento_removido, 1);
        return true;
    }

    public listar(): readonly T[] {
        const copia = [...this.elementos];
        return copia;
    }
}

export {Gerenciador};