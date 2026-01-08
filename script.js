// --- Логіка квесту ---
const steps=[
{code:"NURE",text:"🎯 Початок квесту. Ідіть на КН, ауд.214",map:"fac1"},
{code:"KN214",text:"✅ КН активовано. Далі КІУ, ауд.103",map:"fac2"},
{code:"KIU103",text:"✅ КІУ активовано. Далі АКТ, ауд.312",map:"fac3"},
{code:"AKT312",text:"✅ АКТ активовано. Далі ІТМ, ауд.221",map:"fac4"},
{code:"IATM221",text:"✅ ІТМ активовано. Далі ІК, ауд.405",map:"fac5"},
{code:"INFO405",text:"✅ ІК активовано. Далі ЕЛБІ, ауд.118",map:"fac6"},
{code:"EBI118",text:"✅ ЕЛБІ активовано. Далі ІРТЗІ, ауд.501",map:"fac7"},
{code:"IRT501",text:"🎉 ВСІ ФАКУЛЬТЕТИ пройдено!"}
];

let step=0;
const marker=document.getElementById("marker");

function moveMarker(facId){
    const fac=document.getElementById(facId);
    const rect=fac.getBoundingClientRect();
    const mapRect=document.getElementById("map").getBoundingClientRect();
    marker.style.left=(rect.left-mapRect.left+rect.width/2)+"px";
    marker.style.top=(rect.top-mapRect.top+rect.height/2)+"px";
}

function check(){
    const input=document.getElementById("code").value.trim();
    const res=document.getElementById("result");
    const task=document.getElementById("task");
    if(input===steps[step].code){
        res.innerHTML="<p class='ok'>"+steps[step].text+"</p>";
        if(steps[step].map){
            moveMarker(steps[step].map);
            if(step>0 && steps[step-1].map){
                document.getElementById(steps[step-1].map).classList.add("passed");
                document.getElementById(steps[step-1].map).classList.remove("active");
            }
            document.getElementById(steps[step].map).classList.add("active");
        }
        step++;
        document.getElementById("code").value="";
        if(step<steps.length){
            task.innerText="Введіть код, отримий на факультеті:";
        } else {
            task.innerText="Квест завершено! Введіть фінальний код:";
            document.querySelector(".map").style.opacity=0.5;
            document.getElementById("finalCodeContainer").style.display="block";
        }
    }else{
        res.innerHTML="<p class='bad'>❌ Невірний код</p>";
    }
}

const finalCode="HNURE-2026";

function checkFinal(){
    const input=document.getElementById("finalCode").value.trim();
    const res=document.getElementById("finalResult");
    if(input===finalCode){
        res.innerHTML="<p class='ok'>🎉 Фінальний код правильний! Квест завершено! Вітаємо!</p>";
    } else {
        res.innerHTML="<p class='bad'>❌ Невірний фінальний код</p>";
    }
}

// --- Матриця на фоні ---
const canvas=document.getElementById("matrix");
const ctx=canvas.getContext("2d");

let width=canvas.width=window.innerWidth;
let height=canvas.height=window.innerHeight;

const fontSize=20;
const columns=Math.floor(width/fontSize);
const drops=[];
for(let x=0;x<columns;x++) drops[x]=Math.floor(Math.random()*height/fontSize);

const facultyNames=["КН","КІУ","АКТ","ІТМ","ІК","ЕЛБІ","ІРТЗІ"];

function drawMatrix(){
    ctx.fillStyle="rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle="#0F0";
    ctx.font=fontSize+"px monospace";
    
    for(let i=0;i<drops.length;i++){
        const text=facultyNames[Math.floor(Math.random()*facultyNames.length)];
        ctx.fillText(text,i*fontSize,drops[i]*fontSize);

        if(drops[i]*fontSize>height && Math.random()>0.975) drops[i]=0;
        drops[i]++;
    }
}

setInterval(drawMatrix,60);

window.addEventListener("resize",()=>{
    width=canvas.width=window.innerWidth;
    height=canvas.height=window.innerHeight;
});
