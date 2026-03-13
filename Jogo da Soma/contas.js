const resposta = document.getElementById("resposta");
const responder = document.getElementById("btnResponder");
const iniciar = document.getElementById("btnIniciar");
const record = document.getElementById("tempo");
const operacoes = document.querySelectorAll("[data-operacao]")
const btnOperacoes = document.querySelectorAll(".buttons button")
const alertaIniciar = document.getElementById("alertaIniciar")
const selectAlgarismos = document.getElementById("algarismos")
const selectQuantidade = document.getElementById("quantidade")
const conta = document.getElementById("conta")
const acerto = document.getElementById("acerto")

let tempo = 0.000;
let cronometro;
let operacaoEscolhida = null;
const contas = []
let resultado

function habilitarJogo (){
    resposta.disabled = false
    responder.disabled = false
    iniciar.disabled = true
    selectAlgarismos.disabled = true
    selectQuantidade.disabled = true
    operacoes.forEach(botoes => botoes.disabled = true)
    alertaIniciar.innerHTML = ""
    resposta.value = ""
    resposta.focus()
    ligarCronometro()
}
function desabilitarJogo (){
    resposta.disabled = true
    responder.disabled = true
    iniciar.disabled = false
    selectAlgarismos.disabled = false
    selectQuantidade.disabled = false
    operacoes.forEach(botoes => botoes.disabled = false)
    ChecarResposta()
    desligarCronometro()
    clearContas()
}
function ligarCronometro (){
    cronometro = setInterval(() => {
    tempo = tempo + 0.01;
    record.innerHTML = tempo.toFixed(2)
 }, 10)
}
 operacoes.forEach(botao => {
    botao.addEventListener("click", () => {
        operacaoEscolhida = botao.dataset.operacao;
        neutralizarCores()
        botao.style.borderColor = "#414141"
        botao.style.backgroundColor ="  #afb1b3"
    })
})
function clearContas(){
    contas.length = 0
    conta.innerHTML = 'Clique em "Iniciar Jogo"'
    resposta.ariaPlaceholder = ""
}
function desligarCronometro (){
    clearInterval(cronometro)
    tempo = 0
}
function neutralizarCores() { btnOperacoes.forEach(btn => {
    btn.style.borderColor = "black"
    btn.style.backgroundColor ="#f1f1f1"
})
}

function adicao(){
    resultado = contas[0]
    for(i=1;i<contas.length;i++){
        resultado += contas[i]
    }
}
function subtracao(){
    resultado = contas[0]
    for(i=1;i<contas.length;i++){
        resultado -= contas[i]
    }
}
function multiplicacao(){
    resultado = contas[0]
    for(i=1;i<contas.length;i++){
        resultado *= contas[i]
    }
}
function divisao(){
    resultado = contas[0]
    for(i=1;i<contas.length;i++){
        resultado /= contas[i]
    }
}
function mostrarConta(n){
    conta.innerHTML = contas.join(n)
}
function checar (){
    if (operacaoEscolhida == null) {
        alertaIniciar.innerHTML = "Selecione uma operação!"
    } else {
    switch (operacaoEscolhida) {
    case '+':
        gerarNumeros()
        adicao()
        mostrarConta(" + ")
        break;

        case '-':
            gerarNumeros()
            subtracao()
            mostrarConta(" - ")
            break;

            case '*':
                gerarNumeros()
                multiplicacao()
                mostrarConta(" × ")
                    break;

                    case '/':
                        gerarNumeros()
                        divisao()
                        mostrarConta(" ÷ ")
                        break;
    }
    habilitarJogo()
}
}
function gerarNumeros(){
    const algarismos = Number(document.getElementById("algarismos").value)
    const quantidade = Number(document.getElementById("quantidade").value)
    
    for (let i=0; i< quantidade; i++){
        var numero = Math.random()
        numero = Number(numero.toString().slice(2,algarismos+2))
        contas.push(numero) 
    }
}
function ChecarResposta(){
    if (resposta.value != resultado) {
        acerto.innerHTML = "Errou😞, a resposta era " + resultado
    } else {
        acerto.innerHTML = "Acertou em " + tempo.toFixed(2) + " segundos!"
    }
}

iniciar.addEventListener("click", checar)
responder.addEventListener("click",desabilitarJogo)
resposta.addEventListener("keydown",function(event){
    if (event.key === "Enter"){
        desabilitarJogo()
    }
})