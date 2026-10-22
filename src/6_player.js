/* ===== Игрок, сохранение, таблица лидеров =====
   На claude.ai таблица общая (база артефакта). В скачанном index.html всё хранится в этом браузере. */
const store={mode:'local',db:null,uid:null,leaders:[],writeTimer:null,writeQ:Promise.resolve(),art:undefined};
let player=null;
const nickKey=n=>n.trim().toLowerCase().replace(/ё/g,'е').replace(/\s+/g,' ');
const NICK_RE=/^[A-Za-zА-Яа-яЁё0-9 _-]{2,16}$/;
const OLD_FUR={fur_orange:'sk_orange',fur_grey:'sk_grey',fur_white:'sk_white',fur_black:'sk_black',fur_siamese:'sk_siamese',fur_pink:'sk_pink',fur_space:'sk_space'};

function normalize(p){if(!p)return p;
  p.nick=String(p.nick||'Игрок').slice(0,16);p.stars=+p.stars||0;p.spent=+p.spent||0;p.games=+p.games||0;p.xp=+p.xp||0;
  p.best=p.best&&typeof p.best==='object'?p.best:{};p.buff={xp2:clamp(+(p.buff&&p.buff.xp2)||0,0,10)};
  if(!p.gifts||typeof p.gifts!=='object')p.gifts={clothes:p.gift!==false,cats:true,room:true};delete p.gift;
  const c=p.cat=p.cat&&typeof p.cat==='object'?p.cat:{};c.name=String(c.name||'Мурзик').slice(0,14);
  const oldOwned=Array.isArray(c.owned)?c.owned:[];
  c.skins=[...new Set([...(Array.isArray(c.skins)?c.skins:[]),...oldOwned.map(x=>OLD_FUR[x]).filter(Boolean),'sk_orange'])].filter(id=>SKIN_BY_ID[id]);
  c.skin=SKIN_BY_ID[c.skin]?c.skin:OLD_FUR[c.fur]||'sk_orange';if(!c.skins.includes(c.skin))c.skins.push(c.skin);delete c.fur;
  c.owned=[...new Set(oldOwned.filter(id=>WEAR_BY_ID[id]))];
  const wear={};if(c.wear&&typeof c.wear==='object')for(const [s,id] of Object.entries(c.wear)){const w=WEAR_BY_ID[id];if(w&&w.slot===s&&c.owned.includes(id))wear[s]=id}c.wear=wear;
  c.food=c.food==null?80:clamp(+c.food||0,0,100);c.joy=c.joy==null?70:clamp(+c.joy||0,0,100);c.t=+c.t||Date.now();
  const r=p.room=p.room&&typeof p.room==='object'?p.room:{};
  r.owned=[...new Set([...(Array.isArray(r.owned)?r.owned:[]),'wp_plain','fl_wood'])].filter(id=>FURN_BY_ID[id]||WALL_BY_ID[id]||FLOOR_BY_ID[id]);
  r.wp=WALL_BY_ID[r.wp]&&r.owned.includes(r.wp)?r.wp:'wp_plain';r.fl=FLOOR_BY_ID[r.fl]&&r.owned.includes(r.fl)?r.fl:'fl_wood';
  const place={};if(r.place&&typeof r.place==='object')for(const [s,id] of Object.entries(r.place)){const f=FURN_BY_ID[id];if(f&&f.slot===s&&r.owned.includes(id))place[s]=id}r.place=place;
  return p}
const wallet=()=>player?Math.max(0,player.stars-player.spent):0;
function tick(){if(!player)return;const c=player.cat,now=Date.now(),h=(now-c.t)/36e5;
  if(h>0){c.food=clamp(c.food-6*h,0,100);c.joy=clamp(c.joy-5*h,0,100);c.t=now}}
function mood(){if(!player)return 'normal';const c=player.cat;return c.food<25||c.joy<25?'sad':c.joy>=65&&c.food>=40?'happy':'normal'}

const TITLES=[[1,'Котёнок-новичок'],[3,'Юный умник'],[6,'Знаток'],[10,'Мудрый кот'],[15,'Профессор'],[20,'Гений'],[30,'Легенда тетрадки']];
function lvlInfo(xp){let l=1,need=100,x=xp;while(x>=need){x-=need;l++;need=100+(l-1)*40}return {l,cur:x,need,title:TITLES.filter(t=>t[0]<=l).pop()[1]}}

function localPlayers(){return LS.get('ut2_players',{})}
function saveLocal(){if(!player)return;const all=localPlayers();all[nickKey(player.nick)]=player;LS.set('ut2_players',all)}
function savePlayer(now){saveLocal();if(store.mode!=='online')return;clearTimeout(store.writeTimer);
  const go=()=>{const data={...player,updated:Date.now()};store.writeQ=store.writeQ.then(()=>store.db.doc('players/'+store.uid).set(data)).catch(()=>{})};
  if(now)go();else store.writeTimer=setTimeout(go,1200)}
async function loadArt(){if(store.art!==undefined)return store.art;
  if(store.mode==='online'){try{const s=await store.db.doc('players/'+store.uid+'/art/main').get();store.art=s.exists&&typeof s.data().img==='string'&&s.data().img.startsWith('data:image/')?s.data().img:null}catch(e){store.art=null}}
  else{const a=LS.get('ut2_art:'+nickKey(player.nick),null);store.art=typeof a==='string'&&a.startsWith('data:image/')?a:null}
  return store.art}
async function saveArt(url){store.art=url;
  if(store.mode==='online'){try{await store.db.doc('players/'+store.uid+'/art/main').set({img:url,t:Date.now()})}catch(e){}}
  else LS.set('ut2_art:'+nickKey(player.nick),url)}

async function initStore(){
  if(window.claude&&typeof window.claude.use==='function'){
    try{const [db,user]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);const id=user?await user.id():null;
      if(db&&id){store.mode='online';store.db=db;store.uid=id;
        const snap=await db.doc('players/'+id).get();if(snap.exists)player=normalize({...snap.data()});
        db.collection('players').orderBy('stars','desc').limit(100).onSnapshot(s=>{
          store.leaders=s.docs.map(d=>({...normalize({...d.data()}),self:d.id===id}));if(screen==='leaders')leaders()},()=>{});
        return}}catch(e){}}
  store.mode='local';const cur=LS.get('ut2_current',null);const all=localPlayers();if(cur&&all[cur])player=normalize(all[cur])}
function newPlayer(nick){return normalize({nick:nick.trim()})}
async function claimNick(nick){const key=nickKey(nick);
  if(store.mode==='local'){if(localPlayers()[key])return 'Такой ник уже есть. Придумай другой или нажми на свой ник ниже.';
    player=newPlayer(nick);saveLocal();LS.set('ut2_current',key);return null}
  const db=store.db;const ref=db.doc('nicks/'+encodeURIComponent(key).replace(/%/g,'~'));
  try{const lease=await ref.acquire({holder:store.uid,ttlMs:5000});
    if(!lease.acquired)return 'Этот ник прямо сейчас занимает кто-то другой. Попробуй другой.';
    const s=await ref.get();if(s.exists&&s.data().uid&&s.data().uid!==store.uid)return 'Такой ник уже занят. Придумай другой.';
    await ref.set({uid:store.uid,nick:nick.trim()});player=newPlayer(nick);await db.doc('players/'+store.uid).set({...player,updated:Date.now()});return null}
  catch(e){store.mode='local';if(localPlayers()[key])return 'Не получилось подключиться к общей таблице. Ник уже есть на этом устройстве, выбери его ниже.';
    player=newPlayer(nick);saveLocal();LS.set('ut2_current',key);return null}}

/* Награда за игру: звёзды, опыт, уровень */
function grant(stars,xp){const before=lvlInfo(player.xp).l;player.stars+=stars;player.xp+=xp;
  const after=lvlInfo(player.xp).l;const bonus=after>before?5*(after-before):0;player.stars+=bonus;return {xp,up:after>before,level:after,bonus}}
function record(game,stars,xp,value,lowerBetter,bestKey=game){
  const b=player.buff||{};if(b.xp2>0){xp*=2;player.buff={...b,xp2:b.xp2-1}}
  player.games+=1;const {up,level:after,bonus}=grant(stars,xp);
  tick();player.cat.joy=clamp(player.cat.joy+15,0,100);player.cat.food=clamp(player.cat.food-3,0,100);
  if(value!=null){const old=player.best[bestKey];if(old==null||(lowerBetter?value<old:value>old))player.best={...player.best,[bestKey]:value}}
  savePlayer(true);renderMe();return {xp,up,level:after,bonus,doubled:b.xp2>0}}

function renderMe(){const el=$('#me');if(!player){el.innerHTML='';return}const L=lvlInfo(player.xp);
  el.innerHTML=`<span class="chip" title="${esc(L.title)}"><i>Ур. ${L.l}</i><b>★</b>${wallet()}<span style="color:var(--text)">· ${esc(player.nick)}</span></span>
  <button class="link" id="toCat">Котёнок</button><button class="link" id="toLeaders">Лидеры</button>${store.mode==='local'?'<button class="link" id="logout">Сменить игрока</button>':''}`;
  $('#toLeaders').onclick=leaders;$('#toCat').onclick=()=>catScreen('wear');
  const lo=$('#logout');if(lo)lo.onclick=()=>{LS.set('ut2_current',null);player=null;store.art=undefined;renderMe();login()}}
function xpBar(){const L=lvlInfo(player.xp);return `<div class="lvl"><b>Уровень ${L.l}</b><em>${esc(L.title)} · опыт ${L.cur} из ${L.need}</em></div>
  <div class="track"><div class="fill" style="width:${Math.round(L.cur/L.need*100)}%;background:var(--xp)"></div></div>`}
