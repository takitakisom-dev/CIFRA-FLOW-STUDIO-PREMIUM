let biblioteca=[
{artista:"Caetano Veloso",emoji:"🎤",musicas:[
{title:"Oração ao Tempo",tipo:"vs",lines:[{chords:[{chord:"G",pos:0},{chord:"D",pos:12}],text:"És um senhor tão bonito"},{chords:[{chord:"Em",pos:0}],text:"Quanto a cara do meu filho"}]},
{title:"Sozinho",tipo:"playback",lines:[{chords:[{chord:"C",pos:0},{chord:"G",pos:10}],text:"Às vezes no silêncio da noite"}]}
]},
{artista:"Gilberto Gil",emoji:"🎤",musicas:[
{title:"Andar Com Fé",tipo:"vs",lines:[{chords:[{chord:"A",pos:0}],text:"Andar com fé eu vou"}]}
]},
{artista:"Legião Urbana",emoji:"🎸",musicas:[
{title:"Tempo Perdido",tipo:"vs",lines:[{chords:[{chord:"G",pos:0}],text:"Todos os dias quando acordo"}]},
{title:"Faroeste Caboclo",tipo:"playback",lines:[{chords:[{chord:"Em",pos:0}],text:"Não tinha medo o tal João de Santo Cristo"}]}
]},
{artista:"Jorge Ben Jor",emoji:"🎤",musicas:[
{title:"Mas Que Nada",tipo:"vs",lines:[{chords:[{chord:"Am",pos:0}],text:"Oariá raiô, obá obá obá"}]}
]}
];
let pastaAberta=-1, filtroAtual='todas', musicaAtual=null, tomAtual=0, simplificada=false, setlist=JSON.parse(localStorage.getItem('cf_setlist')||'[]'), criados=JSON.parse(localStorage.getItem('cf_criados')||'[{"nome":"Domingo Igreja 08/09","tipo":"Show"},{"nome":"Ensaio Quinta","tipo":"Ensaio"}]'), config=JSON.parse(localStorage.getItem('cf_config')||'{}');
let fonteGeral=config.fonte||22, modoAtual=config.modo||'dia', corFundo=config.corFundo||'#eef4fb', corLetra=config.corLetra||'#111111';
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;});
const CORES_FUNDO=['#eef4fb','#ffffff','#fef3c7','#dcfce7','#fce7f3','#e0e7ff','#f3e8ff','#fee2e2','#ecfeff','#f5f5f4'];
const CORES_LETRA=['#111111','#1a6fc4','#065f46','#7c2d12','#7f1d1d','#4c1d95','#831843','#0f766e','#000000','#334155'];
const TEMAS=['Clássico','Claro','Escuro','Azul','Verde','Rosa','Minimal','Contraste','Suave','Noturno'];
const ACORDES_BASE=['C','D','E','F','G','A','B','Cm','Dm','Em','Fm','Gm','Am','Bm','C7','D7','E7','F7','G7','A7','B7','Cmaj7','Dmaj7','Emaj7','Fmaj7','Gmaj7','Amaj7','Bmaj7','C#','D#','F#','G#','A#','C#m','D#m','F#m','G#m','A#m','Bb','Eb','Ab','Db','Gb','Bbm','Ebm','Abm','Dbm','Gbm','Bb7','Eb7','Ab7','Db7','Gb7','Csus4','Dsus4','Esus4','Fsus4','Gsus4','Asus4','Bsus4','Cadd9','Dadd9','Eadd9','Fadd9','Gadd9','Aadd9','C6','D6','E6','F6','G6','A6','Cdim','Ddim','Edim','Fdim','Gdim','Adim','Bdim','Caug','Daug','Eaug','Faug','Gaug','Aaug','Baug','C9','D9','E9','F9','G9','A9','B9','Cm7','Dm7','Em7','Fm7','Gm7','Am7','Bm7','C7M','D7M','E7M','F7M','G7M','A7M','B7M','C5','D5','E5','F5','G5','A5','B5'];
const DIAGRAMAS={C:{cordas:['X','3','2','0','1','0'],dica:'Dedo 1 na 2ª corda, 1ª casa. Dedo 2 na 4ª corda, 2ª casa. Dedo 3 na 5ª corda, 3ª casa.'},G:{cordas:['3','2','0','0','0','3'],dica:'Dedo 2 na 5ª corda, 2ª casa. Dedo 1 na 6ª corda, 3ª casa. Dedo 3 na 1ª corda, 3ª casa.'},D:{cordas:['X','X','0','2','3','2'],dica:'Dedo 1 na 3ª corda, 2ª casa. Dedo 2 na 1ª corda, 2ª casa. Dedo 3 na 2ª corda, 3ª casa.'},Em:{cordas:['0','2','2','0','0','0'],dica:'Dedo 2 na 5ª corda, 2ª casa. Dedo 3 na 4ª corda, 2ª casa.'},Am:{cordas:['X','0','2','2','1','0'],dica:'Dedo 1 na 2ª corda, 1ª casa. Dedo 2 na 4ª corda, 2ª casa. Dedo 3 na 3ª corda, 2ª casa.'},A:{cordas:['X','0','2','2','2','0'],dica:'Três dedos juntos na 2ª casa.'},E:{cordas:['0','2','2','1','0','0'],dica:'Dedo 1 na 3ª corda, 1ª casa. Dedo 2 e 3 na 2ª casa.'},F:{cordas:['1','3','3','2','1','1'],dica:'Pestana na 1ª casa. Força no indicador.'},B:{cordas:['X','2','4','4','4','2'],dica:'Pestana na 2ª casa.'},Dm:{cordas:['X','X','0','2','3','1'],dica:'Dedo 1 na 1ª corda, 1ª casa. Dedo 2 na 3ª corda, 2ª casa. Dedo 3 na 2ª corda, 3ª casa.'}};

function salvarLocal(){localStorage.setItem('cf_setlist',JSON.stringify(setlist));localStorage.setItem('cf_criados',JSON.stringify(criados));localStorage.setItem('cf_config',JSON.stringify(config));}
function renderizarPastas(filtroBusca=""){
  const lista=document.getElementById('lista-pastas'); lista.innerHTML="";
  biblioteca.forEach((pasta,idx)=>{
    let musicas=pasta.musicas.filter(m=>filtroAtual==='todas'||m.tipo===filtroAtual);
    musicas=musicas.filter(m=>(m.title+" "+pasta.artista).toLowerCase().includes(filtroBusca.toLowerCase()));
    if(!musicas.length) return;
    const div=document.createElement('div'); div.className='pasta'+(pastaAberta===idx?' aberta':'');
    div.innerHTML=`<div onclick="abrirPasta(${idx})"><div class="pasta-folder"><div class="pasta-tab"></div><div class="pasta-back"></div><div class="pasta-front"><b>${pasta.emoji} ${pasta.artista}</b><small>${musicas.length} música${musicas.length>1?'s':''}</small></div></div></div>`;
    lista.appendChild(div);
    if(pastaAberta===idx){ const dentro=document.createElement('div'); dentro.className='musicas-dentro'; dentro.style.display='flex'; dentro.innerHTML=musicas.map(m=>`<div class="musica-item" onclick="abrirMusica(${idx},${pasta.musicas.indexOf(m)})"><span>🎵 ${m.title} <small style="color:#888">• ${m.tipo==='vs'?'VS':'Playback'}</small></span><div style="display:flex;gap:6px"><button class="btnSet" onclick="event.stopPropagation();adicionarNaSetlist(${idx},${pasta.musicas.indexOf(m)})">+ Setlist</button><span>›</span></div></div>`).join(''); lista.appendChild(dentro); }
  });
  if(!lista.innerHTML) lista.innerHTML='<p style="color:#888">Nenhuma cifra aqui ainda.</p>';
}
function abrirPasta(i){ pastaAberta=pastaAberta===i?-1:i; renderizarPastas(document.getElementById('busca').value); }
function filtrar(){ renderizarPastas(document.getElementById('busca').value); }
function abrirMusica(pi,mi){ musicaAtual={pi,mi,...biblioteca[pi].musicas[mi],artista:biblioteca[pi].artista}; tomAtual=0; document.getElementById('viewer').classList.add('mostrar'); document.getElementById('song-title').textContent=musicaAtual.title; document.getElementById('song-artist').textContent=musicaAtual.artista+' • '+(musicaAtual.tipo==='vs'?'VS':'Playback'); renderLetra(); document.getElementById('viewer').scrollIntoView({behavior:'smooth'}); }
function voltarPastas(){ document.getElementById('viewer').classList.remove('mostrar'); }
function renderLetra(){
  if(!musicaAtual) return;
  const html=musicaAtual.lines.map(l=>{ let ch=l.chords.map(c=>`<span class="chord" style="left:${c.pos*8}px" onclick="mostrarAcorde('${c.chord}')">${transpor(c.chord,tomAtual)}</span>`).join(''); return `<div><div class="chord-line">${ch}</div><div class="text-line">${l.text}</div></div>`; }).join('');
  document.getElementById('lyrics-container').innerHTML=html;
  document.getElementById('lyrics-cheia').innerHTML=html;
  document.getElementById('tituloCheia').textContent=musicaAtual.title;
  document.getElementById('artistaCheia').textContent=musicaAtual.artista;
  document.getElementById('tomAtual').textContent=tomAtual===0?'Original':(tomAtual>0?'+'+tomAtual:tomAtual);
  document.getElementById('tomCheia').textContent=document.getElementById('tomAtual').textContent;
}
const NOTAS=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
function transpor(acorde,semi){ if(!semi) return acorde; let m=acorde.match(/^([A-G]#?)(.*)$/); if(!m) return acorde; let i=NOTAS.indexOf(m[1]); if(i<0) return acorde; return NOTAS[(i+semi+12)%12]+m[2]; }
function mudarTom(d){ tomAtual+=d; renderLetra(); }
function toggleSimplificada(){ simplificada=!simplificada; document.getElementById('btnSimp').classList.toggle('on',simplificada); document.getElementById('btnSimpCheia').classList.toggle('ativo',simplificada); alert(simplificada?'Modo Simplificada ligado':'Modo Simplificada desligado'); }
function salvarConfiguracao(){ alert('Setup salvo! Volume, Pitch, BPM, Grave, Agudo e Reverb salvos pra essa música.'); }
function toggleReverb(){ let b=document.getElementById('reverbBtn'); let on=b.textContent.includes('LIGADO'); b.textContent=on?'REVERB: DESLIGADO':'REVERB: LIGADO'; b.classList.toggle('on',!on); }

// MENU / TELAS
function abrirMenu(){ document.getElementById('menuLateral').classList.add('show'); document.getElementById('menuFundo').classList.add('show'); atualizarContadores(); }
function fecharMenu(){ document.getElementById('menuLateral').classList.remove('show'); document.getElementById('menuFundo').classList.remove('show'); }
function atualizarContadores(){ let vs=biblioteca.reduce((a,p)=>a+p.musicas.filter(m=>m.tipo==='vs').length,0); let pb=biblioteca.reduce((a,p)=>a+p.musicas.filter(m=>m.tipo==='playback').length,0); document.getElementById('count-vs').textContent=vs+' cifras'; document.getElementById('count-playback').textContent=pb+' cifras'; document.getElementById('count-todas').textContent=(vs+pb)+' cifras'; document.getElementById('count-setlist').textContent=setlist.length+' músicas'; }
function irPara(tipo){ filtroAtual=tipo; pastaAberta=-1; document.getElementById('tituloSecao').textContent=tipo==='vs'?'Cifras Salvas com VS':tipo==='playback'?'Cifras Salvas com Playback':'Pastas dos Cantores'; document.querySelectorAll('.menuItem').forEach(e=>e.classList.remove('ativo')); let id=tipo==='vs'?'menu-vs':tipo==='playback'?'menu-playback':'menu-todas'; let el=document.getElementById(id); if(el) el.classList.add('ativo'); fecharMenu(); renderizarPastas(); window.scrollTo({top:0,behavior:'smooth'}); }
function abrirSetlist(){ fecharMenu(); document.getElementById('telaSetlist').classList.add('show'); renderSetlist(); }
function fecharSetlist(){ document.getElementById('telaSetlist').classList.remove('show'); }
function renderSetlist(){ let el=document.getElementById('lista-setlist'); if(!setlist.length){ el.innerHTML='<p style="color:#888">Setlist vazio. Abre uma música e aperta + Setlist.</p>'; return; } el.innerHTML=setlist.map((s,i)=>`<div class="set-item"><div><b>${i+1}. ${s.title}</b><br><small style="color:#888">${s.artista}</small></div><button onclick="removerSetlist(${i})" style="background:#ff3b30;color:#fff;border:0;padding:8px 12px;border-radius:20px;cursor:pointer">✕</button></div>`).join(''); }
function adicionarNaSetlist(pi,mi){ let m=biblioteca[pi].musicas[mi]; setlist.push({title:m.title,artista:biblioteca[pi].artista}); salvarLocal(); atualizarContadores(); alert(m.title+' adicionada na Setlist!'); }
function adicionarAtualNaSetlist(){ if(!musicaAtual) return; setlist.push({title:musicaAtual.title,artista:musicaAtual.artista}); salvarLocal(); atualizarContadores(); alert('Adicionada na Setlist!'); }
function removerSetlist(i){ setlist.splice(i,1); salvarLocal(); renderSetlist(); atualizarContadores(); }
function limparSetlist(){ if(confirm('Limpar toda a Setlist?')){ setlist=[]; salvarLocal(); renderSetlist(); atualizarContadores(); } }
function compartilharSetlist(){ let txt='🎤 SETLIST DO SHOW\n\n'+setlist.map((s,i)=>(i+1)+'. '+s.title+' - '+s.artista).join('\n'); if(navigator.share) navigator.share({text:txt}); else { navigator.clipboard.writeText(txt); alert('Setlist copiada!'); } }

// CONFIG
function abrirConfig(){ document.getElementById('telaConfig').classList.add('show'); renderConfig(); }
function fecharConfig(){ document.getElementById('telaConfig').classList.remove('show'); }
function renderConfig(){
  document.getElementById('coresFundo').innerHTML=CORES_FUNDO.map(c=>`<div class="corBtn ${c===corFundo?'sel':''}" style="background:${c};border-color:#ddd" onclick="setCorFundo('${c}')"></div>`).join('');
  document.getElementById('coresLetra').innerHTML=CORES_LETRA.map(c=>`<div class="corBtn ${c===corLetra?'sel':''}" style="background:${c};border-color:#ddd" onclick="setCorLetra('${c}')"></div>`).join('');
  document.getElementById('listaTemas').innerHTML=TEMAS.map(t=>`<button class="btnAcao" onclick="setTema('${t}')">${t}</button>`).join('');
  document.getElementById('cfgNomeMusico').value=config.nomeMusico||'';
  document.getElementById('cfgLogin').value=config.login||'';
  document.getElementById('fonteGeralVal').textContent=fonteGeral+'px';
  document.getElementById('btnDia').classList.toggle('on',modoAtual==='dia');
  document.getElementById('btnNoite').classList.toggle('on',modoAtual==='noite');
  aplicarConfig();
}
function setCorFundo(c){ corFundo=c; config.corFundo=c; renderConfig(); }
function setCorLetra(c){ corLetra=c; config.corLetra=c; renderConfig(); }
function setTema(t){ alert('Tema '+t+' aplicado!'); if(t==='Escuro'||t==='Noturno') setModo('noite'); else if(t==='Claro') setModo('dia'); }
function setModo(m){ modoAtual=m; config.modo=m; if(m==='noite'){ corFundo='#0f0f0f'; corLetra='#ffffff'; config.corFundo=corFundo; config.corLetra=corLetra; } else { corFundo='#eef4fb'; corLetra='#111111'; config.corFundo=corFundo; config.corLetra=corLetra; } renderConfig(); }
function mudarFonteGeral(d){ fonteGeral=Math.max(14,Math.min(36,fonteGeral+d)); config.fonte=fonteGeral; document.getElementById('fonteGeralVal').textContent=fonteGeral+'px'; aplicarConfig(); }
function mudarFonte(d){ mudarFonteGeral(d); }
function aplicarConfig(){
  document.body.style.background=corFundo; document.body.style.color=corLetra;
  document.getElementById('lyrics-cheia').style.fontSize=fonteGeral+'px';
  document.getElementById('viewer').style.fontSize=(fonteGeral-4)+'px';
  let nome=config.nomeMusico||''; document.getElementById('nomeMusicoTopo').textContent=nome?'• '+nome:'';
  document.getElementById('nomeMenuTopo').textContent=nome||'Taki Artesanal';
  document.getElementById('avatarTopo').textContent=(nome||'TA').substring(0,2).toUpperCase();
  let telaCheia=document.getElementById('telaCheia'); if(telaCheia){ telaCheia.style.background=corFundo; telaCheia.style.color=corLetra; }
}
function salvarConfigGeral(){ config.nomeMusico=document.getElementById('cfgNomeMusico').value; config.login=document.getElementById('cfgLogin').value; config.senha=document.getElementById('cfgSenha').value; salvarLocal(); aplicarConfig(); alert('Configurações salvas! Nome do músico: '+(config.nomeMusico||'—')); fecharConfig(); }

// CRIAR
function abrirCriar(){ fecharMenu(); document.getElementById('telaCriar').classList.add('show'); renderCriados(); }
function fecharCriar(){ document.getElementById('telaCriar').classList.remove('show'); }
function renderCriados(){ document.getElementById('lista-criados').innerHTML=criados.map((c,i)=>`<div class="set-item"><div><b>${c.nome}</b><br><small style="color:#888">${c.tipo}</small></div><button onclick="removerCriado(${i})" style="background:#ff3b30;color:#fff;border:0;padding:8px 12px;border-radius:20px;cursor:pointer">✕</button></div>`).join('')||'<p style="color:#888">Nenhum ainda.</p>'; }
function criarTipo(tipo){ let nome=prompt('Nome do '+tipo+':'); if(!nome) return; criados.push({nome,tipo}); salvarLocal(); renderCriados(); alert(tipo+' "'+nome+'" criado!'); }
function removerCriado(i){ criados.splice(i,1); salvarLocal(); renderCriados(); }

// TREINO
function abrirTreino(){ fecharMenu(); document.getElementById('telaTreino').classList.add('show'); document.getElementById('lista-acordes').innerHTML=ACORDES_BASE.map(a=>`<button class="btnAcao" onclick="mostrarAcorde('${a}')">${a}</button>`).join(''); }
function fecharTreino(){ document.getElementById('telaTreino').classList.remove('show'); }

// ACORDE
function mostrarAcorde(nome){ let d=DIAGRAMAS[nome]||DIAGRAMAS['C']; document.getElementById('nomeAcorde').textContent=nome; document.getElementById('descAcorde').textContent='Toca assim no violão'; document.getElementById('diagramaAcorde').innerHTML=['E','A','D','G','B','e'].map((corda,i)=>{ let v=d.cordas[i]; return `<div class="corda"><b>${corda}</b><div class="bolinha ${v==='X'||v==='0'?'vazia':''}">${v==='X'?'✕':v==='0'?'○':v}</div><div style="height:30px"></div></div>`; }).join(''); document.getElementById('dicaAcorde').textContent=d.dica; document.getElementById('modalAcorde').classList.add('show'); }
function fecharAcorde(){ document.getElementById('modalAcorde').classList.remove('show'); }

// TELA CHEIA / ROLAGEM
let rolando=false, rolagemTimer=null, velRolagem=3;
function abrirTelaCheia(){ if(!musicaAtual){ alert('Abre uma música primeiro!'); return; } document.getElementById('telaCheia').classList.add('show'); renderLetra(); }
function fecharTelaCheia(){ document.getElementById('telaCheia').classList.remove('show'); pararRolagem(); }
function toggleRolagem(){ rolando?pararRolagem():iniciarRolagem(); }
function iniciarRolagem(){ rolando=true; document.getElementById('btnRolar').textContent='⏸ Pausar'; rolagemTimer=setInterval(()=>{ document.getElementById('telaCheia').scrollTop+=velRolagem; },50); }
function pararRolagem(){ rolando=false; document.getElementById('btnRolar').textContent='▶ Rolar'; clearInterval(rolagemTimer); }
function setRolagem(v){ velRolagem=v; for(let i=1;i<=7;i++) document.getElementById('r'+i).classList.toggle('ativo',i===v); }

// OUTROS
function adicionarCifra(){ let titulo=prompt('Nome da música:'); if(!titulo) return; let artista=prompt('Cantor:'); if(!artista) return; let ex=biblioteca.find(p=>p.artista.toLowerCase()===artista.toLowerCase()); if(!ex){ ex={artista,emoji:'🎤',musicas:[]}; biblioteca.push(ex); } ex.musicas.push({title:titulo,tipo:'vs',lines:[{chords:[{chord:'C',pos:0}],text:'Edita essa letra depois em Editar'}]}); renderizarPastas(); alert('Cifra "'+titulo+'" criada na pasta '+artista+'!'); }
function editarCifra(){ if(!musicaAtual){ alert('Abre uma música primeiro pra editar!'); return; } let nova=prompt('Nova letra (uma linha por vez):',musicaAtual.lines.map(l=>l.text).join('\n')); if(nova!==null){ musicaAtual.lines=nova.split('\n').map(t=>({chords:[{chord:'C',pos:0}],text:t})); renderLetra(); alert('Salvo!'); } }
function instalarApp(){ if(deferredPrompt){ deferredPrompt.prompt(); deferredPrompt.userChoice.then(()=>{ deferredPrompt=null; }); } else { alert('Pra instalar: abre o menu do navegador (3 pontinhos) > Adicionar à tela inicial. Ou usa o botão Instalador Direto quando o navegador liberar.'); } }
function compartilharApp(){ let txt='🎵 Cifra Flow - Seu repertório no bolso!'; if(navigator.share) navigator.share({text:txt,url:location.href}); else { navigator.clipboard.writeText(location.href); alert('Link copiado!'); } }
function abrirWhats(){ window.open('https://chat.whatsapp.com/','_blank'); }
function compartilharSetlist2(){ compartilharSetlist(); }
function exportarDados(){ let dados={biblioteca,setlist,criados,config}; let blob=new Blob([JSON.stringify(dados,null,2)],{type:'application/json'}); let a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='cifra-flow-backup.json'; a.click(); }
function importarDados(e){ let f=e.target.files[0]; if(!f) return; let r=new FileReader(); r.onload=()=>{ try{ let d=JSON.parse(r.result); if(d.biblioteca) biblioteca=d.biblioteca; if(d.setlist) setlist=d.setlist; if(d.criados) criados=d.criados; if(d.config) config=d.config; salvarLocal(); renderizarPastas(); aplicarConfig(); alert('Importado com sucesso!'); }catch(err){ alert('Arquivo inválido!'); } }; r.readAsText(f); }

// SLIDERS
['volume','pitch','bpm','bass','treble'].forEach(id=>{ let el=document.getElementById(id); if(!el) return; el.addEventListener('input',()=>{ let v=el.value; let lab=document.getElementById(id+'-val'); if(lab) lab.textContent=id==='volume'?v+'%':id==='pitch'?(v>0?'+'+v:v)+' st':id==='bpm'?v:(v>0?'+'+v:v)+' dB'; }); });

renderizarPastas(); atualizarContadores(); aplicarConfig();
if('serviceWorker' in navigator){ window.addEventListener('load',()=>{ navigator.serviceWorker.register('sw.js').catch(()=>{}); }); }
