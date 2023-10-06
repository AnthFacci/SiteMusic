document.addEventListener('DOMContentLoaded', function() {

const btnPlay = document.getElementById('PlayPause');
const btnVoltar = document.getElementById('btnVoltar');
const btnAvancar = document.getElementById('btnAvancar');
const btnMusica = document.getElementById('btnMusica');
const section = document.getElementById('main')
const footer = document.getElementById('foot');
  

// ADICIONAR MUSICA NA SECTION
document.getElementById('btnMusica').addEventListener('click', function (e) {
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
        imgAudio.className = "imgLogo";
        imgAudio.src = "/headset.png";
        divAudio.className = "aud";
        divAudio.appendChild(audioElement);
        divAudio.appendChild(imgAudio);
        audioElement.id = "musica";
        audioElement.controls = false;
        audioElement.src = objectURL;
        audioElement.className = "audioPlayer";
        section.appendChild(divAudio);
        // fileInput.src = objectURL;
        // fileInput.style.display = 'block';
    } else {
        alert('Por favor, selecione um arquivo de áudio.');
    }
});

// BOTÃO PLAY/PAUSE

btnPlay.addEventListener('click', function(){
    if (btnPlay.dataset.status === '0') {
        btnPlay.dataset.status = '1';
        console.log("Agora data-status é 1.");
        const musica = document.getElementById('musica');
        musica.play();
        
    } else if (btnPlay.dataset.status === '1') {
        btnPlay.dataset.status = '0';
        console.log("Agora data-status é 0.");
        musica.pause();
    }
});

//BOTÃO PASSAR E VOLTAR

btnAvancar.addEventListener('click', function(){
    
})


});

