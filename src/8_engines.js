/* ===== Движок вопросов ===== */
const lvlTag=g=>g.levels?` <span class="tag">· ${level} класс</span>`:'';
function quiz(key){screen='quiz';stopTimer();const g=GAMES[key];let i=0,score=0,res=[],started=false,timeLeft=g.timed||0;const stamp=Symbol();quiz.cur=stamp;
  const alive=()=>quiz.cur===stamp&&screen==='quiz';
  function head(){return `<div class="top">${backBtn()}<h2>${g.title}${lvlTag(g)}</h2>
    ${g.timed?`<span class="timer" id="tm">⏱ ${timeLeft} · ${score}</span>`:`<div class="progress">${Array.from({length:10},(_,k)=>`<i class="${res[k]||''}"></i>`).join('')}</div>`}</div>`}
  function step(){if(!alive())return;if(!g.timed&&i>=10)return finish();
    const t=g.gen();
    if(t.pre){app.innerHTML=`<section class="sheet">${head()}<p class="hint" style="margin-top:18px">Запомни!</p>${t.pre}<p class="count" id="cd"></p></section>`;$('#back').onclick=menu;
      let left=Math.ceil(t.preMs/1000);const cd=$('#cd');cd.textContent=left;const iv=setInterval(()=>{left--;if(!alive()){clearInterval(iv);return}cd.textContent=left>0?left:''},1000);
      setTimeout(()=>{clearInterval(iv);if(alive())show(t)},t.preMs);return}
    show(t)}
  function show(t){
    const longest=Math.max(...t.opts.map(o=>String(o).length));
    let cls=t.tap?'tap':(t.opts.length===3?'three ':'')+(longest>14?'words':longest>5?'words short':'');
    const optHTML=(o,k)=>`<button data-i="${k}">${t.swatch&&COLORS[o]?`<span class="sw" style="background:${COLORS[o]}"></span>`:''}${esc(o)}</button>`;
    app.innerHTML=`<section class="sheet">${head()}
    ${t.label?`<p class="daypart">${t.label}</p>`:''}
    ${t.svg?t.svg:t.q?`<div class="q ${t.cls||''}">${t.raw?t.q:esc(t.q)}</div>`:''}<p class="hint" id="hint">${t.hint}</p>
    <div class="answers ${cls}" ${t.tap?`style="--cols:${t.tap}"`:''}>${t.opts.map(optHTML).join('')}</div></section>`;
    $('#back').onclick=menu;
    let locked=false;const btns=[...app.querySelectorAll('.answers button')];
    btns.forEach(b=>b.onclick=()=>{if(locked)return;locked=true;
      if(!started){started=true;if(g.timed)startTimer()}
      const ok=t.opts[+b.dataset.i]===t.ans;beep(ok);b.classList.add(ok?'ok':'bad');
      if(!ok)btns.forEach(x=>{if(t.opts[+x.dataset.i]===t.ans)x.classList.add('ok')});
      if(t.why&&!g.timed){const h=$('#hint');h.textContent=t.why;h.classList.add('why')}
      res[i]=ok?'ok':'bad';if(ok)score++;i++;
      const tm=$('#tm');if(tm)tm.textContent=`⏱ ${timeLeft} · ${score}`;
      if(g.timed){setTimeout(()=>{if(alive()&&timeLeft>0)step()},ok?300:900);return}
      const h=$('#hint');if(!t.why){h.textContent=ok?pick(['Правильно!','Верно!','Молодец!','Точно!']):`Правильный ответ: ${t.ans}`;h.classList.add('why')}
      const nx=document.createElement('div');nx.className='btns';nx.innerHTML=`<button class="btn" id="next">${i>=10?'Посмотреть результат':'Дальше →'}</button>`;
      app.querySelector('.sheet').appendChild(nx);const nb=$('#next');nb.onclick=()=>{if(alive())step()};nb.focus({preventScroll:true})});
    if(!t.tap&&btns[0])btns[0].focus({preventScroll:true})}
  function startTimer(){timerId=setInterval(()=>{timeLeft--;const tm=$('#tm');if(tm)tm.textContent=`⏱ ${timeLeft} · ${score}`;if(timeLeft<=0){stopTimer();finish()}},1000)}
  function finish(){if(!alive())return;screen='result';
    const st=g.timed?Math.floor(score/5):g.hard?Math.floor(score/2):Math.floor(score/3);
    const xp=score*(g.hard?20:10)+10;const info=record(key,st,xp,score,false);
    const msg=g.timed?(score>=20?'Молниеносно!':score>=10?'Быстро считаешь!':'Тренируйся, и будет быстрее'):score===10?'Отлично!':score>=7?'Молодец!':score>=4?'Хорошо, тренируйся ещё':'Попробуй ещё раз';
    resultScreen(g.timed?`${score} ${plural(score,['пример','примера','примеров'])}`:`${score} из 10`,st,msg,()=>quiz(key),info)}
  step()}

/* ===== Память ===== */
function memory(){screen='mem';stopTimer();const pairs=[6,8,10,12][level-1];
  const set=shuffle(['🐶','🐱','🦊','🐸','🐻','🐼','🐰','🦁','🐯','🐨','🐷','🐵']).slice(0,pairs);
  const cards=shuffle([...set,...set]);const cols=pairs<=8?4:pairs===10?5:6;let open=[],moves=0,done=0;
  app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>Память${lvlTag(GAMES.mem)}</h2><span id="mv">Ходов: 0</span></div>
  <p class="hint" style="margin-top:12px">Открывай по две карточки и запоминай, где кто спрятался</p>
  <div class="mem" style="--cols:${cols}">${cards.map((c,k)=>`<button aria-label="Карточка ${k+1}">${c}</button>`).join('')}</div></section>`;
  $('#back').onclick=menu;
  app.querySelectorAll('.mem button').forEach(b=>b.onclick=()=>{
    if(open.length===2||b.classList.contains('open')||b.classList.contains('done'))return;
    b.classList.add('open');open.push(b);
    if(open.length===2){moves++;$('#mv').textContent='Ходов: '+moves;const [a,c]=open;
      if(a.textContent===c.textContent){beep(true);setTimeout(()=>{a.className=c.className='done';open=[];done++;if(done===pairs&&screen==='mem')finishMem()},400)}
      else setTimeout(()=>{a.classList.remove('open');c.classList.remove('open');open=[]},900)}});
  function finishMem(){screen='result';const st=moves<=pairs*1.5?3:moves<=pairs*2.3?2:1;const info=record('mem',st,20+pairs*5,moves,true,'mem'+level);
    resultScreen('Все пары!',st,`Ты справился за ${moves} ${plural(moves,['ход','хода','ходов'])}`,memory,info)}}

/* ===== Таблица Шульте ===== */
function schulte(){screen='schulte';stopTimer();const n=[3,4,5,5][level-1],N=n*n;const nums=shuffle(Array.from({length:N},(_,i)=>i+1));
  const tint=['#e63946','#2f6fdc','#2e9e5b','#7a4fd6','#f77f00'];let next=1,t0=null;
  app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>Таблица Шульте${lvlTag(GAMES.schulte)}</h2><span class="timer" id="tm">⏱ 0</span></div>
  <p class="hint" style="margin-top:12px">Нажимай числа по порядку: <b id="nx">1</b> из ${N}</p>
  <div class="schulte" style="--n:${n}">${nums.map(v=>`<button data-v="${v}" style="${level===4?`color:${pick(tint)};font-size:${rnd(18,34)}px`:''}">${v}</button>`).join('')}</div></section>`;
  $('#back').onclick=menu;
  app.querySelectorAll('.schulte button').forEach(b=>b.onclick=()=>{const v=+b.dataset.v;if(b.classList.contains('done'))return;
    if(!t0){t0=Date.now();timerId=setInterval(()=>{const tm=$('#tm');if(tm)tm.textContent='⏱ '+Math.floor((Date.now()-t0)/1000)},250)}
    if(v===next){b.classList.add('done');tone(500+next*12,0,.08);next++;$('#nx').textContent=Math.min(next,N);if(next>N)finish()}
    else{b.classList.remove('bad');void b.offsetWidth;b.classList.add('bad');tone(200,0,.15,'square',.05)}});
  function finish(){stopTimer();screen='result';const s=Math.round((Date.now()-t0)/1000);const [a,b]=[[10,18],[25,40],[45,70],[55,85]][level-1];
    const st=s<=a?3:s<=b?2:1;const info=record('schulte',st,20+N*2,s,true,'schulte'+level);const old=player.best['schulte'+level];
    resultScreen(`${s} ${plural(s,['секунда','секунды','секунд'])}`,st,old===s?'Это твой рекорд!':`Твой рекорд: ${old} с`,schulte,info)}}

/* ===== Творческие задания ===== */
function creative(key){screen='creative';stopTimer();const g=GAMES[key];const total=5;let round=0;let wait=null;
  function prompt(){if(key==='tale'){const w=shuffle(TALE_WORDS).slice(0,[2,3,3,4][level-1]);return `Сочини историю, в которой есть: ${w.join(', ')}`}return pick(INVENT)}
  function step(){clearInterval(wait);if(screen!=='creative')return;if(round>=total)return finish();const p=prompt();let left=15;
    app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>${g.title}${lvlTag(g)}</h2><div class="progress">${Array.from({length:total},(_,k)=>`<i class="${k<round?'ok':''}"></i>`).join('')}</div></div>
    <p class="prompt">${esc(p)}</p><p class="hint">Подумай и расскажи вслух маме, папе или другу. Можно записать или нарисовать в тетради.</p>
    <div class="btns"><button class="btn" id="done" disabled>Подумай ещё ${left} с</button><button class="btn alt" id="other">Другое задание</button></div></section>`;
    $('#back').onclick=()=>{clearInterval(wait);menu()};
    const d=$('#done');wait=setInterval(()=>{left--;if(!document.body.contains(d)){clearInterval(wait);return}if(left<=0){clearInterval(wait);d.disabled=false;d.textContent='Готово, придумал(а)!'}else d.textContent=`Подумай ещё ${left} с`},1000);
    d.onclick=()=>{if(d.disabled)return;beep(true);round++;step()};$('#other').onclick=step}
  function finish(){screen='result';const info=record(key,2,60,null);resultScreen('Ты молодец!',2,'Пять идей придумано',()=>creative(key),info)}
  step()}

/* ===== Рисовалка ===== */
function drawGame(){screen='draw';stopTimer();const theme=pick(DRAW_THEMES);const scribble=theme.startsWith('Дорисуй');
  const COLS=['#1d2433','#e63946','#f77f00','#f5c518','#2e9e5b','#2f6fdc','#7a4fd6','#ff8fab','#8b5a2b','#ffffff'];let color=COLS[0],size=6,points=0;
  app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>Дорисуй</h2></div><p class="prompt">${esc(theme)}</p>
  <div class="draw"><canvas id="cv" width="480" height="360" aria-label="Холст для рисования"></canvas>
  <div class="tools" role="group" aria-label="Цвета">${COLS.map((c,i)=>`<button data-c="${c}" aria-label="${i===COLS.length-1?'Ластик':'Цвет'}" aria-pressed="${i===0}" style="background:${c}"></button>`).join('')}</div>
  <div class="tools" role="group" aria-label="Толщина">${[['Тонко',3],['Средне',6],['Толсто',14]].map(([n,s])=>`<button class="size" data-z="${s}" aria-pressed="${s===6}">${n}</button>`).join('')}</div>
  <p class="err" id="derr"></p><div class="btns"><button class="btn" id="dDone">Готово!</button><button class="btn alt" id="dClear">Очистить</button><button class="btn alt" id="dNew">Другая тема</button></div></div></section>`;
  $('#back').onclick=menu;
  const cv=$('#cv'),ctx=cv.getContext('2d');
  const reset=()=>{ctx.fillStyle='#fff';ctx.fillRect(0,0,480,360);points=0;
    if(scribble){ctx.strokeStyle='#9aa0ab';ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();let x=rnd(140,340),y=rnd(110,250);ctx.moveTo(x,y);
      for(let i=0;i<3;i++){const x2=rnd(100,380),y2=rnd(80,280);ctx.bezierCurveTo(rnd(60,420),rnd(60,300),rnd(60,420),rnd(60,300),x2,y2)}ctx.stroke()}};
  reset();
  let drawing=false,last=null;const pos=e=>{const r=cv.getBoundingClientRect();return [(e.clientX-r.left)*480/r.width,(e.clientY-r.top)*360/r.height]};
  cv.onpointerdown=e=>{drawing=true;last=pos(e);try{cv.setPointerCapture(e.pointerId)}catch(_){}ctx.fillStyle=color;ctx.beginPath();ctx.arc(last[0],last[1],size/2,0,7);ctx.fill();points++};
  cv.onpointermove=e=>{if(!drawing)return;const p=pos(e);ctx.strokeStyle=color;ctx.lineWidth=size;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(last[0],last[1]);ctx.lineTo(p[0],p[1]);ctx.stroke();last=p;points++};
  cv.onpointerup=cv.onpointercancel=()=>{drawing=false};
  app.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{color=b.dataset.c;app.querySelectorAll('[data-c]').forEach(x=>x.setAttribute('aria-pressed',x===b))});
  app.querySelectorAll('[data-z]').forEach(b=>b.onclick=()=>{size=+b.dataset.z;app.querySelectorAll('[data-z]').forEach(x=>x.setAttribute('aria-pressed',x===b))});
  $('#dClear').onclick=reset;$('#dNew').onclick=drawGame;
  $('#dDone').onclick=async()=>{if(points<60){$('#derr').textContent='Нарисуй ещё немножко, картина пока пустая';return}
    const small=document.createElement('canvas');small.width=240;small.height=180;small.getContext('2d').drawImage(cv,0,0,240,180);
    let url='';try{url=small.toDataURL('image/jpeg',.72)}catch(e){}
    if(url)await saveArt(url);screen='result';const info=record('draw',2,50,null);
    resultScreen('Красивая картина!',2,url?'Рисунок теперь висит в комнате котёнка':'Рисунок готов',drawGame,info)}}

/* ===== Запуск ===== */
initStore().then(()=>{renderMe();player?menu():login()});
