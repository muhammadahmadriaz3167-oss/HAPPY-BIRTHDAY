// =========================
// ELEMENTS
// =========================

const screens = document.querySelectorAll(".screen");

const landing = document.getElementById("landing");
const wishScreen = document.getElementById("wishScreen");
const envelopeScreen = document.getElementById("envelopeScreen");
const letterScreen = document.getElementById("letterScreen");
const endingScreen = document.getElementById("endingScreen");

const star = document.getElementById("shootingStar");
const envelope = document.querySelector(".envelope");
const continueBtn = document.getElementById("continueBtn");

const music = document.getElementById("music");

function showScreen(screen){

    screens.forEach(s=>{
        s.classList.remove("active");
    });

    screen.classList.add("active");
}

// =========================
// STAR BACKGROUND
// =========================

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars=[];

function resize(){

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

}

resize();

window.addEventListener("resize",resize);

for(let i=0;i<250;i++){

    stars.push({

        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,

        r:Math.random()*2,

        a:Math.random(),

        s:Math.random()*0.015+0.003

    });

}

function drawStars(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(star=>{

        star.a+=star.s;

        const alpha=(Math.sin(star.a)+1)/2;

        ctx.beginPath();

        ctx.arc(star.x,star.y,star.r,0,Math.PI*2);

        ctx.fillStyle="rgba(255,255,255,"+alpha+")";

        ctx.fill();

    });

    requestAnimationFrame(drawStars);

}

drawStars();


// =========================
// HOLD STAR
// =========================

let holding=false;
let timer;

function beginHold(){

    holding=true;

    star.style.transform="scale(1.5)";
    star.style.color="#ffe27a";

    timer=setTimeout(()=>{

        if(!holding) return;

        showScreen(wishScreen);

        setTimeout(()=>{

            showScreen(envelopeScreen);

        },2600);

    },2000);

}

function cancelHold(){

    holding=false;

    clearTimeout(timer);

    star.style.transform="scale(1)";
    star.style.color="white";

}

star.addEventListener("mousedown",beginHold);
star.addEventListener("mouseup",cancelHold);
star.addEventListener("mouseleave",cancelHold);

star.addEventListener("touchstart",beginHold);
star.addEventListener("touchend",cancelHold);


// =========================
// ENVELOPE
// =========================

envelope.addEventListener("click",()=>{

    envelope.style.transform="translateY(-20px) rotateX(20deg)";

    setTimeout(()=>{

        showScreen(letterScreen);

    },900);

});


// =========================
// CONTINUE BUTTON
// =========================

continueBtn.addEventListener("click",()=>{

    showScreen(endingScreen);

});