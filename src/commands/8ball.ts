import { type Comando } from "./Comando.js";

class EightBall implements Comando {
    nome: string;
    alias: string[];
    descricao: string;
    uso: string;    
    exemplos: string[];

    constructor() {
        this.nome = "8ball";
        this.alias = ["bola8", "bola", "oraculo"];
        this.descricao = "Gera uma previsão aleatória sobre uma pergunta";
        this.uso = "/8ball <pergunta>";
        this.exemplos = ["/8ball vou passar na prova?", "/8ball minha crush me ama?", "/8ball hoje vai chover?"];
    }

    private static respostas: string[] = [
        "Com certeza!", "Sim", "Os astros afirmam", "Conte com isso",
        "Talvez", "Provavelmente", "Existe a chance", "Não há como prever isso agora",
        "Não", "Nunca!", "Os astros discordam", "Nem fudendo"
    ];

    public executar(argumentos: string[]): void {
        if (argumentos.length > 0) {
            const randomIndice: number = Math.floor(Math.random() * EightBall.respostas.length);
            const pergunta: string = argumentos.join(" ");
            console.log(`${pergunta}? ${EightBall.respostas[randomIndice]}`);
        } else {
            console.log("Insira uma pergunta");
        }
    }
}

export { EightBall }