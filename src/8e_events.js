/* ===== Ивенты: случайные события после игры ===== */
const EVENTS={
 meteor:{name:'Метеоритный дождь',icon:'☄️',type:'tap',desc:'С неба падают метеориты со звёздами внутри! Лови их пальцем, пока они не упали на землю.'},
 volcano:{name:'Извержение вулкана',icon:'🌋',type:'tap',desc:'Вулкан выбрасывает горячие камни. Нажимай на них, и они остынут и превратятся в кристаллы!'},
 hole:{name:'Чёрная дыра',icon:'🕳️',type:'quiz',need:5,dur:30,desc:'Рядом открылась чёрная дыра и затягивает котёнка! Реши 5 примеров, чтобы её закрыть.'},
 tsunami:{name:'Цунами',icon:'🌊',type:'quiz',need:5,dur:35,desc:'Идёт огромная волна! Каждый правильный ответ — новый ряд кирпичей. Построй стену из 5 рядов, пока волна не дошла.'},
 ufo:{name:'Пришельцы',icon:'🛸',type:'quiz',need:3,dur:0,desc:'Прилетели инопланетяне и хотят узнать, умные ли на Земле котята. Ответь на 3 хитрых вопроса!'},
 aurora:{name:'Северное сияние',icon:'🌌',type:'passive',desc:'В небе разлилось северное сияние! Следующие 3 игры дадут двойной опыт.'},
 rainbow:{name:'Радуга',icon:'🌈',type:'passive',desc:'После дождя вышла радуга, а под ней стоит подарочная коробка с котёнком!'},
 comet:{name:'Комета желаний',icon:'💫',type:'passive',desc:'Мимо пролетает комета! Котёнок загадал желание и получил 5 звёзд.'}};
let lastEventAt=0;
function maybeEvent(){if(!player||Date.now()-lastEventAt<90000||Math.random()>.3)return;
  setTimeout(()=>{if(screen==='result'&&!$('#modal').innerHTML)startEvent(pick(Object.keys(EVENTS)))},900)}
const evOverlay=html=>`<div class="overlay" role="dialog" aria-modal="true" aria-label="Событие"><div class="modal evm">${html}</div></div>`;
function startEvent(k){const E=EVENTS[k];lastEventAt=Date.now();const m=$('#modal');
  m.innerHTML=evOverlay(`<div class="evicon">${E.icon}</div><p class="rt r-legend" style="margin:0">Событие!</p><h3>${E.name}</h3><p>${E.desc}</p>
  <div class="btns"><button class="btn" id="evGo">${E.type==='passive'?'Забрать':'Начать!'}</button>${E.type==='passive'?'':'<button class="btn alt" id="evSkip">Пропустить</button>'}</div>`);
  fanfare();$('#evGo').focus();const sk=$('#evSkip');if(sk)sk.onclick=closeEvent;
  $('#evGo').onclick=()=>{if(E.type==='tap')tapEvent(k);else if(E.type==='quiz')quizEvent(k);else passiveEvent(k)}}
function closeEvent(){$('#modal').innerHTML='';renderMe();if(screen==='menu')menu();else if(screen==='cat')catScreen()}
function evReward(title,text,stars,xp){const info=grant(stars,xp);savePlayer(true);renderMe();
  $('#modal').innerHTML=evOverlay(`<h3>${title}</h3><p>${text}</p>${stars||xp?`<p class="result" style="padding:0"><span class="st" style="font-size:30px">${stars?'+'+stars+' ★':''}</span> ${xp?`<b style="color:var(--xp)">+${xp} опыта</b>`:''}</p>`:''}
  ${info.up?`<p class="bubble">Новый уровень ${info.level}! Бонус +${info.bonus} ★</p>`:''}<div class="btns"><button class="btn" id="evOk">Отлично!</button></div>`);
  if(stars||info.up)fanfare();$('#evOk').onclick=closeEvent;$('#evOk').focus()}
function passiveEvent(k){
  if(k==='aurora'){player.buff={xp2:(player.buff.xp2||0)+3};evReward('Северное сияние','Следующие 3 игры дают двойной опыт!',0,0)}
  else if(k==='rainbow'){player.gifts={...player.gifts,cats:true};evReward('Радуга','В сундуках тебя ждёт подарочная коробка с котёнком!',0,0)}
  else evReward('Комета желаний','Желание исполнилось!',5,20)}

const evPoint=(cv,e,W,H)=>{const r=cv.getBoundingClientRect();return [(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*H/r.height]};
function tapEvent(k){const E=EVENTS[k];const W=360,H=440,DUR=15000,ground=k==='meteor'?400:440;
  $('#modal').innerHTML=evOverlay(`<h3>${E.icon} ${E.name}</h3><canvas id="evc" width="${W}" height="${H}" aria-label="Игровое поле"></canvas><p class="count" id="evs">0 · 15 с</p>`);
  const cv=$('#evc'),ctx=cv.getContext('2d');let objs=[],parts=[],caught=0,t0=performance.now(),last=t0,spawn=0,run=true;
  const sky=Array.from({length:45},()=>[Math.random()*W,Math.random()*(ground-40),Math.random()*1.6+.4]);
  cv.onpointerdown=e=>{const [x,y]=evPoint(cv,e,W,H);
    for(const o of objs){if(o.alive&&Math.hypot(o.x-x,o.y-y)<o.r+18){o.alive=false;caught++;tone(620+caught*25,0,.1,'triangle');
      for(let i=0;i<14;i++)parts.push({x:o.x,y:o.y,vx:(Math.random()-.5)*6,vy:(Math.random()-.5)*6,l:1,c:k==='volcano'?'#7ff2ff':'#ffd166'});break}}};
  function draw(el){
    if(k==='meteor'){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#070b24');g.addColorStop(1,'#2b2f6b');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#fff';sky.forEach(([x,y,r])=>{ctx.globalAlpha=.5+.5*Math.sin(el/400+x);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()});ctx.globalAlpha=1;
      ctx.fillStyle='#3a3a50';ctx.fillRect(0,ground,W,H-ground);ctx.fillStyle='#2a2a3c';[60,170,290].forEach(x=>{ctx.beginPath();ctx.ellipse(x,ground+18,26,7,0,0,7);ctx.fill()})}
    else{const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3b1d4a');g.addColorStop(1,'#ff8a5b');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#4a2e22';ctx.beginPath();ctx.moveTo(60,H);ctx.lineTo(150,300);ctx.lineTo(210,300);ctx.lineTo(300,H);ctx.fill();
      ctx.fillStyle='#ff6b35';ctx.shadowColor='#ff6b35';ctx.shadowBlur=20;ctx.beginPath();ctx.ellipse(180,300,30,8,0,0,7);ctx.fill();
      ctx.beginPath();ctx.moveTo(172,302);ctx.quadraticCurveTo(165+Math.sin(el/300)*6,370,150,H);ctx.lineTo(162,H);ctx.quadraticCurveTo(178,370,188,302);ctx.fill();ctx.shadowBlur=0}
    objs.forEach(o=>{ctx.save();ctx.shadowBlur=18;
      if(k==='meteor'){ctx.strokeStyle='rgba(255,183,3,.55)';ctx.lineWidth=8;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(o.x-o.vx*10,o.y-o.vy*10);ctx.lineTo(o.x,o.y);ctx.stroke();
        ctx.shadowColor='#ff8c1a';ctx.fillStyle='#ff8c1a';ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,7);ctx.fill();ctx.fillStyle='#fff3c4';ctx.font='bold 18px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('★',o.x,o.y+1)}
      else{ctx.shadowColor='#ff4500';ctx.fillStyle='#ff4500';ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,7);ctx.fill();ctx.fillStyle='#ffb703';ctx.beginPath();ctx.arc(o.x-4,o.y-4,o.r*.45,0,7);ctx.fill()}
      ctx.restore()});
    parts.forEach(p=>{ctx.globalAlpha=Math.max(0,p.l);ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,3.5,0,7);ctx.fill()});ctx.globalAlpha=1}
  function frame(now){if(!run||!document.body.contains(cv))return;const dt=Math.min(50,now-last);last=now;const el=now-t0;
    spawn-=dt;if(spawn<=0&&el<DUR-900){spawn=Math.max(260,(k==='meteor'?680:720)-el/30);
      if(k==='meteor')objs.push({x:Math.random()*290+40,y:-20,vx:-.4-Math.random()*.9,vy:2.1+el/7000+Math.random()*.9,r:16,alive:true});
      else objs.push({x:180+(Math.random()-.5)*30,y:298,vx:(Math.random()-.5)*4.6,vy:-(6.8+Math.random()*3),r:15,alive:true,grav:true})}
    objs.forEach(o=>{o.x+=o.vx*dt/16;o.y+=o.vy*dt/16;if(o.grav)o.vy+=.15*dt/16});
    objs=objs.filter(o=>{if(!o.alive)return false;if(o.y>ground-4){for(let i=0;i<6;i++)parts.push({x:o.x,y:ground,vx:(Math.random()-.5)*4,vy:-Math.random()*3,l:.8,c:'#8a8aa0'});return false}return o.x>-40&&o.x<W+40});
    parts.forEach(p=>{p.x+=p.vx*dt/16;p.y+=p.vy*dt/16;p.l-=dt/650});parts=parts.filter(p=>p.l>0);
    draw(el);const s=$('#evs');if(s)s.textContent=`${caught} ${k==='meteor'?'★':'💎'} · ${Math.max(0,Math.ceil((DUR-el)/1000))} с`;
    if(el>=DUR&&(!objs.length||el>=DUR+2500)){run=false;const st=Math.min(caught,15);
      evReward(k==='meteor'?'Звёздный улов!':'Кристаллы собраны!',`Ты поймал ${caught} ${k==='meteor'?plural(caught,['метеорит','метеорита','метеоритов']):plural(caught,['камень','камня','камней'])}.`,st,caught*3);return}
    requestAnimationFrame(frame)}
  requestAnimationFrame(frame)}

function quizEvent(k){const E=EVENTS[k];const W=360,H=200;let prog=0,asked=0,danger=0,run=true,t0=performance.now(),last=t0,busy=false;
  $('#modal').innerHTML=evOverlay(`<h3>${E.icon} ${E.name}</h3><canvas id="evc" width="${W}" height="${H}" aria-label="Событие"></canvas><p class="count" id="evp"></p><div id="evq"></div>`);
  const cv=$('#evc'),ctx=cv.getContext('2d');const sky=Array.from({length:40},()=>[Math.random()*W,Math.random()*H,Math.random()*1.5+.4]);
  const status=()=>{const p=$('#evp');if(p)p.textContent=k==='ufo'?`Вопрос ${Math.min(asked+1,E.need)} из ${E.need} · верно ${prog}`:`${prog} из ${E.need}`};
  function nextQ(){busy=false;const t=k==='ufo'?(Math.random()<.5?bankTask(trNext(),''):oddTask()):mathTask();status();
    const long=t.opts.some(o=>String(o).length>5);
    $('#evq').innerHTML=`<p class="prompt" style="font-size:${k==='ufo'?20:30}px;margin:6px 0 10px">${t.raw?t.q:esc(t.q)}</p>
    <div class="answers ${long?'words':''}">${t.opts.map((o,i)=>`<button data-i="${i}">${esc(o)}</button>`).join('')}</div>`;
    const btns=[...$('#evq').querySelectorAll('button')];
    btns.forEach(b=>b.onclick=()=>{if(busy||!run)return;busy=true;const ok=t.opts[+b.dataset.i]===t.ans;beep(ok);b.classList.add(ok?'ok':'bad');
      if(!ok){btns.forEach(x=>{if(t.opts[+x.dataset.i]===t.ans)x.classList.add('ok')});if(E.dur)danger=Math.min(1,danger+.12)}
      if(ok)prog++;asked++;status();
      setTimeout(()=>{if(!run)return;if(k==='ufo'?asked>=E.need:prog>=E.need)end(true);else nextQ()},ok?450:1100)})}
  function draw(el){
    if(k==='hole'){ctx.fillStyle='#07071a';ctx.fillRect(0,0,W,H);
      sky.forEach(([x,y,r],i)=>{const a=el/900+i;const d=Math.hypot(x-180,y-100);const f=1-danger*.5;ctx.fillStyle='#fff';ctx.globalAlpha=.7;ctx.beginPath();ctx.arc(180+(x-180)*f+Math.cos(a)*3,100+(y-100)*f+Math.sin(a)*3,r,0,7);ctx.fill()});ctx.globalAlpha=1;
      const R=Math.max(6,16+danger*60-prog*7);
      for(let i=4;i>=1;i--){ctx.strokeStyle=`rgba(255,${120+i*25},40,${.18*i})`;ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(180,100,R+i*12,(R+i*12)*.35,el/1500+i,0,7);ctx.stroke()}
      ctx.fillStyle='#000';ctx.beginPath();ctx.arc(180,100,R,0,7);ctx.fill();
      const cx=320-danger*120;ctx.save();ctx.translate(cx,100);ctx.rotate(danger*4+Math.sin(el/200)*.2);ctx.font='34px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🐱',0,0);ctx.restore()}
    else if(k==='tsunami'){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#9fd8ff');g.addColorStop(1,'#d8f0ff');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#e9c46a';ctx.fillRect(0,170,W,30);
      const wx=30+danger*200;ctx.fillStyle='#2f6fdc';ctx.beginPath();ctx.moveTo(0,H);ctx.lineTo(0,60);ctx.quadraticCurveTo(wx-10,20+Math.sin(el/250)*6,wx+20,70);ctx.quadraticCurveTo(wx-14,64,wx-8,96);ctx.quadraticCurveTo(wx+10,150,wx+40,H);ctx.fill();
      ctx.fillStyle='#fff';ctx.globalAlpha=.7;ctx.beginPath();ctx.arc(wx+12,64,6,0,7);ctx.arc(wx-4,58,5,0,7);ctx.fill();ctx.globalAlpha=1;
      for(let r=0;r<prog;r++){for(let c=0;c<2;c++){ctx.fillStyle=(r+c)%2?'#c8664a':'#b5533a';ctx.fillRect(262+c*16,154-r*16,16,15)}}
      ctx.strokeStyle='#7a3322';ctx.lineWidth=1;ctx.strokeRect(262,170-prog*16,32,prog*16);
      ctx.font='30px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🐱',320,152)}
    else{const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#120b2b');g.addColorStop(1,'#2b2f6b');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#fff';sky.forEach(([x,y,r])=>{ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()});
      const y=56+Math.sin(el/400)*6;ctx.fillStyle='rgba(127,242,255,.18)';ctx.beginPath();ctx.moveTo(160,y+10);ctx.lineTo(200,y+10);ctx.lineTo(240,H);ctx.lineTo(120,H);ctx.fill();
      ctx.fillStyle='#9aa6bd';ctx.beginPath();ctx.ellipse(180,y,62,16,0,0,7);ctx.fill();ctx.fillStyle='#7ff2ff';ctx.beginPath();ctx.ellipse(180,y-10,26,18,0,Math.PI,0);ctx.fill();
      for(let i=0;i<E.need;i++){ctx.fillStyle=i<prog?'#39ff14':i<asked?'#ff3355':'#ffd166';ctx.beginPath();ctx.arc(150+i*30,y+4,5,0,7);ctx.fill()}
      ctx.font='30px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🐱',180,174)}}
  function frame(now){if(!run||!document.body.contains(cv))return;const dt=Math.min(50,now-last);last=now;
    if(E.dur){danger=Math.min(1,danger+dt/(E.dur*1000));if(danger>=1){draw(now-t0);end(false);return}}
    draw(now-t0);requestAnimationFrame(frame)}
  function end(win){run=false;
    if(k==='hole')win?evReward('Чёрная дыра закрыта!','Котёнок спасён и очень гордится тобой.',8,60):evReward('Ой, затянуло!','Чёрная дыра покатала котёнка по космосу и выплюнула обратно. Он вернулся с сувениром.',2,15);
    else if(k==='tsunami'){if(win){player.gifts={...player.gifts,clothes:true};evReward('Стена выдержала!','Волна разбилась о стену. В награду в сундуках ждёт подарок с одеждой.',5,50)}
      else evReward('Брызги!','Волна намочила котёнка, но он высох на солнышке.',2,15)}
    else{const all=prog===E.need;if(all)player.gifts={...player.gifts,room:true};
      evReward(all?'Пришельцы в восторге!':'Пришельцы улетели',all?'Они оставили подарочный сундук с мебелью для комнаты!':`Ты ответил верно на ${prog} из ${E.need}. Пришельцы оставили звёзды.`,prog*3,prog*15)}}
  nextQ();requestAnimationFrame(frame)}
