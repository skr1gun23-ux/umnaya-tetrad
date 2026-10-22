/* ===== Генетика котят: гены внешности, свойства, характеристики, скрещивание ===== */
const HEX=/^#[0-9a-f]{6}$/i;
const PATS=['none','tabby','bicolor','points','calico','spots','stars','rainbow','shine','flame','circuit','ghost','multi'];
const STYLES=['soft','pixel','brick'],EAR_T=['normal','tufts','long','round','fold'],TAIL_T=['normal','fluffy','short','double'],EXTRAS=['horns','wings','star','freckles','glowspots'];
const RU={pat:{none:Lx("Однотонный","Solid"),tabby:Lx("Полоски","Stripes"),bicolor:Lx("Белая грудка","White chest"),points:Lx("Тёмные ушки и лапки","Dark ears and paws"),calico:Lx("Трёхцветный","Calico"),spots:Lx("Пятнышки","Spots"),stars:Lx("Звёздочки","Little stars"),rainbow:Lx("Радуга","Rainbow"),shine:Lx("Блеск","Shine"),flame:Lx("Пламя","Flame"),circuit:Lx("Киберсхемы","Cyber circuits"),ghost:Lx("Призрачный","Ghostly"),multi:Lx("Разноцветные кирпичики","Colorful bricks")},
  style:{soft:Lx("Пушистый","Fluffy"),pixel:Lx("Пиксельный","Pixel"),brick:Lx("Кирпичики","Bricks")},ears:{normal:Lx("Обычные","Normal"),tufts:Lx("С кисточками","Tufted"),long:Lx("Длинные","Long"),round:Lx("Круглые","Round"),fold:Lx("Вислоухие","Folded")},
  tail:{normal:Lx("Обычный","Normal"),fluffy:Lx("Пушистый","Fluffy"),short:Lx("Короткий","Short"),double:Lx("Два хвоста","Two tails")},extra:{horns:Lx("Рожки","Horns"),wings:Lx("Крылышки","Little wings"),star:Lx("Звезда на лбу","Star on the forehead"),freckles:Lx("Веснушки","Freckles"),glowspots:Lx("Светящиеся пятна","Glowing spots")}};
const NEONS=['#00e5ff','#ff2bd6','#39ff14','#ff3355','#ffd166','#c77dff'];

function cleanDna(d){if(!d||typeof d!=='object')return null;const h=(v,f)=>HEX.test(v)?v:f;
  return {style:STYLES.includes(d.style)?d.style:'soft',pat:PATS.includes(d.pat)?d.pat:'none',main:h(d.main,'#f4a259'),dark:h(d.dark,'#d9803a'),belly:h(d.belly,'#fde3c4'),line:h(d.line,'#6b3d1f'),
    light:!!d.light,neon:HEX.test(d.neon)?d.neon:null,glow:HEX.test(d.glow)?d.glow:null,ears:EAR_T.includes(d.ears)?d.ears:'normal',tail:TAIL_T.includes(d.tail)?d.tail:'normal',
    extras:[...new Set((Array.isArray(d.extras)?d.extras:[]).filter(x=>EXTRAS.includes(x)))].slice(0,3),hetero:HEX.test(d.hetero)?d.hetero:null}}
function skinToDna(s){return cleanDna({style:s.st||'soft',pat:s.pat||'none',...s.c,neon:s.c.neon||null,glow:s.glow||null})}
function dnaToSkin(d){d=cleanDna(d)||skinToDna(SKINS[0]);
  return {id:'dna',name:'',r:'rare',st:d.style,pat:d.pat==='none'?undefined:d.pat,glow:d.glow,ears:d.ears,tail:d.tail,extras:d.extras,hetero:d.hetero,
    c:{main:d.main,dark:d.dark,belly:d.belly,line:d.line,light:d.light,paw:d.pat==='bicolor'?'#ffffff':undefined,neon:d.neon||(d.pat==='circuit'?'#00e5ff':undefined)}}}
function extrasSVG(S,layer,ids,mood){const ex=S.extras||[];let o='';
  if(layer==='back'){if(ex.includes('wings'))o+=`<ellipse cx="50" cy="150" rx="18" ry="32" fill="#ffffff" stroke="#c9d6f0" stroke-width="3" transform="rotate(-30 50 150)"/><ellipse cx="150" cy="150" rx="18" ry="32" fill="#ffffff" stroke="#c9d6f0" stroke-width="3" transform="rotate(30 150 150)"/>`;return o}
  if(ex.includes('horns'))o+=`<path d="M78 60 Q72 38 84 32 Q84 46 92 56 Z M122 60 Q128 38 116 32 Q116 46 108 56 Z" fill="#f4e3c1" stroke="#8a6a3a" stroke-width="2.5"/>`;
  if(ex.includes('star'))o+=star5(100,70,8,'#ffd166','#c99700');
  if(ex.includes('freckles'))o+=[[62,112],[70,118],[56,120],[138,112],[130,118],[144,120]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.2" fill="#6b3d1f" opacity=".55"/>`).join('');
  if(ex.includes('glowspots')){const c=S.glow||'#7ff2ff';o+=`<g filter="url(#${ids.f})">${[[76,166],[124,184],[106,158]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" fill="${c}"/>`).join('')}</g>${[[76,166],[124,184],[106,158]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.5" fill="#fff"/>`).join('')}`}
  if(S.hetero&&S.st!=='pixel'&&(mood==='normal'||mood==='sad'))o+=S.glow?`<ellipse cx="80" cy="97" rx="6" ry="${mood==='sad'?5:8}" fill="${S.hetero}"/>`:`<ellipse cx="81" cy="${mood==='sad'?100:98}" rx="${mood==='sad'?4.5:5.5}" ry="${mood==='sad'?4.5:7.5}" fill="${S.hetero}"/><circle cx="83" cy="${mood==='sad'?98:94}" r="2" fill="#fff"/>`;
  return o}

const CAT_TRAITS=[
 {id:'smart',name:Lx("Умник","Smarty"),icon:'🧠',desc:Lx("+20% опыта за задания","+20% XP for tasks")},
 {id:'athlete',name:Lx("Спортсмен","Athlete"),icon:'💪',desc:Lx("Спорт растёт в 1,5 раза быстрее","Sport grows 1.5 times faster")},
 {id:'joker',name:Lx("Весельчак","Joker"),icon:'😹',desc:Lx("Развлечение растёт в 1,5 раза быстрее","Fun grows 1.5 times faster")},
 {id:'glutton',name:Lx("Обжора","Glutton"),icon:'🍗',desc:Lx("Сытость падает на 30% быстрее","Fullness drops 30% faster")},
 {id:'sleepy',name:Lx("Соня","Sleepyhead"),icon:'😴',desc:Lx("Энергия тратится на 30% медленнее","Uses energy 30% slower")},
 {id:'clean',name:Lx("Чистюля","Neat"),icon:'🧼',desc:Lx("Ходит в туалет реже: раз в 12–20 часов","Goes potty less often: every 12–20 hours")},
 {id:'lucky',name:Lx("Везунчик","Lucky"),icon:'🍀',desc:Lx("+1 ★ в играх с котёнком","+1 ★ in kitten games")},
 {id:'fidget',name:Lx("Непоседа","Fidget"),icon:'⚡',desc:Lx("Энергия тратится на 30% быстрее, зато спорт растёт на 25% больше","Uses energy 30% faster, but sport grows 25% more")},
 {id:'cuddly',name:Lx("Ласковый","Cuddly"),icon:'💕',desc:Lx("Поглаживание даёт вдвое больше настроения","Petting gives twice as much mood")},
 {id:'gourmet',name:Lx("Гурман","Gourmet"),icon:'🍣',desc:Lx("Еда из магазина действует на 25% сильнее","Shop food works 25% better")},
 {id:'starry',name:Lx("Звёздный","Starry"),icon:'⭐',desc:Lx("+2 ★ за каждое событие","+2 ★ for every event")},
 {id:'lazy',name:Lx("Лежебока","Couch potato"),icon:'🛋️',desc:Lx("Спорт падает на 30% быстрее","Sport drops 30% faster")}];
const TRAIT_BY_ID=Object.fromEntries(CAT_TRAITS.map(t=>[t.id,t]));
const CSTATS=[['str',Lx("Сила","Strength"),'💪'],['agi',Lx("Ловкость","Agility"),'🐾'],['int',Lx("Ум","Brains"),'🧠'],['luck',Lx("Удача","Luck"),'🍀'],['cha',Lx("Обаяние","Charm"),'💕']];
const CSTAT_HELP=Lx("Ум: каждый пункт выше 5 даёт +4% опыта, ниже 5 — −4%. Сила + Ловкость от 16: +1 ★ в играх с котёнком. Удача: +1 ★ за событие на каждые 4 пункта. Обаяние: поглаживание даёт больше настроения.","Brains: each point above 5 gives +4% XP, below 5 gives −4%. Strength + Agility of 16 or more: +1 ★ in kitten games. Luck: +1 ★ per event for every 4 points. Charm: petting gives more mood.");
const KIT_NAMES=[Lx("Пушок","Fluffy"),Lx("Снежок","Snowball"),Lx("Уголёк","Coal"),Lx("Тучка","Cloudy"),Lx("Звёздочка","Twinkle"),Lx("Бублик","Bagel"),Lx("Пиксель","Pixel"),Lx("Кекс","Cupcake"),Lx("Вафля","Waffle"),Lx("Марсик","Mars"),Lx("Луна","Luna"),Lx("Сырник","Pancake"),Lx("Мандарин","Tangerine"),Lx("Бусинка","Bead"),Lx("Шнурок","Shoelace"),Lx("Комета","Comet"),Lx("Финик","Date"),Lx("Ириска","Toffee"),Lx("Лапка","Paws"),Lx("Персик","Peach"),Lx("Фантик","Wrapper"),Lx("Мармелад","Jelly"),Lx("Кнопка","Button"),Lx("Пряник","Gingerbread")];

const seeded=str=>{let h=1779033703^str.length;for(let i=0;i<str.length;i++){h=Math.imul(h^str.charCodeAt(i),3432918353);h=h<<13|h>>>19}
  return ()=>{h=Math.imul(h^h>>>16,2246822507);h=Math.imul(h^h>>>13,3266489909);h^=h>>>16;return (h>>>0)/4294967296}};
function indFromSkin(s){const r=seeded(s.id);const t=[];while(t.length<2){const x=CAT_TRAITS[Math.floor(r()*CAT_TRAITS.length)].id;if(!t.includes(x))t.push(x)}
  const bonus=s.r==='legend'?2:s.r==='rare'?1:0;const stats={};CSTATS.forEach(([k])=>stats[k]=clamp(3+Math.floor(r()*4)+(r()<.5?bonus:0),1,10));
  return {id:'s_'+s.id,skin:s.id,name:s.name,dna:skinToDna(s),traits:t,stats,gen:0,parents:null}}
function cleanKitten(k){if(!k||typeof k!=='object'||!/^k[a-z0-9]{4,12}$/.test(k.id))return null;const dna=cleanDna(k.dna);if(!dna)return null;
  const stats={};CSTATS.forEach(([s])=>stats[s]=clamp(Math.round(+(k.stats&&k.stats[s])||5),1,10));
  return {id:k.id,name:String(k.name||Lx("Котёнок","Kitten")).slice(0,14),dna,traits:[...new Set((Array.isArray(k.traits)?k.traits:[]).filter(t=>TRAIT_BY_ID[t]))].slice(0,3),stats,
    gen:clamp(Math.floor(+k.gen||1),1,99),parents:Array.isArray(k.parents)?k.parents.slice(0,2).map(x=>String(x).slice(0,14)):null,born:+k.born||0,
    origin:k.origin&&typeof k.origin==='object'?Object.fromEntries(Object.entries(k.origin).slice(0,12).map(([a,b])=>[String(a).slice(0,10),String(b).slice(0,6)])):null}}
function allCats(){return [...player.cat.skins.map(id=>indFromSkin(SKIN_BY_ID[id])),...player.kennel]}
function findCat(id){return allCats().find(x=>x.id===id)}
function activeInd(){const c=player.cat;return (c.kid&&player.kennel.find(k=>k.id===c.kid))||indFromSkin(SKIN_BY_ID[c.skin]||SKINS[0])}
function setActive(ind){const c=player.cat;if(ind.skin){c.skin=ind.skin;delete c.kid;delete c.dna}else{c.kid=ind.id;c.dna=ind.dna}}
const hasTr=id=>!!player&&activeInd().traits.includes(id);
const cstat=k=>player?activeInd().stats[k]:5;

const mixHex=(a,b,t=.5)=>'#'+[0,2,4].map(i=>Math.round(parseInt(a.slice(1+i,3+i),16)*(1-t)+parseInt(b.slice(1+i,3+i),16)*t).toString(16).padStart(2,'0')).join('');
function hueShift(hex,deg){let [r,g,b]=[0,2,4].map(i=>parseInt(hex.slice(1+i,3+i),16)/255);const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h=0,s=0,l=(mx+mn)/2;
  if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h/=6}h=(h+deg/360+1)%1;
  const f=(p,q,t)=>{t=(t+1)%1;return t<1/6?p+(q-p)*6*t:t<1/2?q:t<2/3?p+(q-p)*(2/3-t)*6:p};const q=l<.5?l*(1+s):l+s-l*s,p=2*l-q;
  return '#'+[f(p,q,h+1/3),f(p,q,h),f(p,q,h-1/3)].map(v=>Math.round(clamp(v,0,1)*255).toString(16).padStart(2,'0')).join('')}

/* Скрещивание: каждый ген берётся от одного из родителей, иногда смешивается или мутирует */
function breed(A,B){const a=A.dna,b=B.dna,O={},d={};const from=()=>Math.random()<.5?['A',a]:['B',b];
  let r=Math.random(),src;
  if(r<.06){src=from();const sh=rnd(40,300);['main','dark','belly'].forEach(k=>d[k]=hueShift(src[1][k],sh));d.line=src[1].line;d.light=src[1].light;O.coat='mut'}
  else if(r<.28){['main','dark','belly','line'].forEach(k=>d[k]=mixHex(a[k],b[k]));d.light=a.light&&b.light;O.coat='mix'}
  else{src=from();['main','dark','belly','line','light'].forEach(k=>d[k]=src[1][k]);O.coat=src[0]}
  const gene=(k,list,p)=>{if(Math.random()<p){d[k]=pick(list);O[k]='mut'}else{const s=from();d[k]=s[1][k];O[k]=s[0]}};
  gene('pat',PATS.filter(x=>x!=='multi'),.07);gene('style',STYLES,.03);gene('ears',EAR_T,.08);gene('tail',TAIL_T,.08);
  if(d.style!=='brick'&&d.pat==='multi')d.pat='rainbow';
  if(Math.random()<.06){d.glow=pick(NEONS);O.eyes='mut'}else{const s=from();d.glow=s[1].glow;O.eyes=s[0]}
  d.neon=a.neon||b.neon||(d.pat==='circuit'?pick(NEONS):null);
  d.extras=[...new Set([...a.extras,...b.extras])].filter(()=>Math.random()<.5);if(Math.random()<.08){const n=pick(EXTRAS.filter(x=>!d.extras.includes(x)));if(n){d.extras.push(n);O.extras='mut'}}
  if(Math.random()<.05){d.hetero=pick(['#3a86ff','#2e9e5b','#ffd166','#c77dff','#e63946']);O.hetero='mut'}else d.hetero=(a.hetero||b.hetero)&&Math.random()<.4?(a.hetero||b.hetero):null;
  const tr=[pick(A.traits),pick(B.traits)];let tMut=false;if(Math.random()<.12){tr[rnd(0,1)]=pick(CAT_TRAITS).id;tMut=true}
  let traits=[...new Set(tr.filter(Boolean))];while(traits.length<2){const x=pick(CAT_TRAITS).id;if(!traits.includes(x))traits.push(x)}if(tMut)O.traits='mut';
  const stats={};CSTATS.forEach(([k])=>{let v=(Math.random()<.5?A:B).stats[k]+rnd(-1,1);if(Math.random()<.04){v+=2;O['s_'+k]='mut'}stats[k]=clamp(v,1,10)});
  return cleanKitten({id:'k'+Date.now().toString(36)+rnd(10,99),name:pick(KIT_NAMES),dna:d,traits,stats,gen:Math.max(A.gen,B.gen)+1,parents:[A.name,B.name],born:Date.now(),origin:O})}
const kitRarity=k=>{const d=k.dna;const s=d.extras.length+(d.glow?1:0)+(d.hetero?1:0)+(['rainbow','flame','circuit','ghost','stars','shine'].includes(d.pat)?1:0)+(d.ears!=='normal'?.5:0)+(d.tail!=='normal'?.5:0);return s>=3?'legend':s>=1.5?'rare':'common'};
const BREED_COST=10,BREED_TIME=20*60e3,KENNEL_MAX=24;
