const statusGame ={
    view: {
        quadrado: document.querySelectorAll(".quadrado"),
        inimigo: document.querySelector(".inimigo"),
        tempo: document.querySelector("#tempo-restante"),
        pontos: document.querySelector("#pontos"),
        vidas: document.querySelector("#vidas"),
    },
    values: {
        tempoId: null,
        velocidadeDoGame: 500,
        posicao: 0,
        resultado: 0,
        tempoAtual: 60,
        vidasRestantes: 10,
    },
    actions:{
        contagemRegresivaDoTempoId: setInterval(contagemRegresiva, 1000),
    }
}

function contagemRegresiva(){
    statusGame.values.tempoAtual--;
    statusGame.values.velocidadeDoGame = statusGame.values.velocidadeDoGame - 1;
    statusGame.view.tempo.textContent = statusGame.values.tempoAtual;

    if(statusGame.values.tempoAtual === 0){
        clearInterval(statusGame.actions.contagemRegresivaDoTempoId);
        clearInterval(moverInimigo);
        alert("FIM DE JOGO! Seu resultado foi: " + statusGame.values.resultado);
        window.location.href = "https://tederr.github.io/Wreck-It_Ralph/"
        
    }
}

function playMusica(audioNome){
    let audio = new Audio(`./src/audios/${audioNome}.mp3`);
    audio.volume = 0.1;
    audio.play();
}

function iniciarMusica(audioNome) {
    let audio = localStorage.getItem("audio")
      ? JSON.parse(localStorage.getItem("audio"))
      : null;
    
    if (!audio) {
      audio = new Audio(`./src/audios/${audioNome}.mp3`);
      audio.volume = 0.1;
      audio.loop = true;
      audio.play();
      localStorage.setItem("musica", JSON.stringify({ playing: true }));
    } else if (audio.playing) {
      audio = new Audio(`./src/audios/${audioNome}.mp3`);
      audio.volume = 0.1;
      audio.loop = true;
      audio.play();
    }
}

function quadradoAleatorio(){
    statusGame.view.quadrado.forEach((quadrado) => {
        quadrado.classList.remove("inimigo");
    });

    let numeroAleatorio = Math.floor(Math.random() * 9);
    let quadradoAleatorio = statusGame.view.quadrado[numeroAleatorio];
    quadradoAleatorio.classList.add("inimigo")
    statusGame.values.posicao = quadradoAleatorio.id
}

function moverInimigo(){
    statusGame.values.tempoId = setInterval(quadradoAleatorio, statusGame.values.velocidadeDoGame)
}

function addListenerHitBox(){
    statusGame.view.quadrado.forEach((quadrado) => {
        quadrado.addEventListener("mousedown", () => {
            if(quadrado.id === statusGame.values.posicao){
                statusGame.values.resultado++;
                statusGame.view.pontos.textContent = statusGame.values.resultado;
                statusGame.values.posicao = null;
                playMusica("hit");
            }else if(quadrado.id !== statusGame.values.posicao){
                statusGame.values.vidasRestantes--;
                statusGame.view.vidas.textContent = statusGame.values.vidasRestantes;
                playMusica("gameOver") 
                if(statusGame.values.vidasRestantes === 0){
                    alert("FIM DE JOGO! Seu resultado foi: " + statusGame.values.resultado);
                    window.location.href = "https://tederr.github.io/Wreck-It_Ralph/"
                }
            }
        })
    });
}

function iniciar(){
    moverInimigo();
    addListenerHitBox();
    iniciarMusica("boosFith");
}

iniciar();