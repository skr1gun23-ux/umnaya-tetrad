/* ===== Дебаг-меню: 5 быстрых нажатий на заголовок или ссылка с #debug ===== */
let logoTaps=0,logoTimer;
$('#logo').onclick=()=>{logoTaps++;clearTimeout(logoTimer);logoTimer=setTimeout(()=>{if(logoTaps<5&&player)menu();logoTaps=0},450);
  if(logoTaps>=5){logoTaps=0;clearTimeout(logoTimer);debugMenu()}};
function debugMenu(confirmReset){const m=$('#modal');
  const p=player;const info=p?`${esc(p.nick)} · ★ ${wallet()} ${Lx("в кошельке ·","in wallet ·")} ${p.stars} ${Lx("всего · уровень","total · level")} ${lvlInfo(p.xp).l}`:Lx("Игрок не выбран","No player selected");
  m.innerHTML=`<div class="overlay" role="dialog" aria-modal="true" aria-label="${Lx("Дебаг-меню","Debug menu")}"><div class="modal" style="text-align:left">
  <h3>${Lx("Дебаг-меню","Debug menu")}</h3><p class="note" style="margin:0 0 12px">${info}</p>
  ${confirmReset?`<p class="err" style="margin:0 0 10px">${confirmReset==='wipe'?Lx("Удалить всех игроков и их прогресс на этом устройстве?","Delete all players and their progress on this device?"):`${Lx("Сбросить весь прогресс","Reset all progress")}${p?` ${Lx("игрока","player")} ${esc(p.nick)}`:''}${Lx("? Звёзды, уровень, котята, одежда и комната пропадут.","? Stars, level, kittens, clothes and the room will be lost.")}`} ${Lx("Это нельзя отменить.","This can't be undone.")}</p>
    <div class="btns" style="justify-content:flex-start"><button class="btn" id="dbYes" style="background:var(--bad)">${Lx("Да, сбросить","Yes, reset")}</button><button class="btn alt" id="dbNo">${Lx("Отмена","Cancel")}</button></div>`:
  `<div class="btns" style="justify-content:flex-start;flex-direction:column;align-items:stretch">
    <button class="btn" id="db1000" ${p?'':'disabled'}>${Lx("+1000 звёзд","+1000 stars")}</button>
    <button class="btn alt" id="dbAll" ${p?'':'disabled'}>${Lx("Открыть все вещи, котят и мебель","Unlock all items, kittens and furniture")}</button>
    <button class="btn alt" id="dbLvl" ${p?'':'disabled'}>${Lx("+1 уровень","+1 level")}</button>
    <button class="btn alt" id="dbFeed" ${p?'':'disabled'}>${Lx("Все шкалы 100% и разбудить","All bars 100% and wake up")}</button>
    <button class="btn alt" id="dbPoop" ${p?'':'disabled'}>${Lx("Добавить какашку","Add a poop")}</button>
    <button class="btn alt" id="dbEvNow" ${p?'':'disabled'}>${Lx("Событие прямо сейчас (на главной)","Event right now (on the main screen)")}</button>
    <button class="btn alt" id="dbNest" ${p?'':'disabled'}>${Lx("Котёнок родится сейчас","Kitten is born now")}</button>
    <button class="btn alt" id="dbTour" ${p?'':'disabled'}>${Lx("Сбросить попытку турнира","Reset tournament attempt")}</button>
    <p class="tag" style="margin:6px 0 0">${Lx("Запустить ивент:","Start an event:")}</p><div class="row" style="margin:0">${Object.entries(EVENTS).map(([k,e])=>`<button class="btn alt small" data-ev="${k}" ${p?'':'disabled'} title="${e.name}">${e.icon}</button>`).join('')}</div>
    <button class="btn alt" id="dbRestart">${Lx("Перезапуск","Restart")}</button>
    <button class="btn alt" id="dbReset" style="color:var(--bad);border-color:var(--bad)">${Lx("Сброс прогресса","Reset progress")}</button>
    ${store.mode==='local'?'<button class="btn alt" id="dbWipe" style="color:var(--bad);border-color:var(--bad)">'+Lx("Удалить всех игроков на этом устройстве","Delete all players on this device")+'</button>':''}
    <button class="btn alt" id="dbClose">${Lx("Закрыть","Close")}</button></div>`}</div></div>`;
  const close=()=>{m.innerHTML=''};const on=(id,f)=>{const b=$('#'+id);if(b)b.onclick=f};
  const refresh=()=>{renderMe();if(screen==='cat')catScreen();else if(screen==='menu')menu()};
  on('dbClose',close);on('dbNo',()=>debugMenu());
  on('db1000',()=>{p.spent-=1000;savePlayer(true);refresh();toast(Lx("+1000 ★ в кошелёк","+1000 ★ to your wallet"));debugMenu()});
  on('dbAll',()=>{p.cat.owned=WEAR.map(x=>x.id);p.cat.skins=SKINS.map(x=>x.id);p.room.owned=[...FURN.map(x=>x.id),...WALLS.map(x=>x.id),...FLOORS.map(x=>x.id)];savePlayer(true);refresh();toast(Lx("Всё открыто","Everything unlocked"));debugMenu()});
  on('dbLvl',()=>{const L=lvlInfo(p.xp);p.xp+=L.need-L.cur;savePlayer(true);refresh();toast(`${Lx("Уровень","Level")} ${lvlInfo(p.xp).l}`);debugMenu()});
  on('dbFeed',()=>{tick();Object.assign(p.cat,{food:100,joy:100,fun:100,sport:100,energy:100,sleepUntil:0,t:Date.now()});savePlayer(true);refresh();toast(Lx("Все шкалы 100%, котёнок проснулся","All bars 100%, the kitten woke up"));debugMenu()});
  on('dbPoop',()=>{p.cat.poops=Math.min(5,p.cat.poops+1);savePlayer(true);refresh();toast(Lx("Появилась какашка","A poop appeared"));debugMenu()});
  on('dbEvNow',()=>{p.nextEv=Date.now();savePlayer(true);refresh();toast(Lx("Событие готово","Event ready"));debugMenu()});
  on('dbNest',()=>{if(p.nest){p.nest.until=Date.now();savePlayer(true);refresh();toast(Lx("Котёнок готов в гнёздышке","The kitten is ready in the nest"))}else toast(Lx("Гнёздышко пустое","The nest is empty"));debugMenu()});
  on('dbTour',()=>{p.tDate='';savePlayer(true);refresh();toast(Lx("Попытка турнира снова доступна","Tournament attempt available again"));debugMenu()});
  on('dbRestart',async()=>{close();stopTimer();clearTimeout(store.writeTimer);await store.writeQ;player=null;store.art=undefined;app.innerHTML='<p class="empty">'+Lx("Перезапускаем…","Restarting…")+'</p>';
    await initStore();renderMe();player?menu():login();toast(Lx("Перезапущено","Restarted"))});
  on('dbReset',()=>debugMenu('reset'));
  on('dbYes',async()=>{if(confirmReset==='wipe')return wipe();close();stopTimer();
    if(p){const fresh=newPlayer(p.nick);player=fresh;store.art=null;
      if(store.mode==='online'){try{await store.db.doc('players/'+store.uid).set({...fresh,updated:Date.now()});await store.db.doc('players/'+store.uid+'/art/main').delete()}catch(e){}}
      else{saveLocal();LS.set('ut2_art:'+nickKey(p.nick),null)}
      renderMe();menu();toast(Lx("Прогресс сброшен","Progress reset"))}
    else{renderMe();login()}});
  on('dbWipe',()=>debugMenu('wipe'));
  const wipe=()=>{const all=localPlayers();Object.keys(all).forEach(k=>LS.set('ut2_art:'+k,null));LS.set('ut2_players',{});LS.set('ut2_current',null);
    player=null;store.art=undefined;close();renderMe();login();toast(Lx("Все игроки удалены","All players deleted"))};
  m.querySelectorAll('[data-ev]').forEach(b=>b.onclick=()=>{close();startEvent(b.dataset.ev)});
  const first=m.querySelector('button:not([disabled])');if(first)first.focus()}
if(location.hash==='#debug')setTimeout(debugMenu,300);
