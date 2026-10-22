/* ===== Каталог игр ===== */
const GROUPS=[
 ['Математика','',{
  math:{title:'Счёт',desc:'Примеры на + − × ÷',ic:'2+2',color:'#2f6fdc',gen:mathTask,levels:true},
  box:{title:'Окошко',desc:'Найди спрятанное число',ic:'☐',color:'#3f86e0',gen:boxTask,levels:true},
  column:{title:'Столбик',desc:'Пропущенные цифры в умножении и делении',ic:'×÷',color:'#2563b8',gen:columnTask,levels:true},
  cmp:{title:'Сравни',desc:'Больше, меньше или равно',ic:'&gt;&lt;',color:'#2a7fb8',gen:cmpTask,levels:true},
  story:{title:'Задачи',desc:'Задачи про ребят и вещи',ic:'?',color:'#1f5fa8',gen:storyTask,levels:true},
  clock:{title:'Часы',desc:'Время по стрелкам, 0–23 часа',ic:'🕒',color:'#e08a1e',gen:clockTask,levels:true},
  blitz:{title:'Блиц',desc:'Сколько примеров за минуту?',ic:'60',color:'#d6455c',gen:blitzTask,levels:true,timed:60}}],
 ['Логика','',{
  seq:{title:'Ряд',desc:'Найди закономерность в числах',ic:'1·3·5',color:'#7a4fd6',gen:seqTask,levels:true},
  odd:{title:'Лишнее',desc:'Что не подходит к остальным?',ic:'≠',color:'#8c5ad9',gen:oddTask},
  scale:{title:'Фрукты',desc:'Каждый фрукт — это число',ic:'🍎',color:'#9b4fb8',gen:scaleTask,levels:true},
  who:{title:'Кто выше?',desc:'Расставь ребят по порядку',ic:'↕',color:'#6a4cc0',gen:whoTask,levels:true},
  pattern:{title:'Узор',desc:'Что будет дальше в ряду?',ic:'▲●',color:'#5b3fa8',gen:patternTask,levels:true}}],
 ['Внимательность','',{
  spot:{title:'Найди другого',desc:'Одна картинка отличается',ic:'👀',color:'#0f8b8d',gen:spotTask,levels:true},
  count:{title:'Посчитай',desc:'Сколько здесь яблок?',ic:'#',color:'#16a085',gen:countTask,levels:true},
  stroop:{title:'Цвет и слово',desc:'Не дай словам себя запутать',ic:'Аа',color:'#1b7f6b',gen:stroopTask,levels:true}}],
 ['Сосредоточенность','',{
  schulte:{title:'Таблица Шульте',desc:'Найди все числа по порядку',ic:'1→25',color:'#2a9d74',engine:'schulte',levels:true},
  recall:{title:'Запомни ряд',desc:'Запомни картинки и их порядок',ic:'🧠',color:'#228b6a',gen:recallTask,levels:true},
  mem:{title:'Память',desc:'Найди одинаковые пары',ic:'?',color:'#2e7d5b',engine:'mem',levels:true}}],
 ['Русский язык','',{
  word:{title:'Буква',desc:'Словарные слова: вставь букву',ic:'Аа',color:'#c94a3b',gen:wordTask,levels:true}}],
 ['Беларуская мова','',{
  betr:{title:'Перакладзі',desc:'Як гэта па-беларуску?',ic:'Бе',color:'#b3261e',gen:beTrTask,levels:true},
  bemean:{title:'Што азначае?',desc:'Перевод с белорусского',ic:'?',color:'#9a2a20',gen:beMeanTask,levels:true},
  bespell:{title:'Як правільна?',desc:'Літары ў, і, дз, дж',ic:'ў',color:'#c0392b',gen:beSpellTask}}],
 ['Творчество','Здесь нет неправильных ответов',{
  draw:{title:'Дорисуй',desc:'Рисунок повесим в комнату котёнка',ic:'✎',color:'#e76f51',engine:'draw'},
  invent:{title:'Придумай',desc:'Задания для фантазии',ic:'💡',color:'#f4a261',engine:'creative'},
  tale:{title:'Сочини историю',desc:'Из нескольких слов',ic:'📖',color:'#e9a03b',engine:'creative',levels:true},
  common:{title:'Что общего?',desc:'Найди, что объединяет',ic:'∩',color:'#d1803b',gen:commonTask},
  paint:{title:'Смешай краски',desc:'Какой цвет получится?',ic:'🎨',color:'#c2552d',gen:paintTask}}],
 ['Безопасность','Важные правила, которые берегут здоровье',{
  firstaid:{title:'Первая помощь',desc:'Порезы, ожоги, ушибы',ic:'✚',color:'#d62839',gen:firstAidTask},
  obzh:{title:'Дома и на улице',desc:'Безопасность жизнедеятельности',ic:'🛡',color:'#4361ee',gen:obzhTask},
  pdd:{title:'ПДД',desc:'Дорога, светофор, переход',ic:'🚦',color:'#3a86ff',gen:pddTask}}],
 ['Сложные','Для тех, кто любит думать. Звёзды и опыт в 2 раза быстрее',{
  chain:{title:'Порядок действий',desc:'Длинные примеры со скобками',ic:'( )',color:'#3b2a6b',gen:chainTask,levels:true,hard:true},
  magic:{title:'Магический квадрат',desc:'Одинаковые суммы во всех линиях',ic:'3×3',color:'#4a2f86',gen:magicTask,levels:true,hard:true},
  pyramid:{title:'Пирамида',desc:'Кирпичик = сумма двух под ним',ic:'△',color:'#5a3a9e',gen:pyramidTask,levels:true,hard:true},
  superseq:{title:'Супер-ряд',desc:'Хитрые числовые закономерности',ic:'1·4·9',color:'#2f2464',gen:superSeqTask,levels:true,hard:true},
  tricky:{title:'Задачи с подвохом',desc:'Не торопись, здесь ловушки',ic:'!?',color:'#6b2f86',gen:trickyTask,hard:true}}]];
const GAMES=Object.assign({},...GROUPS.map(g=>g[2]));
const bestText=(k,v)=>k==='blitz'?`${v} ${plural(v,['пример','примера','примеров'])}`:`${v} из 10`;

let screen='';let timerId=null;
function stopTimer(){if(timerId){clearInterval(timerId);timerId=null}}
const backBtn=()=>`<button class="link" id="back">← Все игры</button>`;

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
function catLine(){const c=player.cat,w=wallet();
  if(c.food<25)return `${esc(c.name)} проголодался. Покорми его!`;
  if(c.joy<25)return `${esc(c.name)} скучает. Сыграй в любую игру!`;
  if(anyGift())return 'У тебя есть подарочные сундуки! Открой их.';
  if(w>=60)return 'Хватает на королевскую переноску с котёнком!';
  if(w>=5)return 'Мур! Хватает звёзд на сундук.';
  return pick(['Мур-мур! Давай решать задачки!','Мне нравится мой наряд!','Заработай звёзды — откроем сундук!','Мяу! Я люблю математику.','Обустроим мою комнату?'])}
function needBars(){const c=player.cat;const b=(n,v,col)=>`<div class="bar"><span>${n}</span><div class="track"><div class="fill" style="width:${Math.round(v)}%;background:${col}"></div></div></div>`;
  return `<div class="bars">${b('Сытость',c.food,'var(--ok)')}${b('Настроение',c.joy,'var(--star)')}</div>`}

function menu(){screen='menu';stopTimer();tick();
  app.innerHTML=`<section class="home"><div class="pet" id="petHome">${catSVG(player.cat,mood())}</div>
  <div class="txt"><div class="bubble">${catLine()}</div>${player.buff.xp2>0?`<p class="tag" style="margin:8px 0 0;color:var(--xp)">🌌 Двойной опыт: ещё ${player.buff.xp2} ${plural(player.buff.xp2,['игра','игры','игр'])}</p>`:''}${xpBar()}${needBars()}
  <div class="row"><button class="btn small" id="goCat">Котёнок</button><button class="btn alt small" id="goRoom">Комната</button><button class="btn alt small" id="goChest">Сундуки${anyGift()?' · подарки!':''}</button></div></div></section>`+
  GROUPS.map(([name,note,games])=>`<h2 class="section">${name}${note?`<small>${note}</small>`:''}</h2><div class="menu">${Object.entries(games).map(([k,g])=>`
  <button class="tile${g.hard?' hard':''}" data-g="${k}">${g.hard?'<span class="x2">×2 ★</span>':''}<span class="ic" style="background:${g.color}">${g.ic}</span>
  <span><h3>${g.title}</h3><p>${g.desc}</p>${player.best[k]!=null&&g.gen?`<small>Лучший результат: ${bestText(k,player.best[k])}</small>`:''}</span></button>`).join('')}</div>`).join('');
  $('#goCat').onclick=()=>catScreen('wear');$('#goRoom').onclick=()=>catScreen('room');$('#goChest').onclick=()=>catScreen('chest');$('#petHome').onclick=()=>catScreen('wear');
  app.querySelectorAll('.tile').forEach(b=>b.onclick=()=>{const k=b.dataset.g;GAMES[k].levels?pickLevel(k):start(k)});
  window.scrollTo({top:0})}

function start(k){const e=GAMES[k].engine;e==='mem'?memory():e==='schulte'?schulte():e==='creative'?creative(k):e==='draw'?drawGame():quiz(k)}
function pickLevel(key){screen='pick';const g=GAMES[key];
  app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>${g.title}</h2></div>
  <p class="sub" style="text-align:center;margin-top:14px">${g.desc}. Выбери свой класс:</p>
  <div class="classes">${[1,2,3,4].map(l=>`<button data-l="${l}" aria-pressed="${l===level}"><b>${l}</b><span>класс</span></button>`).join('')}</div></section>`;
  $('#back').onclick=menu;
  app.querySelectorAll('.classes button').forEach(b=>b.onclick=()=>{level=+b.dataset.l;LS.set('ut2_level',level);start(key)});
  app.querySelector(`.classes button[data-l="${level}"]`).focus({preventScroll:true})}

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

/* ===== Котёнок: гардероб, котята, комната, сундуки ===== */
let catTab='wear',wearSlot='hat',roomSlot='wp',skinFilter='all';
const lockedCard=(r,svg)=>`<button class="item r-${r} locked" aria-disabled="true">${svg}<span>???</span><span class="rt r-${r}">${RARITY[r].name}</span></button>`;
function stageHTML(){const c=player.cat,w=wallet();
  return `<div class="stage"><div class="bigcat" id="bigcat" title="Погладь котёнка">${catSVG(c,mood())}</div>
    <div class="bubble" id="say">${catLine()}</div>${needBars()}
    <div class="row" style="justify-content:center"><button class="btn small" id="feed" ${w<1?'disabled':''}>Покормить · ★1</button><button class="btn alt small" id="pet">Погладить</button></div>
    <div class="row"><input class="field" id="catname" maxlength="14" value="${esc(c.name)}" aria-label="Имя котёнка"><button class="btn alt small" id="rename">Назвать</button></div></div>`}
function bindStage(){const c=player.cat;
  const pet=()=>{const el=$('#bigcat');el.classList.remove('purr');void el.offsetWidth;el.classList.add('purr');purr();
    if(c.joy<70)c.joy=clamp(c.joy+6,0,70);$('#say').textContent=pick(['Мрррр…','Мур-мур-мур!','Ещё! Ещё!','Мне так хорошо!']);
    el.innerHTML=catSVG(c,'happy');const f=app.querySelectorAll('.stage .fill');if(f[1])f[1].style.width=Math.round(c.joy)+'%';savePlayer()};
  $('#bigcat').onclick=pet;$('#pet').onclick=pet;
  $('#feed').onclick=()=>{if(wallet()<1)return;player.spent+=1;c.food=clamp(c.food+30,0,100);c.joy=clamp(c.joy+4,0,100);
    tone(520,0,.1);tone(620,.1,.12);savePlayer(true);renderMe();catScreen();$('#say').textContent=pick(['Ням-ням! Спасибо!','Вкусная рыбка!','Мяу, я сытый!'])};
  $('#rename').onclick=()=>{const v=$('#catname').value.trim().replace(/\s+/g,' ');if(!v)return;c.name=v.slice(0,14);savePlayer(true);catScreen()}}

async function catScreen(tab){screen='cat';stopTimer();tick();if(tab)catTab=tab;const c=player.cat,R=player.room;
  const tabs=`<div class="tabs big" role="group" aria-label="Раздел">${[['wear','Гардероб'],['skins','Котята'],['room','Комната'],['chest','Сундуки'+(anyGift()?' · подарки!':'')]].map(([k,n])=>`<button data-t="${k}" aria-pressed="${catTab===k}">${n}</button>`).join('')}</div>`;
  let body='';
  if(catTab==='wear'){const owned=new Set(c.owned);
    body=`<div class="catpage">${stageHTML()}<div><div class="tabs" role="group" aria-label="Вещи">${SLOTS.map(([s,n])=>`<button data-s="${s}" aria-pressed="${s===wearSlot}">${n}</button>`).join('')}</div>
    <div class="items">${WEAR.filter(x=>x.slot===wearSlot).map(x=>owned.has(x.id)?`<button class="item r-${x.r}${c.wear[x.slot]===x.id?' on':''}" data-w="${x.id}">${wearPreview(x)}<span>${esc(x.name)}</span><span class="rt r-${x.r}">${RARITY[x.r].name}</span></button>`:lockedCard(x.r,wearPreview(x))).join('')}</div>
    <p class="note">Нажми на вещь, чтобы надеть или снять. Серые вещи ждут в сундуках с одеждой. Собрано ${c.owned.length} из ${WEAR.length}.</p></div></div>`}
  else if(catTab==='skins'){const owned=new Set(c.skins);const list=SKINS.filter(s=>skinFilter==='all'||(s.st||'soft')===skinFilter||(skinFilter==='cyber'&&s.pat==='circuit')||(skinFilter==='glow'&&s.glow));
    body=`<div class="catpage">${stageHTML()}<div><div class="tabs" role="group" aria-label="Котята">${[['all','Все'],['soft','Пушистые'],['cyber','Кибер'],['pixel','Пиксельные'],['brick','Кирпичики'],['glow','Светятся глаза']].map(([k,n])=>`<button data-f="${k}" aria-pressed="${skinFilter===k}">${n}</button>`).join('')}</div>
    <div class="items">${list.map(s=>owned.has(s.id)?`<button class="item r-${s.r}${c.skin===s.id?' on':''}" data-k="${s.id}">${skinPreview(s)}<span>${esc(s.name)}</span><span class="rt r-${s.r}">${RARITY[s.r].name}</span></button>`:lockedCard(s.r,skinPreview(s))).join('')}</div>
    <p class="note">Нажми на котёнка, чтобы играть им. Новые котята выпадают из сундуков с котятами. Собрано ${c.skins.length} из ${SKINS.length}.</p></div></div>`}
  else if(catTab==='room'){const art=await loadArt();if(screen!=='cat'||catTab!=='room')return;const owned=new Set(R.owned);const w=wallet();
    let grid='';
    if(roomSlot==='wp'||roomSlot==='fl'){const list=roomSlot==='wp'?WALLS:FLOORS;const cur=roomSlot==='wp'?R.wp:R.fl;
      grid=list.map(o=>{const has=owned.has(o.id);return `<button class="item${cur===o.id?' on':''}" data-o="${o.id}" ${!has&&w<o.price?'aria-disabled="true"':''}>${swatchSVG(o)}<span>${esc(o.name)}</span><span class="${has?'rt r-common':'price'}">${has?(cur===o.id?'выбрано':'есть'):'★ '+o.price}</span></button>`}).join('')}
    else grid=FURN.filter(f=>f.slot===roomSlot).map(f=>owned.has(f.id)?`<button class="item r-${f.r}${R.place[f.slot]===f.id?' on':''}" data-p="${f.id}">${furnPreview(f)}<span>${esc(f.name)}</span><span class="rt r-${f.r}">${RARITY[f.r].name}</span></button>`:lockedCard(f.r,furnPreview(f))).join('');
    const furnCount=R.owned.filter(id=>FURN_BY_ID[id]).length;
    body=`<div class="roomview" style="margin-top:14px">${roomSVG(player,art)}</div>
    <div class="tabs" style="margin-top:14px" role="group" aria-label="Обустройство">${[['wp','Обои'],['fl','Пол'],...RSLOTS].map(([s,n])=>`<button data-r="${s}" aria-pressed="${s===roomSlot}">${n}</button>`).join('')}</div>
    <div class="items">${grid}</div>
    <p class="note">${roomSlot==='wp'||roomSlot==='fl'?'Обои и пол покупаются за звёзды сразу.':`Мебель выпадает из сундуков обустройства. Нажми на вещь, чтобы поставить или убрать. Собрано ${furnCount} из ${FURN.length}.`} ${art?'Твой рисунок из игры «Дорисуй» висит на стене.':'Нарисуй картину в игре «Дорисуй», и она появится на стене.'}</p>`}
  else{body=Object.entries(CHEST_SETS).map(([k,S])=>`<h4>${S.title}</h4><p class="sub" style="margin:0">${S.note}</p><div class="chests">
    ${player.gifts[k]?`<div class="chest">${chestSVG('gift',k)}<h5>Подарок</h5><p>Бесплатно, один раз</p><button class="btn small" data-c="${k}:gift">Открыть</button></div>`:''}
    ${Object.entries(S.tiers).map(([t,T])=>`<div class="chest">${chestSVG(t,k)}<h5>${T.name}</h5><p>${T.desc}</p><button class="btn small" data-c="${k}:${t}" ${wallet()<T.cost?'disabled':''}>★ ${T.cost}</button></div>`).join('')}</div>`).join('')+
    `<p class="note">У тебя ★ ${wallet()}. Если выпадет вещь, которая уже есть, часть звёзд вернётся.</p>`}
  app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>${catTab==='room'?'Комната':'Котёнок'} ${esc(c.name)}</h2><span class="chip"><b>★</b>${wallet()}</span></div>${tabs}${body}</section>`;
  $('#back').onclick=menu;
  app.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>catScreen(b.dataset.t));
  if(catTab==='wear'||catTab==='skins')bindStage();
  app.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{wearSlot=b.dataset.s;catScreen()});
  app.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{skinFilter=b.dataset.f;catScreen()});
  app.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{roomSlot=b.dataset.r;catScreen()});
  app.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{const x=WEAR_BY_ID[b.dataset.w];c.wear={...c.wear,[x.slot]:c.wear[x.slot]===x.id?null:x.id};if(!c.wear[x.slot])delete c.wear[x.slot];
    c.joy=clamp(c.joy+2,0,100);tone(740,0,.12,'triangle');savePlayer();catScreen()});
  app.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{c.skin=b.dataset.k;tone(740,0,.12,'triangle');savePlayer();catScreen()});
  app.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{const f=FURN_BY_ID[b.dataset.p];if(R.place[f.slot]===f.id)delete R.place[f.slot];else R.place[f.slot]=f.id;tone(620,0,.1,'triangle');savePlayer();catScreen()});
  app.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const id=b.dataset.o;const o=WALL_BY_ID[id]||FLOOR_BY_ID[id];const isW=!!WALL_BY_ID[id];
    if(!R.owned.includes(id)){if(wallet()<o.price){toast(`Нужно ещё ★ ${o.price-wallet()}`);return}player.spent+=o.price;R.owned=[...R.owned,id];fanfare();toast(`Куплено: ${esc(o.name)}`)}
    if(isW)R.wp=id;else R.fl=id;savePlayer(true);renderMe();catScreen()});
  app.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{const [s,t]=b.dataset.c.split(':');openChest(s,t)})}

const CHEST_SETS={
  clothes:{title:'Сундуки с одеждой',note:'Шапки, очки, светящиеся глаза, костюмы, крылья и игрушки',pool:WEAR,get:()=>player.cat.owned,add:id=>player.cat.owned=[...player.cat.owned,id],
    preview:wearPreview,equip:it=>{player.cat.wear={...player.cat.wear,[it.slot]:it.id};wearSlot=it.slot;return 'wear'},gift:{common:60,rare:40,legend:0},
    tiers:{small:{name:'Деревянный сундук',cost:5,desc:'Чаще всего обычные вещи',w:{common:80,rare:18,legend:2}},rare:{name:'Волшебный сундук',cost:15,desc:'Много редких вещей',w:{common:25,rare:65,legend:10}},royal:{name:'Королевский сундук',cost:40,desc:'Шанс на легендарную вещь',w:{common:0,rare:40,legend:60}}}},
  cats:{title:'Сундуки с котятами',note:'Пушистые, кибер, пиксельные и котята-кирпичики, коты со светящимися глазами',pool:SKINS,get:()=>player.cat.skins,add:id=>player.cat.skins=[...player.cat.skins,id],
    preview:s=>skinPreview(s,'happy'),equip:it=>{player.cat.skin=it.id;return 'skins'},gift:{common:70,rare:30,legend:0},
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
  if(!pool.length)return {item:pick(S.pool.filter(x=>x.r===rar).length?S.pool.filter(x=>x.r===rar):S.pool),dupe:true};
  return {item:pick(pool),dupe:false}}
function openChest(setKey,tier){const S=CHEST_SETS[setKey];const gift=tier==='gift';const T=gift?null:S.tiers[tier];
  if(gift&&!player.gifts[setKey])return;if(!gift&&wallet()<T.cost)return;
  if(gift)player.gifts={...player.gifts,[setKey]:false};else player.spent+=T.cost;
  const {item,dupe}=rollItem(S,gift?S.gift:T.w);let refund=0;
  if(dupe){refund=RARITY[item.r].dup;player.spent=Math.max(0,player.spent-refund)}else S.add(item.id);
  player.cat.joy=clamp(player.cat.joy+10,0,100);savePlayer(true);renderMe();
  const m=$('#modal');
  m.innerHTML=`<div class="overlay" role="dialog" aria-modal="true" aria-label="Открываем сундук"><div class="modal"><h3>Открываем…</h3>${chestSVG(tier,setKey).replace('<svg','<svg class="chestbig"')}</div></div>`;
  tone(300,0,.1,'square',.05);tone(340,.25,.1,'square',.05);tone(380,.5,.1,'square',.05);
  setTimeout(()=>{fanfare();
    m.querySelector('.modal').innerHTML=`<p class="rt r-${item.r}" style="margin:0">${RARITY[item.r].name}${setKey==='cats'?' порода':' вещь'}</p><h3>${esc(item.name)}</h3>
    <div class="prize glow">${S.preview(item)}</div><p>${dupe?`Такое уже есть. Возвращаем ★ ${refund}.`:setKey==='cats'?'Новый котёнок в коллекции!':'Новая вещь в коллекции!'}</p>
    <div class="btns">${dupe?'':`<button class="btn" id="useNow">${setKey==='cats'?'Играть им':setKey==='room'?'Поставить':'Надеть'}</button>`}<button class="btn alt" id="closeM">Отлично!</button></div>`;
    $('#closeM').onclick=()=>{m.innerHTML='';catScreen('chest')};$('#closeM').focus();
    const u=$('#useNow');if(u)u.onclick=()=>{const tab=S.equip(item);savePlayer(true);m.innerHTML='';catScreen(tab)}},reduced?100:1300)}

/* ===== Итог игры ===== */
function resultScreen(big,st,msg,again,info){const w=wallet();
  app.innerHTML=`<section class="sheet result"><p class="big">${big}</p><div class="st">${'★'.repeat(st)||'☆'}</div><p>${msg}${st?` · +${st} ★`:''} · +${info.xp} опыта${info.doubled?' (×2 от северного сияния)':''}</p>
  ${info.up?`<p class="bubble" style="font-size:20px">Новый уровень ${info.level}! Бонус +${info.bonus} ★</p>`:''}
  <div class="home" style="margin:10px auto;max-width:520px;justify-content:center"><div class="pet" style="width:90px">${catSVG(player.cat,'happy')}</div>
  <div class="txt" style="text-align:left"><div class="bubble">${w>=5?`У тебя ★ ${w}. Хватает на сундук!`:`Ещё ${5-w} ★ до первого сундука`}</div>${xpBar()}</div></div>
  <div class="btns"><button class="btn" id="again">Ещё раз</button><button class="btn alt" id="toMenu">Все игры</button><button class="btn alt" id="toChest">Сундуки</button><button class="btn alt" id="toBoard">Лидеры</button></div></section>`;
  $('#again').onclick=again;$('#toMenu').onclick=menu;$('#toChest').onclick=()=>catScreen('chest');$('#toBoard').onclick=leaders;
  if(info.up){fanfare();toast(`Уровень ${info.level}! +${info.bonus} ★`)}
  maybeEvent()}
