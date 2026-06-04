let names=[];
const $=id=>document.getElementById(id);

function load(){
$('nameList').value=localStorage.getItem('names')||'';
loadNames();
}
function loadNames(){
names=$('nameList').value.split('\n').map(v=>v.trim()).filter(Boolean);
$('counter').textContent=`เหลือ ${names.length} คน`;
}
$('openSettings').onclick=()=>$('settingsPanel').classList.add('open');
$('saveBtn').onclick=()=>{
localStorage.setItem('names',$('nameList').value);
loadNames();
$('settingsPanel').classList.remove('open');
};
$('fullscreenBtn').onclick=async()=>{
if(!document.fullscreenElement) await document.documentElement.requestFullscreen();
else await document.exitFullscreen();
};
$('rotateBtn').onclick=()=>alert('Rotate ใช้งานได้เฉพาะบางอุปกรณ์มือถือและ Browser ที่รองรับ');
function closeModal(){$('winnerModal').style.display='none';}
window.closeModal=closeModal;

$('drawBtn').onclick=async()=>{
if(!names.length){alert('ไม่มีรายชื่อ');return;}
for(let i=0;i<25;i++){
$('displayName').textContent=names[Math.floor(Math.random()*names.length)];
await new Promise(r=>setTimeout(r,60));
}
if(names.length===1){
$('winnerTitle').textContent=`🏆 ${names[0]} ${$('winnerLabel').value}`;
$('winnerModal').style.display='flex';
$('drawBtn').disabled=true;
$('drawBtn').textContent='FINISHED';
return;
}
const idx=Math.floor(Math.random()*names.length);
const out=names.splice(idx,1)[0];
$('displayName').textContent=`❌ ${out} ${$('eliminatedLabel').value}`;
$('counter').textContent=`เหลือ ${names.length} คน`;
const li=document.createElement('li');
li.textContent=$('displayName').textContent;
$('historyList').prepend(li);
};
load();