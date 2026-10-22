/* ===== Игры с котёнком: в каждой играет котёнок игрока ===== */
const CAT_GAMES={
 bowling:{eff:{fun:20,sport:10},rule:Lx("Нажми, когда стрелка смотрит на кегли. 5 бросков.","Tap when the arrow points at the pins. 5 throws.")},
 basket:{eff:{sport:25,fun:5},rule:Lx("Кольцо двигается. Нажми, чтобы бросить мяч вверх. 10 бросков.","The hoop moves. Tap to throw the ball up. 10 throws.")},
 penalty:{eff:{sport:20,fun:10},rule:Lx("Нажми в ворота туда, куда бить. Вратарь бегает! 8 ударов.","Tap the spot in the goal where you want to shoot. The keeper moves! 8 kicks.")},
 fishing:{eff:{fun:20,food:10},rule:Lx("Нажми на воду над рыбкой, чтобы опустить крючок. Золотая рыбка — 3 очка. 30 секунд.","Tap the water above a fish to drop the hook. A golden fish is worth 3 points. 30 seconds.")},
 laser:{eff:{fun:25,sport:5},rule:Lx("Нажимай на красную точку, и котёнок прыгнет за ней. 20 секунд.","Tap the red dot and your kitten will pounce on it. 20 seconds.")},
 jump:{eff:{sport:25,fun:5},rule:Lx("Нажимай, чтобы котёнок перепрыгивал препятствия. 3 жизни, 40 секунд.","Tap to make your kitten jump over obstacles. 3 lives, 40 seconds.")}};

const GAME_IMPL={
 bowling(ctx,cat,W,H,st){const P=[[0,0],[-1,1],[1,1],[-2,2],[0,2],[2,2],[-3,3],[-1,3],[1,3],[3,3]];let pins,throws=0,phase='aim',ang=0,ball=null,msg='',msgT=0,before=0,wait=0;
  const reset=()=>{pins=P.map(([c,r])=>({x:180+c*15,y:140-r*18,down:false,vx:0,vy:0,a:0}))};reset();
  return {label:()=>`${Lx("Бросок","Throw")} ${Math.min(throws+1,5)}/5 · ${st.score}`,stars:s=>Math.floor(s/12),result:s=>`${s} ${plural(s,[Lx("кегля","pin"),Lx("кегли","pins"),Lx("кеглей","pins")])}`,
   update(dt,el,tap){
    if(phase==='aim'){ang=Math.sin(el/380)*.42;if(tap){ball={x:180,y:420,vx:Math.sin(ang)*6.5,vy:-Math.cos(ang)*6.5};phase='roll';before=pins.filter(p=>p.down).length;tone(140,0,.4,'sine',.08)}}
    else if(phase==='roll'){ball.x+=ball.vx*dt/16;ball.y+=ball.vy*dt/16;if(ball.x<110||ball.x>250)ball.vx=0;
      pins.forEach(p=>{if(!p.down&&Math.hypot(p.x-ball.x,p.y-ball.y)<22){p.down=true;p.vx=(p.x-ball.x)*.18+ball.vx*.3;p.vy=-2.5;tone(300+Math.random()*200,0,.08,'triangle',.06)}});
      if(ball.y<30){phase='wait';wait=1300;const n=pins.filter(p=>p.down).length-before;st.score+=n;msg=n===10?Lx("СТРАЙК!","STRIKE!"):n===0?Lx("Мимо!","Miss!"):`${n} ${plural(n,[Lx("кегля","pin"),Lx("кегли","pins"),Lx("кеглей","pins")])}`;msgT=1300;throws++}}
    else{wait-=dt;if(wait<=0){if(throws>=5)return true;reset();phase='aim';ball=null}}
    pins.forEach(p=>{if(p.down&&(p.vx||p.vy)){p.x+=p.vx*dt/16;p.y+=p.vy*dt/16;p.a+=p.vx*.05;p.vx*=.95;p.vy*=.95;
      pins.forEach(q=>{if(!q.down&&q!==p&&Math.hypot(p.x-q.x,p.y-q.y)<15&&Math.random()<.85){q.down=true;q.vx=(q.x-p.x)*.2;q.vy=-1.5}});if(Math.abs(p.vx)<.05&&Math.abs(p.vy)<.05)p.vx=p.vy=0}});
    ctx.fillStyle='#3b2a6b';ctx.fillRect(0,0,W,H);ctx.fillStyle='#d9a066';ctx.beginPath();ctx.moveTo(120,20);ctx.lineTo(240,20);ctx.lineTo(300,H);ctx.lineTo(60,H);ctx.fill();
    ctx.strokeStyle='rgba(122,74,29,.35)';ctx.lineWidth=2;for(let i=1;i<8;i++){ctx.beginPath();ctx.moveTo(120+i*15,20);ctx.lineTo(60+i*30,H);ctx.stroke()}
    ctx.fillStyle='#2b1d4a';ctx.beginPath();ctx.moveTo(110,20);ctx.lineTo(120,20);ctx.lineTo(60,H);ctx.lineTo(40,H);ctx.fill();ctx.beginPath();ctx.moveTo(240,20);ctx.lineTo(250,20);ctx.lineTo(320,H);ctx.lineTo(300,H);ctx.fill();
    pins.forEach(p=>{ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.down?p.a+1.2:0);ctx.globalAlpha=p.down?.6:1;ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(0,0,6,12,0,0,7);ctx.fill();ctx.fillStyle='#e63946';ctx.fillRect(-6,-5,12,3);ctx.restore()});
    if(phase==='aim'){ctx.strokeStyle='#ffd166';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(180,420);ctx.lineTo(180+Math.sin(ang)*90,420-Math.cos(ang)*90);ctx.stroke();ctx.fillStyle='#1d3557';ctx.beginPath();ctx.arc(180,420,14,0,7);ctx.fill()}
    if(ball){ctx.fillStyle='#1d3557';ctx.beginPath();ctx.arc(ball.x,ball.y,Math.max(6,14*(ball.y/420)+4),0,7);ctx.fill()}
    drawCatImg(ctx,cat,80,H-4,92,phase==='roll'?-.15:0);
    if(msgT>0){msgT-=dt;ctx.fillStyle='#ffd166';ctx.font='bold 34px Nunito, sans-serif';ctx.textAlign='center';ctx.fillText(msg,180,250)}
    return false}}},
 basket(ctx,cat,W,H,st){let hoop={x:180,d:1},ball=null,shots=0,msg='',msgT=0,wait=0;
  return {label:()=>`${Lx("Бросок","Throw")} ${Math.min(shots+1,10)}/10 · ${st.score}`,stars:s=>Math.floor(s/3),result:s=>`${s} ${plural(s,[Lx("попадание","hit"),Lx("попадания","hits"),Lx("попаданий","hits")])}`,
   update(dt,el,tap){const sp=(1.4+st.score*.18)*dt/16;hoop.x+=hoop.d*sp;if(hoop.x>300||hoop.x<60)hoop.d*=-1;const cx=180+Math.sin(el/900)*90;
    if(!ball&&wait<=0&&tap&&shots<10){ball={x:cx,y:380,vy:-14.2,prevY:380,scored:false};shots++;tone(400,0,.1)}
    if(ball){ball.prevY=ball.y;ball.y+=ball.vy*dt/16;ball.vy+=.3*dt/16;
      if(!ball.scored&&ball.vy>0&&ball.prevY<100&&ball.y>=100){if(Math.abs(ball.x-hoop.x)<22){ball.scored=true;st.score++;msg=Lx("Точно!","Exactly!");fanfare()}else{msg=Lx("Мимо","Miss");tone(200,0,.15,'square',.05)}msgT=900}
      if(ball.y>H+20){ball=null;wait=300;if(shots>=10)return true}}
    wait-=dt;
    ctx.fillStyle=grad(ctx,H,'#ffcf99','#f4a261');ctx.fillRect(0,0,W,H);ctx.fillStyle='#c46a28';ctx.fillRect(0,420,W,60);ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(180,480,70,Math.PI,0);ctx.stroke();
    ctx.fillStyle='#fff';ctx.fillRect(hoop.x-36,40,72,50);ctx.strokeStyle='#e63946';ctx.lineWidth=3;ctx.strokeRect(hoop.x-36,40,72,50);ctx.strokeRect(hoop.x-14,58,28,22);
    ctx.strokeStyle='#ff6b35';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(hoop.x,100,24,6,0,0,7);ctx.stroke();ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=1.5;for(let i=-3;i<=3;i++){ctx.beginPath();ctx.moveTo(hoop.x+i*7,102);ctx.lineTo(hoop.x+i*4,128);ctx.stroke()}
    drawCatImg(ctx,cat,cx,H-30,90);
    if(ball){ctx.fillStyle='#f77f00';ctx.beginPath();ctx.arc(ball.x,ball.y,13,0,7);ctx.fill();ctx.strokeStyle='#6b3d1f';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(ball.x-13,ball.y);ctx.lineTo(ball.x+13,ball.y);ctx.moveTo(ball.x,ball.y-13);ctx.lineTo(ball.x,ball.y+13);ctx.stroke()}
    else if(shots<10){ctx.fillStyle='#f77f00';ctx.beginPath();ctx.arc(cx+30,H-90,12,0,7);ctx.fill()}
    if(msgT>0){msgT-=dt;ctx.fillStyle='#1f3a8a';ctx.font='bold 30px Nunito, sans-serif';ctx.textAlign='center';ctx.fillText(msg,180,250)}
    return false}}},
 penalty(ctx,cat,W,H,st){let keeper={x:180,t:180},kicks=0,ball=null,msg='',msgT=0,wait=0,nextT=0;
  return {label:()=>`${Lx("Удар","Kick")} ${Math.min(kicks+1,8)}/8 · ${st.score}`,stars:s=>Math.floor(s/2),result:s=>`${s} ${plural(s,[Lx("гол","goal"),Lx("гола","goals"),Lx("голов","goals")])}`,
   update(dt,el,tap){nextT-=dt;if(nextT<=0){keeper.t=rnd(80,280);nextT=rnd(400,800)}keeper.x+=clamp(keeper.t-keeper.x,-1,1)*(2.2+kicks*.25)*dt/16;
    if(!ball&&wait<=0&&tap&&kicks<8&&tap[1]<220&&tap[0]>60&&tap[0]<300){ball={sx:180,sy:420,tx:tap[0],ty:clamp(tap[1],70,165),t:0};kicks++;tone(200,0,.1,'triangle')}
    if(ball){ball.t+=dt/500;if(ball.t>=1&&!ball.done){ball.done=true;if(Math.abs(keeper.x-ball.tx)<38){msg=Lx("Вратарь поймал!","Saved by the keeper!");tone(200,0,.2,'square',.05)}else{st.score++;msg=Lx("ГОЛ!","GOAL!");fanfare()}msgT=1000;wait=1100}
      if(ball.done){wait-=dt;if(wait<=0){ball=null;if(kicks>=8)return true}}}
    ctx.fillStyle='#4caf50';ctx.fillRect(0,0,W,H);ctx.fillStyle='#43a047';for(let i=0;i<8;i++)ctx.fillRect(0,i*60,W,30);
    ctx.strokeStyle='#fff';ctx.lineWidth=4;ctx.strokeRect(60,60,240,110);ctx.lineWidth=1;for(let i=0;i<12;i++){ctx.beginPath();ctx.moveTo(60+i*20,60);ctx.lineTo(60+i*20,170);ctx.stroke()}for(let j=0;j<6;j++){ctx.beginPath();ctx.moveTo(60,60+j*20);ctx.lineTo(300,60+j*20);ctx.stroke()}
    ctx.lineWidth=3;ctx.strokeRect(30,170,300,0);ctx.fillStyle='#ff8c1a';ctx.fillRect(keeper.x-22,100,44,60);ctx.fillStyle='#f3d9b1';ctx.beginPath();ctx.arc(keeper.x,90,14,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(keeper.x-38,104,16,12);ctx.fillRect(keeper.x+22,104,16,12);
    if(ball){const t=Math.min(1,ball.t),x=ball.sx+(ball.tx-ball.sx)*t,y=ball.sy+(ball.ty-ball.sy)*t-Math.sin(t*Math.PI)*40;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,14-t*6,0,7);ctx.fill();ctx.fillStyle='#222';ctx.beginPath();ctx.arc(x,y,4-t*2,0,7);ctx.fill()}
    else if(kicks<8){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(180,420,14,0,7);ctx.fill();ctx.fillStyle='#222';ctx.beginPath();ctx.arc(180,420,4,0,7);ctx.fill()}
    drawCatImg(ctx,cat,110,H-4,90,ball&&ball.t<.3?.2:0);
    if(msgT>0){msgT-=dt;ctx.fillStyle='#fff';ctx.font='bold 32px Nunito, sans-serif';ctx.textAlign='center';ctx.fillText(msg,180,260)}
    return false}}},
 fishing(ctx,cat,W,H,st){let fish=[],hook=null,spawn=0;const DUR=30000;
  return {label:()=>`${st.score} · ${Math.max(0,Math.ceil((DUR-(st.el||0))/1000))} ${Lx("с","s")}`,stars:s=>Math.floor(s/3),result:s=>`${s} ${plural(s,[Lx("очко","point"),Lx("очка","points"),Lx("очков","points")])}`,
   update(dt,el,tap){st.el=el;spawn-=dt;if(spawn<=0&&el<DUR){spawn=rnd(600,1000);const left=Math.random()<.5,gold=Math.random()<.15;fish.push({x:left?-30:W+30,y:rnd(220,450),vx:(left?1:-1)*(1+Math.random()*1.6+(gold?1:0)),gold})}
    fish.forEach(f=>f.x+=f.vx*dt/16);fish=fish.filter(f=>f.x>-50&&f.x<W+50);
    if(!hook&&tap&&tap[1]>150&&el<DUR){hook={x:tap[0],y:160,d:1};tone(500,0,.06)}
    if(hook){hook.y+=hook.d*7*dt/16;if(hook.d>0){const f=fish.find(f=>Math.abs(f.x-hook.x)<24&&Math.abs(f.y-hook.y)<16);if(f){fish=fish.filter(x=>x!==f);st.score+=f.gold?3:1;hook.d=-1;hook.got=f;fanfare()}if(hook.y>470)hook.d=-1}
      else if(hook.y<=160)hook=null}
    ctx.fillStyle=grad(ctx,180,'#bfe3ff','#e0f4ff');ctx.fillRect(0,0,W,180);ctx.fillStyle=grad(ctx,H,'#2f8fdc','#0b3d6e',180);ctx.fillRect(0,180,W,H-180);
    ctx.strokeStyle='rgba(255,255,255,.4)';ctx.lineWidth=2;for(let i=0;i<W;i+=30){ctx.beginPath();ctx.arc(i+(el/60%30),180,12,0,Math.PI);ctx.stroke()}
    ctx.fillStyle='#8b5a2b';ctx.fillRect(0,150,150,14);ctx.fillRect(20,164,10,40);ctx.fillRect(120,164,10,40);
    drawCatImg(ctx,cat,70,152,80);ctx.strokeStyle='#5c3a17';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(100,110);ctx.lineTo(hook?hook.x:170,60);ctx.stroke();
    ctx.strokeStyle='#eee';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(hook?hook.x:170,60);ctx.lineTo(hook?hook.x:170,hook?hook.y:170);ctx.stroke();
    if(hook){ctx.strokeStyle='#999';ctx.lineWidth=2;ctx.beginPath();ctx.arc(hook.x,hook.y,6,0,Math.PI);ctx.stroke();if(hook.got)emo(ctx,hook.got.gold?'🐠':'🐟',hook.x,hook.y+12,26,Math.PI/2)}
    fish.forEach(f=>{ctx.save();ctx.translate(f.x,f.y);if(f.vx>0)ctx.scale(-1,1);emo(ctx,f.gold?'🐠':'🐟',0,0,f.gold?30:26);ctx.restore()});
    return el>=DUR&&!hook}}},
 laser(ctx,cat,W,H,st){let dot={x:180,y:200,tx:180,ty:200},cx=180,cy=400,jump=0,missT=0;const DUR=20000;
  return {label:()=>`${st.score} · ${Math.max(0,Math.ceil((DUR-(st.el||0))/1000))} ${Lx("с","s")}`,stars:s=>Math.floor(s/5),result:s=>`${s} ${plural(s,[Lx("прыжок","jump"),Lx("прыжка","jumps"),Lx("прыжков","jumps")])}`,
   update(dt,el,tap){st.el=el;if(Math.hypot(dot.tx-dot.x,dot.ty-dot.y)<5){dot.tx=rnd(40,320);dot.ty=rnd(60,420)}const sp=(1.5+st.score*.12)*dt/16;const d=Math.hypot(dot.tx-dot.x,dot.ty-dot.y)||1;dot.x+=(dot.tx-dot.x)/d*sp;dot.y+=(dot.ty-dot.y)/d*sp;
    const r=Math.max(10,18-st.score*.4);
    if(tap){if(Math.hypot(tap[0]-dot.x,tap[1]-dot.y)<r+14){st.score++;jump=1;cx=dot.x;cy=Math.min(470,dot.y+60);tone(800,0,.08,'triangle');dot.x=rnd(40,320);dot.y=rnd(60,420);dot.tx=dot.x;dot.ty=dot.y}else missT=300}
    jump=Math.max(0,jump-dt/400);missT-=dt;
    ctx.fillStyle='#f3e6d3';ctx.fillRect(0,0,W,H);ctx.fillStyle='#c89566';ctx.fillRect(0,380,W,100);
    drawCatImg(ctx,cat,cx,cy-jump*40,80,Math.sin(el/120)*.08);
    ctx.fillStyle='rgba(255,0,0,.25)';ctx.beginPath();ctx.arc(dot.x,dot.y,r+8,0,7);ctx.fill();ctx.fillStyle='#ff1f3d';ctx.beginPath();ctx.arc(dot.x,dot.y,r*.55,0,7);ctx.fill();
    if(missT>0){ctx.fillStyle='#d62839';ctx.font='bold 22px Nunito, sans-serif';ctx.textAlign='center';ctx.fillText(Lx("Мимо!","Miss!"),180,40)}
    return el>=DUR}}},
 jump(ctx,cat,W,H,st){let y=0,vy=0,obs=[],spawn=800,lives=3,hurt=0;const G=420,DUR=40000;
  return {label:()=>`${'❤️'.repeat(lives)} · ${st.score}`,stars:s=>Math.floor(s/4),result:s=>`${s} ${plural(s,[Lx("прыжок","jump"),Lx("прыжка","jumps"),Lx("прыжков","jumps")])}`,
   update(dt,el,tap){if(tap&&y>=0){vy=-12.5;tone(520,0,.08)}vy+=.6*dt/16;y=Math.min(0,y+vy*dt/16);if(y>=0)vy=0;
    spawn-=dt;if(spawn<=0){spawn=rnd(900,1500)-Math.min(500,el/60);obs.push({x:W+30,e:pick(['📦','🧶','🪴','🧸']),passed:false})}
    const sp=(4+el/9000)*dt/16;obs.forEach(o=>o.x-=sp);
    obs.forEach(o=>{if(!o.hit&&Math.abs(o.x-80)<30&&y>-36){o.hit=true;lives--;hurt=700;tone(160,0,.3,'square',.06)}if(!o.passed&&o.x<50){o.passed=true;if(!o.hit){st.score++;tone(700,0,.05,'triangle',.05)}}});
    obs=obs.filter(o=>o.x>-40);hurt-=dt;
    ctx.fillStyle=grad(ctx,H,'#9fd8ff','#e0f4ff');ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';[[60,80],[220,60],[300,120]].forEach(([x,yy])=>{const xx=(x-el/30)%420+420;ctx.beginPath();ctx.ellipse(xx%420-30,yy,30,12,0,0,7);ctx.fill()});
    ctx.fillStyle='#7cc35e';ctx.fillRect(0,G,W,H-G);ctx.fillStyle='#5aa33f';for(let i=0;i<W+40;i+=40)ctx.fillRect((i-el/8)%(W+40)+(i-el/8<0?W+40:0)-20,G,20,6);
    obs.forEach(o=>emo(ctx,o.e,o.x,G-18,36));
    if(!(hurt>0&&Math.floor(el/100)%2))drawCatImg(ctx,cat,80,G+4+y,76,y<0?-.2:0);
    return lives<=0||el>=DUR}}}};

async function catGame(key){screen='cg';stopTimer();const g=GAMES[key],C=CAT_GAMES[key];const stamp=Symbol();catGame.cur=stamp;
  app.innerHTML=`<section class="sheet"><div class="top">${backBtn()}<h2>${g.ic} ${g.title}</h2><span class="timer" id="cgS"></span></div><p class="hint">${C.rule}</p>
  <div class="draw"><canvas id="cgc" width="360" height="480" aria-label="${Lx("Игровое поле","Game field")}" style="cursor:pointer"></canvas></div></section>`;
  $('#back').onclick=menu;
  const cat=await svgImage(catSVG(player.cat,'happy'));const cv=$('#cgc');if(!cv||catGame.cur!==stamp)return;const ctx=cv.getContext('2d');const W=360,H=480;
  const alive=()=>catGame.cur===stamp&&screen==='cg'&&document.body.contains(cv);
  const st={score:0};let tap=null;cv.onpointerdown=e=>{e.preventDefault();tap=evPoint(cv,e,W,H)};
  const game=GAME_IMPL[key](ctx,cat,W,H,st);let last=performance.now(),t0=last;
  function frame(now){if(!alive())return;const dt=Math.min(50,now-last);last=now;const fin=game.update(dt,now-t0,tap);tap=null;const l=$('#cgS');if(l)l.textContent=game.label();
    if(fin)return finish();requestAnimationFrame(frame)}
  requestAnimationFrame(frame);
  function finish(){screen='result';const s=st.score;const stars=game.stars(s)+(s>0&&hasTr('lucky')?1:0)+(s>0&&cstat('str')+cstat('agi')>=16?1:0);tick();applyEffects(C.eff);
    player.cat.energy=clamp(player.cat.energy-10,0,100);player.cat.food=clamp(player.cat.food-5,0,100);const info=record(key,stars,20+s*3,s,false);
    resultScreen(game.result(s),stars,s>0?Lx("Котёнок в восторге!","Your kitten is thrilled!"):Lx("Котёнку всё равно понравилось","Your kitten still had fun"),()=>start(key),info,
      `<p class="tag">${Object.entries(C.eff).map(([k,v])=>`${STAT_NAME[k]} +${v}`).join(' · ')} ${Lx("· Энергия −10","· Energy −10")}</p>`)}}
