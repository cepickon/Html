// Menu na mobilu
const burger=document.querySelector('.burger'),menu=document.getElementById('menu');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
menu.addEventListener('click',e=>{if(e.target.tagName==='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}});

// Psaní příkazu v terminálu
const lines=['ping skola.neratovice.cz','git commit -m "první web"','ssh admin@server-4-rocnik'];
const typed=document.getElementById('typed');let li=0,ci=0;
function type(){const l=lines[li];
  if(ci<=l.length){typed.textContent=l.slice(0,ci++);setTimeout(type,70)}
  else{setTimeout(()=>{ci=0;li=(li+1)%lines.length;type()},1800)}}
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)type();else typed.textContent=lines[0];

// Záložky
const data={
 p:['Programování','HTML, CSS, JavaScript a další jazyky','Tvorba webových a databázových aplikací','Práce s verzovacími nástroji a týmová práce'],
 s:['Počítačové sítě','Návrh, realizace a správa sítí','Adresace, směrování, switche a routery','Zabezpečení sítě a řešení poruch'],
 o:['Operační systémy','Instalace a správa Windows i Linuxu','Správa uživatelů a aplikačního software','Podpora uživatelů a řešení problémů'],
 h:['Hardware','Skládání, údržba a diagnostika počítačů','Návrh HW řešení podle účelu nasazení','Základy elektrotechniky a mikrokontrolery']};
const panel=document.getElementById('panel');
function show(k){const [t,...li]=data[k];panel.innerHTML='<h3>'+t+'</h3><ul>'+li.map(x=>'<li>'+x+'</li>').join('')+'</ul>'}
document.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.tabs button').forEach(x=>x.setAttribute('aria-selected',x===b));show(b.dataset.tab)}));
show('p');

// Kvíz
const qs=[
 {q:'Co tě na počítačích baví nejvíc?',a:[['Vymýšlet, jak něco naprogramovat','p'],['Zapojovat a rozchodit věci','s'],['Pomáhat lidem, když jim něco nefunguje','o'],['Rozebírat a skládat techniku','h']]},
 {q:'Jaký projekt by ses pustil/a do?',a:[['Vlastní hra nebo aplikace','p'],['Domácí síť s Wi-Fi a serverem','s'],['Počítačová učebna pro celou třídu','o'],['Chytrá domácnost s čidly','h']]},
 {q:'Jak řešíš problém?',a:[['Napíšu si na to skript','p'],['Zkouším spojení krok za krokem','s'],['Hledám v logu a návodech','o'],['Prohlédnu si zařízení zblízka','h']]}];
const res={p:['Programátor','Líbí se ti tvořit. Na škole si vyzkoušíš web, databáze i aplikace.'],
 s:['Správce sítí','Spojuješ věci dohromady. Sítě a jejich zabezpečení budou tvoje hřiště.'],
 o:['Správce systémů a podpora','Rád/a pomáháš. Správa systémů a uživatelská podpora ti sednou.'],
 h:['Technik IT','Máš ruce na technice. Hardware a elektrotechnika tě pohltí.']};
const box=document.getElementById('quiz');let step=0,score={};
function render(){
  if(step>=qs.length){const w=Object.keys(score).sort((a,b)=>score[b]-score[a])[0];
    box.innerHTML='<h3>Tvoje role: '+res[w][0]+'</h3><p>'+res[w][1]+'</p><button class="btn" id="again">Zkusit znovu</button> <a class="btn ghost" href="#kontakt">Chci studovat</a>';
    document.getElementById('again').onclick=()=>{step=0;score={};render()};return}
  const q=qs[step];
  box.innerHTML='<div class="bar"><i style="width:'+(step/qs.length*100)+'%"></i></div><h3>'+q.q+'</h3><div class="opts">'+
    q.a.map((x,i)=>'<button data-k="'+x[1]+'">'+x[0]+'</button>').join('')+'</div>';
  box.querySelectorAll('.opts button').forEach(b=>b.onclick=()=>{score[b.dataset.k]=(score[b.dataset.k]||0)+1;step++;render()})}
render();

// Zvýraznění aktivní sekce v menu
const links=[...menu.querySelectorAll('a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section').forEach(s=>io.observe(s));
