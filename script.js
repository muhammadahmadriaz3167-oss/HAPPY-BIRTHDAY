// =====================================
// TYPEWRITER EFFECT
// =====================================

const typedContainer = document.getElementById("typedLetter");

const paragraphs = [...typedContainer.querySelectorAll("p")];

const originalParagraphs = paragraphs.map(p => p.innerHTML);

paragraphs.forEach(p=>p.innerHTML="");

let letterPlayed = false;

function typeParagraph(index){

    if(index>=paragraphs.length){

        continueBtn.style.opacity="1";
        continueBtn.style.pointerEvents="auto";

        return;
    }

    let html = originalParagraphs[index];

    let i = 0;

    function write(){

        if(i<html.length){

            paragraphs[index].innerHTML = html.substring(0,i+1);

            i++;

            setTimeout(write,18);

        }else{

            setTimeout(()=>{

                typeParagraph(index+1);

            },350);

        }

    }

    write();

}

function playLetter(){

    if(letterPlayed) return;

    letterPlayed = true;

    continueBtn.style.opacity="0";

    continueBtn.style.pointerEvents="none";

    typeParagraph(0);

}

setTimeout(()=>{

    if(letterScreen.classList.contains("active")){

        playLetter();

    }

},1000);


// =====================================
// LETTER OBSERVER
// =====================================

const observer = new MutationObserver(()=>{

    if(letterScreen.classList.contains("active")){

        playLetter();

    }

});

observer.observe(letterScreen,{
    attributes:true
});


// =====================================
// FLOATING PETALS
// =====================================

function createPetal(){

    const petal=document.createElement("div");

    petal.innerHTML="❀";

    petal.style.position="fixed";

    petal.style.left=Math.random()*100+"vw";

    petal.style.top="-50px";

    petal.style.fontSize=(18+Math.random()*18)+"px";

    petal.style.opacity=".8";

    petal.style.pointerEvents="none";

    petal.style.transition="linear";

    petal.style.zIndex="1000";

    document.body.appendChild(petal);

    let duration=8000+Math.random()*5000;

    petal.animate([

        {
            transform:"translate(0,0) rotate(0deg)"
        },

        {
            transform:`translate(${Math.random()*200-100}px,110vh) rotate(${720+Math.random()*720}deg)`
        }

    ],{

        duration:duration,

        easing:"linear"

    });

    setTimeout(()=>{

        petal.remove();

    },duration);

}

setInterval(createPetal,1200);


// =====================================
// GOLDEN PARTICLES
// =====================================

function sparkle(x,y){

    for(let i=0;i<20;i++){

        const s=document.createElement("div");

        s.style.position="fixed";

        s.style.width="5px";
        s.style.height="5px";

        s.style.borderRadius="50%";

        s.style.background="#ffd76a";

        s.style.left=x+"px";
        s.style.top=y+"px";

        s.style.pointerEvents="none";

        document.body.appendChild(s);

        const dx=(Math.random()-.5)*220;
        const dy=(Math.random()-.5)*220;

        s.animate([

            {
                transform:"translate(0,0)",
                opacity:1
            },

            {
                transform:`translate(${dx}px,${dy}px)`,
                opacity:0
            }

        ],{

            duration:900

        });

        setTimeout(()=>{

            s.remove();

        },900);

    }

}

star.addEventListener("mousedown",(e)=>{

    sparkle(
        e.clientX,
        e.clientY
    );

});


// =====================================
// RANDOM SHOOTING STAR
// =====================================

function randomMeteor(){

    const meteor=document.createElement("div");

    meteor.innerHTML="✦";

    meteor.style.position="fixed";

    meteor.style.left="-100px";

    meteor.style.top=Math.random()*250+"px";

    meteor.style.fontSize="26px";

    meteor.style.color="white";

    meteor.style.opacity=".9";

    meteor.style.zIndex="999";

    document.body.appendChild(meteor);

    meteor.animate([

        {
            transform:"translate(0,0)"
        },

        {
            transform:"translate(130vw,300px)"
        }

    ],{

        duration:2600,

        easing:"linear"

    });

    setTimeout(()=>{

        meteor.remove();

    },2600);

}

setInterval(randomMeteor,9000);


// =====================================
// MUSIC BUTTON
// =====================================

const musicButton=document.createElement("button");

musicButton.innerHTML="♫";

musicButton.style.position="fixed";

musicButton.style.top="20px";

musicButton.style.right="20px";

musicButton.style.width="50px";

musicButton.style.height="50px";

musicButton.style.borderRadius="50%";

musicButton.style.border="none";

musicButton.style.cursor="pointer";

musicButton.style.background="rgba(255,255,255,.15)";

musicButton.style.backdropFilter="blur(10px)";

musicButton.style.color="white";

musicButton.style.fontSize="22px";

musicButton.style.zIndex="9999";

document.body.appendChild(musicButton);

let playing=false;

musicButton.onclick=()=>{

    if(!playing){

        music.play();

        playing=true;

        musicButton.innerHTML="❚❚";

    }else{

        music.pause();

        playing=false;

        musicButton.innerHTML="♫";

    }

};