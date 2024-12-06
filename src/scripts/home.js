function playMusica(audioNome) {
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


function iniciar() {
  playMusica("musicaInicio");
}

iniciar();
