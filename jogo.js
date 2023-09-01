var altura = 0
var largura = 0
var vidas = 1
var tempo = 20

var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'facil'){
	criaMosquitoTempo = 2000
} else if (nivel === 'normal') {
    criaMosquitoTempo = 1600
} else if (nivel === 'dificil') {
    criaMosquitoTempo = 1200
} else if (nivel === 'impossivel') {
    criaMosquitoTempo = 790
}

// Pré-carregar o som de tapa.wav
var somDeTapa = new Audio('tapa.wav')
somDeTapa.load() // Isso carrega o som antes de começar o jogo

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function () {
    tempo -= 1

    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }

}, 1000)

function posicaoRandomica() {
    // Remover o mosquito anterior (caso exista)
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()
		//console.log('elemento selecionado foi: v' + vidas)
		
		if(vidas > 2) {

			window.location.href = 'fim_de_jogo.html'
		} else {
			document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"

			vidas++
		}
		        
    }

    var posicaoX = Math.floor(Math.random() * largura) -90
    var posicaoY = Math.floor(Math.random() * altura) -90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    // Criar o elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function () {
        this.remove()
        
        reproduzirSomDeTapa() // Reproduzir som instantaneamente
    }

    document.body.appendChild(mosquito)
}

function reproduzirSomDeTapa() {
    somDeTapa.currentTime = 0 // Reiniciar o áudio do início
    somDeTapa.play()
}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch (classe) {
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch (classe) {
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'
    }
}