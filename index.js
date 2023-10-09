document.addEventListener('DOMContentLoaded', function() {

  const btnPlay = document.getElementById('PlayPause');
  const btnVoltar = document.getElementById('btnVoltar');
  const btnAvancar = document.getElementById('btnAvancar');
  const btnMusica = document.getElementById('btnMusica');
  const section = document.getElementById('main');
  const footer = document.getElementById('foot');
  let indice = 0;
  let musicaAtual = null; 

  // FUNCTIONS
  function playMusic(audioElement) {
    audioElement.play();
    btnPlay.dataset.status = '1'; //Play
    musicaAtual = audioElement;
  }

  function pauseMusic(audioElement) {
    audioElement.pause();
    btnPlay.dataset.status = '0'; //Pause
  }

  // ADICIONAR MÚSICA NA SECTION
  btnMusica.addEventListener('click', function(e) {
    e.preventDefault();

    const fileInput = document.getElementById('video');

    const file = fileInput.files[0];
    console.log(file);
    if (file) {
      const objectURL = URL.createObjectURL(file);
      console.log("Aqui está a URL:" + objectURL);
      const audioElement = document.createElement('audio');
      const divAudio = document.createElement('div');
      const imgAudio = document.createElement('img');
      const playButton = document.createElement('button');
      imgAudio.className = "imgLogo";
      imgAudio.src = "/headset.png";
      divAudio.className = "aud";
      divAudio.appendChild(audioElement);
      divAudio.appendChild(imgAudio);
      divAudio.appendChild(playButton);
      indice++;
      let audioElementId = 'musica' + indice;

      audioElement.id = audioElementId;
      audioElement.controls = false;
      audioElement.src = objectURL;
      audioElement.className = "audioPlayer";
      playButton.textContent = "Play"; 
      section.appendChild(divAudio);
      playButton.addEventListener('click', function() {
        if (musicaAtual !== audioElement) {
          if (musicaAtual) {
            pauseMusic(musicaAtual);
          }
          playMusic(audioElement);
        } else {
          if (btnPlay.dataset.status === '1') {
            pauseMusic(audioElement);
          } else {
            playMusic(audioElement);
          }
        }
      });
    } else {
      alert('Por favor, selecione um arquivo de áudio.');
    }
  });

  // BOTÃO PLAY/PAUSE
  btnPlay.addEventListener('click', function() {
    if (musicaAtual) {
      console.log(musicaAtual)
      if (btnPlay.dataset.status === '1') {
        pauseMusic(musicaAtual);
      } else {
        playMusic(musicaAtual);
        btnPlay.dataset.status = "2";
      }
    }
});



//BOTÃO PASSAR E VOLTAR

btnAvancar.addEventListener('click', function(){
  let IdProxMusica = 'musica' + (indice + 1);
  console.log(IdProxMusica);
  const ProximaMusica = document.getElementById(IdProxMusica);
  if(ProximaMusica){
   musicaAtual.load();   
   musicaAtual.pause();   
   indice++;
  playMusic(ProximaMusica);
}
});


btnVoltar.addEventListener('click', function(){
  let IdProxMusica = 'musica' + (indice - 1);
  console.log(IdProxMusica);
  const MusicaAnterior = document.getElementById(IdProxMusica);
  if(MusicaAnterior){
   musicaAtual.load();
   musicaAtual.pause();   
   indice--;
  playMusic(MusicaAnterior);
}

});

});