<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cifra Flow</title>
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#1a6fc4">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,sans-serif;background:#0f0f0f;color:#fff;padding:16px}
.app{max-width:900px;margin:auto;background:#171717;border-radius:16px;overflow:hidden}
header{background:#1a6fc4;padding:14px;display:flex;justify-content:space-between;align-items:center}
header button{background:#fff;border:0;padding:9px 13px;border-radius:10px;font-weight:800;cursor:pointer}
.home{padding:16px}
.busca{width:100%;padding:13px;border:0;border-radius:12px;background:#262626;color:#fff;margin-bottom:14px}
.controles{background:#202020;border-radius:14px;padding:14px;margin-bottom:16px;display:flex;gap:16px;flex-wrap:wrap}
.controles label{font-size:11px;font-weight:800;color:#999;display:block}
.controles input{width:100%}
.controles div{flex:1;min-width:120px}
.pastas{display:grid;grid-template-columns:1fr 1fr;gap:16px 12px;margin-bottom:14px}
.pasta{cursor:pointer;text-align:center}
.pasta-folder{position:relative;width:100%;aspect-ratio:1.5/1;max-height:92px}
.pasta-back{position:absolute;inset:10px 0 0 0;background:#eab308;border-radius:10px}
.pasta-tab{position:absolute;top:0;left:0;width:42%;height:20px;background:#facc15;border-radius:8px 8px 0 0}
.pasta-front{position:absolute;inset:18px 0 0 0;background:linear-gradient(180deg,#fde047,#facc15);border-radius:6px 10px 10px 10px;box-shadow:0 6px 14px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center}
.pasta-front span{font-size:28px}
.pasta.aberta .pasta-front{background:linear-gradient(180deg,#fef08a,#fde047);transform:translateY(3px)}
.pasta b{display:block;font-size:14px;margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pasta small{color:#888;font-size:12px}
.musicas-dentro{grid-column:1/-1;display:none;flex-direction:column;gap:8px;background:#222;border-radius:14px;padding:10px}
.pasta.aberta + .musicas-dentro{display:flex}
.musica-item{background:#171717;border-radius:12px;padding:13px;display:flex;justify-content:space-between;cursor:pointer;align-items:center}
.btnSet{font-size:11px;background:#1a6fc4;color:#fff;border:0;padding:6px 10px;border-radius:20px;font-weight:800;cursor:pointer;white-space:nowrap}
.btns{display:flex;gap:8px;margin:12px 0}
.btns button{flex:1;padding:13px;border-radius:12px;font-weight:800;cursor:pointer}
.btnAdd{background:#1a6fc4;color:#fff;border:0}
.btnEdit{background:#222;color:#00d2ff;border:1px solid #1a6fc4}
#viewer{max-width:600px;margin:auto;font-size:1.2rem;line-height:2;padding:14px;display:none}
#viewer.mostrar{display:block}
.chord-line{font-weight:bold;color:#00d2ff;position:relative;height:1.5em;white-space:nowrap}
.text-line{margin-bottom:1em;white-space:nowrap}
.chord{position:absolute;cursor:pointer;text-decoration:underline;text-underline-offset:4px}
.btnVoltar{background:#222;color:#fff;border:0;padding:10px 14px;border-radius:10px;font-weight:800;cursor:pointer;margin-bottom:12px}
.btnAcao{padding:10px 14px;border-radius:20px;border:1px solid #333;background:#222;color:#fff;font-weight:700;cursor:pointer}
.btnAcao.on{background:#1a6fc4;border-color:#1a6fc4}
#menuFundo{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:90;display:none}
#menuFundo.show{display:block}
#menuLateral{position:fixed;top:0;left:0;bottom:0;width:300px;max-width:88vw;background:#171717;z-index:100;padding:0;overflow-y:auto;transform:translateX(-100%);transition:.28s;border-radius:0 20px 20px 0}
#menuLateral.show{transform:translateX(0)}
.menu-top{background:linear-gradient(135deg,#1a6fc4,#00c853);padding:20px}
.menu-avatar{width:52px;height:52px;border-radius:50%;background:#fff;color:#1a6fc4;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;margin-bottom:10px}
.menu-body{padding:16px}
.menuSecao{font-size:11px;font-weight:800;color:#777;margin:18px 0 8px;letter-spacing:1px}
.menuItem{background:#222;border-radius:14px;padding:14px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;cursor:pointer}
.menuItem.ativo{background:#1a6fc4}
.menuBtn{width:100%;padding:14px;border-radius:14px;font-weight:800;cursor:pointer;border:0;margin-bottom:8px;font-size:14px}
#telaCheia{position:fixed;inset:0;background:#0f0f0f;z-index:200;display:none;overflow-y:auto;padding:22px 18px 110px}
#telaCheia.show{display:block}
#telaCheia h1{font-size:28px;margin-top:8px}
#lyrics-cheia{font-size:22px;line-height:2.1;white-space:nowrap;overflow-x:auto}
.barra-flutuante{position:fixed;left:12px;right:12px;bottom:14px;background:#1e1e1e;border:1px solid #333;border-radius:20px;padding:10px 12px;display:flex;flex-direction:column;gap:8px;z-index:210;box-shadow:0 10px 30px rgba(0,0,0,.6)}
.linha-float{display:flex;gap:6px;align-items:center;overflow-x:auto;scrollbar-width:none}
.linha-float button{background:#2a2a2a;border:0;color:#fff;padding:8px 11px;border-radius:20px;font-weight:700;cursor:pointer;white-space:nowrap;flex-shrink:0}
.linha-float button.ativo{background:#1a6fc4}
.linha-float button.azul{background:#1a6fc4}
/* MODAL ACORDE + SETLIST */
#modalAcorde{position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:300;display:none;align-items:center;justify-content:center;padding:20px}
#modalAcorde.show{display:flex}
.modal-box{background:#1e1e1e;border-radius:20px;padding:20px;width:100%;max-width:320px;text-align:center}
.casa{display:flex;gap:0;justify-content:center;margin:14px 0}
.corda{width:38px;text-align:center}
.corda b{display:block;font-size:12px;color:#aaa;margin-bottom:6px}
.bolinha{width:26px;height:26px;border-radius:50%;background:#1a6fc4;margin:4px auto;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800}
.bolinha.vazia{background:transparent;border:1px solid #555;color:#888}
#telaSetlist{position:fixed;inset:0;background:#0f0f0f;z-index:220;display:none;overflow-y:auto;padding:20px}
#telaSetlist.show{display:block}
.set-item{background:#1e1e1e;border-radius:14px;padding:14px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center}
</style>
</head>
<body>
<div class="app">
<header>
<button onclick="abrirMenu()">☰ MENU</button>
<b>🎵 Cifra Flow</b>
<button onclick="abrirTelaCheia()">⛶ TELA GRANDE</button>
</header>
<div class="home">
<input class="busca" id="busca" placeholder="🔍 Buscar cantor ou música..." oninput="filtrar()">
<div class="controles">
<div><label>VOLUME</label><input type="range" id="volume" value="75"><span id="volume-val">75%</span></div>
<div><label>PITCH: <span id="pitch-val">0 st</span></label><input type="range" id="pitch" min="-6" max="6" value="0"></div>
<div><label>BPM: <span id="bpm-val">124</span></label><input type="range" id="bpm" min="60" max="200" value="124"></div>
<div><label>GRAVE</label><input type="range" id="bass" min="-10" max="10" value="0"><span id="bass-val">0 dB</span></div>
<div><label>AGUDO</label><input type="range" id="treble" min="-10" max="10" value="0"><span id="treble-val">0 dB</span></div>
<div><label>REVERB</label><br><button id="reverbBtn" class="btnAcao on" onclick="toggleReverb()">REVERB: LIGADO</button></div>
</div>
<h3 style="margin-bottom:14px" id="tituloSecao">Pastas dos Cantores</h3>
<div class="pastas" id="lista-pastas"></div>
<div class="btns"><button class="btnAdd" onclick="adicionarCifra()">+ Adicionar Nova Cifra</button><button class="btnEdit" onclick="editarCifra()">✏️ Editar</button></div>
<div id="viewer">
<button class="btnVoltar" onclick="voltarPastas()">← Voltar</button>
<h1 id="song-title"></h1>
<p id="song-artist" style="color:#aaa;margin-bottom:12px"></p>
<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
<button class="btnAcao" id="btnSimp" onclick="toggleSimplificada()">🎸 Simplificada</button>
<button class="btnAcao" onclick="mudarTom(-1)">- Tom</button>
<button class="btnAcao" id="tomAtual">Original</button>
<button class="btnAcao" onclick="mudarTom(1)">+ Tom</button>
<button class="btnAcao" style="background:#00c853;border-color:#00c853" onclick="adicionarAtualNaSetlist()">+ Setlist</button>
</div>
<p style="font-size:12px;color:#888;margin-bottom:10px">💡 Dica: toca no acorde azul pra ver como faz no violão</p>
<div id="lyrics-container"></div>
<button onclick="salvarConfiguracao()" style="background:#1a6fc4;color:#fff;border:0;padding:12px 18px;border-radius:12px;font-weight:800;cursor:pointer;margin-top:10px">💾 Salvar Setup</button>
</div>
</div>
</div>
<div id="menuFundo" onclick="fecharMenu()"></div>
<div id="menuLateral">
<div class="menu-top">
<div class="menu-avatar">TA</div>
<b style="font-size:18px">Taki Artesanal</b><br><small style="opacity:.9">Seu repertório • Cifra Flow</small><br>
<button onclick="fecharMenu()" style="background:rgba(255,255,255,.25);color:#fff;border:0;padding:7px 12px;border-radius:20px;margin-top:12px;cursor:pointer">✕ Fechar</button>
</div>
<div class="menu-body">
<div class="menuSecao">SHOW</div>
<div class="menuItem" onclick="abrirSetlist()"><div><b>🎤 Setlist do Show</b><br><small id="count-setlist" style="color:#aaa">0 músicas na ordem do show</small></div><span>›</span></div>
<div class="menuSecao">MINHAS CIFRAS</div>
<div class="menuItem" onclick="irPara('vs')" id="menu-vs"><div><b>🎹 Com VS</b><br><small id="count-vs" style="color:#aaa">0 cifras</small></div><span>›</span></div>
<div class="menuItem" onclick="irPara('playback')" id="menu-playback"><div><b>▶️ Com Playback</b><br><small id="count-playback" style="color:#aaa">0 cifras</small></div><span>›</span></div>
<div class="menuItem" onclick="irPara('todas')" id="menu-todas"><div><b>📁 Biblioteca</b><br><small id="count-todas" style="color:#aaa">Tudo que você baixar ou criar</small></div><span>›</span></div>
<div class="menuSecao">APP</div>
<button class="menuBtn" style="background:#00c853;color:#fff" onclick="instalarApp()">📲 INSTALAR APLICATIVO</button>
<button class="menuBtn" style="background:#fff;color:#111" onclick="compartilharApp()">🔗 COMPARTILHAR</button>
<div class="menuSecao">BACKUP</div>
<button class="menuBtn" style="background:#1a6fc4;color:#fff" onclick="exportarDados()">⬆️ EXPORTAR</button>
<button class="menuBtn" style="background:#222;color:#00d2ff;border:1px solid #1a6fc4" onclick="document.getElementById('inputImportar').click()">⬇️ IMPORTAR</button>
<input type="file" id="inputImportar" accept=".json" style="display:none" onchange="importarDados(event)">
<div class="menuSecao">OUTROS</div>
<div class="menuItem" onclick="abrirTelaCheia();fecharMenu()"><div><b>⛶ Tela Grande</b><br><small style="color:#aaa">Só letra + cifra</small></div><span>›</span></div>
</div>
</div>
<div id="telaCheia">
<h1 id="tituloCheia"></h1>
<p id="artistaCheia" style="color:#aaa;margin-bottom:16px"></p>
<div id="lyrics-cheia"></div>
<div class="barra-flutuante">
<div class="linha-float"><button onclick="toggleRolagem()" id="btnRolar" class="azul">▶ Rolar</button><button onclick="setRolagem(1)" id="r1">1</button><button onclick="setRolagem(2)" id="r2">2</button><button onclick="setRolagem(3)" id="r3">3</button><button onclick="setRolagem(4)" id="r4">4</button><button onclick="setRolagem(5)" id="r5">5</button><button onclick="setRolagem(6)" id="r6">6</button><button onclick="setRolagem(7)" id="r7">7</button><button onclick="fecharTelaCheia()" style="background:#ff3b30;margin-left:auto">✕ Sair</button></div>
<div class="linha-float"><button onclick="mudarTom(-1)">- Tom</button><button id="tomCheia">Original</button><button onclick="mudarTom(1)">+ Tom</button><button onclick="toggleSimplificada()" id="btnSimpCheia">🎸 Simplificada</button><button onclick="mudarFonte(-2)">A-</button><button onclick="mudarFonte(2)">A+</button></div>
</div>
</div>
<div id="telaSetlist">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><h2>🎤 Setlist do Show</h2><button onclick="fecharSetlist()" style="background:#1a6fc4;color:#fff;border:0;padding:8px 14px;border-radius:20px;font-weight:800;cursor:pointer">✕ Fechar</button></div>
<p style="color:#aaa;font-size:13px;margin-bottom:14px">Ordem que você vai tocar. Clica em Tocar pra abrir. Clica em + Setlist dentro da cifra pra adicionar aqui.</p>
<div style="display:flex;gap:8px;margin-bottom:14px"><button onclick="limparSetlist()" style="background:#222;color:#fff;border:1px solid #333;padding:10px 14px;border-radius:12px;font-weight:700;cursor:pointer">🗑️ Limpar tudo</button><button onclick="compartilharSetlist()" style="background:#00c853;color:#fff;border:0;padding:10px 14px;border-radius:12px;font-weight:700;cursor:pointer">🔗 Compartilhar Setlist</button></div>
<div id="lista-setlist"></div>
</div>
<div id="modalAcorde" onclick="if(event.target.id==='modalAcorde') fecharAcorde()">
<div class="modal-box">
<h2 id="nomeAcorde" style="font-size:32px;color:#00d2ff">C</h2>
<p id="descAcorde" style="color:#aaa;font-size:13px">Toca assim no violão</p>
<div class="casa" id="diagramaAcorde"></div>
<p id="dicaAcorde" style="font-size:13px;line-height:1.5"></p>
<button onclick="fecharAcorde()" style="background:#1a6fc4;color:#fff;border:0;padding:12px 20px;border-radius:12px;font-weight:800;cursor:pointer;margin-top:10px;width:100%">Fechar</button>
</div>
</div>
<script src="app.js"></script>
</body>
</html>
