/* ===== Ивенты: появляются по таймеру, в каждом участвует котёнок игрока ===== */
const EV_EVERY=20*60e3;
const EVENTS={
 meteor:{name:'Метеоритный дождь',icon:'☄️',type:'tap',desc:'С неба падают метеориты со звёздами внутри! Лови их пальцем, пока они не упали на землю.'},
 volcano:{name:'Извержение вулкана',icon:'🌋',type:'tap',desc:'Вулкан выбрасывает горячие камни. Нажимай на них, и они остынут и превратятся в кристаллы!'},
 bubbles:{name:'Подводный мир',icon:'🫧',type:'tap',desc:'Котёнок нырнул на дно! Лопай пузыри с жемчугом, но не трогай медуз — они жгутся.'},
 fireflies:{name:'Ночь светлячков',icon:'✨',type:'tap',desc:'В лесу зажглись светлячки. Лови их, и котёнок соберёт их в банку-фонарик.'},
 tornado:{name:'Торнадо',icon:'🌪️',type:'tap',desc:'Смерч уносит вещи котёнка! Хватай их, пока они кружатся в вихре.'},
 leaves:{name:'Золотая осень',icon:'🍂',type:'tap',desc:'Падают листья. Лови только золотые — они волшебные! Красные и зелёные не считаются.'},
 hole:{name:'Чёрная дыра',icon:'🕳️',type:'quiz',need:5,dur:30,q:'math',desc:'Рядом открылась чёрная дыра и затягивает котёнка! Реши 5 примеров, чтобы её закрыть. Ошибки помогают дыре расти.'},
 tsunami:{name:'Цунами',icon:'🌊',type:'quiz',need:5,dur:35,q:'math',desc:'На посёлок идёт огромная волна! Каждый правильный ответ — новый ряд кирпичей. Построй стену из 5 рядов, пока волна не дошла.'},
 blizzard:{name:'Снежная буря',icon:'❄️',type:'quiz',need:5,dur:35,q:'math',desc:'Котёнок замерзает в метель! Каждый правильный ответ подбрасывает полено в костёр. Разожги большой огонь, пока не стало слишком холодно.'},
 pirates:{name:'Клад пиратов',icon:'🏴‍☠️',type:'quiz',need:5,dur:0,q:'math',lives:3,desc:'Котёнок нашёл карту сокровищ! Каждый правильный ответ — шаг к кладу. Три ошибки — и пиратский корабль приплывёт первым.'},
 ufo:{name:'Пришельцы',icon:'🛸',type:'quiz',need:3,dur:0,q:'riddle',asked:true,desc:'Прилетели инопланетяне и хотят узнать, умные ли на Земле котята. Ответь на 3 хитрых вопроса!'},
 dragon:{name:'Добрый дракон',icon:'🐉',type:'quiz',need:4,dur:0,q:'riddle',asked:true,desc:'Дракон охраняет сокровищницу и любит загадки. Отгадай 4 загадки, и он поделится сокровищами.'},
 aurora:{name:'Северное сияние',icon:'🌌',type:'passive',desc:'В небе разлилось северное сияние! Следующие 3 игры дадут двойной опыт.'},
 rainbow:{name:'Радуга',icon:'🌈',type:'passive',desc:'После дождя вышла радуга, а под ней стоит подарочная коробка с котёнком!'},
 comet:{name:'Комета желаний',icon:'💫',type:'passive',desc:'Мимо пролетает комета! Котёнок загадал желание и получил 5 звёзд.'},
 fair:{name:'Ярмарка',icon:'🎪',type:'passive',desc:'В городе ярмарка! Торговцы угостили котёнка: 2 рыбки и креветки в запас.'},
 letter:{name:'Письмо от бабушки',icon:'📬',type:'passive',desc:'Почтальон принёс письмо от бабушки котёнка! Внутри открытка и 3 звезды.'},
 birthday:{name:'День рождения котёнка',icon:'🎂',type:'passive',desc:'Сегодня праздник! Котёнок задувает свечи: все шкалы +20 и 5 звёзд в подарок.'}};

const evOverlay=html=>`<div class="overlay" role="dialog" aria-modal="true" aria-label="Событие"><div class="modal evm">${html}</div></div>`;
function startEvent(k){const E=EVENTS[k];player.nextEv=Date.now()+EV_EVERY;savePlayer(true);const m=$('#modal');
  m.innerHTML=evOverlay(`<div class="evicon">${E.icon}</div><p class="rt r-legend" style="margin:0">Событие!</p><h3>${E.name}</h3><p>${E.desc}</p>
  <div class="btns"><button class="btn" id="evGo">${E.type==='passive'?'Забрать':'Начать!'}</button>${E.type==='passive'?'':'<button class="btn alt" id="evSkip">Пропустить</button>'}</div>`);
  fanfare();$('#evGo').focus();const sk=$('#evSkip');if(sk)sk.onclick=closeEvent;
  $('#evGo').onclick=()=>{if(E.type==='tap')tapEvent(k);else if(E.type==='quiz')quizEvent(k);else passiveEvent(k)}}
function closeEvent(){$('#modal').innerHTML='';renderMe();if(screen==='menu')menu();else if(screen==='cat')catScreen()}
function evReward(title,text,stars,xp){const info=grant(stars,xp);savePlayer(true);renderMe();
  $('#modal').innerHTML=evOverlay(`<div class="prize glow" style="width:130px;margin:0 auto">${catSVG(player.cat,'happy')}</div><h3>${title}</h3><p>${text}</p>${stars||xp?`<p class="result" style="padding:0"><span class="st" style="font-size:30px">${stars?'+'+stars+' ★':''}</span> ${xp?`<b style="color:var(--xp)">+${xp} опыта</b>`:''}</p>`:''}
  ${info.up?`<p class="bubble">Новый уровень ${info.level}! Бонус +${info.bonus} ★</p>`:''}<div class="btns"><button class="btn" id="evOk">Отлично!</button></div>`);
  if(stars||info.up)fanfare();$('#evOk').onclick=closeEvent;$('#evOk').focus()}
function passiveEvent(k){const c=player.cat;
  if(k==='aurora'){player.buff={xp2:(player.buff.xp2||0)+3};evReward('Северное сияние','Следующие 3 игры дают двойной опыт!',0,0)}
  else if(k==='rainbow'){player.gifts={...player.gifts,cats:true};evReward('Радуга','В сундуках тебя ждёт подарочная коробка с котёнком!',0,0)}
  else if(k==='fair'){c.inv={...c.inv,fish:(c.inv.fish||0)+2,shrimp:(c.inv.shrimp||0)+1};evReward('Ярмарка','2 рыбки и креветки лежат в запасе еды.',0,20)}
  else if(k==='letter'){c.joy=clamp(c.joy+20,0,100);evReward('Письмо от бабушки','«Дорогой котёнок, учись хорошо и слушайся хозяина!» Настроение +20.',3,20)}
  else if(k==='birthday'){applyEffects({food:20,joy:20,fun:20,sport:20,energy:20});evReward('С днём рождения!','Все шкалы котёнка выросли на 20.',5,30)}
  else evReward('Комета желаний','Желание исполнилось!',5,20)}

const evPoint=(cv,e,W,H)=>{const r=cv.getBoundingClientRect();return [(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*H/r.height]};
function drawCatImg(ctx,im,cx,bottom,w,rot=0,flip=false){if(!im)return;const h=w*248/200;ctx.save();ctx.translate(cx,bottom-h/2);ctx.rotate(rot);if(flip)ctx.scale(-1,1);ctx.drawImage(im,-w/2,-h/2,w,h);ctx.restore()}
const grad=(ctx,H,a,b,y0=0)=>{const g=ctx.createLinearGradient(0,y0,0,H);g.addColorStop(0,a);g.addColorStop(1,b);return g};
function emo(ctx,e,x,y,s,rot=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.font=`${s}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(e,0,0);ctx.restore()}

/* --- Ивенты-ловилки --- */
async function tapEvent(k){const E=EVENTS[k];const W=360,H=440,DUR=15000;
  $('#modal').innerHTML=evOverlay(`<h3>${E.icon} ${E.name}</h3><canvas id="evc" width="${W}" height="${H}" aria-label="Игровое поле"></canvas><p class="count" id="evs">0 · 15 с</p>`);
  const cat=await svgImage(catSVG(player.cat,'happy'));
  const cv=$('#evc');if(!cv)return;const ctx=cv.getContext('2d');let objs=[],parts=[],caught=0,missed=0,t0=performance.now(),last=t0,spawn=0,run=true;
  const sky=Array.from({length:50},()=>[Math.random()*W,Math.random()*300,Math.random()*1.6+.4]);
  const weeds=Array.from({length:7},(_,i)=>[i*56+10,rnd(60,130)]);const trees=Array.from({length:6},(_,i)=>[i*70+rnd(-10,10),rnd(120,190)]);
  const ITEMS=['🧦','🎾','🐟','🧶','📚','🎩','🧸','🥛'];
  const ground={meteor:400,volcano:440,bubbles:-30,fireflies:H+40,tornado:H+40,leaves:410}[k];
  cv.onpointerdown=e=>{const [x,y]=evPoint(cv,e,W,H);
    for(const o of objs){if(o.alive&&Math.hypot((o.drawX??o.x)-x,o.y-y)<o.r+18){o.alive=false;
      if(o.bad){caught=Math.max(0,caught-1);tone(180,0,.2,'square',.06);for(let i=0;i<10;i++)parts.push({x:o.x,y:o.y,vx:(Math.random()-.5)*5,vy:(Math.random()-.5)*5,l:1,c:'#ff4d9d'});break}
      if(o.dud){tone(300,0,.08,'triangle',.05);for(let i=0;i<6;i++)parts.push({x:o.x,y:o.y,vx:(Math.random()-.5)*3,vy:(Math.random()-.5)*3,l:.7,c:'#c46a28'});break}
      caught++;tone(620+caught*22,0,.1,'triangle');const col={meteor:'#ffd166',volcano:'#7ff2ff',bubbles:'#ffffff',fireflies:'#eaffb0',tornado:'#ffd166',leaves:'#ffd700'}[k];
      for(let i=0;i<14;i++)parts.push({x:o.x,y:o.y,vx:(Math.random()-.5)*6,vy:(Math.random()-.5)*6,l:1,c:col});break}}};
  function spawnOne(el){
    if(k==='meteor')return {x:Math.random()*290+40,y:-20,vx:-.4-Math.random()*.9,vy:2.1+el/7000+Math.random()*.9,r:16};
    if(k==='volcano')return {x:180+(Math.random()-.5)*30,y:298,vx:(Math.random()-.5)*4.6,vy:-(6.8+Math.random()*3),r:15,grav:.15};
    if(k==='bubbles'){const bad=Math.random()<.28;return {x:rnd(30,330),y:H+20,vx:0,vy:-(1.3+Math.random()*1.2+el/12000),r:bad?17:16,bad,ph:Math.random()*6}}
    if(k==='fireflies')return {x:rnd(30,330),y:rnd(60,300),vx:(Math.random()-.5)*1.4,vy:(Math.random()-.5)*1.4,r:10,life:rnd(2200,3600),born:el,ph:Math.random()*6};
    if(k==='tornado')return {ang:Math.random()*6.28,rad:rnd(30,120),hgt:rnd(80,330),sp:.002+Math.random()*.002,e:pick(ITEMS),r:16,x:0,y:0,life:rnd(2500,4000),born:el};
    const gold=Math.random()<.42;return {x:rnd(20,340),y:-20,vx:0,vy:1.2+Math.random()*.8+el/15000,r:15,dud:!gold,e:gold?'🍁':pick(['🍂','🍃']),ph:Math.random()*6}}
  function bg(el){
    if(k==='meteor'){ctx.fillStyle=grad(ctx,H,'#070b24','#2b2f6b');ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';sky.forEach(([x,y,r])=>{ctx.globalAlpha=.5+.5*Math.sin(el/400+x);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()});ctx.globalAlpha=1;
      ctx.fillStyle='#3a3a50';ctx.fillRect(0,400,W,40);ctx.fillStyle='#2a2a3c';[60,170,290].forEach(x=>{ctx.beginPath();ctx.ellipse(x,418,26,7,0,0,7);ctx.fill()});drawCatImg(ctx,cat,300,404,64)}
    else if(k==='volcano'){ctx.fillStyle=grad(ctx,H,'#3b1d4a','#ff8a5b');ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(60,40,40,.6)';[[40,80],[110,60],[250,90]].forEach(([x,y])=>{ctx.beginPath();ctx.ellipse(x+Math.sin(el/2000)*10,y,40,14,0,0,7);ctx.fill()});
      ctx.fillStyle='#4a2e22';ctx.beginPath();ctx.moveTo(60,H);ctx.lineTo(150,300);ctx.lineTo(210,300);ctx.lineTo(300,H);ctx.fill();
      ctx.fillStyle='#ff6b35';ctx.shadowColor='#ff6b35';ctx.shadowBlur=20;ctx.beginPath();ctx.ellipse(180,300,30,8,0,0,7);ctx.fill();
      ctx.beginPath();ctx.moveTo(172,302);ctx.quadraticCurveTo(165+Math.sin(el/300)*6,370,150,H);ctx.lineTo(162,H);ctx.quadraticCurveTo(178,370,188,302);ctx.fill();ctx.shadowBlur=0;
      ctx.fillStyle='rgba(120,100,100,.5)';for(let i=0;i<4;i++){const t=(el/1500+i/4)%1;ctx.beginPath();ctx.arc(180+Math.sin(i*2+t*3)*20,300-t*200,10+t*26,0,7);ctx.fill()}
      drawCatImg(ctx,cat,40,H-4,62,0,true)}
    else if(k==='bubbles'){ctx.fillStyle=grad(ctx,H,'#5fc9f8','#0b3d6e');ctx.fillRect(0,0,W,H);
      ctx.fillStyle='rgba(255,255,255,.08)';for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(40+i*80+Math.sin(el/1500+i)*20,0);ctx.lineTo(80+i*80,0);ctx.lineTo(20+i*80,H);ctx.lineTo(-10+i*80,H);ctx.fill()}
      ctx.fillStyle='#e9c46a';ctx.fillRect(0,H-26,W,26);
      weeds.forEach(([x,h])=>{ctx.strokeStyle='#2e9e5b';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(x,H-20);ctx.quadraticCurveTo(x+Math.sin(el/600+x)*14,H-20-h/2,x+Math.sin(el/500+x)*8,H-20-h);ctx.stroke()});
      drawCatImg(ctx,cat,180,H-14,70);ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(180,H-62,36,0,7);ctx.stroke()}
    else if(k==='fireflies'){ctx.fillStyle=grad(ctx,H,'#0b1a2e','#1d3b2a');ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';sky.slice(0,25).forEach(([x,y,r])=>{ctx.beginPath();ctx.arc(x,y*.5,r*.7,0,7);ctx.fill()});
      ctx.fillStyle='#0f2418';trees.forEach(([x,h])=>{ctx.beginPath();ctx.moveTo(x,H-40-h);ctx.lineTo(x-34,H-30);ctx.lineTo(x+34,H-30);ctx.fill()});ctx.fillRect(0,H-34,W,34);
      drawCatImg(ctx,cat,80,H-10,72);ctx.fillStyle=`rgba(234,255,176,${Math.min(.9,.15+caught*.06)})`;ctx.shadowColor='#eaffb0';ctx.shadowBlur=10+caught*2;
      ctx.beginPath();ctx.roundRect?ctx.roundRect(140,H-70,30,40,6):ctx.rect(140,H-70,30,40);ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle='#cfd8dc';ctx.lineWidth=2;ctx.strokeRect(140,H-70,30,40)}
    else if(k==='tornado'){ctx.fillStyle=grad(ctx,H,'#7d8492','#c9d6c0');ctx.fillRect(0,0,W,H);ctx.fillStyle='#8cc78a';ctx.fillRect(0,H-40,W,40);
      const tx=180+Math.sin(el/1800)*60;for(let i=0;i<14;i++){const y=40+i*25,w=16+i*9;ctx.fillStyle=`rgba(90,90,100,${.25+i*.02})`;ctx.beginPath();ctx.ellipse(tx+Math.sin(el/200+i)*8*(14-i)/14,y,w,10,0,0,7);ctx.fill()}
      ctx.strokeStyle='#5c3a17';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(320,H-40);ctx.lineTo(320,H-130);ctx.stroke();drawCatImg(ctx,cat,320+Math.sin(el/90)*3,H-36,64,Math.sin(el/150)*.15)}
    else{ctx.fillStyle=grad(ctx,H,'#ffe0a3','#ffb26b');ctx.fillRect(0,0,W,H);ctx.fillStyle='#d98a3c';ctx.fillRect(0,410,W,30);
      ctx.fillStyle='#7a4a1d';ctx.fillRect(20,120,22,290);ctx.fillRect(310,150,20,260);ctx.fillStyle='#e07a2e';ctx.beginPath();ctx.arc(31,110,60,0,7);ctx.arc(320,140,55,0,7);ctx.fill();
      drawCatImg(ctx,cat,180,414,70)}}
  function drawObj(o,el){ctx.save();
    if(k==='meteor'){ctx.strokeStyle='rgba(255,183,3,.55)';ctx.lineWidth=8;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(o.x-o.vx*10,o.y-o.vy*10);ctx.lineTo(o.x,o.y);ctx.stroke();
      ctx.shadowBlur=18;ctx.shadowColor='#ff8c1a';ctx.fillStyle='#ff8c1a';ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,7);ctx.fill();ctx.fillStyle='#fff3c4';ctx.font='bold 18px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('★',o.x,o.y+1)}
    else if(k==='volcano'){ctx.shadowBlur=18;ctx.shadowColor='#ff4500';ctx.fillStyle='#ff4500';ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,7);ctx.fill();ctx.fillStyle='#ffb703';ctx.beginPath();ctx.arc(o.x-4,o.y-4,o.r*.45,0,7);ctx.fill()}
    else if(k==='bubbles'){const x=o.x+Math.sin(el/400+o.ph)*10;o.drawX=x;if(o.bad){emo(ctx,'🪼',x,o.y,32)}else{ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=2;ctx.fillStyle='rgba(255,255,255,.18)';ctx.beginPath();ctx.arc(x,o.y,o.r,0,7);ctx.fill();ctx.stroke();ctx.fillStyle='#fff6e8';ctx.beginPath();ctx.arc(x,o.y,6,0,7);ctx.fill()}}
    else if(k==='fireflies'){const a=.5+.5*Math.sin(el/150+o.ph);ctx.shadowBlur=16;ctx.shadowColor='#eaffb0';ctx.fillStyle=`rgba(234,255,120,${.4+a*.6})`;ctx.beginPath();ctx.arc(o.x,o.y,5+a*3,0,7);ctx.fill()}
    else if(k==='tornado')emo(ctx,o.e,o.x,o.y,28,el/300);
    else{o.drawX=o.x+Math.sin(el/500+o.ph)*14;emo(ctx,o.e,o.drawX,o.y,30,Math.sin(el/400+o.ph)*.6)}
    ctx.restore()}
  function frame(now){if(!run||!document.body.contains(cv))return;const dt=Math.min(50,now-last);last=now;const el=now-t0;
    spawn-=dt;if(spawn<=0&&el<DUR-900){spawn=Math.max(240,{meteor:680,volcano:720,bubbles:520,fireflies:520,tornado:600,leaves:440}[k]-el/30);const o=spawnOne(el);o.alive=true;objs.push(o)}
    const tx=180+Math.sin(el/1800)*60;
    objs.forEach(o=>{if(k==='tornado'){o.ang+=o.sp*dt;o.x=tx+Math.cos(o.ang)*o.rad*(o.hgt/330);o.y=o.hgt+Math.sin(o.ang)*12;return}
      if(k==='fireflies'){o.vx+=(Math.random()-.5)*.2;o.vy+=(Math.random()-.5)*.2;o.vx=clamp(o.vx,-1.6,1.6);o.vy=clamp(o.vy,-1.6,1.6)}
      o.x+=o.vx*dt/16;o.y+=o.vy*dt/16;if(o.grav)o.vy+=o.grav*dt/16});
    objs=objs.filter(o=>{if(!o.alive)return false;if(o.life&&el-o.born>o.life)return false;
      if(k==='bubbles'?o.y<-30:o.y>ground-4){if(k==='meteor'||k==='volcano'){for(let i=0;i<6;i++)parts.push({x:o.x,y:ground,vx:(Math.random()-.5)*4,vy:-Math.random()*3,l:.8,c:'#8a8aa0'})}return false}return o.x>-50&&o.x<W+50});
    parts.forEach(p=>{p.x+=p.vx*dt/16;p.y+=p.vy*dt/16;p.l-=dt/650});parts=parts.filter(p=>p.l>0);
    bg(el);objs.forEach(o=>drawObj(o,el));parts.forEach(p=>{ctx.globalAlpha=Math.max(0,p.l);ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,3.5,0,7);ctx.fill()});ctx.globalAlpha=1;
    const s=$('#evs');if(s)s.textContent=`${caught} · ${Math.max(0,Math.ceil((DUR-el)/1000))} с`;
    if(el>=DUR&&(!objs.length||el>=DUR+2500)){run=false;const st=Math.min(caught,15);
      const t={meteor:['Звёздный улов!','метеорит','метеорита','метеоритов'],volcano:['Кристаллы собраны!','камень','камня','камней'],bubbles:['Жемчужины!','жемчужину','жемчужины','жемчужин'],
        fireflies:['Фонарик светится!','светлячка','светлячков','светлячков'],tornado:['Вещи спасены!','вещь','вещи','вещей'],leaves:['Волшебный гербарий!','лист','листа','листьев']}[k];
      evReward(t[0],`Ты поймал ${caught} ${plural(caught,t.slice(1))}.`,st,caught*3);return}
    requestAnimationFrame(frame)}
  requestAnimationFrame(frame)}

/* --- Ивенты с вопросами --- */
async function quizEvent(k){const E=EVENTS[k];const W=360,H=210;let prog=0,asked=0,wrong=0,danger=0,run=true,t0=performance.now(),last=t0,busy=false,flash=0;
  $('#modal').innerHTML=evOverlay(`<h3>${E.icon} ${E.name}</h3><canvas id="evc" width="${W}" height="${H}" aria-label="Событие"></canvas><p class="count" id="evp"></p><div id="evq"></div>`);
  const cat=await svgImage(catSVG(player.cat,'happy')),catSad=await svgImage(catSVG(player.cat,'sad'));
  const cv=$('#evc');if(!cv)return;const ctx=cv.getContext('2d');const sky=Array.from({length:40},()=>[Math.random()*W,Math.random()*H,Math.random()*1.5+.4]);
  const snow=Array.from({length:60},()=>[Math.random()*W,Math.random()*H,Math.random()*2+1]);
  const status=()=>{const p=$('#evp');if(!p)return;p.textContent=E.asked?`Вопрос ${Math.min(asked+1,E.need)} из ${E.need} · верно ${prog}`:E.lives?`${prog} из ${E.need} · ошибок ${wrong} из ${E.lives}`:`${prog} из ${E.need}`};
  function nextQ(){busy=false;const t=E.q==='riddle'?(Math.random()<.5?bankTask(trNext(),''):oddTask()):mathTask();status();
    const long=t.opts.some(o=>String(o).length>5);
    $('#evq').innerHTML=`<p class="prompt" style="font-size:${E.q==='riddle'?19:30}px;margin:6px 0 10px">${t.raw?t.q:esc(t.q)}</p>
    <div class="answers ${long?'words':''}">${t.opts.map((o,i)=>`<button data-i="${i}">${esc(o)}</button>`).join('')}</div>`;
    const btns=[...$('#evq').querySelectorAll('button')];
    btns.forEach(b=>b.onclick=()=>{if(busy||!run)return;busy=true;const ok=t.opts[+b.dataset.i]===t.ans;beep(ok);b.classList.add(ok?'ok':'bad');
      if(!ok){btns.forEach(x=>{if(t.opts[+x.dataset.i]===t.ans)x.classList.add('ok')});wrong++;flash=1;if(E.dur)danger=Math.min(1,danger+.12);if(E.lives)danger=wrong/E.lives}
      if(ok)prog++;asked++;status();
      setTimeout(()=>{if(!run)return;if(E.lives&&wrong>=E.lives)return end(false);if(E.asked?asked>=E.need:prog>=E.need)end(true);else nextQ()},ok?450:1200)})}
  function draw(el){const sad=danger>.6?catSad:cat;
    if(k==='hole'){ctx.fillStyle='#07071a';ctx.fillRect(0,0,W,H);
      sky.forEach(([x,y,r],i)=>{const a=el/900+i;const f=1-danger*.5;ctx.fillStyle='#fff';ctx.globalAlpha=.7;ctx.beginPath();ctx.arc(180+(x-180)*f+Math.cos(a)*3,105+(y-105)*f+Math.sin(a)*3,r,0,7);ctx.fill()});ctx.globalAlpha=1;
      const R=Math.max(6,16+danger*60-prog*7);
      for(let i=4;i>=1;i--){ctx.strokeStyle=`rgba(255,${120+i*25},40,${.18*i})`;ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(180,105,R+i*12,(R+i*12)*.35,el/1500+i,0,7);ctx.stroke()}
      ctx.fillStyle='#000';ctx.beginPath();ctx.arc(180,105,R,0,7);ctx.fill();
      drawCatImg(ctx,sad,330-danger*130,150,60-danger*25,danger*6+Math.sin(el/200)*.2)}
    else if(k==='tsunami'){ctx.fillStyle=grad(ctx,H,'#9fd8ff','#e0f4ff');ctx.fillRect(0,0,W,H);ctx.fillStyle='#ffd166';ctx.beginPath();ctx.arc(320,36,18,0,7);ctx.fill();
      [[80,40],[120,30]].forEach(([x,y],i)=>emo(ctx,'🕊️',(x+el/40+i*90)%380-10,y+Math.sin(el/300+i)*4,16));
      ctx.fillStyle='#e9c46a';ctx.fillRect(0,180,W,30);
      [[300,148,'#e76f51'],[340,152,'#3a86ff']].forEach(([x,y,c])=>{ctx.fillStyle=c;ctx.fillRect(x,y,28,32);ctx.fillStyle='#8b5a2b';ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+14,y-16);ctx.lineTo(x+32,y);ctx.fill()});
      ctx.strokeStyle='#8b5a2b';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(240,180);ctx.quadraticCurveTo(236,140,244,120);ctx.stroke();emo(ctx,'🌴',246,112,40);
      const wx=30+danger*190;ctx.fillStyle='#2f6fdc';ctx.beginPath();ctx.moveTo(0,H);ctx.lineTo(0,60);ctx.quadraticCurveTo(wx-10,14+Math.sin(el/250)*6,wx+20,66);ctx.quadraticCurveTo(wx-14,60,wx-8,94);ctx.quadraticCurveTo(wx+10,150,wx+40,H);ctx.fill();
      ctx.fillStyle='#fff';ctx.globalAlpha=.75;for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(wx+8-i*6,60+i*3+Math.sin(el/200+i)*2,5,0,7);ctx.fill()}ctx.globalAlpha=1;
      for(let r=0;r<prog;r++)for(let c=0;c<2;c++){ctx.fillStyle=(r+c)%2?'#c8664a':'#b5533a';ctx.fillRect(262+c*16,164-r*16,16,15)}
      drawCatImg(ctx,sad,300,182,52)}
    else if(k==='blizzard'){const warm=prog/E.need;ctx.fillStyle=grad(ctx,H,'#5a6b8c','#c9d6f0');ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';ctx.fillRect(0,178,W,32);
      ctx.fillStyle=`rgba(255,140,40,${warm*.35})`;ctx.beginPath();ctx.arc(150,170,40+warm*80,0,7);ctx.fill();
      ctx.fillStyle='#6d4c41';ctx.fillRect(120,174,60,8);ctx.save();ctx.translate(150,172);for(let i=0;i<3;i++){const s=(.4+warm*.9)*(1-i*.25)+Math.sin(el/90+i)*.06;ctx.fillStyle=['#ff6b35','#ffb703','#fff3c4'][i];ctx.beginPath();ctx.moveTo(-16*s,0);ctx.quadraticCurveTo(-14*s,-30*s,0,-50*s);ctx.quadraticCurveTo(14*s,-30*s,16*s,0);ctx.fill()}ctx.restore();
      drawCatImg(ctx,danger>.5?catSad:cat,250+(warm<.6?Math.sin(el/40)*2:0),184,60);
      ctx.fillStyle='#fff';snow.forEach(s=>{s[1]+=s[2]*1.4;s[0]+=Math.sin(el/500+s[2])*.8-(1-warm)*1.2;if(s[1]>H){s[1]=-4;s[0]=Math.random()*W}if(s[0]<0)s[0]=W;ctx.beginPath();ctx.arc(s[0],s[1],s[2],0,7);ctx.fill()});
      ctx.fillStyle='#fff';ctx.fillRect(14,20,14,120);ctx.fillStyle='#3a86ff';const th=(1-danger)*110;ctx.fillRect(17,137-th,8,th);ctx.strokeStyle='#333';ctx.lineWidth=2;ctx.strokeRect(14,20,14,120)}
    else if(k==='pirates'){ctx.fillStyle='#5fc9f8';ctx.fillRect(0,0,W,H);ctx.fillStyle='#ffe0a3';ctx.beginPath();ctx.ellipse(170,120,140,80,0,0,7);ctx.fill();ctx.fillStyle='#8cc78a';ctx.beginPath();ctx.ellipse(160,110,100,50,0,0,7);ctx.fill();
      const path=[[60,150],[100,110],[150,140],[190,96],[240,128],[280,92]];ctx.setLineDash([6,6]);ctx.strokeStyle='#7a4a1d';ctx.lineWidth=3;ctx.beginPath();path.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();ctx.setLineDash([]);
      ctx.strokeStyle='#d62839';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(270,82);ctx.lineTo(290,102);ctx.moveTo(290,82);ctx.lineTo(270,102);ctx.stroke();
      const [px,py]=path[Math.min(prog,5)];drawCatImg(ctx,cat,px,py+10,44);
      const sx=W-20-danger*120;emo(ctx,'🏴‍☠️',sx,40,34);ctx.fillStyle='#6d4c41';ctx.fillRect(sx-30,52,60,14)}
    else if(k==='dragon'){ctx.fillStyle=grad(ctx,H,'#3b2a6b','#7a4fd6');ctx.fillRect(0,0,W,H);ctx.fillStyle='#ffd166';for(let i=0;i<8;i++){ctx.beginPath();ctx.arc(30+i*14,190-(i%3)*8,8,0,7);ctx.fill()}
      const y=90+Math.sin(el/500)*5;ctx.fillStyle='#2e9e5b';ctx.beginPath();ctx.ellipse(230,y+40,60,36,0,0,7);ctx.fill();ctx.beginPath();ctx.moveTo(190,y+20);ctx.lineTo(150+Math.sin(el/300)*6,y-30);ctx.lineTo(210,y+10);ctx.fill();ctx.beginPath();ctx.moveTo(270,y+20);ctx.lineTo(320,y-30+Math.sin(el/300)*6);ctx.lineTo(250,y+10);ctx.fill();
      ctx.beginPath();ctx.ellipse(180,y+6,30,24,0,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(172,y,6,0,7);ctx.fill();ctx.fillStyle='#000';ctx.beginPath();ctx.arc(172,y+1,3,0,7);ctx.fill();
      if(flash>0){ctx.fillStyle=`rgba(150,150,150,${flash})`;ctx.beginPath();ctx.arc(140,y+12,20+(1-flash)*20,0,7);ctx.fill()}
      for(let i=0;i<prog;i++)emo(ctx,'💖',200+i*22,y-40-Math.sin(el/300+i)*4,18);
      drawCatImg(ctx,cat,70,200,58)}
    else{ctx.fillStyle=grad(ctx,H,'#120b2b','#2b2f6b');ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';sky.forEach(([x,y,r])=>{ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()});
      const y=50+Math.sin(el/400)*6;ctx.fillStyle='rgba(127,242,255,.18)';ctx.beginPath();ctx.moveTo(160,y+10);ctx.lineTo(200,y+10);ctx.lineTo(240,H);ctx.lineTo(120,H);ctx.fill();
      ctx.fillStyle='#9aa6bd';ctx.beginPath();ctx.ellipse(180,y,62,16,0,0,7);ctx.fill();ctx.fillStyle='#7ff2ff';ctx.beginPath();ctx.ellipse(180,y-10,26,18,0,Math.PI,0);ctx.fill();emo(ctx,'👽',180,y-14,20);
      for(let i=0;i<E.need;i++){ctx.fillStyle=i<prog?'#39ff14':i<asked?'#ff3355':'#ffd166';ctx.beginPath();ctx.arc(150+i*30,y+4,5,0,7);ctx.fill()}
      drawCatImg(ctx,cat,180,206-Math.min(asked,3)*8,58)}
    flash=Math.max(0,flash-.03)}
  function frame(now){if(!run||!document.body.contains(cv))return;const dt=Math.min(50,now-last);last=now;
    if(E.dur){danger=Math.min(1,danger+dt/(E.dur*1000));if(danger>=1){draw(now-t0);end(false);return}}
    draw(now-t0);requestAnimationFrame(frame)}
  function end(win){run=false;const c=player.cat;
    if(k==='hole')win?evReward('Чёрная дыра закрыта!','Котёнок спасён и очень гордится тобой.',8,60):evReward('Ой, затянуло!','Чёрная дыра покатала котёнка по космосу и выплюнула обратно. Он вернулся с сувениром.',2,15);
    else if(k==='tsunami'){if(win){player.gifts={...player.gifts,clothes:true};evReward('Стена выдержала!','Волна разбилась о стену. В награду в сундуках ждёт подарок с одеждой.',5,50)}else evReward('Брызги!','Волна намочила котёнка, но он высох на солнышке.',2,15)}
    else if(k==='blizzard'){if(win){c.inv={...c.inv,fish:(c.inv.fish||0)+2};evReward('Тепло и уютно!','Костёр горит, котёнок согрелся. Соседи принесли 2 рыбки в запас.',4,50)}else evReward('Бррр!','Котёнок замёрз, но добежал домой и укутался в плед.',2,15)}
    else if(k==='pirates'){if(win){player.gifts={...player.gifts,room:true};evReward('Клад найден!','В сундуке пиратов — подарок с мебелью для комнаты и золотые монеты!',6,60)}else evReward('Пираты успели первыми','Но они оставили котёнку пару монет за смелость.',2,15)}
    else if(k==='dragon'){const all=prog===E.need;if(all)player.gifts={...player.gifts,cats:true};evReward(all?'Дракон в восторге!':'Дракон улетел',all?'Он подарил коробку с котёнком из своей сокровищницы!':`Отгадано ${prog} из ${E.need}. Дракон оставил немного золота.`,prog*2,prog*15)}
    else{const all=prog===E.need;if(all)player.gifts={...player.gifts,room:true};
      evReward(all?'Пришельцы в восторге!':'Пришельцы улетели',all?'Они оставили подарочный сундук с мебелью для комнаты!':`Ты ответил верно на ${prog} из ${E.need}. Пришельцы оставили звёзды.`,prog*3,prog*15)}}
  nextQ();requestAnimationFrame(frame)}
