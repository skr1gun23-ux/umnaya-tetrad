/* ===== Генераторы заданий. level — выбранный класс 1–4 ===== */
let level=LS.get('ut2_level',2);
const MAX=()=>[10,20,100,1000][level-1];
function numOpts(ans){const s=new Set([ans]);let t=0;
  while(s.size<4&&t++<60){const d=rnd(1,Math.max(3,Math.round(Math.abs(ans)*.15)))*(Math.random()<.5?-1:1);if(ans+d>=0)s.add(ans+d)}
  let k=1;while(s.size<4)s.add(ans+k++);return shuffle([...s].map(String))}
const pooled=(name,make)=>{const p={};return ()=>{const key=name+level;if(!p[key]||!p[key].length)p[key]=shuffle(make());return p[key].pop()}};
const bankTask=(row,hint)=>{const [q,opts,a,why]=row;const ans=typeof a==='number'?opts[a]:a;return {q,cls:'text',hint,ans,opts:shuffle(opts),why}};

function mathTask(){
  const op=pick(level<=2?['+','−']:['+','−','×','÷']);let a,b,ans;const max=MAX();
  if(op==='+'){a=rnd(1,max-1);b=rnd(1,max-a);ans=a+b}
  else if(op==='−'){a=rnd(2,max);b=rnd(1,a-1);ans=a-b}
  else if(op==='×'){a=rnd(2,level===3?9:12);b=rnd(2,9);ans=a*b}
  else{b=rnd(2,9);ans=rnd(2,level===3?9:12);a=b*ans}
  return {q:`${a} ${op} ${b} = ?`,hint:'Посчитай в уме',ans:String(ans),opts:numOpts(ans)}}
function blitzTask(){const t=mathTask();t.hint='Быстрее!';return t}
function boxTask(){const max=MAX();const kind=level>=3?rnd(0,3):rnd(0,1);let q,ans;
  if(kind===0){const a=rnd(1,max-1),b=rnd(1,max-a);ans=b;q=`${a} + ☐ = ${a+b}`}
  else if(kind===1){const a=rnd(2,max),b=rnd(1,a-1);ans=b;q=`${a} − ☐ = ${a-b}`}
  else if(kind===2){const a=rnd(2,9),b=rnd(2,9);ans=b;q=`${a} × ☐ = ${a*b}`}
  else{const b=rnd(2,9),c=rnd(2,9);ans=b*c;q=`☐ ÷ ${b} = ${c}`}
  return {q,hint:'Какое число спряталось в окошке?',ans:String(ans),opts:numOpts(ans)}}
function cmpTask(){const max=MAX();let L,R,lv,rv;
  const expr=()=>{if(level>=3&&Math.random()<.4){const a=rnd(2,9),b=rnd(2,9);return [`${a} × ${b}`,a*b]}
    if(Math.random()<.5){const a=rnd(1,Math.floor(max/2)),b=rnd(1,Math.floor(max/2));return [`${a} + ${b}`,a+b]}
    const a=rnd(2,max),b=rnd(1,a-1);return [`${a} − ${b}`,a-b]};
  if(level===1){lv=rnd(0,20);rv=Math.random()<.25?lv:rnd(0,20);L=lv;R=rv}
  else{[L,lv]=expr();
    if(level===2){rv=Math.random()<.3?lv:Math.max(0,lv+rnd(-3,3));R=rv}
    else{[R,rv]=expr();if(Math.random()<.3){const a=rnd(2,9);if(lv%a===0&&lv/a>1){R=`${a} × ${lv/a}`;rv=lv}else{R=lv;rv=lv}}}}
  return {q:`${L} ☐ ${R}`,cls:'multi',hint:'Поставь знак: больше, меньше или равно',ans:lv>rv?'>':lv<rv?'<':'=',opts:['>','<','=']}}

const NAMES=[['Маша','f'],['Петя','m'],['Аня','f'],['Миша','m'],['Оля','f'],['Ваня','m'],['Катя','f'],['Дима','m'],['Лиза','f'],['Саша','m']];
const GEN={'Маша':'Маши','Петя':'Пети','Аня':'Ани','Миша':'Миши','Оля':'Оли','Ваня':'Вани','Катя':'Кати','Дима':'Димы','Лиза':'Лизы','Саша':'Саши'};
const STUFF=[['яблоко','яблока','яблок'],['конфету','конфеты','конфет'],['машинку','машинки','машинок'],['марку','марки','марок'],
  ['карандаш','карандаша','карандашей'],['наклейку','наклейки','наклеек'],['шишку','шишки','шишек'],['ракушку','ракушки','ракушек']];
function storyTask(){const [N,g]=pick(NAMES);const it=pick(STUFF);const v=(m,f)=>g==='m'?m:f;const max=MAX();
  const nom=[it[0].replace(/у$/,'а'),it[1],it[2]];const P=n=>`${n} ${plural(n,it)}`;let q,ans;
  const k=pick(level===1?[0,1]:level===2?[0,1,2,3,6]:[0,1,2,3,4,5,6]);
  if(k===0){const a=rnd(1,max-1),b=rnd(1,Math.max(1,max-a));ans=a+b;q=`${N} ${v('нашёл','нашла')} ${P(a)}, а потом ещё ${b}. Сколько всего ${it[2]} у ${v('него','неё')}?`}
  else if(k===1){const a=rnd(2,max),b=rnd(1,a-1);ans=a-b;q=`У ${GEN[N]} было ${a} ${plural(a,nom)}. ${v('Он','Она')} ${v('подарил','подарила')} другу ${b}. Сколько осталось?`}
  else if(k===2){const a=rnd(2,max-5),b=rnd(1,Math.min(9,max-a));ans=a+b;q=`В первой коробке ${a} ${plural(a,nom)}, а во второй на ${b} больше. Сколько ${it[2]} во второй коробке?`}
  else if(k===3){const a=rnd(5,max),b=rnd(1,Math.min(9,a-1));ans=a-b;q=`В первой коробке ${a} ${plural(a,nom)}, а во второй на ${b} меньше. Сколько ${it[2]} во второй коробке?`}
  else if(k===4){const a=rnd(2,level===3?6:9),b=rnd(2,9);ans=a*b;q=`В ${a} пакетах лежит по ${b} ${plural(b,nom)}. Сколько всего ${it[2]}?`}
  else if(k===5){const b=rnd(2,6),c=rnd(2,9);ans=c;q=`${N} ${v('разложил','разложила')} ${P(b*c)} поровну в ${b} ${plural(b,['коробку','коробки','коробок'])}. Сколько ${it[2]} в каждой коробке?`}
  else{const a=rnd(2,Math.floor(max/2)),b=rnd(2,Math.floor(max/2));ans=a+b;q=`Тетрадь стоит ${a} ${plural(a,['рубль','рубля','рублей'])}, а ручка — ${b} ${plural(b,['рубль','рубля','рублей'])}. Сколько стоят тетрадь и ручка вместе?`}
  return {q,cls:'text',hint:'Прочитай задачу внимательно',ans:String(ans),opts:numOpts(ans)}}

/* Столбик: умножение и деление с пропущенной цифрой */
function digitOpts(d,lead){const s=new Set([d]);while(s.size<4){const x=rnd(lead?1:0,9);s.add(x)}return shuffle([...s].map(String))}
function columnTask(){const div=Math.random()<.45;
  if(div){const b=rnd(2,9),qn=level<=2?rnd(2,Math.floor(99/b)):level===3?rnd(12,Math.floor(999/b)):rnd(102,Math.floor(9999/b));const a=b*qn;
    const A=String(a).split(''),Q=String(qn).split('');
    const spots=[...A.map((_,i)=>['a',i]),...Q.map((_,i)=>['q',i]),['b',0]];const [w,i]=pick(spots);
    const ans=w==='a'?A[i]:w==='q'?Q[i]:String(b);
    const cell=(ch,hid,cls='')=>`<td class="${cls}${hid?' ask':''}">${hid?'?':ch}</td>`;
    const qw=Q.length,aw=A.length;
    const row1=A.map((ch,k)=>cell(ch,w==='a'&&k===i)).join('')+cell(String(b),w==='b','vl ul')+'<td class="ul"></td>'.repeat(Math.max(0,qw-1));
    const row2='<td></td>'.repeat(aw)+Q.map((ch,k)=>cell(ch,w==='q'&&k===i,k===0?'vl':'')).join('');
    return {q:`<div class="colwrap"><table class="colmath"><tr>${row1}</tr><tr>${row2}</tr></table></div>`,cls:'grid',raw:true,
      hint:'Деление уголком: делимое, делитель и частное. Какая цифра спряталась?',ans,opts:digitOpts(+ans,(w==='a'||w==='q')&&i===0||w==='b'),why:`${a} ÷ ${b} = ${qn}`}}
  // умножение
  let a,b;if(level<=2){a=rnd(11,49);b=rnd(2,5)}else if(level===3){a=rnd(102,489);b=rnd(2,9)}else{a=rnd(12,98);b=rnd(12,49)}
  const rows=[];const two=b>=10;const res=a*b;
  const W=Math.max(String(res).length,String(a).length,String(b).length+1);
  const pad=(s,shift=0)=>{const arr=String(s).split('');const out=Array(W).fill('');arr.forEach((ch,k)=>{out[W-shift-arr.length+k]=ch});return out};
  rows.push({d:pad(a),k:'a'});rows.push({d:pad(b),k:'b',op:true});
  if(two){rows.push({d:pad(a*(b%10)),k:'p1',line:true});rows.push({d:pad(a*Math.floor(b/10),1),k:'p2'});rows.push({d:pad(res),k:'r',line:true})}
  else rows.push({d:pad(res),k:'r',line:true});
  const spots=[];rows.forEach((r,ri)=>r.d.forEach((ch,ci)=>{if(ch!=='')spots.push([ri,ci])}));
  const [hr,hc]=pick(spots);const ans=rows[hr].d[hc];const lead=rows[hr].d.findIndex(c=>c!=='')===hc;
  const html=rows.map((r,ri)=>`<tr class="${r.line?'line':''}"><td class="op">${r.op?'×':r.k==='p2'?'+':''}</td>${r.d.map((ch,ci)=>`<td class="d${ri===hr&&ci===hc?' ask':''}">${ri===hr&&ci===hc?'?':ch}</td>`).join('')}</tr>`).join('');
  return {q:`<div class="colwrap"><table class="colmath">${html}</table></div>`,cls:'grid',raw:true,hint:'Умножение столбиком. Какая цифра спряталась?',ans,opts:digitOpts(+ans,lead),why:`${a} × ${b} = ${res}`}}

const WORDS=[['с_бака','о','а'],['к_рова','о','а'],['м_локо','о','а'],['в_рона','о','а'],['б_рёза','е','и'],['к_пуста','а','о'],
['к_рандаш','а','о'],['п_нал','е','и'],['з_яц','а','о'],['т_традь','е','и'],['п_льто','а','о'],['м_рковь','о','а'],
['р_бята','е','и'],['я_ык','з','с'],['ли_ица','с','з'],['пт_ца','и','е'],['д_журный','е','и'],['в_робей','о','а'],
['уч_ник','е','и'],['г_род','о','а'],['м_роз','о','а'],['с_рока','о','а'],['л_сица','и','е'],['ябл_ко','о','а'],
['кла_','сс','с'],['мя_','ч','щ'],['ду_','б','п'],['гри_','б','п'],['ло_ка','ж','ш'],['ры_ка','б','п'],
['ж_раф','и','ы'],['ш_ло','и','ы'],['ч_ща','а','я'],['щ_ка','у','ю'],['пог_да','о','а'],['ог_рец','у','о']];
const WORDS_HARD=[['в_кзал','о','а'],['к_лендарь','а','е'],['п_ссажир','а','о'],['б_гаж','а','о'],['р_сунок','и','е'],['к_ртина','а','о'],
['з_мляника','е','и'],['ч_ловек','е','и'],['т_релка','а','е'],['ж_лтый','ё','о'],['ш_пот','ё','о'],['пе_ня','с','з'],
['к_пейка','о','а'],['с_бота','у','ю'],['к_рабль','о','а'],['р_кета','а','о'],['б_рёзовый','е','и'],['алл_я','е','и'],
['ко_тёр','с','з'],['пр_вет','и','е'],['ст_лица','о','а'],['г_зета','а','о'],['ка_тофель','р','л']];
const wordNext=pooled('w',()=>level<=2?WORDS:[...WORDS_HARD,...WORDS_HARD,...WORDS]);
function wordTask(){const [w,ok,bad]=wordNext();return {q:w.replace('_','…'),hint:'Какую букву пропустили?',ans:ok,opts:shuffle([ok,bad])}}

function seqTask(){const type=rnd(0,level>2?3:1);let arr;
  if(type===0){const s=rnd(1,20),d=rnd(2,level+3);arr=[0,1,2,3,4].map(i=>s+i*d)}
  else if(type===1){const d=rnd(2,6),s=rnd(4*d+1,60);arr=[0,1,2,3,4].map(i=>s-i*d)}
  else if(type===2){const s=rnd(1,3);arr=[0,1,2,3,4].map(i=>s*2**i)}
  else{const a=rnd(1,5),b=rnd(1,5);arr=[a,b];for(let i=2;i<5;i++)arr.push(arr[i-1]+arr[i-2])}
  const hide=rnd(2,4),ans=arr[hide];
  return {q:arr.map((x,i)=>i===hide?'?':x).join(', '),cls:'multi',hint:'Какое число пропущено?',ans:String(ans),opts:numOpts(ans)}}
const oddNext=pooled('odd',()=>ODD);
function oddTask(){const [items,ans,why]=oddNext();return {q:'Что лишнее?',cls:'multi',hint:'Найди то, что не подходит к остальным',ans,opts:shuffle(items),why}}
const FRUITS=['🍎','🍐','🍌','🍓','🍇','🍊','🍒','🥝'];
function scaleTask(){const [A,B,C]=shuffle(FRUITS);let lines,ans,ask;
  if(level===1){const x=rnd(1,6);lines=[`${A} + ${A} = ${2*x}`];ans=x;ask=A}
  else if(level===2){const x=rnd(1,8),y=rnd(1,9);lines=[`${A} + ${A} = ${2*x}`,`${A} + ${B} = ${x+y}`];ans=y;ask=B}
  else if(level===3){const x=rnd(1,9),y=rnd(1,9),z=rnd(1,9);lines=[`${A} + ${A} + ${A} = ${3*x}`,`${A} + ${B} = ${x+y}`,`${B} + ${C} = ${y+z}`];ans=z;ask=C}
  else{const x=rnd(2,9),y=x+rnd(1,8),z=rnd(1,15);lines=[`${A} × 4 = ${4*x}`,`${B} − ${A} = ${y-x}`,`${C} + ${B} + ${A} = ${x+y+z}`];ans=z;ask=C}
  return {q:lines.join('<br>')+`<br>${ask} = ?`,cls:'multi',raw:true,hint:'Каждый фрукт — это число. Найди его',ans:String(ans),opts:numOpts(ans)}}
const KIDS=['Маша','Петя','Аня','Миша','Оля','Ваня','Катя','Дима'];
const TRAITS=[
  {more:'выше',less:'ниже',top:'Кто самый высокий?',bottom:'Кто самый низкий?',second:'Кто второй по росту?'},
  {more:'старше',less:'младше',top:'Кто самый старший?',bottom:'Кто самый младший?',second:'Кто второй по возрасту?'},
  {more:'бегает быстрее, чем',less:'бегает медленнее, чем',top:'Кто бегает быстрее всех?',bottom:'Кто бегает медленнее всех?',second:'Кто прибежит вторым?'}];
function whoTask(){const n=level<=2?3:4;const order=shuffle(KIDS).slice(0,n);const tr=pick(TRAITS);const facts=[];
  for(let i=0;i<n-1;i++){const a=order[i],b=order[i+1];
    facts.push(tr.more.includes('чем')?(Math.random()<.5?`${a} ${tr.more} ${b}.`:`${b} ${tr.less} ${a}.`):(Math.random()<.5?`${a} ${tr.more} ${GEN[b]}.`:`${b} ${tr.less} ${GEN[a]}.`))}
  const qk=level>=3?pick(['top','bottom','second']):pick(['top','bottom']);const ans=qk==='top'?order[0]:qk==='bottom'?order[n-1]:order[1];
  return {q:shuffle(facts).join(' ')+'<br><b>'+tr[qk]+'</b>',cls:'text',raw:true,hint:'Расставь ребят по порядку в уме',ans,opts:shuffle(order)}}
const SHAPES=['▲','●','■','◆','★','♥'];
function patternTask(){const len=level===1?2:level===2?rnd(2,3):level===3?3:rnd(3,4);
  const unit=shuffle(SHAPES).slice(0,len);if(level>=3&&Math.random()<.4)unit.splice(rnd(0,len-1),0,unit[0]);
  const shown=level<=2?7:8;const seq=Array.from({length:shown+1},(_,i)=>unit[i%unit.length]);
  const ans=seq[shown];const opts=new Set([ans,...unit]);for(const s of shuffle(SHAPES)){if(opts.size>=4)break;opts.add(s)}
  return {q:seq.slice(0,shown).join(' ')+' ?',cls:'shapes',hint:'Что будет дальше?',ans,opts:shuffle([...opts].slice(0,4))}}

function dayPart(h){return h>=5&&h<=11?'🌅 Утро':h>=12&&h<=16?'☀️ День':h>=17&&h<=22?'🌇 Вечер':'🌙 Ночь'}
function clockTask(){const h=rnd(0,23);const mins=level===1?[0,30]:level===2?[0,15,30,45]:[0,5,10,15,20,25,30,35,40,45,50,55];
  const m=pick(mins);const fmt=(h,m)=>`${h}:${String(m).padStart(2,'0')}`;const s=new Set([fmt(h,m)]);
  s.add(fmt((h+12)%24,m));let sh=m/5||12;if(h>=12)sh=sh===12?12:sh+12;else if(sh===12)sh=0;s.add(fmt(sh,(h%12)*5));
  while(s.size<4)s.add(fmt(rnd(0,23),pick(mins)));
  return {q:'',svg:clockSVG(h,m),label:dayPart(h),hint:'Сколько времени показывают часы?',ans:fmt(h,m),opts:shuffle([...s].slice(0,4)),
    why:h===12?'12 часов дня — это полдень':h>12?`Днём и вечером к часам прибавляем 12: ${h-12} + 12 = ${h}`:null}}
function clockSVG(h,m){let t='';for(let i=1;i<=12;i++){const a=i*Math.PI/6;
    t+=`<text x="${(100+70*Math.sin(a)).toFixed(1)}" y="${(100-70*Math.cos(a)+8).toFixed(1)}" text-anchor="middle" font-size="22" font-family="Neucha,cursive" fill="var(--text)">${i}</text>`;
    t+=`<text x="${(100+50*Math.sin(a)).toFixed(1)}" y="${(100-50*Math.cos(a)+4).toFixed(1)}" text-anchor="middle" font-size="11" font-family="Nunito,sans-serif" fill="var(--muted)">${(i+12)%24}</text>`}
  for(let i=0;i<60;i++){const a=i*Math.PI/30,r1=i%5?88:84;
    t+=`<line x1="${(100+r1*Math.sin(a)).toFixed(1)}" y1="${(100-r1*Math.cos(a)).toFixed(1)}" x2="${(100+92*Math.sin(a)).toFixed(1)}" y2="${(100-92*Math.cos(a)).toFixed(1)}" stroke="var(--muted)" stroke-width="${i%5?1:3}"/>`}
  const ha=((h%12)+m/60)*30*Math.PI/180,ma=m*6*Math.PI/180;
  return `<svg class="clock" viewBox="0 0 200 200" role="img" aria-label="Часы"><circle cx="100" cy="100" r="96" fill="var(--paper)" stroke="var(--ink)" stroke-width="5"/>${t}
  <line x1="100" y1="100" x2="${100+40*Math.sin(ha)}" y2="${100-40*Math.cos(ha)}" stroke="var(--ink)" stroke-width="7" stroke-linecap="round"/>
  <line x1="100" y1="100" x2="${100+72*Math.sin(ma)}" y2="${100-72*Math.cos(ma)}" stroke="var(--margin)" stroke-width="4" stroke-linecap="round"/>
  <circle cx="100" cy="100" r="6" fill="var(--ink)"/></svg>`}

/* Беларуская мова */
const beList=()=>level<=2?BE.filter(x=>x[2]):BE;
const beTrNext=pooled('betr',beList),beMeanNext=pooled('bemean',beList);
function beTrTask(){const [ru,be]=beTrNext();const opts=new Set([be]);while(opts.size<4)opts.add(pick(BE)[1]);
  return {q:`Як па-беларуску «${ru}»?`,cls:'text center',hint:'Выберы правільнае слова',ans:be,opts:shuffle([...opts])}}
function beMeanTask(){const [ru,be]=beMeanNext();const opts=new Set([ru]);while(opts.size<4)opts.add(pick(BE)[0]);
  return {q:`Што азначае слова «${be}»?`,cls:'text center',hint:'Выбери перевод на русский',ans:ru,opts:shuffle([...opts])}}
const beSpellNext=pooled('besp',()=>BE_SPELL);
function beSpellTask(){const [ok,bad]=beSpellNext();return {q:'Як правільна напісаць?',cls:'multi',hint:'Адно слова напісана па-беларуску правільна',ans:ok,opts:shuffle([ok,bad])}}

/* Внимательность */
function spotTask(){const n=[3,4,5,6][level-1];const [same,diff]=pick(level<=2?SPOT_EASY:SPOT_HARD).slice().sort(()=>Math.random()-.5);
  const k=rnd(0,n*n-1);const opts=Array.from({length:n*n},(_,i)=>i===k?diff:same);
  return {q:'',hint:'Найди одну картинку, которая отличается',ans:diff,opts,tap:n}}
function countTask(){const kinds=shuffle(SCATTER).slice(0,level<=2?2:3);const total=[7,10,14,18][level-1];
  const cells=shuffle(Array.from({length:40},(_,i)=>i)).slice(0,total);const items=cells.map(c=>({c,e:pick(kinds)}));
  const target=pick(kinds);if(!items.some(x=>x.e===target))items[0].e=target;
  const cnt=items.filter(x=>x.e===target).length;
  const html=`<div class="scatter">${items.map(({c,e})=>{const x=(c%8)*12.5+6.25+rnd(-3,3),y=Math.floor(c/8)*20+10+rnd(-4,4);return `<span style="left:${x}%;top:${y}%">${e}</span>`}).join('')}</div>`;
  return {q:html,cls:'grid',raw:true,hint:`Сколько здесь ${target}?`,ans:String(cnt),opts:numOpts(cnt)}}
function stroopTask(){const [w]=pick(STROOP);let c;do{c=pick(STROOP)}while(c[0]===w&&Math.random()<.85);
  const askWord=level>=3&&Math.random()<.3;const ans=askWord?w:c[0];
  const opts=new Set([ans,askWord?c[0]:w]);while(opts.size<4)opts.add(pick(STROOP)[0]);
  return {q:`<span style="color:${c[1]}">${w}</span>`,cls:'stroop',raw:true,hint:askWord?'Какое слово написано? (Не смотри на цвет!)':'Какого ЦВЕТА буквы? (Не читай слово!)',ans,opts:shuffle([...opts])}}
function recallTask(){const n=level+2;const seq=shuffle(RECALL).slice(0,n);const showMs=1200+n*700;
  const pre=`<div class="seqshow">${seq.map(e=>`<span>${e}</span>`).join('')}</div>`;
  if(level>=2&&Math.random()<.5){const pos=rnd(0,n-1);const opts=new Set([seq[pos]]);while(opts.size<4)opts.add(pick(seq.length>3?seq:RECALL));
    return {pre,preMs:showMs,q:`Что было на ${pos+1}-м месте?`,cls:'text center',hint:'Вспомни ряд по порядку',ans:seq[pos],opts:shuffle([...opts])}}
  const variants=new Set([seq.join(' ')]);let t=0;
  while(variants.size<4&&t++<40){const v=[...seq];const i=rnd(0,n-1);let j=rnd(0,n-1);if(i===j)j=(i+1)%n;
    if(Math.random()<.5){[v[i],v[j]]=[v[j],v[i]]}else{v[i]=pick(RECALL.filter(e=>!seq.includes(e)))}variants.add(v.join(' '))}
  return {pre,preMs:showMs,q:'Какой ряд ты видел?',cls:'text center',hint:'Выбери точно такой же ряд',ans:seq.join(' '),opts:shuffle([...variants])}}

/* Творчество */
const commonNext=pooled('common',()=>COMMON);
function commonTask(){const [q,opts,a]=commonNext();return {q,cls:'text center',hint:'Найди, что их объединяет',ans:opts[a],opts:shuffle(opts)}}
function paintTask(){const t=rnd(0,2);const sw=n=>`<span class="sw" style="background:${COLORS[n]}"></span>`;
  if(t===0){const [a,b,c]=pick(MIXES);const opts=new Set([c]);while(opts.size<4)opts.add(pick(Object.keys(COLORS).filter(x=>x!==a&&x!==b)));
    return {q:`<div class="swatches">${sw(a)} + ${sw(b)} = ?</div><p style="font-size:18px;margin:8px 0 0">${a} + ${b}</p>`,cls:'grid center',raw:true,hint:'Какой цвет получится, если смешать краски?',ans:c,opts:shuffle([...opts]),swatch:true}}
  if(t===1){const m=pick(MIXES);const opts=new Set([`${m[0]} + ${m[1]}`]);while(opts.size<4){const o=pick(MIXES);if(o[2]!==m[2])opts.add(`${o[0]} + ${o[1]}`)}
    return {q:`<div class="swatches">? + ? = ${sw(m[2])}</div><p style="font-size:18px;margin:8px 0 0">${m[2]}</p>`,cls:'grid center',raw:true,hint:'Какие две краски нужно смешать?',ans:`${m[0]} + ${m[1]}`,opts:shuffle([...opts])}}
  const c=pick([...WARM,...COLD]);const ans=WARM.includes(c)?'Тёплый':'Холодный';
  return {q:`<div class="swatches">${sw(c)}</div><p style="font-size:18px;margin:8px 0 0">${c}</p>`,cls:'grid center',raw:true,hint:'Тёплый это цвет или холодный?',ans,opts:['Тёплый','Холодный'],
    why:'Тёплые — как солнце и огонь, холодные — как вода и лёд'}}

/* Безопасность */
const faNext=pooled('fa',()=>FIRSTAID),obNext=pooled('ob',()=>OBZH),pdNext=pooled('pd',()=>PDD),trNext=pooled('tricky',()=>TRICKY);
const firstAidTask=()=>bankTask(faNext(),'Как правильно помочь?');
const obzhTask=()=>bankTask(obNext(),'Как поступить правильно?');
const pddTask=()=>bankTask(pdNext(),'Вспомни правила дорожного движения');
const trickyTask=()=>bankTask(trNext(),'Подумай хорошенько, тут есть подвох');

/* Сложные */
function chainTask(){let q,ans;
  if(level===1){const a=rnd(2,8),b=rnd(1,10-a),c=rnd(1,a+b);q=`${a} + ${b} − ${c}`;ans=a+b-c}
  else if(level===2){const a=rnd(8,20),b=rnd(1,a-1),c=rnd(1,20-(a-b));q=`${a} − ${b} + ${c}`;ans=a-b+c;if(Math.random()<.5){const d=rnd(1,Math.min(9,ans));q+=` − ${d}`;ans-=d}}
  else if(level===3){const k=rnd(0,3),a=rnd(2,9),b=rnd(2,9),c=rnd(2,9);
    if(k===0){q=`${a} + ${b} × ${c}`;ans=a+b*c}else if(k===1){const cc=rnd(1,a*b);q=`${a} × ${b} − ${cc}`;ans=a*b-cc}
    else if(k===2){q=`(${a} + ${b}) × ${c}`;ans=(a+b)*c}else{const x=rnd(2,9),y=rnd(1,x-1);q=`${a} × (${x} − ${y})`;ans=a*(x-y)}}
  else{const k=rnd(0,3),a=rnd(2,9),b=rnd(2,9),c=rnd(2,9),d=rnd(2,9);
    if(k===0){q=`${a} × ${b} + ${c} × ${d}`;ans=a*b+c*d}else if(k===1){const dd=rnd(1,(a+b)*c);q=`(${a} + ${b}) × ${c} − ${dd}`;ans=(a+b)*c-dd}
    else if(k===2){const [p,r]=a*b>=c*d?[[a,b],[c,d]]:[[c,d],[a,b]];q=`${p[0]} × ${p[1]} − ${r[0]} × ${r[1]}`;ans=p[0]*p[1]-r[0]*r[1]}
    else{const m=rnd(2,9);q=`${a*m} ÷ ${a} + ${b} × ${c}`;ans=m+b*c}}
  return {q:q+' = ?',cls:'multi',hint:level>=3?'Сначала скобки, потом × и ÷, потом + и −':'Считай по порядку слева направо',ans:String(ans),opts:numOpts(ans)}}
function magicTask(){let M=[[2,7,6],[9,5,1],[4,3,8]];
  for(let r=rnd(0,3);r>0;r--)M=M[0].map((_,i)=>M.map(row=>row[i]).reverse());if(Math.random()<.5)M=M.map(row=>[...row].reverse());
  const k=[1,1,rnd(1,3),rnd(2,6)][level-1],c=[0,rnd(1,5),rnd(0,10),rnd(0,20)][level-1];const V=M.flat().map(v=>v*k+c),sum=15*k+3*c;
  const ask=rnd(0,8);let other=-1;if(level>=3){do{other=rnd(0,8)}while(other===ask)}
  const cells=V.map((v,i)=>i===ask?'<div class="ask">?</div>':i===other?'<div class="hid">…</div>':`<div>${v}</div>`).join('');
  return {q:`<div class="magic">${cells}</div>`,cls:'grid',raw:true,hint:level<=2?`В каждой строке, столбце и по диагонали сумма равна ${sum}`:'Суммы во всех строках, столбцах и диагоналях одинаковые. Найди «?»',
    ans:String(V[ask]),opts:numOpts(V[ask]),why:`Сумма в каждой линии — ${sum}`}}
function pyramidTask(){const n=level<=2?3:4,maxB=[4,9,15,25][level-1];
  let rows=[Array.from({length:n},()=>rnd(1,maxB))];while(rows[0].length>1){const b=rows[0];rows.unshift(b.slice(1).map((x,i)=>b[i]+x))}
  const cells=[];rows.forEach((r,ri)=>r.forEach((_,ci)=>cells.push([ri,ci])));const [hr,hc]=level===1?[0,0]:pick(cells.slice(1));const ans=rows[hr][hc];
  const html=rows.map((r,ri)=>`<p>${r.map((v,ci)=>ri===hr&&ci===hc?'<div class="ask">?</div>':`<div>${v}</div>`).join('')}</p>`).join('');
  return {q:`<div class="pyr">${html}</div>`,cls:'grid',raw:true,hint:'Каждый кирпичик равен сумме двух кирпичиков под ним',ans:String(ans),opts:numOpts(ans)}}
function superSeqTask(){const t=pick(level<=2?[0,2,5]:[0,1,2,3,4,5,6]);let arr=[],why;const big=level>=3;
  if(t===0){let s=rnd(1,big?20:5),d=rnd(1,big?4:2);arr=[s];for(let i=1;i<6;i++){s+=d+i-1;arr.push(s)}why='Каждый раз прибавляем на 1 больше'}
  else if(t===1){let s=rnd(1,4);arr=[s];for(let i=1;i<6;i++){s=s*2+1;arr.push(s)}why='Умножаем на 2 и прибавляем 1'}
  else if(t===2){const a=rnd(3,big?9:5),b=rnd(1,a-1);let s=rnd(1,10);arr=[s];for(let i=1;i<6;i++){s+=i%2?a:-b;arr.push(s)}why=`По очереди: +${a}, −${b}`}
  else if(t===3){const s=rnd(1,4);arr=[0,1,2,3,4,5].map(i=>(s+i)**2);why='Числа, умноженные сами на себя: 2×2, 3×3, 4×4…'}
  else if(t===4){const a=rnd(1,9),d=rnd(2,5),x=rnd(20,40),e=rnd(1,4);arr=[a,x,a+d,x-e,a+2*d,x-2*e];why=`Два ряда вперемешку: один +${d}, другой −${e}`}
  else if(t===5){const s=rnd(1,2);arr=[0,1,2,3,4,5].map(i=>s*3**i);if(!big)arr=arr.slice(0,5);why='Каждое следующее в 3 раза больше'}
  else{const m=rnd(1,3);arr=[5,4,3,2,1,0].map(i=>m*2**i);why='Каждое следующее в 2 раза меньше'}
  const hide=rnd(Math.min(3,arr.length-2),arr.length-1),ans=arr[hide];
  return {q:arr.map((x,i)=>i===hide?'?':x).join(', '),cls:'multi',hint:'Найди правило ряда',ans:String(ans),opts:numOpts(ans),why}}
