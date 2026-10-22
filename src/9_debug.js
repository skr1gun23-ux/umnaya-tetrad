/* ===== Дебаг-меню: 5 быстрых нажатий на заголовок или ссылка с #debug ===== */
let logoTaps=0,logoTimer;
$('#logo').onclick=()=>{logoTaps++;clearTimeout(logoTimer);logoTimer=setTimeout(()=>{if(logoTaps<5&&player)menu();logoTaps=0},450);
  if(logoTaps>=5){logoTaps=0;clearTimeout(logoTimer);debugMenu()}};
function debugMenu(confirmReset){const m=$('#modal');
  const p=player;const info=p?`${esc(p.nick)} · ★ ${wallet()} в кошельке · ${p.stars} всего · уровень ${lvlInfo(p.xp).l}`:'Игрок не выбран';
  m.innerHTML=`<div class="overlay" role="dialog" aria-modal="true" aria-label="Дебаг-меню"><div class="modal" style="text-align:left">
  <h3>Дебаг-меню</h3><p class="note" style="margin:0 0 12px">${info}</p>
  ${confirmReset?`<p class="err" style="margin:0 0 10px">${confirmReset==='wipe'?'Удалить всех игроков и их прогресс на этом устройстве?':`Сбросить весь прогресс${p?` игрока ${esc(p.nick)}`:''}? Звёзды, уровень, котята, одежда и комната пропадут.`} Это нельзя отменить.</p>
    <div class="btns" style="justify-content:flex-start"><button class="btn" id="dbYes" style="background:var(--bad)">Да, сбросить</button><button class="btn alt" id="dbNo">Отмена</button></div>`:
  `<div class="btns" style="justify-content:flex-start;flex-direction:column;align-items:stretch">
    <button class="btn" id="db1000" ${p?'':'disabled'}>+1000 звёзд</button>
    <button class="btn alt" id="dbAll" ${p?'':'disabled'}>Открыть все вещи, котят и мебель</button>
    <button class="btn alt" id="dbLvl" ${p?'':'disabled'}>+1 уровень</button>
    <button class="btn alt" id="dbFeed" ${p?'':'disabled'}>Все шкалы 100% и разбудить</button>
    <button class="btn alt" id="dbPoop" ${p?'':'disabled'}>Добавить какашку</button>
    <button class="btn alt" id="dbEvNow" ${p?'':'disabled'}>Событие прямо сейчас (на главной)</button>
    <button class="btn alt" id="dbNest" ${p?'':'disabled'}>Котёнок родится сейчас</button>
    <button class="btn alt" id="dbTour" ${p?'':'disabled'}>Сбросить попытку турнира</button>
    <p class="tag" style="margin:6px 0 0">Запустить ивент:</p><div class="row" style="margin:0">${Object.entries(EVENTS).map(([k,e])=>`<button class="btn alt small" data-ev="${k}" ${p?'':'disabled'} title="${e.name}">${e.icon}</button>`).join('')}</div>
    <button class="btn alt" id="dbRestart">Перезапуск</button>
    <button class="btn alt" id="dbReset" style="color:var(--bad);border-color:var(--bad)">Сброс прогресса</button>
    ${store.mode==='local'?'<button class="btn alt" id="dbWipe" style="color:var(--bad);border-color:var(--bad)">Удалить всех игроков на этом устройстве</button>':''}
    <button class="btn alt" id="dbClose">Закрыть</button></div>`}</div></div>`;
  const close=()=>{m.innerHTML=''};const on=(id,f)=>{const b=$('#'+id);if(b)b.onclick=f};
  const refresh=()=>{renderMe();if(screen==='cat')catScreen();else if(screen==='menu')menu()};
  on('dbClose',close);on('dbNo',()=>debugMenu());
  on('db1000',()=>{p.spent-=1000;savePlayer(true);refresh();toast('+1000 ★ в кошелёк');debugMenu()});
  on('dbAll',()=>{p.cat.owned=WEAR.map(x=>x.id);p.cat.skins=SKINS.map(x=>x.id);p.room.owned=[...FURN.map(x=>x.id),...WALLS.map(x=>x.id),...FLOORS.map(x=>x.id)];savePlayer(true);refresh();toast('Всё открыто');debugMenu()});
  on('dbLvl',()=>{const L=lvlInfo(p.xp);p.xp+=L.need-L.cur;savePlayer(true);refresh();toast(`Уровень ${lvlInfo(p.xp).l}`);debugMenu()});
  on('dbFeed',()=>{tick();Object.assign(p.cat,{food:100,joy:100,fun:100,sport:100,energy:100,sleepUntil:0,t:Date.now()});savePlayer(true);refresh();toast('Все шкалы 100%, котёнок проснулся');debugMenu()});
  on('dbPoop',()=>{p.cat.poops=Math.min(5,p.cat.poops+1);savePlayer(true);refresh();toast('Появилась какашка');debugMenu()});
  on('dbEvNow',()=>{p.nextEv=Date.now();savePlayer(true);refresh();toast('Событие готово');debugMenu()});
  on('dbNest',()=>{if(p.nest){p.nest.until=Date.now();savePlayer(true);refresh();toast('Котёнок готов в гнёздышке')}else toast('Гнёздышко пустое');debugMenu()});
  on('dbTour',()=>{p.tDate='';savePlayer(true);refresh();toast('Попытка турнира снова доступна');debugMenu()});
  on('dbRestart',async()=>{close();stopTimer();clearTimeout(store.writeTimer);await store.writeQ;player=null;store.art=undefined;app.innerHTML='<p class="empty">Перезапускаем…</p>';
    await initStore();renderMe();player?menu():login();toast('Перезапущено')});
  on('dbReset',()=>debugMenu('reset'));
  on('dbYes',async()=>{if(confirmReset==='wipe')return wipe();close();stopTimer();
    if(p){const fresh=newPlayer(p.nick);player=fresh;store.art=null;
      if(store.mode==='online'){try{await store.db.doc('players/'+store.uid).set({...fresh,updated:Date.now()});await store.db.doc('players/'+store.uid+'/art/main').delete()}catch(e){}}
      else{saveLocal();LS.set('ut2_art:'+nickKey(p.nick),null)}
      renderMe();menu();toast('Прогресс сброшен')}
    else{renderMe();login()}});
  on('dbWipe',()=>debugMenu('wipe'));
  const wipe=()=>{const all=localPlayers();Object.keys(all).forEach(k=>LS.set('ut2_art:'+k,null));LS.set('ut2_players',{});LS.set('ut2_current',null);
    player=null;store.art=undefined;close();renderMe();login();toast('Все игроки удалены')};
  m.querySelectorAll('[data-ev]').forEach(b=>b.onclick=()=>{close();startEvent(b.dataset.ev)});
  const first=m.querySelector('button:not([disabled])');if(first)first.focus()}
if(location.hash==='#debug')setTimeout(debugMenu,300);
