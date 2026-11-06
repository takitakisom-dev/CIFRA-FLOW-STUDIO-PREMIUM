let dadosMusica = null;

fetch('mas-que-nada.json')
  .then(r => r.json())
  .then(musica => {
    dadosMusica = musica;
    inicializarApp(musica);
    setRolagem(3);
  });

function inicializarApp(musica) {
    document.getElementById('song-title').innerText = musica.title;
    document.getElementById('song-artist').innerText = musica.artist;
    document.getElementById('tituloCheia').innerText = musica.title;
    document.getElementById('artistaCheia').innerText = musica.artist;
    document.getElementById('bpm').value = musica.audioSettings.bpm;
    document.getElementById('bpm-val').innerText = musica.audioSettings.bpm;
    document.getElementById('pitch').value = musica.audioSettings.pitch;
    document.getElementById('pitch-val').innerText = musica.audioSettings.pitch + ' st';
    document.getElementById('bass').value = musica.audioSettings.bass;
    document.getElementById('bass-val').innerText = musica.audioSettings.bass + ' dB';
    document.getElementById('treble').value = musica.audioSettings.treble;
    document.getElementById('treble-val').innerText = musica.audioSettings.treble + ' dB';
    atualizarBotaoReverb();
    renderizarCifra(musica.content);
}

function renderizarCifra(conteudo) {
    const container = document.getElementById('lyrics-container');
    const containerCheia = document.getElementById('lyrics-cheia');
    let pos = 0;
    let chordHtml = '<div class="chord-line">';
    let textHtml = '<div class="text-line">';
    conteudo.forEach(item => {
        chordHtml += `<span class="chord" style="left:${pos}ch">${item.chord}</span>`;
        textHtml += `<span>${item.text}</span>`;
        pos += item.text.length;
    });
    chordHtml += '</div>';
    textHtml += '</div>';
    container.innerHTML = chordHtml + textHtml;
    containerCheia.innerHTML = chordHtml + textHtml;
}

function atualizarBotaoReverb(){
  const btn = document.getElementById('reverbBtn');
  if(dadosMusica.audioSettings.reverb){ btn.innerText='REVERB: LIGADO'; btn.classList.add('on'); }
  else { btn.innerText='REVERB: DESLIGADO'; btn.classList.remove('on'); }
}
function toggleReverb(){ dadosMusica.audioSettings.reverb = !dadosMusica.audioSettings.reverb; atualizarBotaoReverb(); }

document.getElementById('bpm').addEventListener('input', (e) => {
    document.getElementById('bpm-val').innerText = e.target.value;
    if(dadosMusica) dadosMusica.audioSettings.bpm = parseInt(e.target.value);
});
document.getElementById('pitch').addEventListener('input', (e) => {
    document.getElementById('pitch-val').innerText = e.target.value + ' st';
    if(dadosMusica) dadosMusica.audioSettings.pitch = parseInt(e.target.value);
});
document.getElementById('bass').addEventListener('input', (e) => {
    document.getElementById('bass-val').innerText = e.target.value + ' dB';
    if(dadosMusica) dadosMusica.audioSettings.bass = parseInt(e.target.value);
});
document.getElementById('treble').addEventListener('input', (e) => {
    document.getElementById('treble-val').innerText = e.target.value + ' dB';
    if(dadosMusica) dadosMusica.audioSettings.treble = parseInt(e.target.value);
});
document.getElementById('volume').addEventListener('input', (e) => {
    document.getElementById('volume-val').innerText = e.target.value + '%';
});

function salvarConfiguracao() {
    if(!dadosMusica) return;
    localStorage.setItem('cifra_' + dadosMusica.title, JSON.stringify(dadosMusica));
    console.log("Configurações salvas:", dadosMusica.audioSettings);
    alert("Setup salvo com sucesso para " + dadosMusica.title + "!");
}
function adicionarCifra(){
  let nome = prompt('Nome da nova cifra:','');
  if(nome) alert('Cifra "'+nome+'" adicionada!');
}
function editarCifra(){
  if(!dadosMusica) return;
  let nome = prompt('Editar nome:', dadosMusica.title);
  if(nome){ dadosMusica.title = nome; document.getElementById('song-title').innerText = nome; document.getElementById('tituloCheia').innerText = nome; }
}

let velRolagem=3, rolando=false, timerRolagem=null, tamanhoFonte=20;
function abrirTelaCheia(){ document.getElementById('telaCheia').classList.add('show'); }
function fecharTelaCheia(){ pararRolagem(); document.getElementById('telaCheia').classList.remove('show'); }
function setRolagem(v){ velRolagem=v; for(let i=1;i<=7;i++) document.getElementById('r'+i).classList.remove('ativo'); document.getElementById('r'+v).classList.add('ativo'); if(rolando){ pararRolagem(); iniciarRolagem(); } }
function iniciarRolagem(){ let vel={1:4,2:8,3:14,4:22,5:32,6:45,7:60}; let px=vel[velRolagem]/60; timerRolagem=setInterval(()=>{ let el=document.getElementById('telaCheia'); el.scrollTop+=px; if(el.scrollTop+el.clientHeight>=el.scrollHeight-5) pararRolagem(); },16); }
function pararRolagem(){ rolando=false; clearInterval(timerRolagem); document.getElementById('btnRolar').innerText='▶ Rolar'; }
function toggleRolagem(){ if(rolando) pararRolagem(); else{ rolando=true; document.getElementById('btnRolar').innerText='⏸ Pausar'; iniciarRolagem(); } }
function mudarFonte(d){ tamanhoFonte=Math.max(14,Math.min(36,tamanhoFonte+d)); document.getElementById('lyrics-cheia').style.fontSize=tamanhoFonte+'px'; }
