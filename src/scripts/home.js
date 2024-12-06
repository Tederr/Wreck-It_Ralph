
function playMusica(audioNome){
    let audio = new Audio(`./src/audios/${audioNome}.m4a`);
    audio.volume = 0.1;
    audio.loop = true;
    audio.play();
}

function iniciar(){
    playMusica("musicaInicio");
}

iniciar();