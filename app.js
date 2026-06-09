
let names=[];
let rotated=false;

function loadNames(){
 names=document.getElementById('nameList').value.split('\n').map(x=>x.trim()).filter(x=>x);
 document.getElementById('counter').innerText=`เหลือ ${names.length} คน`;
}

function loadSettings(){
 document.getElementById('nameList').value=localStorage.getItem('namesInput')||'';
 loadNames();
}

function saveSettings(){
 localStorage.setItem('namesInput',document.getElementById('nameList').value);
 loadNames();
 document.getElementById('settingsPanel').classList.remove('open');
}

document.getElementById('openSettings').onclick=()=>document.getElementById('settingsPanel').classList.add('open');
document.getElementById('saveBtn').onclick=saveSettings;

document.getElementById('rotateBtn').onclick=()=>{
 rotated=!rotated;
 document.getElementById('appWrapper').classList.toggle('rotated');
 document.getElementById('rotateBtn').innerText=rotated?'↩️ Normal':'🔄 Rotate';
};

function closeModal(){document.getElementById('winnerModal').style.display='none';}
window.closeModal=closeModal;

async function draw(){
 if(!names.length){alert('ไม่มีรายชื่อ');return;}
 const display=document.getElementById('displayName');
 for(let i=0;i<20;i++){
  display.innerText=names[Math.floor(Math.random()*names.length)];
  await new Promise(r=>setTimeout(r,60));
 }
 if(names.length===1){
   const winner=names[0];
   document.getElementById('winnerTitle').innerHTML=`🏆 ${winner} ${document.getElementById('winnerLabel').value}`;
   document.getElementById('winnerText').innerHTML=document.getElementById('winnerMessage').value;
   document.getElementById('winnerModal').style.display='flex';
   return;
 }
 const idx=Math.floor(Math.random()*names.length);
 const out=names.splice(idx,1)[0];
 display.innerHTML=`❌ ${out} ${document.getElementById('eliminatedLabel').value}`;
 document.getElementById('counter').innerText=`เหลือ ${names.length} คน`;
}
document.getElementById('drawBtn').onclick=draw;
loadSettings();
