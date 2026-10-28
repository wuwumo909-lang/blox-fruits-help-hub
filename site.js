(function(){
  const key='blox_help_events';
  function track(type, value){
    const item={type,value,time:new Date().toISOString(),path:location.pathname};
    try{const list=JSON.parse(localStorage.getItem(key)||'[]'); list.push(item); localStorage.setItem(key,JSON.stringify(list.slice(-100)));}catch(e){}
    window.dispatchEvent(new CustomEvent('blox:track',{detail:item}));
  }
  window.copyCode=function(code,button){
    track('copy_code',code);
    navigator.clipboard?.writeText(code).then(()=>{
      const old=button.textContent; button.textContent='Copied';
      setTimeout(()=>button.textContent=old,1200);
    }).catch(()=>{button.textContent='Copy manually';});
  };
  function applyFilters(){
    const q=(document.querySelector('#code-search')?.value||'').toLowerCase();
    const status=document.querySelector('#status-filter')?.value||'all';
    const rows=[...document.querySelectorAll('[data-code-row]')]; let visible=0;
    rows.forEach(row=>{const text=row.innerText.toLowerCase(); const isReported=row.innerText.includes('Reported active'); const okQ=!q||text.includes(q); const okStatus=status==='all'||(status==='reported'&&isReported)||(status==='check'&&!isReported); row.hidden=!(okQ&&okStatus); if(okQ&&okStatus)visible++;});
    const count=document.querySelector('#code-count'); if(count) count.textContent=`${visible} matching code${visible===1?'':'s'}`;
  }
  document.addEventListener('DOMContentLoaded',()=>{document.querySelector('#code-search')?.addEventListener('input',applyFilters); document.querySelector('#status-filter')?.addEventListener('change',applyFilters); applyFilters();});
  document.addEventListener('click',e=>{
    const link=e.target.closest('a[href]');
    if(link) track('click_link',link.getAttribute('href'));
  });
})();
