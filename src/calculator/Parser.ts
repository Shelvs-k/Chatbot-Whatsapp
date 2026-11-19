interface NoNumerico {
    valor: number;
}

interface NoOperacao {
    filhoEsquerdo: No;
    operador: Operador;
    filhoDireito: No;
}

type No = NoNumerico | NoOperacao;

type Operador = "+" | "-" | "*" | "/" | "^"


class Parsee { //O nome Parsee é em homenagem a Parsee de Touhou
    private pos: number = 0;
    private tokens: (number | string)[];
    
    constructor(tokens: (number | string)[]) {
        this.tokens = tokens;
    }

    public parse(): No {
        const arvore = this.parseExpressao()
        if (this.pos !== this.tokens.length)
            throw Error("Expressão inválida")
        return arvore
    }

    private parseExpressao(): No {
        let noAtual: No = this.parseTermo()
        while (this.tokens[this.pos] === "+" || this.tokens[this.pos] === "-") {
            const tokenAtual = this.tokens[this.pos];
            this.pos++
            let novoNo: No = {
                filhoEsquerdo: noAtual,
                operador: tokenAtual as Operador,
                filhoDireito: this.parseTermo()
            }
            noAtual = novoNo
        }
        return noAtual
    }

    private parseTermo(): No {
        let noAtual: No = this.parseFator()
        while (this.tokens[this.pos] === "*" || this.tokens[this.pos] === "/") {
            const tokenAtual = this.tokens[this.pos];
            this.pos++
            let novoNo: No = {
                filhoEsquerdo: noAtual,
                operador: tokenAtual as Operador,
                filhoDireito: this.parseFator()
            }
            noAtual = novoNo
        }
        return noAtual
    }

    private parseFator(): No {
        const token = this.parsePrimario()
        const tokenAtual = this.tokens[this.pos]
        if (tokenAtual === "^") {
            this.pos++
            const retorno: No = {
                filhoEsquerdo: token,
                operador: tokenAtual,
                filhoDireito: this.parseFator()
            }
            return retorno
        }
        return token
    }

    private parsePrimario(): No {
        const token = this.tokens[this.pos]
        if (typeof token === "number") {
            this.pos++
            return {valor: token}
        }
        else if (token === "("){
            this.pos++
            const expressao = this.parseExpressao()
            if (this.tokens[this.pos] === ")") this.pos++
            else throw Error("Parênteses não correspondentes")
            return expressao
        }
        throw Error("Esperado número ou parênteses")
    }
}

export { Parsee }