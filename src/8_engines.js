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
    const optHTML=(o,k)=>`<button data-i="${k}">${t.optStyle?`<span style="display:inline-block;${t.optStyle[k]}">${esc(o)}</span>`:esc(o)}</button>`;
    app.innerHTML=`<section class="sheet">${head()}
    ${t.label?`<p class="daypart">${t.label}</p>`:''}
    ${t.svg?t.svg:t.q?`<div class="q ${t.cls||''}">${t.raw?t.q:esc(t.q)}</div>`:''}<p class="hint" id="hint">${t.hint}</p>
    <div class="answers ${cls}" ${t.tap?`style="--cols:${t.tap}"`:''}>${t.opts.map(optHTML).join('')}</div></section>`;
    $('#back').onclick=menu;
    let locked=false;const btns=[...app.querySelectorAll('.answers button')];
    btns.forEach(b=>b.onclick=()=>{if(locked)return;locked=true;
      if(!started){started=true;if(g.timed)startTimer()}
      const isAns=x=>t.ansIdx!=null?+x.dataset.i===t.ansIdx:t.opts[+x.dataset.i]===t.ans;const ok=isAns(b);beep(ok);b.classList.add(ok?'ok':'bad');
      if(!ok)btns.forEach(x=>{if(isAns(x))x.classList.add('ok')});
      if(t.why&&!g.timed){const h=$('#hint');h.textContent=t.why;h.classList.add('why')}
      res[i]=ok?'ok':'bad';if(ok)score++;i++;
      const tm=$('#tm');if(tm)tm.textContent=`⏱ ${timeLeft} · ${score}`;
      if(g.timed){setTimeout(()=>{if(alive()&&timeLeft>0)step()},ok?300:900);return}
      const h=$('#hint');if(!t.why){h.textContent=ok?pick(['Правильно!','Верно!','Молодец!','Точно!']):(t.ansLabel||`Правильный ответ: ${t.ans}`);h.classList.add('why')}
      const nx=document.createElement('div');nx.className='btns';nx.innerHTML=`<button class="btn" id="next">${i>=10?'Посмотреть результат':'Дальше →'}</button>`;
      app.querySelector('.sheet').appendChild(nx);const nb=$('#next');nb.onclick=()=>{if(alive())step()};nb.focus({preventScroll:true})});
    if(!t.tap&&btns[0])btns[0].focus({preventScroll:true})}
  function startTimer(){timerId=setInterval(()=>{timeLeft--;const tm=$('#tm');if(tm)tm.textContent=`⏱ ${timeLeft} · ${score}`;if(timeLeft<=0){stopTimer();finish()}},1000)}
  function finish(){if(!alive())return;screen='result';
    if(g.tourney){const today=dayKey();const first=player.tDate!==today;if(first){player.tDate=today;player.tClass=level;player.tScore=score}
      const st=Math.floor(score/5);const info=record(key,st,score*10+10,null);
      resultScreen(`${score} ${plural(score,['пример','примера','примеров'])}`,st,first?'Результат записан в турнир дня':'Сегодня ты уже участвовал, результат не засчитан',null,info,
        `<div class="btns"><button class="btn" id="toT">Таблица турнира</button></div>`);const tt=$('#toT');if(tt)tt.onclick=()=>tourneyScreen(level);return}
    const st=g.hard?Math.floor(score/2):Math.floor(score/3);
    const xp=score*(g.hard?20:10)+10;const info=record(key,st,xp,score,false);
    const msg=score===10?'Отлично!':score>=7?'Молодец!':score>=4?'Хорошо, тренируйся ещё':'Попробуй ещё раз';
    resultScreen(`${score} из 10`,st,msg,()=>quiz(key),info)}
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

/* ===== Запуск ===== */
initStore().then(()=>{renderMe();player?menu():login()});
