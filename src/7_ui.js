/* ===== Каталог игр ===== */
const GROUPS=[
 [Lx("Игры с котёнком","Games with your kitten"),Lx("Котёнок играет сам. Поднимают развлечение и спорт","Your kitten plays itself. Raises fun and sport"),{
  bowling:{title:Lx("Боулинг","Bowling"),desc:Lx("Сбей все кегли","Knock down all the pins"),ic:'🎳',color:'#e76f51',engine:'cat'},
  basket:{title:Lx("Баскетбол","Basketball"),desc:Lx("Попади мячом в кольцо","Shoot the ball into the hoop"),ic:'🏀',color:'#f77f00',engine:'cat'},
  penalty:{title:Lx("Пенальти","Penalty"),desc:Lx("Забей гол мимо вратаря","Score past the goalkeeper"),ic:'⚽',color:'#2e9e5b',engine:'cat'},
  fishing:{title:Lx("Рыбалка","Fishing"),desc:Lx("Поймай рыбок удочкой","Catch fish with a rod"),ic:'🎣',color:'#2f6fdc',engine:'cat'},
  laser:{title:Lx("Лазерная точка","Laser dot"),desc:Lx("Котёнок гоняется за точкой","Your kitten chases the dot"),ic:'🔴',color:'#d62839',engine:'cat'},
  jump:{title:Lx("Прыжки","Jumping"),desc:Lx("Перепрыгивай препятствия","Jump over obstacles"),ic:'🦘',color:'#7a4fd6',engine:'cat'}}],
 [Lx("Турнир дня","Daily tournament"),Lx("Одна попытка в сутки: кто решит больше примеров за минуту","One try a day: who can solve the most examples in a minute"),{
  tourney:{title:Lx("Турнир","Tournament"),desc:Lx("Таблица по классам, новая каждый день","Rankings by grade, new every day"),ic:'🏆',color:'#d99a00',engine:'tourney'}}],
 [Lx("Математика","Math"),'',{
  math:{title:Lx("Счёт","Arithmetic"),desc:Lx("Примеры на + − × ÷","Examples with + − × ÷"),ic:'2+2',color:'#2f6fdc',gen:mathTask,levels:true},
  box:{title:Lx("Окошко","Hidden number"),desc:Lx("Найди спрятанное число","Find the hidden number"),ic:'☐',color:'#3f86e0',gen:boxTask,levels:true},
  cmp:{title:Lx("Сравни","Compare"),desc:Lx("Больше, меньше или равно","Greater, less or equal"),ic:'&gt;&lt;',color:'#2a7fb8',gen:cmpTask,levels:true},
  story:{title:Lx("Задачи","Word problems"),desc:Lx("Задачи про ребят и вещи","Problems about kids and things"),ic:'?',color:'#1f5fa8',gen:storyTask,levels:true},
  clock:{title:Lx("Часы","Clock"),desc:Lx("Время по стрелкам, 0–23 часа","Tell the time, 0–23 hours"),ic:'🕒',color:'#e08a1e',gen:clockTask,levels:true}}],
 [Lx("Логика","Logic"),'',{
  seq:{title:Lx("Ряд","Sequence"),desc:Lx("Найди закономерность в числах","Find the pattern in the numbers"),ic:'1·3·5',color:'#7a4fd6',gen:seqTask,levels:true},
  odd:{title:Lx("Лишнее","Odd one out"),desc:Lx("Что не подходит к остальным?","Which one doesn't fit?"),ic:'≠',color:'#8c5ad9',gen:oddTask},
  scale:{title:Lx("Фрукты","Fruits"),desc:Lx("Каждый фрукт — это число","Each fruit is a number"),ic:'🍎',color:'#9b4fb8',gen:scaleTask,levels:true},
  who:{title:Lx("Кто выше?","Who's taller?"),desc:Lx("Расставь ребят по порядку","Put the kids in order"),ic:'↕',color:'#6a4cc0',gen:whoTask,levels:true},
  pattern:{title:Lx("Узор","Pattern"),desc:Lx("Что будет дальше в ряду?","What comes next in the row?"),ic:'▲●',color:'#5b3fa8',gen:patternTask,levels:true}}],
 [Lx("Внимательность","Attention"),'',{
  spot:{title:Lx("Найди другого","Spot the different one"),desc:Lx("Одна картинка чуть-чуть отличается","One picture is slightly different"),ic:'👀',color:'#0f8b8d',gen:spotTask,levels:true},
  stroop:{title:Lx("Цвет и слово","Color and word"),desc:Lx("Не дай словам себя запутать","Don't let the words fool you"),ic:Lx("Аа","Aa"),color:'#1b7f6b',gen:stroopTask,levels:true}}],
 [Lx("Сосредоточенность","Focus"),'',{
  schulte:{title:Lx("Таблица Шульте","Schulte table"),desc:Lx("Найди все числа по порядку","Find all the numbers in order"),ic:'1→25',color:'#2a9d74',engine:'schulte',levels:true},
  recall:{title:Lx("Запомни ряд","Remember the row"),desc:Lx("Запомни картинки и их порядок","Remember the pictures and their order"),ic:'🧠',color:'#228b6a',gen:recallTask,levels:true},
  mem:{title:Lx("Память","Memory"),desc:Lx("Найди одинаковые пары","Find matching pairs"),ic:'?',color:'#2e7d5b',engine:'mem',levels:true}}],
 [Lx("Сложные","Hard"),Lx("Для тех, кто любит думать. Звёзды и опыт в 2 раза быстрее","For those who love to think. Stars and XP twice as fast"),{
  chain:{title:Lx("Порядок действий","Order of operations"),desc:Lx("Длинные примеры со скобками","Long examples with brackets"),ic:'( )',color:'#3b2a6b',gen:chainTask,levels:true,hard:true},
  magic:{title:Lx("Магический квадрат","Magic square"),desc:Lx("Одинаковые суммы во всех линиях","Equal sums on every line"),ic:'3×3',color:'#4a2f86',gen:magicTask,levels:true,hard:true},
  pyramid:{title:Lx("Пирамида","Pyramid"),desc:Lx("Кирпичик","Brick")+' = '+Lx("сумма двух под ним","sum of the two below"),ic:'△',color:'#5a3a9e',gen:pyramidTask,levels:true,hard:true},
  superseq:{title:Lx("Супер-ряд","Super sequence"),desc:Lx("Хитрые числовые закономерности","Tricky number patterns"),ic:'1·4·9',color:'#2f2464',gen:superSeqTask,levels:true,hard:true},
  tricky:{title:Lx("Задачи с подвохом","Trick questions"),desc:Lx("Не торопись, здесь ловушки","Take your time, there are traps here"),ic:'!?',color:'#6b2f86',gen:trickyTask,hard:true}}]];
const GAMES=Object.assign({blitz:{title:Lx("Турнир дня","Daily tournament"),desc:Lx("Примеры на время","Timed examples"),gen:blitzTask,levels:true,timed:60,tourney:true}},...GROUPS.map(g=>g[2]));
const bestText=(k,v)=>`${v} ${Lx("из 10","of 10")}`;

let screen='';let timerId=null;
function stopTimer(){if(timerId){clearInterval(timerId);timerId=null}}
const backBtn=()=>`<button class="link" id="back">${Lx("← Все игры","← All games")}</button>`;
const fmtLeft=ms=>{const s=Math.max(0,Math.ceil(ms/1000));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60;
  return h?`${h} ${Lx("ч","h")} ${m} ${Lx("мин","min")}`:m?`${m} ${Lx("мин","min")} ${String(sec).padStart(2,'0')} ${Lx("с","s")}`:`${sec} ${Lx("с","s")}`};
const dayKey=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const toMidnight=()=>{const d=new Date();d.setHours(24,0,0,0);return d-Date.now()};

function login(){screen='login';stopTimer();
  const known=store.mode==='local'?Object.values(localPlayers()).map(p=>normalize(p)):[];
  app.innerHTML=`<section class="sheet login"><h2>${Lx("Как тебя зовут?","What's your name?")}</h2>
  <p class="sub">${Lx("Придумай ник. Он будет в таблице лидеров, а в подарок ты получишь котёнка и три сундука!","Choose a nickname. It will appear on the leaderboard, and you'll get a kitten and three chests as a gift!")}</p>
  <form id="lf"><input class="field" id="nick" maxlength="16" autocomplete="off" placeholder="${Lx("Например, Котёнок_7","For example, Kitten_7")}" aria-label="${Lx("Ник","Nickname")}"><button class="btn" type="submit">${Lx("Играть","Play")}</button></form>
  <p class="err" id="err" role="alert"></p>
  ${known.length?`<p class="sub">${Lx("Уже играли здесь — нажми на свой ник:","Played here before? Tap your nickname:")}</p><div class="known">${known.map(p=>`<button data-k="${esc(nickKey(p.nick))}">${esc(p.nick)} · ★${p.stars}</button>`).join('')}</div>`:''}
  <p class="note">${store.mode==='online'?Lx("Таблица лидеров общая для всех, кто открыл эту страницу.","The leaderboard is shared by everyone who opened this page."):Lx("Ник: от 2 до 16 букв или цифр. Одинаковых ников не бывает.","Nickname: 2 to 16 letters or numbers. No two players can have the same nickname.")}</p></section>`;
  const inp=$('#nick');inp.focus();
  $('#lf').onsubmit=async e=>{e.preventDefault();const v=inp.value.trim();const err=$('#err');
    if(!NICK_RE.test(v)){err.textContent=Lx("Ник должен быть от 2 до 16 символов: буквы, цифры, пробел, _ или -","A nickname must be 2 to 16 characters: letters, numbers, space, _ or -");return}
    err.textContent=Lx("Проверяем ник…","Checking the nickname…");const r=await claimNick(v);if(r){err.textContent=r;return}store.art=undefined;renderMe();menu()};
  app.querySelectorAll('.known button').forEach(b=>b.onclick=()=>{player=normalize(localPlayers()[b.dataset.k]);LS.set('ut2_current',b.dataset.k);store.art=undefined;renderMe();menu()})}

const anyGift=()=>Object.values(player.gifts).some(Boolean);
function catLine(){const c=player.cat,w=wallet(),n=esc(c.name);
  if(sleeping())return `${n} ${Lx("спит. Проснётся через","is asleep. Wakes up in")} ${fmtLeft(c.sleepUntil-Date.now())}.`;
  if(c.poops>0)return `${n} ${Lx("оставил","left")} ${c.poops===1?Lx("какашку","a poop"):`${c.poops} ${plural(c.poops,[Lx("какашку","a poop"),Lx("какашки","poops"),Lx("какашек","poops")])}`}${Lx(". Убери за ним!",". Clean up after it!")}`;
  if(c.food<25)return `${n} ${Lx("проголодался. Покорми его!","is hungry. Feed it!")}`;
  if(c.energy<25)return `${n} ${Lx("зевает. Пора спать!","is yawning. Time for bed!")}`;
  if(c.fun<25)return `${n} ${Lx("скучает. Поиграй с ним!","is bored. Play with it!")}`;
  if(c.sport<25)return `${n} ${Lx("засиделся. Нужен спорт!","is restless. Time for sport!")}`;
  if(c.joy<25)return `${n} ${Lx("грустит. Погладь его!","is sad. Pet it!")}`;
  if(anyGift())return Lx("У тебя есть подарочные сундуки! Открой их.","You have gift chests! Open them.");
  if(w>=5)return Lx("Мур! Хватает звёзд на сундук.","Purr! You have enough stars for a chest.");
  return pick([Lx("Мур-мур! Давай решать задачки!","Purr-purr! Let's solve some problems!"),Lx("Мне нравится мой наряд!","I love my outfit!"),Lx("Сыграем в боулинг?","Shall we bowl?"),Lx("Мяу! Я люблю математику.","Meow! I love math."),Lx("Обустроим мою комнату?","Shall we decorate my room?")])}
function needBars(){const c=player.cat;return `<div class="bars">${STATS.map(([k,n,col])=>`<div class="bar"><span>${n}</span><div class="track"><div class="fill" style="width:${Math.round(c[k])}%;background:${col}"></div></div></div>`).join('')}</div>`}
const buffNote=()=>player.buff.xp2>0?`<p class="tag" style="margin:8px 0 0;color:var(--xp)">${Lx("🌌 Двойной опыт: ещё","🌌 Double XP:")} ${player.buff.xp2} ${plural(player.buff.xp2,[Lx("игра","game"),Lx("игры","games"),Lx("игр","games")])}</p>`:'';

function evBanner(){const left=player.nextEv-Date.now();
  return left<=0?`<button class="btn small" id="evNow">${Lx("✨ Событие готово! Начать","✨ Event ready! Start")}</button>`:`<span class="tag" id="evLeft">${Lx("✨ Следующее событие через","✨ Next event in")} ${fmtLeft(left)}</span>`}
function menu(){screen='menu';stopTimer();tick();
  app.innerHTML=`<section class="home"><div class="pet" id="petHome">${catSVG(player.cat,mood())}</div>
  <div class="txt"><div class="bubble">${catLine()}</div>${buffNote()}${xpBar()}${needBars()}
  <div class="row" id="evBox">${evBanner()}</div>
  <div class="row"><button class="btn small" id="goCat">${Lx("Уход","Care")}</button><button class="btn alt small" id="goRoom">${Lx("Комната","Room")}</button><button class="btn alt small" id="goChest">${Lx("Сундуки","Chests")}${anyGift()?' '+Lx("· подарки!","· gifts!"):''}</button></div></div></section>`+
  GROUPS.map(([name,note,games])=>`<h2 class="section">${name}${note?`<small>${note}</small>`:''}</h2><div class="menu">${Object.entries(games).map(([k,g])=>`
  <button class="tile${g.hard?' hard':''}" data-g="${k}">${g.hard?'<span class="x2">×2 ★</span>':''}<span class="ic" style="background:${g.color}">${g.ic}</span>
  <span><h3>${g.title}</h3><p>${g.desc}</p>${player.best[k]!=null&&g.gen?`<small>${Lx("Лучший результат:","Best score:")} ${bestText(k,player.best[k])}</small>`:''}${k==='tourney'&&player.tDate===dayKey()?`<small>${Lx("Сегодня:","Today:")} ${player.tScore} ${Lx("примеров","examples")}</small>`:''}</span></button>`).join('')}</div>`).join('');
  $('#goCat').onclick=()=>catScreen('care');$('#goRoom').onclick=()=>catScreen('room');$('#goChest').onclick=()=>catScreen('chest');$('#petHome').onclick=()=>catScreen('care');
  app.querySelectorAll('.tile').forEach(b=>b.onclick=()=>{const k=b.dataset.g;GAMES[k].levels?pickLevel(k):start(k)});
  const bindEv=()=>{const b=$('#evNow');if(b)b.onclick=()=>startEvent(pick(Object.keys(EVENTS)))};bindEv();
  const iv=setInterval(()=>{if(screen!=='menu'){clearInterval(iv);return}const left=player.nextEv-Date.now();const el=$('#evLeft');
    if(left<=0&&el){$('#evBox').innerHTML=evBanner();bindEv()}else if(el)el.textContent=`${Lx("✨ Следующее событие через","✨ Next event in")} ${fmtLeft(left)}`},1000);
  window.scrollTo({top:0})}

function start(k){const e=GAMES[k].engine;
  if(e==='cat'){const why=canPlayWithCat();if(why){toast(why);return}return catGame(k)}
  e==='mem'?memory():e==='schulte'?schulte():e==='tourney'?tourneyScreen(level):quiz(k)}
function pickLevel(key){screen='pick';const g=GAMES[key];
  app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>${g.title}</h2></div>
  <p class="sub" style="text-align:center;margin-top:14px">${g.desc}${Lx(". Выбери свой класс:",". Choose your grade:")}</p>
  <div class="classes">${[1,2,3,4].map(l=>`<button data-l="${l}" aria-pressed="${l===level}"><b>${l}</b><span>${Lx("класс","grade")}</span></button>`).join('')}</div></section>`;
  $('#back').onclick=menu;
  app.querySelectorAll('.classes button').forEach(b=>b.onclick=()=>{level=+b.dataset.l;LS.set('ut2_level',level);start(key)});
  app.querySelector(`.classes button[data-l="${level}"]`).focus({preventScroll:true})}

/* ===== Турнир дня ===== */
async function tourneyScreen(cls){screen='tourney';stopTimer();const today=dayKey(),played=player.tDate===today;
  app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>${Lx("🏆 Турнир дня","🏆 Daily tournament")}</h2><span class="tag" id="tLeft"></span></div>
  <p class="sub">${Lx("Минута на примеры. Каждый день новый турнир и одна попытка. Места считаются отдельно по классам.","One minute of examples. A new tournament every day, one attempt. Places are ranked separately by grade.")}</p>
  <div class="tabs big" style="margin-top:14px" role="group" aria-label="${Lx("Класс","Grade")}">${[1,2,3,4].map(l=>`<button data-l="${l}" aria-pressed="${l===cls}">${gradeLabel(l)}</button>`).join('')}</div>
  <div class="btns" style="justify-content:flex-start">${played?`<p class="bubble">${Lx('Сегодня ты уже участвовал: '+player.tScore+' '+plural(player.tScore,[Lx("пример","example"),Lx("примера","examples"),Lx("примеров","examples")])+', '+player.tClass+' '+Lx("класс. Приходи завтра!","grade. Come back tomorrow!"),'You already played today: '+player.tScore+' '+(player.tScore===1?'example':'examples')+', grade '+player.tClass+'. Come back tomorrow!')}</p>`
    :`<button class="btn" id="tGo">${Lx('Участвовать: '+cls+' '+Lx("класс","grade"),'Join: grade '+cls)}</button>`}</div>
  <div class="board" id="tBoard"><p class="empty">${Lx("Загружаем таблицу…","Loading the table…")}</p></div></section>`;
  $('#back').onclick=menu;
  app.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>tourneyScreen(+b.dataset.l));
  const go=$('#tGo');if(go)go.onclick=()=>{level=cls;LS.set('ut2_level',level);quiz('blitz')};
  const tl=$('#tLeft');const upd=()=>{if(!document.body.contains(tl)){clearInterval(iv);return}tl.textContent=`${Lx("Новый турнир через","New tournament in")} ${fmtLeft(toMidnight())}`};const iv=setInterval(upd,1000);upd();
  let rows=[];
  if(store.mode==='online'){try{const s=await store.db.collection('players').where('tDate','==',today).limit(300).get();rows=s.docs.map(d=>({...d.data(),self:d.id===store.uid}))}catch(e){}}
  else rows=Object.values(localPlayers()).filter(p=>p.tDate===today).map(p=>({...p,self:nickKey(p.nick)===nickKey(player.nick)}));
  if(screen!=='tourney')return;
  rows=rows.filter(r=>+r.tClass===cls).sort((a,b)=>(+b.tScore||0)-(+a.tScore||0));
  const tb=$('#tBoard');if(!tb)return;
  tb.innerHTML=rows.length?`<table class="lb"><thead><tr><th>${Lx("Место","Place")}</th><th>${Lx("Ник","Nickname")}</th><th class="n">${Lx("Примеров","Examples")}</th></tr></thead><tbody>${rows.map((r,i)=>`<tr class="${r.self?'self':''}"><td class="place ${i<3?'medal'+(i+1):''}">${i<3?'★':''}${i+1}</td><td>${esc(String(r.nick||'').slice(0,16))}${r.self?' '+Lx("(ты)","(you)"):''}</td><td class="n"><b>${+r.tScore||0}</b></td></tr>`).join('')}</tbody></table>`
    :`<p class="empty">${Lx('Сегодня в '+cls+' '+Lx("классе ещё никто не участвовал. Будь первым!","grade, nobody has played yet. Be the first!"),'Nobody in grade '+cls+' has played today. Be the first!')}</p>`}

function leaders(){screen='leaders';stopTimer();
  let rows=store.mode==='online'?store.leaders:Object.values(localPlayers()).map(p=>({...normalize(p),self:player&&nickKey(p.nick)===nickKey(player.nick)}));
  rows=[...rows].sort((a,b)=>(b.stars||0)-(a.stars||0)||(b.xp||0)-(a.xp||0));
  app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>${Lx("Таблица лидеров","Leaderboard")}</h2></div>
  <p class="sub">${store.mode==='online'?Lx("Общая таблица: обновляется сама, когда кто-то играет.","Shared table: it updates by itself when someone plays."):Lx("Все игроки, которые играли в этом браузере.","Everyone who played in this browser.")} ${Lx("Считаются все заработанные звёзды, даже потраченные.","All earned stars count, even the ones you spent.")}</p>
  <div class="board">${rows.length?`<table class="lb"><thead><tr><th>${Lx("Место","Place")}</th><th></th><th>${Lx("Ник","Nickname")}</th><th class="n">${Lx("Ур.","Lv.")}</th><th class="n">${Lx("Звёзды","Stars")}</th><th class="n">${Lx("Котят","Kittens")}</th><th class="n">${Lx("Игр","Games")}</th></tr></thead><tbody>
  ${rows.map((r,i)=>`<tr class="${r.self?'self':''}"><td class="place ${i<3?'medal'+(i+1):''}">${i<3?'★':''}${i+1}</td><td class="av">${catSVG(r.cat,'happy')}</td>
  <td>${esc(r.nick)}${r.self?' '+Lx("(ты)","(you)"):''}<br><small style="color:var(--muted)">${esc(lvlInfo(r.xp).title)} ${Lx("· котёнок","· kitten")} ${esc(r.cat.name)}</small></td><td class="n">${lvlInfo(r.xp).l}</td><td class="n"><b>${r.stars}</b></td><td class="n">${r.cat.skins.length}</td><td class="n">${r.games}</td></tr>`).join('')}
  </tbody></table>`:'<p class="empty">'+Lx("Пока никого нет. Сыграй первым!","Nobody here yet. Be the first to play!")+'</p>'}</div></section>`;
  $('#back').onclick=player?menu:login}

/* ===== Котёнок: уход, гардероб, котята, комната, сундуки ===== */
let catTab='care',wearSlot='hat',roomSlot='wp',skinFilter='all';
const lockedCard=(r,svg)=>`<button class="item r-${r} locked" aria-disabled="true">${svg}<span>???</span><span class="rt r-${r}">${RARITY[r].name}</span></button>`;
function stageHTML(){const c=player.cat,sl=sleeping();
  return `<div class="stage"><div class="bigcat" id="bigcat" title="${Lx("Погладь котёнка","Pet the kitten")}">${catSVG(c,mood())}</div>
    ${c.poops?`<div class="poops" role="group" aria-label="${Lx("Убрать какашки","Clean up poop")}">${Array.from({length:c.poops},(_,i)=>`<button data-poop="${i}" aria-label="${Lx("Убрать какашку","Clean up poop")}">💩</button>`).join('')}</div>`:''}
    <div class="bubble" id="say">${catLine()}</div>${needBars()}
    <div class="row" style="justify-content:center"><button class="btn alt small" id="pet" ${sl?'disabled':''}>${Lx("Погладить","Pet")}</button>
    <button class="btn alt small" id="sleep" ${sl||c.energy>=90?'disabled':''}>${sl?Lx("Спит…","Asleep…"):Lx("Спать 4 ч","Sleep 4 h")}</button><button class="btn alt small" id="photo">${Lx("📷 Фото","📷 Photo")}</button></div>
    <div class="row"><input class="field" id="catname" maxlength="14" value="${esc(c.name)}" aria-label="${Lx("Имя котёнка","Kitten's name")}"><button class="btn alt small" id="rename">${Lx("Назвать","Rename")}</button></div></div>`}
function bindStage(){const c=player.cat;
  const pet=()=>{if(sleeping())return;const el=$('#bigcat');el.classList.remove('purr');void el.offsetWidth;el.classList.add('purr');purr();
    if(c.joy<70)c.joy=clamp(c.joy+(hasTr('cuddly')?12:6)+Math.max(0,cstat('cha')-5),0,70);$('#say').textContent=pick([Lx("Мрррр…","Purrr…"),Lx("Мур-мур-мур!","Purr-purr-purr!"),Lx("Ещё! Ещё!","More! More!"),Lx("Мне так хорошо!","This feels so nice!")]);
    el.innerHTML=catSVG(c,'happy');const f=app.querySelectorAll('.stage .fill');if(f[1])f[1].style.width=Math.round(c.joy)+'%';savePlayer()};
  $('#bigcat').onclick=pet;$('#pet').onclick=pet;
  $('#sleep').onclick=()=>{if(sleeping())return;c.sleepUntil=Date.now()+SLEEP_H*36e5;savePlayer(true);toast(`${esc(c.name)} ${Lx("уснул на","fell asleep for")} ${SLEEP_H} ${Lx("часа","hours")}`);catScreen()};
  $('#photo').onclick=catPhoto;
  app.querySelectorAll('[data-poop]').forEach(b=>b.onclick=()=>{c.poops=Math.max(0,c.poops-1);c.bag++;c.joy=clamp(c.joy+3,0,100);tone(400,0,.08);tone(600,.08,.1);savePlayer();catScreen()});
  $('#rename').onclick=()=>{const v=$('#catname').value.trim().replace(/\s+/g,' ');if(!v)return;c.name=v.slice(0,14);savePlayer(true);catScreen()}}
const effText=f=>Object.entries(f.eff).map(([k,v])=>`${STAT_NAME[k]} +${v}`).join(', ')+(f.xp2?`${Lx(", двойной опыт на",", double XP for")} ${f.xp2} ${Lx("игры","games")}`:'');

async function catScreen(tab){screen='cat';stopTimer();tick();if(tab)catTab=tab;const c=player.cat,R=player.room;
  const tabs=`<div class="tabs big" role="group" aria-label="${Lx("Раздел","Section")}">${[['care',Lx("Уход и еда","Care and food")],['wear',Lx("Гардероб","Wardrobe")],['skins',Lx("Породы","Breeds")],['kennel',Lx("Питомник","Cattery")+(player.nest&&player.nest.until<=Date.now()?' '+Lx("· котёнок!","· kitten!"):'')],['room',Lx("Комната","Room")],['chest',Lx("Сундуки","Chests")+(anyGift()?' '+Lx("· подарки!","· gifts!"):'')]].map(([k,n])=>`<button data-t="${k}" aria-pressed="${catTab===k}">${n}</button>`).join('')}</div>`;
  let body='';
  if(catTab==='care'){const now=Date.now();
    body=`<div class="catpage">${stageHTML()}<div>
    <h4 style="margin-top:0">${Lx("Еда в запасе","Food in stock")}</h4>${Object.keys(c.inv).length?`<div class="items">${FOODS.filter(f=>c.inv[f.id]).map(f=>`<button class="item r-${f.r}" data-eat="${f.id}" ${sleeping()?'aria-disabled="true"':''}><span style="font-size:42px">${f.icon}</span><span>${f.name} ×${c.inv[f.id]}</span><span class="rt r-${f.r}">${Lx("Дать","Feed")}</span></button>`).join('')}</div>`:'<p class="note" style="margin:0">'+Lx("Запас пуст. Купи еду в магазине ниже.","Nothing in stock. Buy food in the shop below.")+'</p>'}
    <h4>${Lx("Автокормушка","Auto feeder")}</h4><p class="note" style="margin:0">${Lx("Сухой корм без бонусов: +30 к сытости. Кормушка сама кормит котёнка, когда сытость ниже 40. Сейчас порций:","Dry food with no bonuses: +30 fullness. The feeder feeds your kitten by itself when fullness drops below 40. Portions now:")} <b>${c.feeder.n} ${Lx("из","of")} ${FEEDER_MAX}</b>${c.feeder.n<FEEDER_MAX?`${Lx(", следующая через",", next one in")} ${fmtLeft(c.feeder.next-now)}`:''}.</p>
    <h4>${Lx("Магазин еды","Food shop")}</h4><div class="items">${FOODS.map(f=>`<button class="item r-${f.r}" data-buy="${f.id}"><span style="font-size:42px">${f.icon}</span><span>${f.name}</span><span class="rt r-${f.r}">${f.grade}</span><span style="font-size:12px;color:var(--muted);font-weight:400">${effText(f)}</span><span class="price">★ ${f.price}</span></button>`).join('')}</div>
    <h4>${Lx("Уборка","Cleaning")}</h4><p class="note" style="margin:0">${Lx("Котёнок ходит в туалет раз в 8–15 часов. Неубранные какашки портят ему настроение. Собрано:","Your kitten goes potty every 8–15 hours. Poops left on the floor spoil its mood. Collected:")} <b>${c.bag} 💩</b>${Lx(". 10 штук можно обменять на звезду.",". You can trade 10 of them for a star.")}</p>
    <div class="btns" style="justify-content:flex-start"><button class="btn small" id="swap" ${c.bag<10?'disabled':''}>${Lx("Обменять 10 💩 на ★","Trade 10 💩 for ★")}</button></div>
    <h4>${Lx("Сон","Sleep")}</h4><p class="note" style="margin:0">${Lx("Котёнку нужно спать минимум","Your kitten needs to sleep at least")} ${SLEEP_H} ${Lx("часа в сутки. Если энергия кончится, он уснёт сам. Пока он спит или какая-то шкала пустая, играть с ним нельзя. Задания решать можно всегда.","hours a day. If its energy runs out, it falls asleep by itself. While it sleeps or any bar is empty, you can't play with it. You can always do the tasks.")}</p>
    </div></div>`}
  else if(catTab==='wear'){const owned=new Set(c.owned);
    body=`<div class="catpage">${stageHTML()}<div><div class="tabs" role="group" aria-label="${Lx("Вещи","Items")}">${SLOTS.map(([s,n])=>`<button data-s="${s}" aria-pressed="${s===wearSlot}">${n}</button>`).join('')}</div>
    <div class="items">${WEAR.filter(x=>x.slot===wearSlot).map(x=>owned.has(x.id)?`<button class="item r-${x.r}${c.wear[x.slot]===x.id?' on':''}" data-w="${x.id}">${wearPreview(x)}<span>${esc(x.name)}</span><span class="rt r-${x.r}">${RARITY[x.r].name}</span></button>`:lockedCard(x.r,wearPreview(x))).join('')}</div>
    <p class="note">${Lx("Нажми на вещь, чтобы надеть или снять. Серые вещи ждут в сундуках с одеждой. Собрано","Tap an item to put it on or take it off. Grey items are waiting in clothes chests. Collected")} ${c.owned.length} ${Lx("из","of")} ${WEAR.length}.</p></div></div>`}
  else if(catTab==='skins'){const owned=new Set(c.skins);const list=SKINS.filter(s=>skinFilter==='all'||(s.st||'soft')===skinFilter&&s.pat!=='circuit'||(skinFilter==='cyber'&&s.pat==='circuit')||(skinFilter==='glow'&&s.glow));
    body=`<div class="catpage">${stageHTML()}<div><div class="tabs" role="group" aria-label="${Lx("Котята","Kittens")}">${[['all',Lx("Все","All")],['soft',Lx("Пушистые","Fluffy")],['cyber',Lx("Кибер","Cyber")],['pixel',Lx("Пиксельные","Pixel")],['brick',Lx("Кирпичики","Bricks")],['glow',Lx("Светятся глаза","Glowing eyes")]].map(([k,n])=>`<button data-f="${k}" aria-pressed="${skinFilter===k}">${n}</button>`).join('')}</div>
    <div class="items">${list.map(s=>owned.has(s.id)?`<button class="item r-${s.r}${c.skin===s.id&&!c.kid?' on':''}" data-k="${s.id}">${skinPreview(s)}<span>${esc(s.name)}</span><span class="rt r-${s.r}">${RARITY[s.r].name}</span></button>`:lockedCard(s.r,skinPreview(s))).join('')}</div>
    <p class="note">${Lx("Нажми на котёнка, чтобы играть им. Новые котята выпадают из сундуков с котятами. Собрано","Tap a kitten to play as it. New kittens come from kitten chests. Collected")} ${c.skins.length} ${Lx("из","of")} ${SKINS.length}.</p></div></div>`}
  else if(catTab==='kennel')body=kennelHTML();
  else if(catTab==='room'){const art=await loadArt();if(screen!=='cat'||catTab!=='room')return;const owned=new Set(R.owned);const w=wallet();let grid='';
    if(roomSlot==='wp'||roomSlot==='fl'){const list=roomSlot==='wp'?WALLS:FLOORS;const cur=roomSlot==='wp'?R.wp:R.fl;
      grid=list.map(o=>{const has=owned.has(o.id);return `<button class="item${cur===o.id?' on':''}" data-o="${o.id}" ${!has&&w<o.price?'aria-disabled="true"':''}>${swatchSVG(o)}<span>${esc(o.name)}</span><span class="${has?'rt r-common':'price'}">${has?(cur===o.id?Lx("выбрано","selected"):Lx("есть","owned")):'★ '+o.price}</span></button>`}).join('')}
    else grid=FURN.filter(f=>f.slot===roomSlot).map(f=>owned.has(f.id)?`<button class="item r-${f.r}${R.place[f.slot]===f.id?' on':''}" data-p="${f.id}">${furnPreview(f)}<span>${esc(f.name)}</span><span class="rt r-${f.r}">${RARITY[f.r].name}</span></button>`:lockedCard(f.r,furnPreview(f))).join('');
    const furnCount=R.owned.filter(id=>FURN_BY_ID[id]).length;
    body=`<div class="roomview" style="margin-top:14px" id="roomv">${roomSVG(player,art)}</div>
    <div class="row">${c.poops?`<button class="btn small" id="cleanAll">${Lx("Убрать какашки (","Clean up poop (")}${c.poops})</button>`:''}<button class="btn alt small" id="photo2">${Lx("📷 Фото комнаты","📷 Room photo")}</button></div>
    <div class="tabs" style="margin-top:14px" role="group" aria-label="${Lx("Обустройство","Decor")}">${[['wp',Lx("Обои","Wallpaper")],['fl',Lx("Пол","Floor")],...RSLOTS].map(([s,n])=>`<button data-r="${s}" aria-pressed="${s===roomSlot}">${n}</button>`).join('')}</div>
    <div class="items">${grid}</div>
    <p class="note">${roomSlot==='wp'||roomSlot==='fl'?Lx("Обои и пол покупаются за звёзды сразу.","Wallpaper and floors are bought with stars right away."):`${Lx("Мебель выпадает из сундуков обустройства. Нажми на вещь, чтобы поставить или убрать. Собрано","Furniture comes from furniture chests. Tap an item to place or remove it. Collected")} ${furnCount} ${Lx("из","of")} ${FURN.length}.`}</p>`}
  else{body=Object.entries(CHEST_SETS).map(([k,S])=>`<h4>${S.title}</h4><p class="sub" style="margin:0">${S.note}</p><div class="chests">
    ${player.gifts[k]?`<div class="chest">${chestSVG('gift',k)}<h5>${Lx("Подарок","Gift")}</h5><p>${Lx("Бесплатно, один раз","Free, one time")}</p><button class="btn small" data-c="${k}:gift:1">${Lx("Открыть","Open")}</button></div>`:''}
    ${Object.entries(S.tiers).map(([t,T])=>{const ten=Math.round(T.cost*9);return `<div class="chest">${chestSVG(t,k)}<h5>${T.name}</h5><p>${T.desc}</p>
      <button class="btn small" data-c="${k}:${t}:1" ${wallet()<T.cost?'disabled':''}>★ ${T.cost}</button>
      <button class="btn alt small" data-c="${k}:${t}:10" ${wallet()<ten?'disabled':''}>${Lx("×10 за ★","×10 for ★")} ${ten} <span class="tag" style="color:var(--ok)">−10%</span></button></div>`}).join('')}</div>`).join('')+
    `<p class="note">${Lx("У тебя ★","You have ★")} ${wallet()}${Lx(". Если выпадет то, что уже есть, часть звёзд вернётся.",". If you get something you already have, you get some stars back.")}</p>`}
  app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>${catTab==='room'?Lx("Комната","Room"):Lx("Котёнок","Kitten")} ${esc(c.name)}</h2><span class="chip"><b>★</b>${wallet()}</span></div>${tabs}${body}</section>`;
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
    if(!R.owned.includes(id)){if(wallet()<o.price){toast(`${Lx("Нужно ещё ★","You need ★")} ${o.price-wallet()}`);return}player.spent+=o.price;R.owned=[...R.owned,id];fanfare();toast(`${Lx("Куплено:","Bought:")} ${esc(o.name)}`)}
    if(isW)R.wp=id;else R.fl=id;savePlayer(true);renderMe();catScreen()});
  app.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const f=FOOD_BY_ID[b.dataset.buy];if(wallet()<f.price){toast(`${Lx("Нужно ещё ★","You need ★")} ${f.price-wallet()}`);return}
    player.spent+=f.price;c.inv={...c.inv,[f.id]:(c.inv[f.id]||0)+1};tone(660,0,.1);savePlayer(true);renderMe();toast(`${f.icon} ${f.name} ${Lx("в запасе","added to stock")}`);catScreen()});
  app.querySelectorAll('[data-eat]').forEach(b=>b.onclick=()=>{if(sleeping()){toast(Lx("Котёнок спит","Your kitten is asleep"));return}const f=FOOD_BY_ID[b.dataset.eat];if(!c.inv[f.id])return;
    c.inv={...c.inv,[f.id]:c.inv[f.id]-1};if(!c.inv[f.id])delete c.inv[f.id];applyEffects(f.eff,true);if(f.xp2)player.buff={xp2:(player.buff.xp2||0)+f.xp2};
    tone(520,0,.1);tone(620,.1,.12);savePlayer(true);catScreen();const s=$('#say');if(s)s.textContent=pick([Lx("Ням-ням! Спасибо!","Yum-yum! Thank you!"),Lx("Вкуснятина!","Yummy!"),Lx("Мяу, я сытый!","Meow, I'm full!")])});
  const sw=$('#swap');if(sw)sw.onclick=()=>{if(c.bag<10)return;c.bag-=10;player.stars+=1;fanfare();savePlayer(true);renderMe();toast(Lx("+1 ★ за уборку","+1 ★ for cleaning"));catScreen()};
  const ca=$('#cleanAll');if(ca)ca.onclick=()=>{c.bag+=c.poops;c.joy=clamp(c.joy+3*c.poops,0,100);c.poops=0;tone(500,0,.1);savePlayer();catScreen()};
  const p2=$('#photo2');if(p2)p2.onclick=catPhoto;
  app.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{const [s,t,n]=b.dataset.c.split(':');openChest(s,t,+n)})}

/* ===== Фото котёнка ===== */
const svgImage=svg=>new Promise(res=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)});
async function catPhoto(){const m=$('#modal');m.innerHTML=evOverlay('<h3>'+Lx("Делаем фото…","Taking a photo…")+'</h3>');
  const art=await loadArt();const im=await svgImage(roomSVG(player,art));const cv=document.createElement('canvas');cv.width=800;cv.height=660;const x=cv.getContext('2d');
  x.fillStyle='#fffdf6';x.fillRect(0,0,800,660);if(im)x.drawImage(im,20,20,760,532);x.strokeStyle='#8b5a2b';x.lineWidth=6;x.strokeRect(20,20,760,532);
  const L=lvlInfo(player.xp);x.fillStyle='#1f3a8a';x.font='bold 40px Neucha, cursive, sans-serif';x.textBaseline='middle';x.fillText(`${player.cat.name}`,30,600);
  x.font='22px Nunito, sans-serif';x.fillStyle='#5a6478';x.fillText(`${player.nick} ${Lx("· уровень","· level")} ${L.l} · ${L.title} · ${new Date().toLocaleDateString('ru-RU')}`,30,638);
  x.textAlign='right';x.font='bold 22px Nunito, sans-serif';x.fillStyle='#e0525a';x.fillText(Lx("Умная тетрадка","Smart Notebook"),780,600);
  let url='';try{url=cv.toDataURL('image/png')}catch(e){}
  if(!url){m.innerHTML=evOverlay('<h3>'+Lx("Не получилось","That didn't work")+'</h3><p>'+Lx("Этот браузер не дал сделать фото.","This browser didn't allow taking a photo.")+'</p><div class="btns"><button class="btn" id="phClose">'+Lx("Закрыть","Close")+'</button></div>');$('#phClose').onclick=()=>m.innerHTML='';return}
  const file=`kotenok-${player.cat.name}.png`.replace(/[^\wа-яё.-]/gi,'_');
  m.innerHTML=evOverlay(`<h3>${Lx("Фото котёнка","Kitten photo")}</h3><img src="${url}" alt="${Lx("Фото котёнка","Kitten photo")} ${esc(player.cat.name)}" style="border-radius:12px;display:block;width:100%">
  <p class="note" id="phNote">${Lx("На телефоне можно нажать на фото и удерживать, чтобы сохранить.","On a phone, press and hold the photo to save it.")}</p><div class="btns"><button class="btn" id="phSave">${Lx("Сохранить фото","Save photo")}</button><button class="btn alt" id="phClose">${Lx("Закрыть","Close")}</button></div>`);
  $('#phClose').onclick=()=>m.innerHTML='';
  $('#phSave').onclick=async()=>{const blob=await (await fetch(url)).blob();
    const dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null;
    if(dl){try{await dl.save({filename:file,data:blob});$('#phNote').textContent=Lx("Готово!","Done!")}catch(e){$('#phNote').textContent=e&&e.code==='declined'?Lx("Сохранение отменено.","Saving canceled."):Lx("Не получилось сохранить. Нажми на фото и удерживай.","Couldn't save. Press and hold the photo.")}return}
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=file;document.body.appendChild(a);a.click();a.remove();$('#phNote').textContent=Lx("Фото сохраняется в загрузки.","The photo is saving to your downloads.")}}

/* ===== Сундуки ===== */
const CHEST_SETS={
  clothes:{title:Lx("Сундуки с одеждой","Clothes chests"),note:Lx("Шапки, очки, светящиеся глаза, костюмы, крылья и игрушки","Hats, glasses, glowing eyes, costumes, wings and toys"),pool:WEAR,get:()=>player.cat.owned,add:id=>player.cat.owned=[...player.cat.owned,id],
    preview:wearPreview,equip:it=>{player.cat.wear={...player.cat.wear,[it.slot]:it.id};wearSlot=it.slot;return 'wear'},gift:{common:60,rare:40,legend:0},
    tiers:{small:{name:Lx("Деревянный сундук","Wooden chest"),cost:5,desc:Lx("Чаще всего обычные вещи","Mostly common items"),w:{common:80,rare:18,legend:2}},rare:{name:Lx("Волшебный сундук","Magic chest"),cost:15,desc:Lx("Много редких вещей","Lots of rare items"),w:{common:25,rare:65,legend:10}},royal:{name:Lx("Королевский сундук","Royal chest"),cost:40,desc:Lx("Шанс на легендарную вещь","Chance of a legendary item"),w:{common:0,rare:40,legend:60}}}},
  cats:{title:Lx("Сундуки с котятами","Kitten chests"),note:Lx("Пушистые, кибер, пиксельные и котята-кирпичики, коты со светящимися глазами","Fluffy, cyber, pixel and brick kittens, cats with glowing eyes"),pool:SKINS,get:()=>player.cat.skins,add:id=>player.cat.skins=[...player.cat.skins,id],
    preview:s=>skinPreview(s,'happy'),equip:it=>{setActive(indFromSkin(it));return 'skins'},gift:{common:70,rare:30,legend:0},
    tiers:{small:{name:Lx("Коробка с котёнком","Kitten box"),cost:10,desc:Lx("Обычные породы","Common breeds"),w:{common:75,rare:22,legend:3}},rare:{name:Lx("Волшебная корзинка","Magic basket"),cost:25,desc:Lx("Редкие и кибер-котята","Rare and cyber kittens"),w:{common:20,rare:65,legend:15}},royal:{name:Lx("Королевская переноска","Royal carrier"),cost:60,desc:Lx("Шанс на легендарного кота","Chance of a legendary cat"),w:{common:0,rare:35,legend:65}}}},
  room:{title:Lx("Сундуки обустройства","Furniture chests"),note:Lx("Лежанки, когтеточки, лампы, коврики, растения и окна для комнаты","Beds, scratching posts, lamps, rugs, plants and windows for the room"),pool:FURN,get:()=>player.room.owned,add:id=>player.room.owned=[...player.room.owned,id],
    preview:furnPreview,equip:it=>{player.room.place={...player.room.place,[it.slot]:it.id};roomSlot=it.slot;return 'room'},gift:{common:70,rare:30,legend:0},
    tiers:{small:{name:Lx("Ящик с мебелью","Furniture crate"),cost:6,desc:Lx("Простая мебель","Simple furniture"),w:{common:80,rare:18,legend:2}},rare:{name:Lx("Дизайнерский сундук","Designer chest"),cost:18,desc:Lx("Много редких вещей","Lots of rare items"),w:{common:25,rare:62,legend:13}},royal:{name:Lx("Дворцовый сундук","Palace chest"),cost:45,desc:Lx("Шанс на легендарную мебель","Chance of legendary furniture"),w:{common:0,rare:40,legend:60}}}}};
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
  m.innerHTML=`<div class="overlay" role="dialog" aria-modal="true" aria-label="${Lx("Открываем сундук","Opening a chest")}"><div class="modal"><h3>${Lx("Открываем","Opening")}${count>1?` ${count} ${Lx("сундуков","chests")}`:''}…</h3>${chestSVG(tier,setKey).replace('<svg','<svg class="chestbig"')}</div></div>`;
  tone(300,0,.1,'square',.05);tone(340,.25,.1,'square',.05);tone(380,.5,.1,'square',.05);
  setTimeout(()=>{fanfare();const md=m.querySelector('.modal');if(!md)return;
    if(count===1){const {item,dupe}=got[0];
      md.innerHTML=`<p class="rt r-${item.r}" style="margin:0">${RARITY[item.r].name}${setKey==='cats'?' '+Lx("порода","breed"):' '+Lx("вещь","item")}</p><h3>${esc(item.name)}</h3>
      <div class="prize glow">${S.preview(item)}</div><p>${dupe?`${Lx("Такое уже есть. Возвращаем ★","You already have this. Refunding ★")} ${got[0].refund}.`:setKey==='cats'?Lx("Новый котёнок в коллекции!","New kitten in your collection!"):Lx("Новая вещь в коллекции!","New item in your collection!")}</p>
      <div class="btns">${dupe?'':`<button class="btn" id="useNow">${setKey==='cats'?Lx("Играть им","Play as it"):setKey==='room'?Lx("Поставить","Place it"):Lx("Надеть","Wear it")}</button>`}<button class="btn alt" id="closeM">${Lx("Отлично!","Great!")}</button></div>`;
      const u=$('#useNow');if(u)u.onclick=()=>{const tab=S.equip(item);savePlayer(true);m.innerHTML='';catScreen(tab)}}
    else{const fresh=got.filter(g=>!g.dupe).length;
      md.classList.add('wide');md.innerHTML=`<h3>${Lx("10 сундуков открыто!","10 chests opened!")}</h3><p>${Lx("Новых:","New:")} <b>${fresh}</b>${refund?` ${Lx("· вернули ★","· refunded ★")} ${refund} ${Lx("за повторы","for duplicates")}`:''}</p>
      <div class="items ten">${got.map(({item,dupe})=>`<div class="item r-${item.r} glow">${S.preview(item)}<span>${esc(item.name)}</span><span class="rt ${dupe?'':'r-'+item.r}">${dupe?Lx("повтор","duplicate"):Lx("новое!","new!")}</span></div>`).join('')}</div>
      <div class="btns"><button class="btn" id="closeM">${Lx("Отлично!","Great!")}</button></div>`}
    $('#closeM').onclick=()=>{m.innerHTML='';catScreen('chest')};$('#closeM').focus()},reduced?100:1300)}

/* ===== Итог игры ===== */
function resultScreen(big,st,msg,again,info,extra=''){const w=wallet();
  app.innerHTML=`<section class="sheet result"><p class="big">${big}</p><div class="st">${'★'.repeat(st)||'☆'}</div><p>${msg}${st?` · +${st} ★`:''} · +${info.xp} ${Lx("опыта","XP")}${info.doubled?' '+Lx("(двойной опыт)","(double XP)"):''}</p>${extra}
  ${info.up?`<p class="bubble" style="font-size:20px">${Lx("Новый уровень","New level")} ${info.level}${Lx("! Бонус +","! Bonus +")}${info.bonus} ★</p>`:''}
  <div class="home" style="margin:10px auto;max-width:520px;justify-content:center"><div class="pet" style="width:90px">${catSVG(player.cat,mood()==='sleep'?'sleep':'happy')}</div>
  <div class="txt" style="text-align:left"><div class="bubble">${w>=5?`${Lx("У тебя ★","You have ★")} ${w}${Lx(". Хватает на сундук!",". Enough for a chest!")}`:`${Lx("Ещё","")} ${5-w} ${Lx("★ до первого сундука","★ more for your first chest")}`}</div>${xpBar()}</div></div>
  <div class="btns">${again?'<button class="btn" id="again">'+Lx("Ещё раз","Play again")+'</button>':''}<button class="btn alt" id="toMenu">${Lx("Все игры","All games")}</button><button class="btn alt" id="toChest">${Lx("Сундуки","Chests")}</button><button class="btn alt" id="toBoard">${Lx("Лидеры","Leaders")}</button></div></section>`;
  const ag=$('#again');if(ag)ag.onclick=again;$('#toMenu').onclick=menu;$('#toChest').onclick=()=>catScreen('chest');$('#toBoard').onclick=leaders;
  if(info.up){fanfare();toast(`${Lx("Уровень","Level")} ${info.level}! +${info.bonus} ★`)}}
