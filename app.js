/* bingo app: loads data.json, renders 5x5 grid, persists checks in a cookie */
(function(){
  const DATA_URL = 'data.json';
  const COOKIE_NAME = 'bingo_checks';
  const COOKIE_DAYS = 365;

  function setCookie(name, value, days){
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = `${name}=${encodeURIComponent(value)};path=/;expires=${d.toUTCString()}`;
  }

  function getCookie(name){
    const parts = document.cookie.split(';').map(s=>s.trim());
    for(const p of parts){
      if(p.startsWith(name+'=')) return decodeURIComponent(p.substring(name.length+1));
    }
    return null;
  }

  function saveChecked(indices){
    setCookie(COOKIE_NAME, JSON.stringify(indices), COOKIE_DAYS);
  }

  function loadChecked(){
    const v = getCookie(COOKIE_NAME);
    if(!v) return [];
    try{ return JSON.parse(v) }catch(e){return []}
  }

  function createCell(text, idx, checked){
    const el = document.createElement('div');
    el.className = 'cell card p-0';
    el.dataset.index = idx;

    const span = document.createElement('div');
    span.className = 'text p-2';
    span.textContent = text;
    el.appendChild(span);

    const check = document.createElement('div');
    check.className = 'check';
    check.innerHTML = '<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.485 1.929a1 1 0 0 1 0 1.414l-7.071 7.071a1 1 0 0 1-1.414 0L2.515 8.93a1 1 0 1 1 1.414-1.414l1.95 1.95 6.364-6.364a1 1 0 0 1 1.414 0z"/></svg>';
    el.appendChild(check);

    if(checked){ el.classList.add('checked','disabled'); }

    el.addEventListener('click', ()=>{
      if(el.classList.contains('checked')) return;
      el.classList.add('checked','disabled');
      const current = loadChecked();
      current.push(idx);
      saveChecked(current);
    });

    return el;
  }

  async function init(){
    const grid = document.getElementById('bingo-grid');
    const titleEl = document.getElementById('bingo-title');
    try{
      const resp = await fetch(DATA_URL, {cache:'no-cache'});
      const json = await resp.json();

      titleEl.textContent = json.title || 'Bingo';

      const items = json.items || [];
      // ensure 25 items
      while(items.length < 25) items.push('');

      const checked = new Set(loadChecked());

      items.slice(0,25).forEach((it,i)=>{
        const c = createCell(it, i, checked.has(i));
        grid.appendChild(c);
      });
    }catch(err){
      titleEl.textContent = 'Failed to load data';
      grid.textContent = 'Unable to load bingo data.';
      console.error(err);
    }
  }

  window.addEventListener('DOMContentLoaded', init);
})();
