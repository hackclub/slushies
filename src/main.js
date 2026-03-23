import Lenis from "lenis";

const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);



const flag = document.querySelector('.flag');
const q = document.querySelectorAll('.q');
const faqMod = document.querySelector('.faqMod');
const modCon = document.querySelector('.modCon');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.close');
const faqBtn = document.querySelector('.faq')
const get = document.querySelector('.getBtn');
const ws = document.querySelector('.ws');
const bot = document.querySelector('.bot');


bot.addEventListener('click', () => {
    window.location.href = "https://docs.google.com/presentation/d/e/2PACX-1vRB_dAzZpGmynrA1VCmTCZ-EO_8PKQgSDajAt66ne7r3dA8OuqsGFcYQbvkbLD9FlMfZq17QImknSy8/pub?start=false&loop=false&delayms=30000";
})

flag.addEventListener('click', ()=> {
    window.location.href = "https://hackclub.com/";
})

q.forEach(qs => {
    qs.addEventListener('click', (toggleFAQ))
})

close.addEventListener('click', (modal));
faqBtn.addEventListener('click', (modal));

get.addEventListener('click', ()=> {
    window.location.href = "https://submit.hackclub.com/slushies";
})

document.addEventListener('click', (e)=> {
    if (
        modCon.style.display === "flex" &&
        !faqMod.contains(e.target) &&
        !faqBtn.contains(e.target)
    ) {
        modal();
    }
})

ws.addEventListener('click', ()=> {
    alert("Currently Unavailable");
})

function toggleFAQ(e) {
    const current = e.currentTarget;

    document.querySelectorAll('.q').forEach(q => {
        if (q !== current) q.classList.remove('open');
    });

    current.classList.toggle('open');
}

function modal() {
    if (modCon.style.display === "flex") {
        modCon.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        modCon.style.display = 'flex';
        overlay.style.display = 'flex';
    }
}