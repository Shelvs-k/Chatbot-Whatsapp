interface NumeroLido {
    valor: number,
    posicao: number
}

const operadores = ["+", "-", "/", "*", "^"]

class Lexer {
    private static lerNumero(expressao: string, pos: number): NumeroLido | null {
        if (expressao === "" || pos < 0 || pos > expressao.length)
            return null
        let aux_numb: string = ""
        let posAtual = pos
        while (true) {
            const parte = expressao[posAtual]
            if (parte === undefined) break
            if (parte === "." && aux_numb.includes("."))
                return null
            if (parte! >= "0" && parte! <= "9")
                aux_numb += parte
            else if (parte === "." && !aux_numb.includes("."))
                aux_numb += parte
            else if (operadores.includes(parte!) || parte.trim() === "" || parte === "(" || parte === ")") break
            else return null
            posAtual++
        }
        if (aux_numb === "" || aux_numb === ".")
            return null
        if (aux_numb.startsWith("."))
            aux_numb = "0" + aux_numb
        else if (aux_numb.endsWith("."))
            aux_numb += "0"
        const numero = Number(aux_numb)
        if (!Number.isNaN(numero)){
            const numLido: NumeroLido = {
                valor: numero,
                posicao: posAtual
            };
            return numLido
        }
        return null
    }

    public static tokenizar(expressao: string): (number | string)[] | null {
        if (expressao.trim() === "")
            return null
        const token: (number | string)[] = []
        let posAtual: number = 0
        while (true) {
            if (posAtual >= expressao.length) break
            const parte = expressao[posAtual]
            if (parte === undefined) return null
            if (parte.trim() === "") {
                posAtual++
                continue
            }
            let numero: NumeroLido | null = null
            if (parte === "." || (parte >= "0" && parte <= "9"))
                numero = this.lerNumero(expressao, posAtual)
            if (numero) {
                posAtual = numero.posicao
                token.push(numero.valor)
                continue
            } 
            else if (operadores.includes(parte))
                token.push(parte)
            else if (parte === "(" || parte === ")")
                token.push(parte)
            else return null
            posAtual++
        }
        return token.length > 0 ? token : null
    }
}

export {Lexer}