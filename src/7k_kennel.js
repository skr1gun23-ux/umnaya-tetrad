/* ===== Питомник: все коты игрока, гнёздышко, гены ===== */
let selA=null,selB=null;
const catPic=(ind,mood='normal')=>catSVG({dna:ind.dna,wear:{}},mood);
const indRarity=ind=>ind.skin?SKIN_BY_ID[ind.skin].r:kitRarity(ind);
function kennelHTML(){const n=player.nest,now=Date.now(),cats=allCats(),act=activeInd().id;let nest;
  if(n){const A=findCat(n.a),B=findCat(n.b),ready=n.until<=now;
    nest=`<div class="nest"><div class="pair"><span class="mini">${A?catPic(A,'happy'):''}</span><span class="heart">💞</span><span class="mini">${B?catPic(B,'happy'):''}</span></div>
    <p>${esc(A?A.name:'?')} и ${esc(B?B.name:'?')} в гнёздышке. ${ready?'<b>Котёнок родился!</b>':`Котёнок появится через <b id="nestLeft">${fmtLeft(n.until-now)}</b>`}</p>
    ${ready?'<button class="btn" id="nestGet">Забрать котёнка</button>':''}</div>`}
  else{const A=selA&&findCat(selA),B=selB&&findCat(selB);const full=player.kennel.length>=KENNEL_MAX;
    const slot=(id,X,n)=>`<button class="slot" id="${id}">${X?`<span class="mini">${catPic(X,'happy')}</span>`:'<span class="q">?</span>'}<em>${X?esc(X.name):n}</em></button>`;
    nest=`<div class="nest"><div class="pair">${slot('slA',A,'Родитель 1')}<span class="heart">💞</span>${slot('slB',B,'Родитель 2')}</div>
    <div class="btns"><button class="btn" id="doBreed" ${A&&B&&!full&&wallet()>=BREED_COST?'':'disabled'}>Скрестить за ★ ${BREED_COST}</button></div>
    <p class="note" style="margin:6px 0 0">${full?`В питомнике уже ${KENNEL_MAX} рождённых котят. Отдай кого-нибудь в добрые руки, чтобы освободить место.`:'Нажми на кота ниже и выбери его родителем. Котёнок получит гены от обоих и родится через 20 минут. Иногда случаются мутации!'}</p></div>`}
  const grid=cats.map(ind=>`<button class="item r-${indRarity(ind)}${ind.id===act?' on':''}" data-cat="${ind.id}">${catPic(ind)}<span>${esc(ind.name)}</span>
    <span class="tag" style="font-size:12px">${ind.gen?`Поколение ${ind.gen}`:'Из сундука'}</span><span style="font-size:18px">${ind.traits.map(t=>TRAIT_BY_ID[t].icon).join(' ')}</span></button>`).join('');
  return `<h4 style="margin-top:14px">Гнёздышко</h4>${nest}<h4>Твои коты (${cats.length})</h4>
  <p class="note" style="margin:0">Из сундуков: ${player.cat.skins.length}. Рождённых: ${player.kennel.length} из ${KENNEL_MAX}. Нажми на кота, чтобы посмотреть его гены и свойства.</p><div class="items">${grid}</div>`}

function bindKennel(){const nl=$('#nestLeft');if(nl){const iv=setInterval(()=>{if(!document.body.contains(nl)){clearInterval(iv);return}const left=player.nest?player.nest.until-Date.now():0;
    if(left<=0){clearInterval(iv);catScreen()}else nl.textContent=fmtLeft(left)},1000)}
  const g=$('#nestGet');if(g)g.onclick=()=>{const n=player.nest;const A=findCat(n.a),B=findCat(n.b);if(!A||!B){player.nest=null;savePlayer(true);catScreen();return}
    const kit=breed(A,B);player.kennel=[...player.kennel,kit];player.nest=null;savePlayer(true);fanfare();catScreen();catDetail(kit,true)};
  const pickSlot=w=>{toast(`Нажми на кота ниже, чтобы выбрать ${w==='A'?'первого':'второго'} родителя`);pendingSlot=w};
  const sa=$('#slA'),sb=$('#slB');if(sa)sa.onclick=()=>pickSlot('A');if(sb)sb.onclick=()=>pickSlot('B');
  const db=$('#doBreed');if(db)db.onclick=()=>{if(!selA||!selB||selA===selB||wallet()<BREED_COST)return;player.spent+=BREED_COST;
    player.nest={a:selA,b:selB,until:Date.now()+BREED_TIME};selA=selB=null;savePlayer(true);renderMe();tone(660,0,.15);tone(880,.15,.2);catScreen()};
  app.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{const ind=findCat(b.dataset.cat);if(!ind)return;
    if(pendingSlot&&!player.nest){setParent(pendingSlot,ind);pendingSlot=null;return}catDetail(ind)})}
let pendingSlot=null;
function setParent(w,ind){if(w==='A'){selA=ind.id;if(selB===ind.id)selB=null}else{selB=ind.id;if(selA===ind.id)selA=null}catScreen()}

function catDetail(ind,newborn){const m=$('#modal');const O=ind.origin||{},d=ind.dna,P=ind.parents||[];const act=activeInd().id===ind.id;const isKit=!ind.skin;
  const src=k=>{const o=O[k];return o==='mut'?' <b class="mut">мутация!</b>':o==='mix'?' <em>смесь родителей</em>':o==='A'&&P[0]?` <em>от ${esc(P[0])}</em>`:o==='B'&&P[1]?` <em>от ${esc(P[1])}</em>`:''};
  const sw=c=>`<span class="sw" style="background:${c}"></span>`;
  const genes=[['Окрас',`${sw(d.main)}${sw(d.dark)}${sw(d.belly)}`+src('coat')],['Порода',RU.style[d.style]+src('style')],['Узор',RU.pat[d.pat]+src('pat')],
    ['Уши',RU.ears[d.ears]+src('ears')],['Хвост',RU.tail[d.tail]+src('tail')],['Глаза',(d.glow?`Светятся ${sw(d.glow)}`:'Обычные')+src('eyes')+(d.hetero?` · разного цвета ${sw(d.hetero)}${src('hetero')}`:'')],
    ['Особенности',(d.extras.length?d.extras.map(x=>RU.extra[x]).join(', '):'нет')+src('extras')]];
  const inNest=player.nest&&(player.nest.a===ind.id||player.nest.b===ind.id);
  m.innerHTML=evOverlay(`${newborn?'<p class="rt r-legend" style="margin:0">Новый котёнок!</p>':''}<div class="prize ${newborn?'glow':''}" style="width:150px;margin:0 auto">${catPic(ind,'happy')}</div>
  <h3>${esc(ind.name)}</h3><p class="tag" style="margin:0">${ind.gen?`Поколение ${ind.gen}${P.length?` · родители: ${esc(P[0])} и ${esc(P[1])}`:''}`:'Кот из сундука'} · <span class="rt r-${indRarity(ind)}">${RARITY[indRarity(ind)].name}</span></p>
  ${isKit?`<div class="row" style="justify-content:center"><input class="field" id="kName" maxlength="14" value="${esc(ind.name)}" aria-label="Имя котёнка" style="max-width:200px"><button class="btn alt small" id="kRename">Назвать</button></div>`:''}
  <div class="genes"><h5>Гены</h5>${genes.map(([a,b])=>`<div class="gr"><span>${a}</span><span>${b}</span></div>`).join('')}
  <h5>Свойства</h5>${ind.traits.map(t=>{const T=TRAIT_BY_ID[t];return `<div class="gr"><span>${T.icon} ${T.name}</span><span>${T.desc}</span></div>`}).join('')}${newborn&&O.traits?'<p class="mut" style="margin:4px 0 0">Одно свойство — мутация!</p>':''}
  <h5>Характеристики</h5>${CSTATS.map(([k,n,ic])=>`<div class="gr"><span>${ic} ${n}</span><span><span class="track" style="display:inline-block;width:110px;vertical-align:middle;margin:0 6px 0 0"><span class="fill" style="display:block;width:${ind.stats[k]*10}%;background:var(--xp)"></span></span><b>${ind.stats[k]}</b>${O['s_'+k]?' <b class="mut">+мутация</b>':''}</span></div>`).join('')}
  <p class="note" style="text-align:left">${CSTAT_HELP}</p></div>
  <div class="btns">${act?'<span class="tag">Это твой главный кот</span>':'<button class="btn" id="kMain">Сделать главным</button>'}
  ${player.nest?'':'<button class="btn alt small" id="kA">Родитель 1</button><button class="btn alt small" id="kB">Родитель 2</button>'}
  ${isKit&&!act&&!inNest?'<button class="btn alt small" id="kGive" style="color:var(--bad);border-color:var(--bad)">Отдать в добрые руки</button>':''}
  <button class="btn alt" id="kClose">Закрыть</button></div>`);
  m.querySelector('.modal').classList.add('wide');
  const on=(id,f)=>{const b=$('#'+id);if(b)b.onclick=f};
  on('kClose',()=>{m.innerHTML='';if(screen==='cat')catScreen()});
  on('kMain',()=>{setActive(ind);savePlayer(true);m.innerHTML='';toast(`${esc(ind.name)} теперь главный кот`);catScreen()});
  on('kA',()=>{m.innerHTML='';catTab='kennel';setParent('A',ind)});on('kB',()=>{m.innerHTML='';catTab='kennel';setParent('B',ind)});
  on('kRename',()=>{const v=$('#kName').value.trim().replace(/\s+/g,' ').slice(0,14);if(!v)return;player.kennel=player.kennel.map(k=>k.id===ind.id?{...k,name:v}:k);ind.name=v;savePlayer(true);toast('Имя сохранено');catDetail({...ind},false)});
  on('kGive',()=>{m.querySelector('.btns').innerHTML=`<p class="err" style="margin:0">Отдать ${esc(ind.name)} в добрые руки? Котёнок уйдёт навсегда, а ты получишь 3 ★.</p><button class="btn" id="kGiveYes" style="background:var(--bad)">Да, отдать</button><button class="btn alt" id="kClose2">Отмена</button>`;
    on('kClose2',()=>catDetail(ind));on('kGiveYes',()=>{player.kennel=player.kennel.filter(k=>k.id!==ind.id);if(selA===ind.id)selA=null;if(selB===ind.id)selB=null;player.stars+=3;savePlayer(true);renderMe();m.innerHTML='';toast('Котёнок нашёл новый дом. +3 ★');catScreen()})})}
