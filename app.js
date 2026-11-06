const biblioteca = [
  { artista: "Jorge Ben Jor", iniciais: "JB", cor: "#1a6fc4", musicas: [
    { title: "Mas Que Nada", artist: "Jorge Ben Jor", tipo: "vs", audioSettings: { pitch: 0, bpm: 124, bass: 0, treble: 0, reverb: true }, content: [{ chord: "Abm7", text: "O-o-h, " },{ chord: "Db7", text: "m-a-s q-u-e n-a-d-a," },{ chord: "Gbm7", text: " " },{ chord: "Emaj7", text: " S-a-m-b-a j-á..." }] }
  ]},
  { artista: "Caetano Veloso", iniciais: "CV", cor: "#00c853", musicas: [
    { title: "Sozinho", artist: "Caetano Veloso", tipo: "playback", audioSettings: { pitch: 0, bpm: 90, bass: 0, treble: 0, reverb: true }, content: [{ chord: "Am", text: "Às vezes no silêncio da noite..." }] },
    { title: "Você é Linda", artist: "Caetano Veloso", tipo: "vs", audioSettings: { pitch: 0, bpm: 95, bass: 0, treble: 0, reverb: true }, content: [{ chord: "G", text: "Você é linda..." }] }
  ]},
  { artista: "Legião Urbana", iniciais: "LU", cor: "#ff6d00", musicas: [
    { title: "Tempo Perdido", artist: "Legião Urbana", tipo: "playback", audioSettings: { pitch: 0, bpm: 110, bass: 0, treble: 0, reverb: false }, content: [{ chord: "C", text: "Todos os dias quando acordo..." }] },
    { title: "Faroeste Caboclo", artist: "Legião Urbana", tipo: "vs", audioSettings: { pitch: 0, bpm: 120, bass: 0, treble: 0, reverb: false }, content: [{ chord: "G", text: "Não tinha medo o tal João de Santo Cristo..." }] }
  ]},
  { artista: "Capital Inicial", iniciais: "CI", cor: "#aa00ff", musicas: [
    { title: "Primeiros Erros", artist: "Capital Inicial", tipo: "vs", audioSettings: { pitch: 0, bpm: 105, bass: 0, treble: 0, reverb: true }, content: [{ chord: "D", text: "Meu caminho é cada manhã..." }] },
    { title: "Natasha", artist: "Capital Inicial", tipo: "playback", audioSettings: { pitch: 0, bpm: 115, bass: 0, treble: 0, reverb: false }, content: [{ chord: "A", text: "Natasha..." }] }
  ]}
];
let dadosMusica = biblioteca[0].musicas[0];
let pastaAberta = -1;
let filtroAtual = "todas";
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
function abrirMenu(){ document.getElementById('menuLateral').classList.add('show'); document.getElementById('menuFundo').classList.add('show'); atualizarContadores(); }
function fecharMenu(){ document.getElementById('menuLateral').classList.remove('show'); document.getElementById('menuFundo').classList.remove('show'); }
function irPara(tipo){
  filtroAtual = tipo;
  document.querySelectorAll('.menuItem').forEach(el=>el.classList.remove('ativo'));
  if(tipo==='vs') document.getElementById('menu-vs').classList.add('ativo');
  if(tipo==='playback') document.getElementById('menu-playback').classList.add('ativo');
  if(tipo==='todas') document.getElementById('menu-todas').classList.add('ativo');
  document.getElementById('tituloSecao').innerText = tipo==='vs' ? '🎹 Com VS' : tipo==='playback' ? '▶️ Com Playback' : 'Pastas dos Cantores';
  fecharMenu(); renderizarPastas(document.getElementById('busca').value);
}
function atualizarContadores(){
  let vs = biblioteca.reduce((s,p)=>s+p.musicas.filter(m=>m.tipo==='vs').length,0);
  let pb = biblioteca.reduce((s,p)=>s+p.musicas.filter(m=>m.tipo==='playback').length,0);
  let todas = biblioteca.reduce((s,p)=>s+p.musicas.length,0);
  document.getElementById('count-vs').innerText = vs + ' cifras salvas';
  document.getElementById('count-playback').innerText = pb + ' cifras salvas';
  document.getElementById('count-todas').innerText = todas + ' cifras • Tudo que você baixar ou criar';
}
function instalarApp(){
  if(deferredPrompt){ deferredPrompt.prompt(); deferredPrompt.userChoice.then(()=>{ deferredPrompt=null; }); }
  else { alert('Para instalar: no celular, menu do navegador (3 pontinhos) > Adicionar à tela inicial.'); }
}
async function compartilharApp(){
  if(navigator.share){ try{ await navigator.share({ title: 'Cifra Flow', text: 'Meu repertório!', url: location.href }); }catch(e){} }
  else { navigator.clipboard.writeText(location.href); alert('Link copiado: ' + location.href); }
}
function exportarDados(){
  const blob = new Blob([JSON.stringify(biblioteca, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'cifra-flow-backup.json'; a.click();
  alert('Backup exportado!');
}
function importarDados(event){
  const file = event.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try{
      const dados = JSON.parse(e.target.result);
      if(Array.isArray(dados)){ biblioteca.length = 0; dados.forEach(p=>biblioteca.push(p)); }
      else if(dados.title){ biblioteca[0].musicas.push(dados); }
      renderizarPastas(); atualizarContadores(); fecharMenu();
      alert('Importado! Já foi pra Biblioteca.');
    }catch(err){ alert('Arquivo inválido.'); }
  };
  reader.readAsText(file);
}
function renderizarPastas(filtroBusca = "") {
  const lista = document.getElementById('lista-pastas'); lista.innerHTML = "";
  biblioteca.forEach((pasta, idx) => {
    let musicas = pasta.musicas.filter(m => filtroAtual==='todas' || m.tipo===filtroAtual);
    musicas = musicas.filter(m => (m.title + " " + pasta.artista).toLowerCase().includes(filtroBusca.toLowerCase()));
    if(musicas.length===0) return;
    const div = document.createElement('div'); div.className = 'pasta' + (pastaAberta===idx ? ' aberta' : '');
    div.innerHTML = `<div style="display:flex;gap:12px;align-items:center;width:100%" onclick="abrirPasta(${idx})"><div class="pasta-foto" style="background:${pasta.cor}">${pasta.iniciais}</div><div class="pasta-info"><b>${pasta.artista}</b><br><small>${musicas.length} música${musicas.length>1?'s':''} • Pasta do artista</small></div><span>${pastaAberta===idx?'▼':'›'}</span></div><div class="musicas-dentro">${musicas.map(m=>`<div class="musica-item" onclick="abrirMusica(${idx}, ${pasta.musicas.indexOf(m)})"><span>🎵 ${m.title} <small style="color:#aaa">• ${m.tipo==='vs'?'VS':'Playback'}</small></span><span>›</span></div>`).join('')}</div>`;
    lista.appendChild(div);
  });
  if(lista.innerHTML==="") lista.innerHTML = '<p style="color:#aaa">Nenhuma cifra aqui ainda.</p>';
}
function abrirPasta(idx){ pastaAberta = pastaAberta===idx ? -1 : idx; renderizarPastas(document.getElementById('busca').value); }
function filtrar(){ renderizarPastas(document.getElementById('busca').value); }
function abrirMusica(idxPasta, idxMusica){ dadosMusica = biblioteca[idxPasta].musicas[idxMusica]; inicializarApp(dadosMusica); document.getElementById('viewer').classList.add('mostrar'); document.getElementById('viewer').scrollIntoView({behavior:'smooth'}); }
function voltarPastas(){ document.getElementById('viewer').classList.remove('mostrar'); window.scrollTo({top:0,behavior:'smooth'}); }
function inicializarApp(musica){
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
    atualizarBotaoReverb(); renderizarCifra(musica.content);
}
function renderizarCifra(conteudo){
    const container = document.getElementById('lyrics-container');
    const containerCheia = document.getElementById('lyrics-cheia');
    let pos=0, chordHtml='<div class="chord-line">', textHtml='<div class="text-line">';
    conteudo.forEach(item=>{ chordHtml+=`<span class="chord" style="left:${pos}ch">${item.chord}</span>`; textHtml+=`<span>${item.text}</span>`; pos+=item.text.length; });
    chordHtml+='</div>'; textHtml+='</div>';
    container.innerHTML = chordHtml + textHtml; containerCheia.innerHTML = chordHtml + textHtml;
}
function atualizarBotaoReverb(){ const btn=document.getElementById('reverbBtn'); if(dadosMusica.audioSettings.reverb){ btn.innerText='REVERB: LIGADO'; btn.classList.add('on'); } else { btn.innerText='REVERB: DESLIGADO'; btn.classList.remove('on'); } }
function toggleReverb(){ dadosMusica.audioSettings.reverb = !dadosMusica.audioSettings.reverb; atualizarBotaoReverb(); }
document.getElementById('bpm').addEventListener('input', (e)=>{ document.getElementById('bpm-val').innerText=e.target.value; dadosMusica.audioSettings.bpm=parseInt(e.target.value); });
document.getElementById('pitch').addEventListener('input', (e)=>{ document.getElementById('pitch-val').innerText=e.target.value+' st'; dadosMusica.audioSettings.pitch=parseInt(e.target.value); });
document.getElementById('bass').addEventListener('input', (e)=>{ document.getElementById('bass-val').innerText=e.target.value+' dB'; dadosMusica.audioSettings.bass=parseInt(e.target.value); });
document.getElementById('treble').addEventListener('input', (e)=>{ document.getElementById('treble-val').innerText=e.target.value+' dB'; dadosMusica.audioSettings.treble=parseInt(e.target.value); });
document.getElementById('volume').addEventListener('input', (e)=>{ document.getElementById('volume-val').innerText=e.target.value+'%'; });
function salvarConfiguracao(){ localStorage.setItem('cifra_'+dadosMusica.title, JSON.stringify(dadosMusica)); alert("Setup salvo para " + dadosMusica.title + "!"); }
function adicionarCifra(){
  let nome = prompt('Nome da nova cifra:',''); if(!nome) return;
  let artista = prompt('Qual artista?','Jorge Ben Jor'); if(!artista) artista = 'Jorge Ben Jor';
  let tipo = confirm('É com VS? OK = VS / Cancelar = Playback') ? 'vs' : 'playback';
  let pasta = biblioteca.find(p => p.artista.toLowerCase() === artista.toLowerCase());
  if(!pasta){
    let iniciais = artista.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();
    pasta = { artista: artista, iniciais: iniciais, cor: "#1a6fc4", musicas: [] };
    biblioteca.push(pasta);
  }
  pasta.musicas.push({ title: nome, artist: pasta.artista, tipo, audioSettings:{pitch:0,bpm:124,bass:0,treble:0,reverb:true}, content:[{chord:"C",text:"Nova cifra..."}] });
  renderizarPastas(); alert('Cifra "'+nome+'" criada na pasta '+pasta.artista+' como '+tipo.toUpperCase()+'!');
}
function editarCifra(){
  if(!dadosMusica) return;
  let nome = prompt('Editar nome da cifra:', dadosMusica.title);
  if(nome){ dadosMusica.title=nome; document.getElementById('song-title').innerText=nome; document.getElementById('tituloCheia').innerText=nome; renderizarPastas(); }
}
let velRolagem=3, rolando=false, timerRolagem=null, tamanhoFonte=20;
function abrirTelaCheia(){ document.getElementById('telaCheia').classList.add('show'); }
function fecharTelaCheia(){ pararRolagem(); document.getElementById('telaCheia').classList.remove('show'); }
function setRolagem(v){ velRolagem=v; for(let i=1;i<=7;i++) document.getElementById('r'+i).classList.remove('ativo'); document.getElementById('r'+v).classList.add('ativo'); if(rolando){ pararRolagem(); iniciarRolagem(); } }
function iniciarRolagem(){ let vel={1:4,2:8,3:14,4:22,5:32,6:45,7:60}; let px=vel[velRolagem]/60; timerRolagem=setInterval(()=>{ let el=document.getElementById('telaCheia'); el.scrollTop+=px; if(el.scrollTop+el.clientHeight>=el.scrollHeight-5) pararRolagem(); },16); }
function pararRolagem(){ rolando=false; clearInterval(timerRolagem); document.getElementById('btnRolar').innerText='▶ Rolar'; }
function toggleRolagem(){ if(rolando) pararRolagem(); else{ rolando=true; document.getElementById('btnRolar').innerText='⏸ Pausar'; iniciarRolagem(); } }
function mudarFonte(d){ tamanhoFonte=Math.max(14,Math.min(36,tamanhoFonte+d)); document.getElementById('lyrics-cheia').style.fontSize=tamanhoFonte+'px'; }
renderizarPastas(); inicializarApp(dadosMusica); setRolagem(3);
