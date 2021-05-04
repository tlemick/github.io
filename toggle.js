//-------- Day Night Toggle ---------------

const btn = document.querySelector('.header__toggle--mode');
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
    document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
    document.body.classList.toggle("light-theme");
}

btn.addEventListener("click", function () {
    this.classList.add('animate');
    setTimeout(() => {
        this.classList.toggle('active');
    }, 150);
    if (prefersDarkScheme.matches) {
        document.body.classList.toggle("light-theme");
        var theme = document.body.classList.contains("light-theme")
            ? "light"
            : "dark";
    } else {
        document.body.classList.toggle("dark-theme");
        var theme = document.body.classList.contains("dark-theme")
            ? "dark"
            : "light";
    }
    setTimeout(() => this.classList.remove('animate'), 300);
    localStorage.setItem("theme", theme);
});

//-------- Text Line Animation ---------------

const textRev = gsap.timeline();

textRev.from(".js-line h1", 1.8, {
    y: 200,
    ease: "power4.out",
    delay: 1,
    skewY: 10,
    stagger: {
        amount: 0.4,
    },
});


const heroReveal = gsap.timeline();

heroReveal.fromTo(".study__hero--overlay", 1.2, {
  skewX: 30,
  scale: 1.4 }, {
    skewX: 0,
    xPercent: 100,
    duration: 2,
    transformOrigin: "0% 100%",
    ease: Power3.out
});


//-------- Case Study Tiles Transition ---------------
/*
var navTl = document.getElementsByClassName("opera-link");
 navTl[0].addEventListener("mouseover", function() {
    gsap.to(".opera-link", {
        opacity: .2, 
        duration: 1
   });
});

*/

//-------- Page Transition ---------------

function pageTransition() {
    var tl = gsap.timeline();
    tl.to('ul.transition li', { duration: .5, scaleX: 1, transformOrigin: "top left" })
    tl.to('ul.transition li', { duration: .5, scaleX: 0, transformOrigin: "top left", delay: .4 })
}

function delay(n) {
    n = n || 2000;
    return new Promise(done => {
        setTimeout(() => {
            done();
        }, n);
    });
}


//------------------Inserting barba prefetch--------------
barba.use(barbaPrefetch);


//------------------Barba Page Transitions--------------
barba.init({
    
    sync: true,

    transitions: [{

        async leave(data) {

            const done = this.async();

            pageTransition();
            await delay(500);
            done();
        },
        async after(data) {
            // go to the top
            window.scrollTo(0, 0);
            openNav();
            // reload the images 
            scrollImages();
        }
    }]
})


//-------- Nav Transitions---------------

var tl = gsap.timeline({ paused: true });

function openNav() {
    animateOpenNav();
    var navBtn = document.getElementsByClassName("header__toggle--menu")[0];
    navBtn.onclick = function (e) {
        zIndexMover("5");
        tl.reversed(!tl.reversed());
        navBtn.classList.toggle("active");
    };
}

var zIndexMover = function (newZ) {
    var element = document.getElementsByClassName("main-nav");
    element[0].style.zIndex = newZ;
}

function animateOpenNav() {
    var mobileNav = document.getElementsByClassName("js-nav__panels");
    tl.to(mobileNav, {
        onStart: zIndexMover("-1"),
        duration: 1,
        scaleY: 1,
        stagger: {
            each: 0.3,
            ease: "power3",
        }
    }).to(".js-nav__link", {
        opacity: 1,
        y: 0,
        duration: .1,
        stagger: {
            each: 0.06,
            ease: "power3.in"
        }
    }).to(".js-nav__element", {
        opacity: 1,
        y: 0,
        duration: .1,
        stagger: {
            each: 0.06,
            ease: "power3.in"
        }
    })
        .reverse();
}

openNav();


//--------Case study image reveal on scroll -----------
gsap.registerPlugin(ScrollTrigger)
scrollImages();

function scrollImages() {
    let revealContainers = document.querySelectorAll(".overlay");

    revealContainers.forEach((container) => {
        let image = container.querySelector(".overlay");
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                toggleActions: "play none none none",
                start: "center bottom",
            }
        });
        tl.fromTo(container, {
            skewX: 30,
            scale: 1.4
          }, {
            skewX: 0,
            xPercent: 100,
            duration: 2,
            transformOrigin: "0% 100%",
            ease: Power3.out
          });
    });
}