(()=>{
const dog=document.querySelector('.collie-approach'),sprite=document.querySelector('.collie-sprite'),button=document.querySelector('#collie-replay'),envelope=document.querySelector('#letter-toggle'),letter=document.querySelector('#judy-letter'),close=document.querySelector('#letter-close'),stage=document.querySelector('.collie-stage');let runs=[],visible=false;
function halt(){runs.forEach(a=>a.cancel());runs=[]}
function setOpen(open){envelope.setAttribute('aria-expanded',String(open));envelope.setAttribute('aria-label',open?'收起 Judy 的联系信封':'打开 Judy 的联系信封');letter.hidden=!open;if(open&&!isReduced())letter.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:550,easing:'ease-out'});}
function play(){halt();setOpen(false);if(isReduced())return;
runs.push(dog.animate([{transform:'translateY(-34px) scale(.4)',opacity:.5},{transform:'translateY(-20px) scale(.62)',opacity:1,offset:.45},{transform:'translateY(0) scale(1)',offset:1}],{duration:3000,easing:'cubic-bezier(.2,.55,.35,1)'}));
// Step each frame separately. Align all four noses to the envelope grip point.
runs.push(sprite.animate([
{backgroundPosition:'0% 0%',transform:'translate(-6%,0)',offset:0,easing:'steps(1,end)'},
{backgroundPosition:'33.333333% 0%',transform:'translate(5%,-1%)',offset:.25,easing:'steps(1,end)'},
{backgroundPosition:'66.666667% 0%',transform:'translate(5%,0)',offset:.5,easing:'steps(1,end)'},
{backgroundPosition:'100% 0%',transform:'translate(6%,-4%)',offset:.75,easing:'steps(1,end)'},
{backgroundPosition:'0% 0%',transform:'translate(-6%,0)',offset:1}
],{duration:600,iterations:5,easing:'linear'}));active.push(...runs)}
envelope.addEventListener('click',()=>{halt();const open=envelope.getAttribute('aria-expanded')!=='true';setOpen(open);if(open){letter.querySelector('a').focus({preventScroll:true});letter.scrollIntoView({behavior:isReduced()?'instant':'smooth',block:'center'})}});
close.addEventListener('click',()=>{setOpen(false);envelope.focus()});
letter.addEventListener('keydown',e=>{if(e.key==='Escape'){setOpen(false);envelope.focus()}});
button.addEventListener('click',play);
new IntersectionObserver(es=>{const now=es.some(e=>e.isIntersecting);if(now&&!visible&&letter.hidden)play();if(!now)halt();visible=now},{threshold:.3}).observe(stage);
reduce.addEventListener('change',halt);document.querySelector('#motion-toggle').addEventListener('click',halt)
})();
