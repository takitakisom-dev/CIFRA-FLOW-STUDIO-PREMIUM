const biblioteca = [
  { artista: "Jorge Ben Jor", icone: "🎤", musicas: [
    { title: "Mas Que Nada", artist: "Jorge Ben Jor", tipo: "vs", audioSettings: { pitch: 0, bpm: 124, bass: 0, treble: 0, reverb: true }, content: [{ chord: "Abm7", text: "O-o-h, " },{ chord: "Db7", text: "m-a-s q-u-e n-a-d-a," },{ chord: "Gbm7", text: " " },{ chord: "Emaj7", text: " S-a-m-b-a j-á..." }] }
  ]},
  { artista: "Caetano Veloso", icone: "🎤", musicas: [
    { title: "Sozinho", artist: "Caetano Veloso", tipo: "playback", audioSettings: { pitch: 0, bpm: 90, bass: 0, treble: 0, reverb: true }, content: [{ chord: "Am", text: "Às vezes no silêncio da noite..." }] },
    { title: "Você é Linda", artist: "Caetano Veloso", tipo: "vs", audioSettings: { pitch: 0, bpm: 95, bass: 0, treble: 0, reverb: true }, content: [{ chord: "G", text: "Você é linda..." }] }
  ]},
  { artista: "Legião Urbana", icone: "🎸", musicas: [
    { title: "Tempo Perdido", artist: "Legião Urbana", tipo: "playback", audioSettings: { pitch: 0, bpm: 110, bass: 0, treble: 0, reverb: false }, content: [{ chord: "C", text: "Todos os dias quando acordo..." }] },
    { title: "Faroeste Caboclo", artist: "Legião Urbana", tipo: "vs", audioSettings: { pitch: 0, bpm: 120, bass: 0, treble: 0, reverb: false }, content: [{ chord: "G", text: "Não tinha medo o tal João de Santo Cristo..." }] }
  ]}
];

let dadosMusica = biblioteca[0].musicas[0];
let pastaAberta = -1;
let filtroAtual = "todas"; // todas | vs | playback
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });

// MENU
function abrirMenu(){ document.getElementById('menuLateral').classList.add('show'); document.getElementById('menuFundo').classList.add('show'); atualizarContadores(); }
function fecharMenu(){ document.getElementById('menuLateral').classList.remove('show'); document.getElementById('menuFundo').classList.remove('show'); }
function irPara(tipo){
  filtroAtual = tipo;
  document.querySelectorAll('.menuItem').forEach(el=>el.classList.remove('ativo'));
  if(tipo==='vs') document.getElementById('menu-vs').classList.add('ativo');
  if(tipo==='playback') document.getElementById('menu-playback').classList.add('ativo');
  if(tipo==='todas') document.getElementById('menu-todas').classList.add('ativo');
  document.getElementById('tituloSecao').innerText = tipo==='vs' ? '🎹 Minhas Cifras Salvas com VS' : tipo==='playback' ? '▶️ Minhas Cifras Salvas com Playback' : '📚 Biblioteca - Tudo que você baixar ou criar';
  fecharMenu(); renderizarPastas(document.getElementById('busca').value);
}
function atualizarContadores(){
  let todas = biblioteca.reduce((s,p)=>s+p.musicas.length,0);
  let vs = biblioteca.reduce((s,p)=>s+p.musicas.filter(m=>m.tipo==='vs').length,0);
  let pb = biblioteca.reduce((s,p)=>s+p.musicas.filter(m=>m.tipo==='playback').length,0);
  document.getElementById('count-vs').innerText = vs + ' cifras salvas';
  document.getElementById('count-playback').innerText = pb + ' cifras salvas';
  document.getElementById('count-todas').innerText = todas + ' cifras • Tudo que você baixar ou criar fica aqui';
}

// INSTALAR / COMPARTILHAR / EXPORTAR / IMPORTAR
function instalarApp(){
  if(deferredPrompt){ deferredPrompt.prompt(); deferredPrompt.userChoice.then(()=>{ deferredPrompt=null; }); }
  else { alert('Para instalar:\n\nNo celular: abre o menu do navegador (3 pontinhos) > Adicionar à tela inicial / Instalar app.\n\nNo computador: clica no ícone de instalar na barra de endereço.'); }
}
async function compartilharApp(){
  const dados = { title: 'Cifra Flow - Taki Artesanal', text: 'Meu repertório de cifras com VS e Playback!', url: location.href };
  if(navigator.share){ try{ await navigator.share(dados); }catch(e){} }
  else { navigator.clipboard.writeText(location.href); alert('Link copiado! Cola onde você quiser compartilhar: ' + location.href); }
}
function exportarDados(){
  const blob = new Blob([JSON.stringify(biblioteca, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'cifra-flow-backup.json'; a.click();
  alert('Backup exportado! Salva esse arquivo que tem todas as suas cifras.');
}
function importarDados(event){
  const file = event.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try{
      const dados = JSON.parse(e.target.result);
      // Aceita arquivo exportado (array de pastas) ou uma cifra solta
      if(Array.isArray(dados)){ biblioteca.length = 0; dados.forEach(p=>biblioteca.push(p)); }
      else if(dados.title){ biblioteca[0].musicas.push(dados); }
      renderizarPastas(); atualizarContadores(); fecharMenu();
      alert('Importado com sucesso! Já foi pra Biblioteca.');
    }catch(err){ alert('Arquivo inválido. Tem que ser um .json do Cifra Flow.'); }
  };
  reader.readAsText(file);
}

// PASTAS
function renderizarPastas(filtroBusca = "") {
  const lista = document.getElementById('lista-pastas'); lista.innerHTML = "";
  biblioteca.forEach((pasta, idx) => {
    let musicas = pasta.musicas.filter(m => filtroAtual==='todas' || m.tipo===filtroAtual);
    musicas = musicas.filter(m => (m.title + " " + pasta.artista).toLowerCase().includes(filtroBusca.toLowerCase()));
    if(musicas.length===0) return;
    const div = document.createElement('div'); div.className = 'pasta' + (pastaAberta===idx ? ' aberta' : '');
    div.innerHTML = `<div class="pasta-top" onclick="abrirPasta(${idx})"><div><b>${pasta.icone} ${pasta.artista}</b><br><span>${musicas.length} música${musicas.length>1?'s':''}</span></div><span>${pastaAberta===idx?'▼':'›'}</span></div><div class="musicas-dentro">${musicas.map(m=>`<div class="musica-item" onclick="abrirMusica(${idx}, ${pasta.musicas.indexOf(m)})"><span>🎵 ${m.title} <small style="color:#aaa">• ${m.tipo==='vs'?'VS':'Playback'}</small></span><span>›</span></div>`).join('')}</div>`;
    lista.appendChild(div);
  });
  if(lista.innerHTML==="") lista.innerHTML = '<p style="color:#aaa">Nenhuma cifra aqui ainda. Clica em + Adicionar Nova Cifra.</p>';
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
document.getElementById('bpm').addEventListener('input', (e)=>{ document.getElementById('bpm-val').innerText=e.target.value; if(dadosMusica) dadosMusica.audioSettings.bpm=parseInt(e.target.value); });
document.getElementById('pitch').addEventListener('input', (e)=>{ document.getElementById('pitch-val').innerText=e.target.value+' st'; if(dadosMusica) dadosMusica.audioSettings.pitch=parseInt(e.target.value); });
document.getElementById('bass').addEventListener('input', (e)=>{ document.getElementById('bass-val').innerText=e.target.value+' dB'; if(dadosMusica) dadosMusica.audioSettings.bass=parseInt(e.target.value); });
document.getElementById('treble').addEventListener('input', (e)=>{ document.getElementById('treble-val').innerText=e.target.value+' dB'; if(dadosMusica) dadosMusica.audioSettings.treble=parseInt(e.target.value); });
document.getElementById('volume').addEventListener('input', (e)=>{ document.getElementById('volume-val').innerText=e.target.value+'%'; });
function salvarConfiguracao(){ if(!dadosMusica) return; localStorage.setItem('cifra_'+dadosMusica.title, JSON.stringify(dadosMusica)); alert("Setup salvo com sucesso para " + dadosMusica.title + "!"); }
function adicionarCifra(){ let nome=prompt('Nome da nova cifra:',''); if(!nome) return; let tipo=confirm('É com VS? OK = VS / Cancelar = Playback') ? 'vs' : 'playback'; biblioteca[0].musicas.push({ title:nome, artist:biblioteca[0].artista, tipo, audioSettings:{pitch:0,bpm:124,bass:0,treble:0,reverb:true}, content:[{chord:"C",text:"Nova cifra..."}] }); renderizarPastas(); alert('Cifra "'+nome+'" adicionada na Biblioteca como '+tipo.toUpperCase()+'!'); }
function editarCifra(){ if(!dadosMusica) return; let nome=prompt('Editar nome:', dadosMusica.title); if(nome){ dadosMusica.title=nome; document.getElementById('song-title').innerText=nome; document.getElementById('tituloCheia').innerText=nome; renderizarPastas(); } }
let velRolagem=3, rolando=false, timerRolagem=null, tamanhoFonte=20;
function abrirTelaCheia(){ document.getElementById('telaCheia').classList.add('show'); }
function fecharTelaCheia(){ pararRolagem(); document.getElementById('telaCheia').classList.remove('show'); }
function setRolagem(v){ velRolagem=v; for(let i=1;i<=7;i++) document.getElementById('r'+i).classList.remove('ativo'); document.getElementById('r'+v).classList.add('ativo'); if(rolando){ pararRolagem(); iniciarRolagem(); } }
function iniciarRolagem(){ let vel={1:4,2:8,3:14,4:22,5:32,6:45,7:60}; let px=vel[velRolagem]/60; timerRolagem=setInterval(()=>{ let el=document.getElementById('telaCheia'); el.scrollTop+=px; if(el.scrollTop+el.clientHeight>=el.scrollHeight-5) pararRolagem(); },16); }
function pararRolagem(){ rolando=false; clearInterval(timerRolagem); document.getElementById('btnRolar').innerText='▶ Rolar'; }
function toggleRolagem(){ if(rolando) pararRolagem(); else{ rolando=true; document.getElementById('btnRolar').innerText='⏸ Pausar'; iniciarRolagem(); } }
function mudarFonte(d){ tamanhoFonte=Math.max(14,Math.min(36,tamanhoFonte+d)); document.getElementById('lyrics-cheia').style.fontSize=tamanhoFonte+'px'; }

renderizarPastas(); inicializarApp(dadosMusica); setRolagem(3);
