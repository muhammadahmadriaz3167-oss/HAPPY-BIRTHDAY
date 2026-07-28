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
let bandStars=[];

function seedStars(){

    stars=[];
    bandStars=[];

    for(let i=0;i<250;i++){

        stars.push({

            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,

            r:Math.random()*2,

            a:Math.random(),

            s:Math.random()*0.015+0.003

        });

    }

    const bandCount=Math.floor((canvas.width*canvas.height)/1400);

    for(let i=0;i<bandCount;i++){

        const t=Math.random();

        const bandWidth=canvas.height*0.32;

        const cx=t*canvas.width;

        const cy=canvas.height*0.65 - t*canvas.height*0.55 + (Math.random()-0.5)*bandWidth;

        bandStars.push({

            x:cx,
            y:cy,

            r:Math.random()*1.2+0.2,

            a:Math.random(),

            s:Math.random()*0.012+0.003

        });

    }

}

function resize(){

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    seedStars();

}

resize();

window.addEventListener("resize",resize);

function drawStars(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    bandStars.forEach(star=>{

        star.a+=star.s;

        const alpha=((Math.sin(star.a)+1)/2)*0.6;

        ctx.beginPath();

        ctx.arc(star.x,star.y,star.r,0,Math.PI*2);

        ctx.fillStyle="rgba(220,210,255,"+alpha+")";

        ctx.fill();

    });

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

    star.classList.add("held");

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

    star.classList.remove("held");

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

    if(envelope.classList.contains("opening")) return;

    envelope.classList.add("opening");

    setTimeout(()=>{

        showScreen(letterScreen);

    },1300);

});


// =========================
// CONTINUE BUTTON
// =========================

continueBtn.addEventListener("click",()=>{

    showScreen(endingScreen);

});