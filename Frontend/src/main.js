const flag = document.querySelector('.flag');
const q = document.querySelectorAll('.q');
const faqMod = document.querySelector('.faqMod');
const modCon = document.querySelector('.modCon');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.close');
const faqBtn = document.querySelector('.faq')


flag.addEventListener('click', ()=> {
    window.location.href = "https://hackclub.com/";
})

q.forEach(qs => {
    qs.addEventListener('click', (toggleFAQ))
})

close.addEventListener('click', (modal));
faqBtn.addEventListener('click', (modal));

function toggleFAQ(e) {
    const current = e.currentTarget;

    document.querySelectorAll('.q').forEach(q => {
        if (q !== current) q.classList.remove('open');
    });

    current.classList.toggle('open');
}

function modal() {
    if (modCon.style.display == "flex") {
        modCon.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        modCon.style.display = 'flex';
        overlay.style.display = 'flex';
    }
}