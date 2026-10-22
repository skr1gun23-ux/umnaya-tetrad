/* ===== Каталог игр ===== */
const GROUPS=[
 ['Игры с котёнком','Котёнок играет сам. Поднимают развлечение и спорт',{
  bowling:{title:'Боулинг',desc:'Сбей все кегли',ic:'🎳',color:'#e76f51',engine:'cat'},
  basket:{title:'Баскетбол',desc:'Попади мячом в кольцо',ic:'🏀',color:'#f77f00',engine:'cat'},
  penalty:{title:'Пенальти',desc:'Забей гол мимо вратаря',ic:'⚽',color:'#2e9e5b',engine:'cat'},
  fishing:{title:'Рыбалка',desc:'Поймай рыбок удочкой',ic:'🎣',color:'#2f6fdc',engine:'cat'},
  laser:{title:'Лазерная точка',desc:'Котёнок гоняется за точкой',ic:'🔴',color:'#d62839',engine:'cat'},
  jump:{title:'Прыжки',desc:'Перепрыгивай препятствия',ic:'🦘',color:'#7a4fd6',engine:'cat'}}],
 ['Турнир дня','Одна попытка в сутки: кто решит больше примеров за минуту',{
  tourney:{title:'Турнир',desc:'Таблица по классам, новая каждый день',ic:'🏆',color:'#d99a00',engine:'tourney'}}],
 ['Математика','',{
  math:{title:'Счёт',desc:'Примеры на + − × ÷',ic:'2+2',color:'#2f6fdc',gen:mathTask,levels:true},
  box:{title:'Окошко',desc:'Найди спрятанное число',ic:'☐',color:'#3f86e0',gen:boxTask,levels:true},
  cmp:{title:'Сравни',desc:'Больше, меньше или равно',ic:'&gt;&lt;',color:'#2a7fb8',gen:cmpTask,levels:true},
  story:{title:'Задачи',desc:'Задачи про ребят и вещи',ic:'?',color:'#1f5fa8',gen:storyTask,levels:true},
  clock:{title:'Часы',desc:'Время по стрелкам, 0–23 часа',ic:'🕒',color:'#e08a1e',gen:clockTask,levels:true}}],
 ['Логика','',{
  seq:{title:'Ряд',desc:'Найди закономерность в числах',ic:'1·3·5',color:'#7a4fd6',gen:seqTask,levels:true},
  odd:{title:'Лишнее',desc:'Что не подходит к остальным?',ic:'≠',color:'#8c5ad9',gen:oddTask},
  scale:{title:'Фрукты',desc:'Каждый фрукт — это число',ic:'🍎',color:'#9b4fb8',gen:scaleTask,levels:true},
  who:{title:'Кто выше?',desc:'Расставь ребят по порядку',ic:'↕',color:'#6a4cc0',gen:whoTask,levels:true},
  pattern:{title:'Узор',desc:'Что будет дальше в ряду?',ic:'▲●',color:'#5b3fa8',gen:patternTask,levels:true}}],
 ['Внимательность','',{
  spot:{title:'Найди другого',desc:'Одна картинка чуть-чуть отличается',ic:'👀',color:'#0f8b8d',gen:spotTask,levels:true},
  stroop:{title:'Цвет и слово',desc:'Не дай словам себя запутать',ic:'Аа',color:'#1b7f6b',gen:stroopTask,levels:true}}],
 ['Сосредоточенность','',{
  schulte:{title:'Таблица Шульте',desc:'Найди все числа по порядку',ic:'1→25',color:'#2a9d74',engine:'schulte',levels:true},
  recall:{title:'Запомни ряд',desc:'Запомни картинки и их порядок',ic:'🧠',color:'#228b6a',gen:recallTask,levels:true},
  mem:{title:'Память',desc:'Найди одинаковые пары',ic:'?',color:'#2e7d5b',engine:'mem',levels:true}}],
 ['Сложные','Для тех, кто любит думать. Звёзды и опыт в 2 раза быстрее',{
  chain:{title:'Порядок действий',desc:'Длинные примеры со скобками',ic:'( )',color:'#3b2a6b',gen:chainTask,levels:true,hard:true},
  magic:{title:'Магический квадрат',desc:'Одинаковые суммы во всех линиях',ic:'3×3',color:'#4a2f86',gen:magicTask,levels:true,hard:true},
  pyramid:{title:'Пирамида',desc:'Кирпичик = сумма двух под ним',ic:'△',color:'#5a3a9e',gen:pyramidTask,levels:true,hard:true},
  superseq:{title:'Супер-ряд',desc:'Хитрые числовые закономерности',ic:'1·4·9',color:'#2f2464',gen:superSeqTask,levels:true,hard:true},
  tricky:{title:'Задачи с подвохом',desc:'Не торопись, здесь ловушки',ic:'!?',color:'#6b2f86',gen:trickyTask,hard:true}}]];
const GAMES=Object.assign({blitz:{title:'Турнир дня',desc:'Примеры на время',gen:blitzTask,levels:true,timed:60,tourney:true}},...GROUPS.map(g=>g[2]));
const bestText=(k,v)=>`${v} из 10`;

let screen='';let timerId=null;
function stopTimer(){if(timerId){clearInterval(timerId);timerId=null}}
const backBtn=()=>`<button class="link" id="back">← Все игры</button>`;
const fmtLeft=ms=>{const s=Math.max(0,Math.ceil(ms/1000));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60;
  return h?`${h} ч ${m} мин`:m?`${m} мин ${String(sec).padStart(2,'0')} с`:`${sec} с`};
const dayKey=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const toMidnight=()=>{const d=new Date();d.setHours(24,0,0,0);return d-Date.now()};

function login(){screen='login';stopTimer();
  const known=store.mode==='local'?Object.values(localPlayers()).map(p=>normalize(p)):[];
  app.innerHTML=`<section class="sheet login"><h2>Как тебя зовут?</h2>
  <p class="sub">Придумай ник. Он будет в таблице лидеров, а в подарок ты получишь котёнка и три сундука!</p>
  <form id="lf"><input class="field" id="nick" maxlength="16" autocomplete="off" placeholder="Например, Котёнок_7" aria-label="Ник"><button class="btn" type="submit">Играть</button></form>
  <p class="err" id="err" role="alert"></p>
  ${known.length?`<p class="sub">Уже играли здесь — нажми на свой ник:</p><div class="known">${known.map(p=>`<button data-k="${esc(nickKey(p.nick))}">${esc(p.nick)} · ★${p.stars}</button>`).join('')}</div>`:''}
  <p class="note">${store.mode==='online'?'Таблица лидеров общая для всех, кто открыл эту страницу.':'Ник: от 2 до 16 букв или цифр. Одинаковых ников не бывает.'}</p></section>`;
  const inp=$('#nick');inp.focus();
  $('#lf').onsubmit=async e=>{e.preventDefault();const v=inp.value.trim();const err=$('#err');
    if(!NICK_RE.test(v)){err.textContent='Ник должен быть от 2 до 16 символов: буквы, цифры, пробел, _ или -';return}
    err.textContent='Проверяем ник…';const r=await claimNick(v);if(r){err.textContent=r;return}store.art=undefined;renderMe();menu()};
  app.querySelectorAll('.known button').forEach(b=>b.onclick=()=>{player=normalize(localPlayers()[b.dataset.k]);LS.set('ut2_current',b.dataset.k);store.art=undefined;renderMe();menu()})}

const anyGift=()=>Object.values(player.gifts).some(Boolean);
function catLine(){const c=player.cat,w=wallet(),n=esc(c.name);
  if(sleeping())return `${n} спит. Проснётся через ${fmtLeft(c.sleepUntil-Date.now())}.`;
  if(c.poops>0)return `${n} оставил ${c.poops===1?'какашку':`${c.poops} ${plural(c.poops,['какашку','какашки','какашек'])}`}. Убери за ним!`;
  if(c.food<25)return `${n} проголодался. Покорми его!`;
  if(c.energy<25)return `${n} зевает. Пора спать!`;
  if(c.fun<25)return `${n} скучает. Поиграй с ним!`;
  if(c.sport<25)return `${n} засиделся. Нужен спорт!`;
  if(c.joy<25)return `${n} грустит. Погладь его!`;
  if(anyGift())return 'У тебя есть подарочные сундуки! Открой их.';
  if(w>=5)return 'Мур! Хватает звёзд на сундук.';
  return pick(['Мур-мур! Давай решать задачки!','Мне нравится мой наряд!','Сыграем в боулинг?','Мяу! Я люблю математику.','Обустроим мою комнату?'])}
function needBars(){const c=player.cat;return `<div class="bars">${STATS.map(([k,n,col])=>`<div class="bar"><span>${n}</span><div class="track"><div class="fill" style="width:${Math.round(c[k])}%;background:${col}"></div></div></div>`).join('')}</div>`}
const buffNote=()=>player.buff.xp2>0?`<p class="tag" style="margin:8px 0 0;color:var(--xp)">🌌 Двойной опыт: ещё ${player.buff.xp2} ${plural(player.buff.xp2,['игра','игры','игр'])}</p>`:'';

function evBanner(){const left=player.nextEv-Date.now();
  return left<=0?`<button class="btn small" id="evNow">✨ Событие готово! Начать</button>`:`<span class="tag" id="evLeft">✨ Следующее событие через ${fmtLeft(left)}</span>`}
function menu(){screen='menu';stopTimer();tick();
  app.innerHTML=`<section class="home"><div class="pet" id="petHome">${catSVG(player.cat,mood())}</div>
  <div class="txt"><div class="bubble">${catLine()}</div>${buffNote()}${xpBar()}${needBars()}
  <div class="row" id="evBox">${evBanner()}</div>
  <div class="row"><button class="btn small" id="goCat">Уход</button><button class="btn alt small" id="goRoom">Комната</button><button class="btn alt small" id="goChest">Сундуки${anyGift()?' · подарки!':''}</button></div></div></section>`+
  GROUPS.map(([name,note,games])=>`<h2 class="section">${name}${note?`<small>${note}</small>`:''}</h2><div class="menu">${Object.entries(games).map(([k,g])=>`
  <button class="tile${g.hard?' hard':''}" data-g="${k}">${g.hard?'<span class="x2">×2 ★</span>':''}<span class="ic" style="background:${g.color}">${g.ic}</span>
  <span><h3>${g.title}</h3><p>${g.desc}</p>${player.best[k]!=null&&g.gen?`<small>Лучший результат: ${bestText(k,player.best[k])}</small>`:''}${k==='tourney'&&player.tDate===dayKey()?`<small>Сегодня: ${player.tScore} примеров</small>`:''}</span></button>`).join('')}</div>`).join('');
  $('#goCat').onclick=()=>catScreen('care');$('#goRoom').onclick=()=>catScreen('room');$('#goChest').onclick=()=>catScreen('chest');$('#petHome').onclick=()=>catScreen('care');
  app.querySelectorAll('.tile').forEach(b=>b.onclick=()=>{const k=b.dataset.g;GAMES[k].levels?pickLevel(k):start(k)});
  const bindEv=()=>{const b=$('#evNow');if(b)b.onclick=()=>startEvent(pick(Object.keys(EVENTS)))};bindEv();
  const iv=setInterval(()=>{if(screen!=='menu'){clearInterval(iv);return}const left=player.nextEv-Date.now();const el=$('#evLeft');
    if(left<=0&&el){$('#evBox').innerHTML=evBanner();bindEv()}else if(el)el.textContent=`✨ Следующее событие через ${fmtLeft(left)}`},1000);
  window.scrollTo({top:0})}

function start(k){const e=GAMES[k].engine;
  if(e==='cat'){const why=canPlayWithCat();if(why){toast(why);return}return catGame(k)}
  e==='mem'?memory():e==='schulte'?schulte():e==='tourney'?tourneyScreen(level):quiz(k)}
function pickLevel(key){screen='pick';const g=GAMES[key];
  app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>${g.title}</h2></div>
  <p class="sub" style="text-align:center;margin-top:14px">${g.desc}. Выбери свой класс:</p>
  <div class="classes">${[1,2,3,4].map(l=>`<button data-l="${l}" aria-pressed="${l===level}"><b>${l}</b><span>класс</span></button>`).join('')}</div></section>`;
  $('#back').onclick=menu;
  app.querySelectorAll('.classes button').forEach(b=>b.onclick=()=>{level=+b.dataset.l;LS.set('ut2_level',level);start(key)});
  app.querySelector(`.classes button[data-l="${level}"]`).focus({preventScroll:true})}

/* ===== Турнир дня ===== */
async function tourneyScreen(cls){screen='tourney';stopTimer();const today=dayKey(),played=player.tDate===today;
  app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>🏆 Турнир дня</h2><span class="tag" id="tLeft"></span></div>
  <p class="sub">Минута на примеры. Каждый день новый турнир и одна попытка. Места считаются отдельно по классам.</p>
  <div class="tabs big" style="margin-top:14px" role="group" aria-label="Класс">${[1,2,3,4].map(l=>`<button data-l="${l}" aria-pressed="${l===cls}">${l} класс</button>`).join('')}</div>
  <div class="btns" style="justify-content:flex-start">${played?`<p class="bubble">Сегодня ты уже участвовал: ${player.tScore} ${plural(player.tScore,['пример','примера','примеров'])}, ${player.tClass} класс. Приходи завтра!</p>`
    :`<button class="btn" id="tGo">Участвовать: ${cls} класс</button>`}</div>
  <div class="board" id="tBoard"><p class="empty">Загружаем таблицу…</p></div></section>`;
  $('#back').onclick=menu;
  app.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>tourneyScreen(+b.dataset.l));
  const go=$('#tGo');if(go)go.onclick=()=>{level=cls;LS.set('ut2_level',level);quiz('blitz')};
  const tl=$('#tLeft');const upd=()=>{if(!document.body.contains(tl)){clearInterval(iv);return}tl.textContent=`Новый турнир через ${fmtLeft(toMidnight())}`};const iv=setInterval(upd,1000);upd();
  let rows=[];
  if(store.mode==='online'){try{const s=await store.db.collection('players').where('tDate','==',today).limit(300).get();rows=s.docs.map(d=>({...d.data(),self:d.id===store.uid}))}catch(e){}}
  else rows=Object.values(localPlayers()).filter(p=>p.tDate===today).map(p=>({...p,self:nickKey(p.nick)===nickKey(player.nick)}));
  if(screen!=='tourney')return;
  rows=rows.filter(r=>+r.tClass===cls).sort((a,b)=>(+b.tScore||0)-(+a.tScore||0));
  const tb=$('#tBoard');if(!tb)return;
  tb.innerHTML=rows.length?`<table class="lb"><thead><tr><th>Место</th><th>Ник</th><th class="n">Примеров</th></tr></thead><tbody>${rows.map((r,i)=>`<tr class="${r.self?'self':''}"><td class="place ${i<3?'medal'+(i+1):''}">${i<3?'★':''}${i+1}</td><td>${esc(String(r.nick||'').slice(0,16))}${r.self?' (ты)':''}</td><td class="n"><b>${+r.tScore||0}</b></td></tr>`).join('')}</tbody></table>`
    :`<p class="empty">Сегодня в ${cls} классе ещё никто не участвовал. Будь первым!</p>`}

function leaders(){screen='leaders';stopTimer();
  let rows=store.mode==='online'?store.leaders:Object.values(localPlayers()).map(p=>({...normalize(p),self:player&&nickKey(p.nick)===nickKey(player.nick)}));
  rows=[...rows].sort((a,b)=>(b.stars||0)-(a.stars||0)||(b.xp||0)-(a.xp||0));
  app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>Таблица лидеров</h2></div>
  <p class="sub">${store.mode==='online'?'Общая таблица: обновляется сама, когда кто-то играет.':'Все игроки, которые играли в этом браузере.'} Считаются все заработанные звёзды, даже потраченные.</p>
  <div class="board">${rows.length?`<table class="lb"><thead><tr><th>Место</th><th></th><th>Ник</th><th class="n">Ур.</th><th class="n">Звёзды</th><th class="n">Котят</th><th class="n">Игр</th></tr></thead><tbody>
  ${rows.map((r,i)=>`<tr class="${r.self?'self':''}"><td class="place ${i<3?'medal'+(i+1):''}">${i<3?'★':''}${i+1}</td><td class="av">${catSVG(r.cat,'happy')}</td>
  <td>${esc(r.nick)}${r.self?' (ты)':''}<br><small style="color:var(--muted)">${esc(lvlInfo(r.xp).title)} · котёнок ${esc(r.cat.name)}</small></td><td class="n">${lvlInfo(r.xp).l}</td><td class="n"><b>${r.stars}</b></td><td class="n">${r.cat.skins.length}</td><td class="n">${r.games}</td></tr>`).join('')}
  </tbody></table>`:'<p class="empty">Пока никого нет. Сыграй первым!</p>'}</div></section>`;
  $('#back').onclick=player?menu:login}

/* ===== Котёнок: уход, гардероб, котята, комната, сундуки ===== */
let catTab='care',wearSlot='hat',roomSlot='wp',skinFilter='all';
const lockedCard=(r,svg)=>`<button class="item r-${r} locked" aria-disabled="true">${svg}<span>???</span><span class="rt r-${r}">${RARITY[r].name}</span></button>`;
function stageHTML(){const c=player.cat,sl=sleeping();
  return `<div class="stage"><div class="bigcat" id="bigcat" title="Погладь котёнка">${catSVG(c,mood())}</div>
    ${c.poops?`<div class="poops" role="group" aria-label="Убрать какашки">${Array.from({length:c.poops},(_,i)=>`<button data-poop="${i}" aria-label="Убрать какашку">💩</button>`).join('')}</div>`:''}
    <div class="bubble" id="say">${catLine()}</div>${needBars()}
    <div class="row" style="justify-content:center"><button class="btn alt small" id="pet" ${sl?'disabled':''}>Погладить</button>
    <button class="btn alt small" id="sleep" ${sl||c.energy>=90?'disabled':''}>${sl?'Спит…':'Спать 4 ч'}</button><button class="btn alt small" id="photo">📷 Фото</button></div>
    <div class="row"><input class="field" id="catname" maxlength="14" value="${esc(c.name)}" aria-label="Имя котёнка"><button class="btn alt small" id="rename">Назвать</button></div></div>`}
function bindStage(){const c=player.cat;
  const pet=()=>{if(sleeping())return;const el=$('#bigcat');el.classList.remove('purr');void el.offsetWidth;el.classList.add('purr');purr();
    if(c.joy<70)c.joy=clamp(c.joy+(hasTr('cuddly')?12:6)+Math.max(0,cstat('cha')-5),0,70);$('#say').textContent=pick(['Мрррр…','Мур-мур-мур!','Ещё! Ещё!','Мне так хорошо!']);
    el.innerHTML=catSVG(c,'happy');const f=app.querySelectorAll('.stage .fill');if(f[1])f[1].style.width=Math.round(c.joy)+'%';savePlayer()};
  $('#bigcat').onclick=pet;$('#pet').onclick=pet;
  $('#sleep').onclick=()=>{if(sleeping())return;c.sleepUntil=Date.now()+SLEEP_H*36e5;savePlayer(true);toast(`${esc(c.name)} уснул на ${SLEEP_H} часа`);catScreen()};
  $('#photo').onclick=catPhoto;
  app.querySelectorAll('[data-poop]').forEach(b=>b.onclick=()=>{c.poops=Math.max(0,c.poops-1);c.bag++;c.joy=clamp(c.joy+3,0,100);tone(400,0,.08);tone(600,.08,.1);savePlayer();catScreen()});
  $('#rename').onclick=()=>{const v=$('#catname').value.trim().replace(/\s+/g,' ');if(!v)return;c.name=v.slice(0,14);savePlayer(true);catScreen()}}
const effText=f=>Object.entries(f.eff).map(([k,v])=>`${STAT_NAME[k]} +${v}`).join(', ')+(f.xp2?`, двойной опыт на ${f.xp2} игры`:'');

async function catScreen(tab){screen='cat';stopTimer();tick();if(tab)catTab=tab;const c=player.cat,R=player.room;
  const tabs=`<div class="tabs big" role="group" aria-label="Раздел">${[['care','Уход и еда'],['wear','Гардероб'],['skins','Породы'],['kennel','Питомник'+(player.nest&&player.nest.until<=Date.now()?' · котёнок!':'')],['room','Комната'],['chest','Сундуки'+(anyGift()?' · подарки!':'')]].map(([k,n])=>`<button data-t="${k}" aria-pressed="${catTab===k}">${n}</button>`).join('')}</div>`;
  let body='';
  if(catTab==='care'){const now=Date.now();
    body=`<div class="catpage">${stageHTML()}<div>
    <h4 style="margin-top:0">Еда в запасе</h4>${Object.keys(c.inv).length?`<div class="items">${FOODS.filter(f=>c.inv[f.id]).map(f=>`<button class="item r-${f.r}" data-eat="${f.id}" ${sleeping()?'aria-disabled="true"':''}><span style="font-size:42px">${f.icon}</span><span>${f.name} ×${c.inv[f.id]}</span><span class="rt r-${f.r}">Дать</span></button>`).join('')}</div>`:'<p class="note" style="margin:0">Запас пуст. Купи еду в магазине ниже.</p>'}
    <h4>Автокормушка</h4><p class="note" style="margin:0">Сухой корм без бонусов: +30 к сытости. Кормушка сама кормит котёнка, когда сытость ниже 40. Сейчас порций: <b>${c.feeder.n} из ${FEEDER_MAX}</b>${c.feeder.n<FEEDER_MAX?`, следующая через ${fmtLeft(c.feeder.next-now)}`:''}.</p>
    <h4>Магазин еды</h4><div class="items">${FOODS.map(f=>`<button class="item r-${f.r}" data-buy="${f.id}"><span style="font-size:42px">${f.icon}</span><span>${f.name}</span><span class="rt r-${f.r}">${f.grade}</span><span style="font-size:12px;color:var(--muted);font-weight:400">${effText(f)}</span><span class="price">★ ${f.price}</span></button>`).join('')}</div>
    <h4>Уборка</h4><p class="note" style="margin:0">Котёнок ходит в туалет раз в 8–15 часов. Неубранные какашки портят ему настроение. Собрано: <b>${c.bag} 💩</b>. 10 штук можно обменять на звезду.</p>
    <div class="btns" style="justify-content:flex-start"><button class="btn small" id="swap" ${c.bag<10?'disabled':''}>Обменять 10 💩 на ★</button></div>
    <h4>Сон</h4><p class="note" style="margin:0">Котёнку нужно спать минимум ${SLEEP_H} часа в сутки. Если энергия кончится, он уснёт сам. Пока он спит или какая-то шкала пустая, играть с ним нельзя. Задания решать можно всегда.</p>
    </div></div>`}
  else if(catTab==='wear'){const owned=new Set(c.owned);
    body=`<div class="catpage">${stageHTML()}<div><div class="tabs" role="group" aria-label="Вещи">${SLOTS.map(([s,n])=>`<button data-s="${s}" aria-pressed="${s===wearSlot}">${n}</button>`).join('')}</div>
    <div class="items">${WEAR.filter(x=>x.slot===wearSlot).map(x=>owned.has(x.id)?`<button class="item r-${x.r}${c.wear[x.slot]===x.id?' on':''}" data-w="${x.id}">${wearPreview(x)}<span>${esc(x.name)}</span><span class="rt r-${x.r}">${RARITY[x.r].name}</span></button>`:lockedCard(x.r,wearPreview(x))).join('')}</div>
    <p class="note">Нажми на вещь, чтобы надеть или снять. Серые вещи ждут в сундуках с одеждой. Собрано ${c.owned.length} из ${WEAR.length}.</p></div></div>`}
  else if(catTab==='skins'){const owned=new Set(c.skins);const list=SKINS.filter(s=>skinFilter==='all'||(s.st||'soft')===skinFilter&&s.pat!=='circuit'||(skinFilter==='cyber'&&s.pat==='circuit')||(skinFilter==='glow'&&s.glow));
    body=`<div class="catpage">${stageHTML()}<div><div class="tabs" role="group" aria-label="Котята">${[['all','Все'],['soft','Пушистые'],['cyber','Кибер'],['pixel','Пиксельные'],['brick','Кирпичики'],['glow','Светятся глаза']].map(([k,n])=>`<button data-f="${k}" aria-pressed="${skinFilter===k}">${n}</button>`).join('')}</div>
    <div class="items">${list.map(s=>owned.has(s.id)?`<button class="item r-${s.r}${c.skin===s.id&&!c.kid?' on':''}" data-k="${s.id}">${skinPreview(s)}<span>${esc(s.name)}</span><span class="rt r-${s.r}">${RARITY[s.r].name}</span></button>`:lockedCard(s.r,skinPreview(s))).join('')}</div>
    <p class="note">Нажми на котёнка, чтобы играть им. Новые котята выпадают из сундуков с котятами. Собрано ${c.skins.length} из ${SKINS.length}.</p></div></div>`}
  else if(catTab==='kennel')body=kennelHTML();
  else if(catTab==='room'){const art=await loadArt();if(screen!=='cat'||catTab!=='room')return;const owned=new Set(R.owned);const w=wallet();let grid='';
    if(roomSlot==='wp'||roomSlot==='fl'){const list=roomSlot==='wp'?WALLS:FLOORS;const cur=roomSlot==='wp'?R.wp:R.fl;
      grid=list.map(o=>{const has=owned.has(o.id);return `<button class="item${cur===o.id?' on':''}" data-o="${o.id}" ${!has&&w<o.price?'aria-disabled="true"':''}>${swatchSVG(o)}<span>${esc(o.name)}</span><span class="${has?'rt r-common':'price'}">${has?(cur===o.id?'выбрано':'есть'):'★ '+o.price}</span></button>`}).join('')}
    else grid=FURN.filter(f=>f.slot===roomSlot).map(f=>owned.has(f.id)?`<button class="item r-${f.r}${R.place[f.slot]===f.id?' on':''}" data-p="${f.id}">${furnPreview(f)}<span>${esc(f.name)}</span><span class="rt r-${f.r}">${RARITY[f.r].name}</span></button>`:lockedCard(f.r,furnPreview(f))).join('');
    const furnCount=R.owned.filter(id=>FURN_BY_ID[id]).length;
    body=`<div class="roomview" style="margin-top:14px" id="roomv">${roomSVG(player,art)}</div>
    <div class="row">${c.poops?`<button class="btn small" id="cleanAll">Убрать какашки (${c.poops})</button>`:''}<button class="btn alt small" id="photo2">📷 Фото комнаты</button></div>
    <div class="tabs" style="margin-top:14px" role="group" aria-label="Обустройство">${[['wp','Обои'],['fl','Пол'],...RSLOTS].map(([s,n])=>`<button data-r="${s}" aria-pressed="${s===roomSlot}">${n}</button>`).join('')}</div>
    <div class="items">${grid}</div>
    <p class="note">${roomSlot==='wp'||roomSlot==='fl'?'Обои и пол покупаются за звёзды сразу.':`Мебель выпадает из сундуков обустройства. Нажми на вещь, чтобы поставить или убрать. Собрано ${furnCount} из ${FURN.length}.`}</p>`}
  else{body=Object.entries(CHEST_SETS).map(([k,S])=>`<h4>${S.title}</h4><p class="sub" style="margin:0">${S.note}</p><div class="chests">
    ${player.gifts[k]?`<div class="chest">${chestSVG('gift',k)}<h5>Подарок</h5><p>Бесплатно, один раз</p><button class="btn small" data-c="${k}:gift:1">Открыть</button></div>`:''}
    ${Object.entries(S.tiers).map(([t,T])=>{const ten=Math.round(T.cost*9);return `<div class="chest">${chestSVG(t,k)}<h5>${T.name}</h5><p>${T.desc}</p>
      <button class="btn small" data-c="${k}:${t}:1" ${wallet()<T.cost?'disabled':''}>★ ${T.cost}</button>
      <button class="btn alt small" data-c="${k}:${t}:10" ${wallet()<ten?'disabled':''}>×10 за ★ ${ten} <span class="tag" style="color:var(--ok)">−10%</span></button></div>`}).join('')}</div>`).join('')+
    `<p class="note">У тебя ★ ${wallet()}. Если выпадет то, что уже есть, часть звёзд вернётся.</p>`}
  app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>${catTab==='room'?'Комната':'Котёнок'} ${esc(c.name)}</h2><span class="chip"><b>★</b>${wallet()}</span></div>${tabs}${body}</section>`;
  $('#back').onclick=menu;
  app.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>catScreen(b.dataset.t));
  if(catTab==='care'||catTab==='wear'||catTab==='skins')bindStage();
  if(catTab==='kennel')bindKennel();
  app.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{wearSlot=b.dataset.s;catScreen()});
  app.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{skinFilter=b.dataset.f;catScreen()});
  app.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{roomSlot=b.dataset.r;catScreen()});
  app.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{const x=WEAR_BY_ID[b.dataset.w];c.wear={...c.wear,[x.slot]:c.wear[x.slot]===x.id?null:x.id};if(!c.wear[x.slot])delete c.wear[x.slot];
    c.joy=clamp(c.joy+2,0,100);tone(740,0,.12,'triangle');savePlayer();catScreen()});
  app.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{setActive(indFromSkin(SKIN_BY_ID[b.dataset.k]));tone(740,0,.12,'triangle');savePlayer();catScreen()});
  app.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{const f=FURN_BY_ID[b.dataset.p];if(R.place[f.slot]===f.id)delete R.place[f.slot];else R.place[f.slot]=f.id;tone(620,0,.1,'triangle');savePlayer();catScreen()});
  app.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const id=b.dataset.o;const o=WALL_BY_ID[id]||FLOOR_BY_ID[id];const isW=!!WALL_BY_ID[id];
    if(!R.owned.includes(id)){if(wallet()<o.price){toast(`Нужно ещё ★ ${o.price-wallet()}`);return}player.spent+=o.price;R.owned=[...R.owned,id];fanfare();toast(`Куплено: ${esc(o.name)}`)}
    if(isW)R.wp=id;else R.fl=id;savePlayer(true);renderMe();catScreen()});
  app.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const f=FOOD_BY_ID[b.dataset.buy];if(wallet()<f.price){toast(`Нужно ещё ★ ${f.price-wallet()}`);return}
    player.spent+=f.price;c.inv={...c.inv,[f.id]:(c.inv[f.id]||0)+1};tone(660,0,.1);savePlayer(true);renderMe();toast(`${f.icon} ${f.name} в запасе`);catScreen()});
  app.querySelectorAll('[data-eat]').forEach(b=>b.onclick=()=>{if(sleeping()){toast('Котёнок спит');return}const f=FOOD_BY_ID[b.dataset.eat];if(!c.inv[f.id])return;
    c.inv={...c.inv,[f.id]:c.inv[f.id]-1};if(!c.inv[f.id])delete c.inv[f.id];applyEffects(f.eff,true);if(f.xp2)player.buff={xp2:(player.buff.xp2||0)+f.xp2};
    tone(520,0,.1);tone(620,.1,.12);savePlayer(true);catScreen();const s=$('#say');if(s)s.textContent=pick(['Ням-ням! Спасибо!','Вкуснятина!','Мяу, я сытый!'])});
  const sw=$('#swap');if(sw)sw.onclick=()=>{if(c.bag<10)return;c.bag-=10;player.stars+=1;fanfare();savePlayer(true);renderMe();toast('+1 ★ за уборку');catScreen()};
  const ca=$('#cleanAll');if(ca)ca.onclick=()=>{c.bag+=c.poops;c.joy=clamp(c.joy+3*c.poops,0,100);c.poops=0;tone(500,0,.1);savePlayer();catScreen()};
  const p2=$('#photo2');if(p2)p2.onclick=catPhoto;
  app.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{const [s,t,n]=b.dataset.c.split(':');openChest(s,t,+n)})}

/* ===== Фото котёнка ===== */
const svgImage=svg=>new Promise(res=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)});
async function catPhoto(){const m=$('#modal');m.innerHTML=evOverlay('<h3>Делаем фото…</h3>');
  const art=await loadArt();const im=await svgImage(roomSVG(player,art));const cv=document.createElement('canvas');cv.width=800;cv.height=660;const x=cv.getContext('2d');
  x.fillStyle='#fffdf6';x.fillRect(0,0,800,660);if(im)x.drawImage(im,20,20,760,532);x.strokeStyle='#8b5a2b';x.lineWidth=6;x.strokeRect(20,20,760,532);
  const L=lvlInfo(player.xp);x.fillStyle='#1f3a8a';x.font='bold 40px Neucha, cursive, sans-serif';x.textBaseline='middle';x.fillText(`${player.cat.name}`,30,600);
  x.font='22px Nunito, sans-serif';x.fillStyle='#5a6478';x.fillText(`${player.nick} · уровень ${L.l} · ${L.title} · ${new Date().toLocaleDateString('ru-RU')}`,30,638);
  x.textAlign='right';x.font='bold 22px Nunito, sans-serif';x.fillStyle='#e0525a';x.fillText('Умная тетрадка',780,600);
  let url='';try{url=cv.toDataURL('image/png')}catch(e){}
  if(!url){m.innerHTML=evOverlay('<h3>Не получилось</h3><p>Этот браузер не дал сделать фото.</p><div class="btns"><button class="btn" id="phClose">Закрыть</button></div>');$('#phClose').onclick=()=>m.innerHTML='';return}
  const file=`kotenok-${player.cat.name}.png`.replace(/[^\wа-яё.-]/gi,'_');
  m.innerHTML=evOverlay(`<h3>Фото котёнка</h3><img src="${url}" alt="Фото котёнка ${esc(player.cat.name)}" style="border-radius:12px;display:block;width:100%">
  <p class="note" id="phNote">На телефоне можно нажать на фото и удерживать, чтобы сохранить.</p><div class="btns"><button class="btn" id="phSave">Сохранить фото</button><button class="btn alt" id="phClose">Закрыть</button></div>`);
  $('#phClose').onclick=()=>m.innerHTML='';
  $('#phSave').onclick=async()=>{const blob=await (await fetch(url)).blob();
    const dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null;
    if(dl){try{await dl.save({filename:file,data:blob});$('#phNote').textContent='Готово!'}catch(e){$('#phNote').textContent=e&&e.code==='declined'?'Сохранение отменено.':'Не получилось сохранить. Нажми на фото и удерживай.'}return}
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=file;document.body.appendChild(a);a.click();a.remove();$('#phNote').textContent='Фото сохраняется в загрузки.'}}

/* ===== Сундуки ===== */
const CHEST_SETS={
  clothes:{title:'Сундуки с одеждой',note:'Шапки, очки, светящиеся глаза, костюмы, крылья и игрушки',pool:WEAR,get:()=>player.cat.owned,add:id=>player.cat.owned=[...player.cat.owned,id],
    preview:wearPreview,equip:it=>{player.cat.wear={...player.cat.wear,[it.slot]:it.id};wearSlot=it.slot;return 'wear'},gift:{common:60,rare:40,legend:0},
    tiers:{small:{name:'Деревянный сундук',cost:5,desc:'Чаще всего обычные вещи',w:{common:80,rare:18,legend:2}},rare:{name:'Волшебный сундук',cost:15,desc:'Много редких вещей',w:{common:25,rare:65,legend:10}},royal:{name:'Королевский сундук',cost:40,desc:'Шанс на легендарную вещь',w:{common:0,rare:40,legend:60}}}},
  cats:{title:'Сундуки с котятами',note:'Пушистые, кибер, пиксельные и котята-кирпичики, коты со светящимися глазами',pool:SKINS,get:()=>player.cat.skins,add:id=>player.cat.skins=[...player.cat.skins,id],
    preview:s=>skinPreview(s,'happy'),equip:it=>{setActive(indFromSkin(it));return 'skins'},gift:{common:70,rare:30,legend:0},
    tiers:{small:{name:'Коробка с котёнком',cost:10,desc:'Обычные породы',w:{common:75,rare:22,legend:3}},rare:{name:'Волшебная корзинка',cost:25,desc:'Редкие и кибер-котята',w:{common:20,rare:65,legend:15}},royal:{name:'Королевская переноска',cost:60,desc:'Шанс на легендарного кота',w:{common:0,rare:35,legend:65}}}},
  room:{title:'Сундуки обустройства',note:'Лежанки, когтеточки, лампы, коврики, растения и окна для комнаты',pool:FURN,get:()=>player.room.owned,add:id=>player.room.owned=[...player.room.owned,id],
    preview:furnPreview,equip:it=>{player.room.place={...player.room.place,[it.slot]:it.id};roomSlot=it.slot;return 'room'},gift:{common:70,rare:30,legend:0},
    tiers:{small:{name:'Ящик с мебелью',cost:6,desc:'Простая мебель',w:{common:80,rare:18,legend:2}},rare:{name:'Дизайнерский сундук',cost:18,desc:'Много редких вещей',w:{common:25,rare:62,legend:13}},royal:{name:'Дворцовый сундук',cost:45,desc:'Шанс на легендарную мебель',w:{common:0,rare:40,legend:60}}}}};
function chestSVG(tier,set){const c={small:['#a0692f','#5c3a17','#c99700'],rare:['#7a4fd6','#3b2a6b','#e9e4ff'],royal:['#f4b400','#a06c00','#e63946'],gift:['#e63946','#8a1c25','#ffd166']}[tier];
  const emblem=set==='cats'?`<circle cx="60" cy="74" r="7" fill="#fff" opacity=".9"/><circle cx="50" cy="64" r="3.5" fill="#fff" opacity=".9"/><circle cx="58" cy="60" r="3.5" fill="#fff" opacity=".9"/><circle cx="66" cy="60" r="3.5" fill="#fff" opacity=".9"/><circle cx="72" cy="66" r="3.5" fill="#fff" opacity=".9"/>`
    :set==='room'?`<path d="M48 82 V70 L60 60 L72 70 V82 Z" fill="#fff" opacity=".9"/><rect x="56" y="72" width="8" height="10" fill="${c[1]}"/>`
    :`<path d="M60 72 L46 64 L48 82 Z M60 72 L74 64 L72 82 Z" fill="#fff" opacity=".9"/><circle cx="60" cy="72" r="4" fill="#fff"/>`;
  return `<svg viewBox="0 0 120 100" aria-hidden="true"><rect x="12" y="44" width="96" height="50" rx="8" fill="${c[0]}" stroke="${c[1]}" stroke-width="4"/>
  <path d="M12 46 Q12 14 60 14 Q108 14 108 46 Z" fill="${c[0]}" stroke="${c[1]}" stroke-width="4"/>
  <rect x="12" y="42" width="96" height="10" fill="${c[1]}"/><rect x="52" y="38" width="16" height="16" rx="3" fill="${c[2]}" stroke="${c[1]}" stroke-width="3"/>
  <path d="M30 18 L30 94 M90 18 L90 94" stroke="${c[1]}" stroke-width="4" opacity=".6"/>${emblem}</svg>`}
function rollItem(S,w){const owned=new Set(S.get());const total=w.common+w.rare+w.legend;const r=Math.random()*total;
  const rar=r<w.common?'common':r<w.common+w.rare?'rare':'legend';
  let pool=S.pool.filter(x=>x.r===rar&&!owned.has(x.id));
  if(!pool.length){const order=rar==='legend'?['legend','rare','common']:rar==='rare'?['rare','legend','common']:['common','rare','legend'];
    for(const o of order){pool=S.pool.filter(x=>x.r===o&&!owned.has(x.id));if(pool.length)break}}
  if(!pool.length){const same=S.pool.filter(x=>x.r===rar);return {item:pick(same.length?same:S.pool),dupe:true}}
  return {item:pick(pool),dupe:false}}
function openChest(setKey,tier,count=1){const S=CHEST_SETS[setKey];const gift=tier==='gift';const T=gift?null:S.tiers[tier];if(gift)count=1;
  const cost=gift?0:count===10?Math.round(T.cost*9):T.cost;
  if(gift&&!player.gifts[setKey])return;if(!gift&&wallet()<cost)return;
  if(gift)player.gifts={...player.gifts,[setKey]:false};else player.spent+=cost;
  const got=[];let refund=0;
  for(let i=0;i<count;i++){const r=rollItem(S,gift?S.gift:T.w);if(r.dupe){r.refund=RARITY[r.item.r].dup;refund+=r.refund}else S.add(r.item.id);got.push(r)}
  player.spent=Math.max(-1e9,player.spent-refund);
  player.cat.joy=clamp(player.cat.joy+10,0,100);savePlayer(true);renderMe();
  const m=$('#modal');
  m.innerHTML=`<div class="overlay" role="dialog" aria-modal="true" aria-label="Открываем сундук"><div class="modal"><h3>Открываем${count>1?` ${count} сундуков`:''}…</h3>${chestSVG(tier,setKey).replace('<svg','<svg class="chestbig"')}</div></div>`;
  tone(300,0,.1,'square',.05);tone(340,.25,.1,'square',.05);tone(380,.5,.1,'square',.05);
  setTimeout(()=>{fanfare();const md=m.querySelector('.modal');if(!md)return;
    if(count===1){const {item,dupe}=got[0];
      md.innerHTML=`<p class="rt r-${item.r}" style="margin:0">${RARITY[item.r].name}${setKey==='cats'?' порода':' вещь'}</p><h3>${esc(item.name)}</h3>
      <div class="prize glow">${S.preview(item)}</div><p>${dupe?`Такое уже есть. Возвращаем ★ ${got[0].refund}.`:setKey==='cats'?'Новый котёнок в коллекции!':'Новая вещь в коллекции!'}</p>
      <div class="btns">${dupe?'':`<button class="btn" id="useNow">${setKey==='cats'?'Играть им':setKey==='room'?'Поставить':'Надеть'}</button>`}<button class="btn alt" id="closeM">Отлично!</button></div>`;
      const u=$('#useNow');if(u)u.onclick=()=>{const tab=S.equip(item);savePlayer(true);m.innerHTML='';catScreen(tab)}}
    else{const fresh=got.filter(g=>!g.dupe).length;
      md.classList.add('wide');md.innerHTML=`<h3>10 сундуков открыто!</h3><p>Новых: <b>${fresh}</b>${refund?` · вернули ★ ${refund} за повторы`:''}</p>
      <div class="items ten">${got.map(({item,dupe})=>`<div class="item r-${item.r} glow">${S.preview(item)}<span>${esc(item.name)}</span><span class="rt ${dupe?'':'r-'+item.r}">${dupe?'повтор':'новое!'}</span></div>`).join('')}</div>
      <div class="btns"><button class="btn" id="closeM">Отлично!</button></div>`}
    $('#closeM').onclick=()=>{m.innerHTML='';catScreen('chest')};$('#closeM').focus()},reduced?100:1300)}

/* ===== Итог игры ===== */
function resultScreen(big,st,msg,again,info,extra=''){const w=wallet();
  app.innerHTML=`<section class="sheet result"><p class="big">${big}</p><div class="st">${'★'.repeat(st)||'☆'}</div><p>${msg}${st?` · +${st} ★`:''} · +${info.xp} опыта${info.doubled?' (двойной опыт)':''}</p>${extra}
  ${info.up?`<p class="bubble" style="font-size:20px">Новый уровень ${info.level}! Бонус +${info.bonus} ★</p>`:''}
  <div class="home" style="margin:10px auto;max-width:520px;justify-content:center"><div class="pet" style="width:90px">${catSVG(player.cat,mood()==='sleep'?'sleep':'happy')}</div>
  <div class="txt" style="text-align:left"><div class="bubble">${w>=5?`У тебя ★ ${w}. Хватает на сундук!`:`Ещё ${5-w} ★ до первого сундука`}</div>${xpBar()}</div></div>
  <div class="btns">${again?'<button class="btn" id="again">Ещё раз</button>':''}<button class="btn alt" id="toMenu">Все игры</button><button class="btn alt" id="toChest">Сундуки</button><button class="btn alt" id="toBoard">Лидеры</button></div></section>`;
  const ag=$('#again');if(ag)ag.onclick=again;$('#toMenu').onclick=menu;$('#toChest').onclick=()=>catScreen('chest');$('#toBoard').onclick=leaders;
  if(info.up){fanfare();toast(`Уровень ${info.level}! +${info.bonus} ★`)}}
