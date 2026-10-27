function copyCode(code, button){
  navigator.clipboard?.writeText(code).then(()=>{
    const old=button.textContent; button.textContent='Copied';
    setTimeout(()=>button.textContent=old,1200);
  }).catch(()=>{button.textContent='Copy manually';});
}
