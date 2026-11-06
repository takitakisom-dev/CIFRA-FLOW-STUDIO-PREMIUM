const dadosMusica = {
  "title": "Mas Que Nada - Jorge Ben Jor",
  "audioSettings": { "pitch": 0, "bpm": 124 },
  "content": [
    { "chord": "Abm7", "text": "O-o-h, " },
    { "chord": "Db7", "text": "m-a-s q-u-e n-a-d-a," }
  ]
};

function inicializarApp(musica) {
    document.getElementById('song-title').innerText = musica.title;
    document.getElementById('bpm').value = musica.audioSettings.bpm;
    document.getElementById('bpm-val').innerText = musica.audioSettings.bpm;
    
    renderizarCifra(musica.content);
}

function renderizarCifra(conteudo) {
    const container = document.getElementById('lyrics-container');
    let chordHtml = '<div class="chord-line">';
    let textHtml = '<div class="text-line">';
    
    conteudo.forEach(item => {
        chordHtml += `<span class="chord">${item.chord}</span>`;
        textHtml += `<span>${item.text}</span>`;
    });
    
    chordHtml += '</div>';
    textHtml += '</div>';
    container.innerHTML = chordHtml + textHtml;
}

document.getElementById('bpm').addEventListener('input', (e) => {
    document.getElementById('bpm-val').innerText = e.target.value;
});

function salvarConfiguracao() {
    const novoBpm = document.getElementById('bpm').value;
    const novoPitch = document.getElementById('pitch').value;
    console.log("Configurações salvas:", { bpm: novoBpm, pitch: novoPitch });
    alert("Setup salvo com sucesso para o seu repertório!");
}

inicializarApp(dadosMusica);

