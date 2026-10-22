/* ===== Переключение языка флажком ===== */
const FLAGS={ru:`<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#fff"/><rect y="13.3" width="60" height="13.4" fill="#0039a6"/><rect y="26.7" width="60" height="13.3" fill="#d52b1e"/></svg>`,
  en:`<svg viewBox="0 0 60 40" aria-hidden="true"><clipPath id="ukc"><rect width="60" height="40"/></clipPath><g clip-path="url(#ukc)"><rect width="60" height="40" fill="#012169"/><path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0 L60 40 M60 0 L0 40" stroke="#c8102e" stroke-width="3"/><path d="M30 0 V40 M0 20 H60" stroke="#fff" stroke-width="12"/><path d="M30 0 V40 M0 20 H60" stroke="#c8102e" stroke-width="7"/></g></svg>`};
function setLang(l){if(l===lang)return;try{localStorage.setItem('ut2_lang',l)}catch(e){}
  if(player){clearTimeout(store.writeTimer);savePlayer(true)}
  Promise.resolve(store.writeQ).finally(()=>{try{location.reload()}catch(e){}})}
(function(){document.documentElement.lang=lang;document.title=Lx('Умная тетрадка','Smart Notebook');
  $('#logo').textContent=Lx('Умная тетрадка','Smart Notebook');$('.sub').textContent=Lx('Развивающие игры для 1–4 класса','Learning games for grades 1–4');
  $('.foot').textContent=Lx('За правильные ответы дают звёзды ★ и опыт. Опыт повышает уровень, а звёзды можно тратить на сундуки: с одеждой, с котятами и с мебелью для комнаты. В таблице лидеров считаются все заработанные звёзды.',
    'Correct answers earn stars ★ and XP. XP raises your level, and stars can be spent on chests with clothes, kittens and furniture for the room. The leaderboard counts all the stars you have earned.');
  const e=app.querySelector('.empty');if(e)e.textContent=Lx('Открываем тетрадку…','Opening the notebook…');
  const box=document.createElement('div');box.className='langs';box.setAttribute('role','group');box.setAttribute('aria-label','Язык / Language');
  box.innerHTML=['ru','en'].map(l=>`<button data-lang="${l}" aria-pressed="${l===lang}" title="${l==='ru'?'Русский':'English'}" aria-label="${l==='ru'?'Русский':'English'}">${FLAGS[l]}</button>`).join('');
  document.querySelector('header').prepend(box);box.querySelectorAll('button').forEach(b=>b.onclick=()=>setLang(b.dataset.lang))})();
