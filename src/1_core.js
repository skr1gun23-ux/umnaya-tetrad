/* ===== Общие помощники ===== */
const $=s=>document.querySelector(s);
const app=$('#app');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rnd=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[rnd(0,a.length-1)];
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=rnd(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
const plural=(n,f)=>{const m10=n%10,m100=n%100;return f[m10===1&&m100!==11?0:m10>=2&&m10<=4&&(m100<10||m100>=20)?1:2]};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const reduced=(()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}})();
let svgId=0;const uid=p=>p+(++svgId);

/* ===== Звук ===== */
let ac;function tone(f,t0,dur,type='sine',vol=.1){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();
  const o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);
  o.type=type;o.frequency.value=f;g.gain.setValueAtTime(vol,ac.currentTime+t0);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+t0+dur);
  o.start(ac.currentTime+t0);o.stop(ac.currentTime+t0+dur+.02)}catch(e){}}
function beep(ok){if(ok){tone(660,0,.2);tone(880,.1,.25)}else tone(200,0,.3,'square')}
function fanfare(){[523,659,784,1047].forEach((f,i)=>tone(f,i*.12,.3,'triangle',.12))}
function purr(){tone(90,0,.35,'sawtooth',.04);tone(110,.15,.3,'sawtooth',.03)}

let toastTimer;function toast(msg){const t=$('#toast');t.innerHTML=`<div class="toast" role="status">${msg}</div>`;clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.innerHTML='',3200)}

const star5=(cx,cy,r,fill,stroke='none')=>{let p='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;p+=(i?'L':'M')+(cx+rr*Math.cos(a)).toFixed(1)+' '+(cy+rr*Math.sin(a)).toFixed(1)}
  return `<path d="${p}Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`};
const heart=(cx,cy,s,fill)=>`<path d="M${cx} ${cy+s*.9} C${cx-s*1.6} ${cy-s*.1} ${cx-s*.8} ${cy-s*1.2} ${cx} ${cy-s*.4} C${cx+s*.8} ${cy-s*1.2} ${cx+s*1.6} ${cy-s*.1} ${cx} ${cy+s*.9}Z" fill="${fill}" opacity=".92"/>`;
const RARITY={common:{name:'Обычная',dup:2},rare:{name:'Редкая',dup:5},legend:{name:'Легендарная',dup:12}};
