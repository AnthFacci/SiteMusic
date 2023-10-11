document.addEventListener('DOMContentLoaded', function() {

  const btnPlay = document.getElementById('PlayPause');
  const btnVoltar = document.getElementById('btnVoltar');
  const btnAvancar = document.getElementById('btnAvancar');
  const btnMusica = document.getElementById('btnMusica');
  const section = document.getElementById('main');
  const footer = document.getElementById('foot');
  const tempoTotal = document.getElementById('hr');
  const tempoAtual = document.getElementById('currentTime');
  const spanTotal = document.getElementById('total');
  const controleDeslizante = document.getElementById('controleDeslizante');
  const volume = document.getElementById('volume');
  const loopBtn = document.getElementById('btnLoop');
  const imgLoop = document.getElementById('loop');
  let indice = 0;
  let musicaAtual = null; 
  let imagemAtual = 1;

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

  function trocarImagem(imagemAtual) {
    console.log("função trocar chamada")
    if (imagemAtual === 1) {
        const img = document.getElementById('pP');
        img.src = "pause.png";
        console.log(imagemAtual);
    } else if(imagemAtual === 2) {
        const img = document.getElementById('pP');
        img.src = "play-button.png";
    }
}

function currentMusica(totalTemp, atualTemp) {
  if (atualTemp && totalTemp) {
    const porcentagem = (atualTemp / totalTemp) * 100;
    const larguraDaBarra = (porcentagem * tempoTotal.offsetWidth) / 100;
    const posicaoInicial = 68;
    const posicaoFinal = larguraDaBarra + posicaoInicial;
    tempoAtual.style.left = posicaoFinal + 'px';
  }
}

function vol(audioElement){
  var volume = document.getElementById('controleDeslizante').value;
  audioElement.volume = volume;
}

function trocarLoop(){
  if(imgLoop.dataset.img === "1"){
    imgLoop.src = "loop-ver.png";
    imgLoop.dataset.img = "0";
    console.log('Switch');
  }else if(imgLoop.dataset.img === "0"){
    imgLoop.src = "loop.png";
    imgLoop.dataset.img = "1";
    console.log('Switch');
  }
}

function loop(audioElement){
  if(audioElement){
    if(loopBtn.dataset.loop === "false"){
    audioElement.loop = true;
    loopBtn.dataset.loop = "true";
    trocarLoop();
    console.log('Loop ativado!' + loopBtn.dataset.loop)
   }
   else if(loopBtn.dataset.loop === "true"){
    audioElement.loop = false;
    loopBtn.dataset.loop = "false";
    trocarLoop();
    console.log('Loop desativado' + loopBtn.dataset.loop)
   }
 }
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
      playButton.className = "playBtnM";
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

        audioElement.addEventListener('timeupdate', function(){
          const totalTemp = audioElement.duration;
          spanTotal.textContent = totalTemp.toFixed(2);
          const atualTemp = audioElement.currentTime;
          currentMusica(totalTemp,atualTemp);
          vol(audioElement);
        })
        
        loopBtn.addEventListener('click', function(){
              loop(audioElement);
        });

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
        trocarImagem(imagemAtual);
        imagemAtual = 2;
        pauseMusic(musicaAtual);
        btnPlay.dataset.status = '0'
      } else if(btnPlay.dataset.status === '0'){
        trocarImagem(imagemAtual);
        imagemAtual = 1;
        playMusic(musicaAtual);
        btnPlay.dataset.status = "1";
      }
    }
});

//ANIMATION VOLUME

volume.addEventListener('mouseenter', function () {
  controleDeslizante.style.display = 'block';
});

volume.addEventListener('mouseleave', function () {
  setTimeout(function () {
      controleDeslizante.style.display = 'none';
      controleDeslizante.style.right = '200px';
  }, 5000); 
});;



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