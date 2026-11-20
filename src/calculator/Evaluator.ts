import type { No } from "./Parser.js";

class Evaluator {
    public static avaliar(no: No): number {
        if ("valor" in no) return no.valor
        else if ("filho" in no) return -this.avaliar(no.filho)
        else {
            const esquerdo = this.avaliar(no.filhoEsquerdo);
            const direito = this.avaliar(no.filhoDireito);
            switch (no.operador) {
                case "*":
                    return esquerdo * direito;
                case "+":
                    return esquerdo + direito;
                case "-":
                    return esquerdo - direito;
                case "/":
                    if (direito !== 0)
                        return esquerdo / direito;
                    else
                        throw new Error("Divisão por zero");
                case "^":
                    return esquerdo ** direito;
            }
        }
    }
}

export {Evaluator}