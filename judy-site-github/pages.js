(()=>{
 const chapters=[...document.querySelectorAll('main > section')];
 const labels=['Home / 首页','About / 关于我','Experience / 实习科研','Work / 作品','Ideas / 想法','Life / 生活','Contact / 联系'];
 const footer=document.querySelector('footer');
 const dock=document.createElement('nav');dock.className='page-dock';dock.setAttribute('aria-label','Chapter navigation / 翻页导航');
 dock.innerHTML='<button class="page-step" id="previous-page">← Previous / 上一页</button><div class="page-center"><span class="page-status" aria-live="polite" aria-atomic="true"></span><div class="page-tabs"></div></div><button class="page-step" id="next-page">Next / 下一页 →</button>';
 document.body.append(dock);document.body.classList.add('paged');
 const tabs=dock.querySelector('.page-tabs');chapters.forEach((chapter,i)=>{const b=document.createElement('button');b.className='page-tab';b.textContent=String(i+1).padStart(2,'0');b.setAttribute('aria-label',labels[i]);b.addEventListener('click',()=>navigate(i));tabs.append(b);chapter.tabIndex=-1;chapter.setAttribute('aria-label',labels[i])});
 let current=-1,turn=null;
 function show(index,focus=true){if(index===current)return;const direction=index>current?1:-1;turn?.cancel();stop();current=index;chapters.forEach((chapter,i)=>chapter.hidden=i!==index);footer.hidden=index!==chapters.length-1;dock.querySelector('.page-status').textContent=`${index+1} / ${chapters.length} · ${labels[index]}`;dock.querySelector('#previous-page').disabled=index===0;dock.querySelector('#next-page').disabled=index===chapters.length-1;[...tabs.children].forEach((b,i)=>{if(i===index)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});document.querySelectorAll('.header a[href^="#"]').forEach(a=>{if(a.hash==='#'+chapters[index].id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});window.scrollTo({top:0,behavior:'instant'});if(focus)chapters[index].focus({preventScroll:true});if(!isReduced()){turn=chapters[index].animate([{opacity:.2,transform:`translateX(${direction*35}px) rotateY(${direction*3}deg)`},{opacity:1,transform:'none'}],{duration:360,easing:'cubic-bezier(.22,.61,.36,1)'});active.push(turn)}document.title=labels[index].split(' / ')[0]+' — Judy · 路遥';}
 function fromHash(){const i=chapters.findIndex(c=>'#'+c.id===location.hash);show(i<0?0:i)}
 function navigate(index){if(index<0||index>=chapters.length||index===current)return;history.pushState(null,'','#'+chapters[index].id);show(index)}
 dock.querySelector('#previous-page').addEventListener('click',()=>navigate(current-1));dock.querySelector('#next-page').addEventListener('click',()=>navigate(current+1));
 document.addEventListener('click',event=>{const a=event.target.closest('a[href^="#"]');if(!a)return;const i=chapters.findIndex(c=>'#'+c.id===a.hash);if(i>=0){event.preventDefault();navigate(i)}});
 window.addEventListener('popstate',fromHash);window.addEventListener('hashchange',fromHash);
 document.addEventListener('keydown',event=>{if(dialog.open||event.altKey||event.ctrlKey||event.metaKey||event.target.closest('input,textarea,select,[contenteditable=true]'))return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();navigate(current+(event.key==='ArrowRight'?1:-1))}});
 let touch=null;document.querySelector('main').addEventListener('touchstart',event=>{touch=event.touches.length===1&&!event.target.closest('button,a,dialog,input,textarea')?{x:event.touches[0].clientX,y:event.touches[0].clientY}:null},{passive:true});
 document.querySelector('main').addEventListener('touchend',event=>{if(!touch||dialog.open)return;const dx=event.changedTouches[0].clientX-touch.x,dy=event.changedTouches[0].clientY-touch.y;touch=null;if(Math.abs(dx)>75&&Math.abs(dx)>Math.abs(dy)*1.8)navigate(current+(dx<0?1:-1))},{passive:true});
 fromHash();
})();
