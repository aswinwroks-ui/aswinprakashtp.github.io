const projects={
  "jge": {
    "key": "jge",
    "name": "JGE-2 International School",
    "title": "JGE-2<br><em>International School.</em>",
    "theme": "theme-dark",
    "sector": "EDUCATION",
    "location": "UAE",
    "employer": "9e Global",
    "role": "Structural Modeler",
    "tags": [
      "LOD 350–400",
      "GA & STAIR PACKAGES",
      "MODEL HEALTH"
    ],
    "summary": "Structural BIM delivery across the Primary, Admin and Sports blocks, from model setup to issued documentation.",
    "scope": [
      "Led the LOD 350–400 structural model across the Primary, Admin and Sports blocks.",
      "Owned GA, stair and reinforcement documentation through to issued sheets.",
      "Managed foundation alignment and clash checks against linked models."
    ],
    "deliverables": [
      "Ran the model health audit, identifying 3,452 warnings, including 309 duplicate Marks and 42 stair violations, and drove clean-up with the team.",
      "Automated beam reinforcement schedules and bulk Mark renaming from marked-up PDFs."
    ],
    "number": "01 / 05",
    "category": "Structural Modeler · 9e Global · UAE"
  },
  "palm": {
    "key": "palm",
    "name": "DHRE Palm Springs",
    "title": "DHRE<br><em>Palm Springs.</em>",
    "theme": "theme-lime",
    "sector": "STRUCTURAL COORDINATION",
    "location": "UAE",
    "employer": "9e Global",
    "role": "Structural Modeler",
    "tags": [
      "COLUMN-POSITION QC",
      "STEEL FRAMING",
      "AUTOMATION"
    ],
    "summary": "Structural quality control and coordinated detailing, supported by automated drawing-submission workflows.",
    "scope": [
      "Led structural QC of column positions against linked architectural models.",
      "Coordinated steel framing alignment and facade periphery detailing."
    ],
    "deliverables": [
      "Set up the submission folder structure.",
      "Developed drawing-code file automation to support project submissions."
    ],
    "number": "02 / 05",
    "category": "Structural Modeler · 9e Global · UAE"
  },
  "marjan": {
    "key": "marjan",
    "name": "Al Marjan World",
    "title": "Al Marjan<br><em>World.</em>",
    "theme": "theme-gray",
    "sector": "STRUCTURAL BIM",
    "location": "Ras Al Khaimah, UAE",
    "employer": "9e Global",
    "role": "Structural Modeler",
    "tags": [
      "LOD 350–400",
      "QTO",
      "SHOP DRAWINGS"
    ],
    "summary": "A structural model developed to client BIM requirements, with coordinated quantities and shop drawing outputs.",
    "scope": [
      "Delivered the LOD 350–400 structural model to client BIM requirements."
    ],
    "deliverables": [
      "Led quantity take-offs and shop drawing extraction from the model.",
      "Represented the structural model in multidisciplinary coordination meetings."
    ],
    "number": "03 / 05",
    "category": "Structural Modeler · 9e Global · Ras Al Khaimah, UAE"
  },
  "horizon": {
    "key": "horizon",
    "name": "Horizon English School",
    "title": "Horizon<br><em>English School.</em>",
    "theme": "theme-silver",
    "sector": "EDUCATION",
    "location": "Dubai, UAE",
    "employer": "9e Global",
    "role": "Structural Modeler",
    "tags": [
      "REVIT STRUCTURE",
      "CONSTRUCTION ISSUE"
    ],
    "summary": "School structural modeling and construction documentation, managed from setup through design revisions.",
    "scope": [
      "Led the structural Revit model for the school from setup to construction issue."
    ],
    "deliverables": [
      "Owned the construction documentation set: GA plans, sections and sheets.",
      "Kept the model and drawings consistent through design revisions."
    ],
    "number": "04 / 05",
    "category": "Structural Modeler · 9e Global · Dubai, UAE"
  },
  "quarters": {
    "key": "quarters",
    "name": "MLA Quarters",
    "title": "MLA<br><em>Quarters.</em>",
    "theme": "theme-olive",
    "sector": "PUBLIC SECTOR",
    "location": "Trivandrum, India",
    "employer": "ULCCS",
    "role": "Lead BIM Modeler",
    "tags": [
      "ARCH / STRUCT / MEPF",
      "NAVISWORKS"
    ],
    "summary": "Multidisciplinary BIM delivery applying company-wide Revit standards to a public-sector project.",
    "scope": [
      "Led the multidisciplinary model covering architectural, structural and MEPF systems."
    ],
    "deliverables": [
      "Ran Navisworks clash detection and tracked issues through to resolution.",
      "Applied the company Revit template and standards on a live public-sector project."
    ],
    "number": "05 / 05",
    "category": "Lead BIM Modeler · ULCCS · Trivandrum, India"
  }
};
// Small, interruptible animations; content stays visible without JavaScript.
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
const runningMotion=new Set();
const motionEase='cubic-bezier(.22,1,.36,1)';
function animateElement(element,frames,options={}) {
  if(motionPreference.matches || !element?.animate)return null;
  const animation=element.animate(frames,{duration:420,easing:motionEase,...options});
  runningMotion.add(animation);
  animation.finished.then(()=>runningMotion.delete(animation),()=>runningMotion.delete(animation));
  return animation;
}
let revealObserver;
if(!motionPreference.matches && 'IntersectionObserver' in window) {
  revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{
      if(!isIntersecting)return;
      revealObserver.unobserve(target);
      if(target.contains(document.activeElement))return;
      animateElement(target,[{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}]);
    });
  },{threshold:0.08});
  document.querySelectorAll('.section-heading,.bim-projects>.project,.automation-card,.about-intro,.profile-facts,.career-row,.skills-grid article,.training,.contact').forEach(element=>revealObserver.observe(element));
}
document.addEventListener('focusin',event=>{
  for(const animation of runningMotion){
    if(animation.effect?.target?.contains(event.target))animation.cancel();
  }
});
motionPreference.addEventListener('change',event=>{
  if(!event.matches)return;
  revealObserver?.disconnect();
  for(const animation of runningMotion)animation.cancel();
});
const dialog=document.querySelector('#project-dialog');
const keys=Object.keys(projects);
let activeProject=0;
let returnFocus;
let dialogMotion;
let contentMotion;
let closing=false;
function showProject(key){
  const project=projects[key];
  if(!project || closing)return;
  const wasOpen=dialog.open;
  activeProject=keys.indexOf(key);
  for(const [field,value] of Object.entries({title:project.name,number:project.number,category:project.category,summary:project.summary,location:project.location}))document.getElementById(`case-${field}`).textContent=value;
  for (const [field,items] of [['idea',project.scope],['direction',project.deliverables]]) {
    document.getElementById(`case-${field}`).replaceChildren(...items.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
  }
  const visual=document.querySelector(`.project-${key} .project-visual`).cloneNode(true);
  visual.querySelector('.view-project')?.remove();
  document.querySelector('#case-visual').replaceChildren(visual);
  if(!wasOpen){returnFocus=document.activeElement;dialog.showModal();document.body.classList.add('dialog-is-open');}
  dialog.scrollTop=0;
  document.querySelector('.close-dialog').focus();
  dialogMotion?.cancel();
  contentMotion?.cancel();
  if(!wasOpen)dialogMotion=animateElement(dialog,[{opacity:0,transform:'translateY(12px) scale(.985)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:260});
  else contentMotion=animateElement(document.querySelector('.case-content'),[{opacity:.3,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:220});
}
async function closeProject(){
  if(closing || !dialog.open)return;
  closing=true;
  dialogMotion?.cancel();
  contentMotion?.cancel();
  dialogMotion=animateElement(dialog,[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(8px)'}],{duration:140,easing:'ease-in'});
  if(dialogMotion)await dialogMotion.finished.catch(()=>{});
  dialog.close();
  closing=false;
}
// Project details transcribed and adapted from the user-supplied Aswin_Prakash_CV.pdf.
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>showProject(button.dataset.project)));
document.querySelector('.close-dialog').addEventListener('click',closeProject);
document.querySelector('#next-project').addEventListener('click',()=>showProject(keys[(activeProject+1)%keys.length]));
dialog.addEventListener('cancel',event=>{event.preventDefault();closeProject();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeProject();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-is-open');returnFocus?.focus();});

// Pointer effects use one scheduled update per frame and never run on touch.
const finePointer=window.matchMedia('(hover:hover) and (pointer:fine)');
const hero=document.querySelector('.hero');
const grid=document.querySelector('.blueprint-grid');
const progress=document.querySelector('.scroll-progress');
const interactiveCards=[...document.querySelectorAll('.bim-projects>.project')];
let pointerFrame=0;
let pendingPointer;
function schedulePointer(update){
  pendingPointer=update;
  if(pointerFrame)return;
  pointerFrame=requestAnimationFrame(()=>{pointerFrame=0;pendingPointer?.();pendingPointer=null;});
}
function stopPointer(){cancelAnimationFrame(pointerFrame);pointerFrame=0;pendingPointer=null;}
function resetCard(card){
  card.classList.remove('is-tilting');
  ['--tilt-x','--tilt-y','--shine-x','--shine-y'].forEach(name=>card.style.removeProperty(name));
}
hero.addEventListener('pointermove',event=>{
  if(motionPreference.matches || !finePointer.matches || event.pointerType==='touch')return;
  const bounds=hero.getBoundingClientRect();
  const x=(event.clientX-bounds.left)/bounds.width-.5;
  const y=(event.clientY-bounds.top)/bounds.height-.5;
  schedulePointer(()=>{grid.style.setProperty('--grid-x',`${x*12}px`);grid.style.setProperty('--grid-y',`${y*12}px`);});
});
hero.addEventListener('pointerleave',()=>{stopPointer();grid.style.removeProperty('--grid-x');grid.style.removeProperty('--grid-y');});
interactiveCards.forEach(card=>{
  card.addEventListener('pointermove',event=>{
    if(motionPreference.matches || !finePointer.matches || event.pointerType==='touch')return;
    const bounds=card.getBoundingClientRect();
    const x=Math.max(-.5,Math.min(.5,(event.clientX-bounds.left)/bounds.width-.5));
    const y=Math.max(-.5,Math.min(.5,(event.clientY-bounds.top)/bounds.height-.5));
    schedulePointer(()=>{
      card.classList.add('is-tilting');
      card.style.setProperty('--tilt-x',`${-y*12}deg`);card.style.setProperty('--tilt-y',`${x*12}deg`);
      card.style.setProperty('--shine-x',`${x*40}%`);card.style.setProperty('--shine-y',`${y*40}%`);
    });
  });
  card.addEventListener('pointerleave',()=>{stopPointer();resetCard(card);});
  card.addEventListener('click',()=>{stopPointer();resetCard(card);});
});
let progressFrame=0;
function updateProgress(){
  progressFrame=0;
  const range=document.documentElement.scrollHeight-window.innerHeight;
  const value=range>0?Math.max(0,Math.min(1,window.scrollY/range)):0;
  progress.style.transform=`scaleX(${value})`;
}
function queueProgress(){if(!progressFrame)progressFrame=requestAnimationFrame(updateProgress);}
window.addEventListener('scroll',queueProgress,{passive:true});
window.addEventListener('resize',queueProgress,{passive:true});
window.addEventListener('load',queueProgress,{once:true});
if('ResizeObserver' in window)new ResizeObserver(queueProgress).observe(document.body);
updateProgress();
// LOD is a specification, so it stays fixed; only the two quantity metrics count up.
const counters=[...document.querySelectorAll('[data-count]')];
const counterFrames=new Map();
let counterObserver;
function finishCounters(){
  counterObserver?.disconnect();
  counterFrames.forEach(frame=>cancelAnimationFrame(frame));counterFrames.clear();
  counters.forEach(counter=>counter.textContent=counter.dataset.count);
}
if(!motionPreference.matches && 'IntersectionObserver' in window){
  counterObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
    if(!isIntersecting)return;
    counterObserver.unobserve(target);
    const total=Number(target.dataset.count);
    const start=performance.now();
    function tick(now){
      const fraction=Math.min(1,(now-start)/600);
      target.textContent=String(Math.round(total*(1-Math.pow(1-fraction,3))));
      if(fraction<1)counterFrames.set(target,requestAnimationFrame(tick));
      else counterFrames.delete(target);
    }
    counterFrames.set(target,requestAnimationFrame(tick));
  }),{threshold:.8});
  counters.forEach(counter=>counterObserver.observe(counter));
}
function resetPointerEffects(){
  stopPointer();grid.style.removeProperty('--grid-x');grid.style.removeProperty('--grid-y');
  interactiveCards.forEach(resetCard);
}
motionPreference.addEventListener('change',event=>{if(event.matches){resetPointerEffects();finishCounters();}});
finePointer.addEventListener('change',event=>{if(!event.matches)resetPointerEffects();});
window.addEventListener('blur',resetPointerEffects);
