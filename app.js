let names = [];
let history = [];

/* โหลดค่าเริ่มต้น */
function loadSettings(){

document.getElementById("nameList").value =
localStorage.getItem("namesInput") || "";

document.getElementById("eliminatedLabel").value =
localStorage.getItem("eliminatedLabel") || "ถูกคัดออก";

document.getElementById("winnerLabel").value =
localStorage.getItem("winnerLabel") || "ผู้ได้รับรางวัล";

document.getElementById("loserMessage").value =
localStorage.getItem("loserMessage") ||
"ขอแสดงความเสียใจกับผู้ที่ไม่ได้รับรางวัลในครั้งนี้";

document.getElementById("winnerMessage").value =
localStorage.getItem("winnerMessage") ||
"ขอแสดงความยินดีกับผู้ได้รับรางวัล";

document.getElementById("soundToggle").checked =
localStorage.getItem("sound") === "true";

loadNames();
}

/* บันทึกการตั้งค่า */
function saveSettings(){

localStorage.setItem(
"namesInput",
document.getElementById("nameList").value
);

localStorage.setItem(
"eliminatedLabel",
document.getElementById("eliminatedLabel").value
);

localStorage.setItem(
"winnerLabel",
document.getElementById("winnerLabel").value
);

localStorage.setItem(
"loserMessage",
document.getElementById("loserMessage").value
);

localStorage.setItem(
"winnerMessage",
document.getElementById("winnerMessage").value
);

localStorage.setItem(
"sound",
document.getElementById("soundToggle").checked
);

loadNames();

document
.getElementById("settingsPanel")
.classList.remove("open");
}

/* โหลดรายชื่อ */
function loadNames(){

names =
document
.getElementById("nameList")
.value
.split("\n")
.map(x=>x.trim())
.filter(x=>x);

updateCounter();
}

/* อัพเดทจำนวนคน */
function updateCounter(){

document.getElementById("counter")
.innerText = `เหลือ ${names.length} คน`;
}

/* เพิ่มประวัติ */
function addHistory(text){

const li = document.createElement("li");

li.innerText = text;

document
.getElementById("historyList")
.prepend(li);

history.push(text);
}

/* สุ่ม */
async function draw(){

if(names.length === 0){
alert("ไม่มีรายชื่อ");
return;
}

const display =
document.getElementById("displayName");

/* slot animation */
for(let i=0;i<30;i++){

const randomName =
names[Math.floor(Math.random()*names.length)];

display.innerText = randomName;

await new Promise(r=>setTimeout(r,70));
}

/* เหลือคนเดียว */
if(names.length === 1){

const winner = names[0];

display.innerHTML =
`🏆 ${winner} ${document.getElementById("winnerLabel").value}`;

showWinner(winner);

return;
}

/* fair random */
const randomIndex =
Math.floor(Math.random()*names.length);

const eliminated =
names[randomIndex];

names.splice(randomIndex,1);

const result =
`❌ ${eliminated} ${document.getElementById("eliminatedLabel").value}`;

display.innerHTML = result;

display.classList.add("shake");
display.classList.add("fade");

setTimeout(()=>{
display.classList.remove("shake");
display.classList.remove("fade");
},700);

addHistory(result);

updateCounter();

/* ถ้าคัดจนเหลือ 1 คนแล้ว */
if(names.length === 1){

setTimeout(()=>{

display.innerHTML =
`🏆 ${names[0]} ${document.getElementById("winnerLabel").value}`;

showWinner(names[0]);

},1500);

}
}

/* เปิด settings */
document
.getElementById("openSettings")
.addEventListener("click",()=>{

document
.getElementById("settingsPanel")
.classList.add("open");

});

/* save */
document
.getElementById("saveBtn")
.addEventListener("click",saveSettings);

/* draw */
document
.getElementById("drawBtn")
.addEventListener("click",draw);

/* start */
loadSettings();