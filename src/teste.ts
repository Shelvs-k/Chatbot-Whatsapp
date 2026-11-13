function consultarCha(): Promise<string> {
    const chaDisponivel = new Promise<string>((resolve, reject) => {
        const statusCha: number = Math.random();
        setTimeout(() => {
            if (statusCha >= 0.5)
                resolve("Tem chá disponível")
            else
                reject(new Error("Não há chá disponível"))
        }, 2000)
    })
    
    return chaDisponivel;
}

function consultarEientein(): Promise<string> {
    const reisenDisponivel = new Promise<string>((resolve, reject) => {
        const statusReisen: number = Math.random();
        setTimeout(() => {
            if (statusReisen >= 0.5)
                resolve("Reisen está disponível")
            else
                reject(new Error("Reisen não está disponível"))
        }, 3000);
    })

    return reisenDisponivel;
}

async function verificarReisen() {
    console.log("Indo consultar Reisen e chás...");
    const resultados = await Promise.allSettled([consultarCha(), consultarEientein()]);
    let chaDisponível = true;
    let reisenDisponível = true;
    if (resultados[0].status === "fulfilled") {
        console.log(resultados[0].value);
    } else {
        console.log(resultados[0].reason)
        chaDisponível = false;
    }
    if (resultados[1].status === "fulfilled") {
        console.log(resultados[1].value);
    } else {
        console.log(resultados[1].reason)
        reisenDisponível = false;
    }
    if (chaDisponível && reisenDisponível)
        console.log("Você pode ir falar com ela, aproveite o chá");
    else if (reisenDisponível)
        console.log("Você pode falar com a Reisen, mas não temos chá");
    else
        console.log("Desculpe, não sobrou nada pro beta")
}

console.log("Aguarde aqui")
verificarReisen()
console.log("Gostaria de um café enquanto isso?")