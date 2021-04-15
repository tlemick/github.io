//--------BEGIN Day Night Toggle ---------------

const btn = document.querySelector('.toggle');
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

//--------END Day Night Toggle ---------------
//--------BEGIN Text Line Animation ---------------


const textRev = gsap.timeline();

textRev.from(".line h1", 1.8, {
    y: 200,
    ease: "power4.out",
    delay: 1,
    skewY: 10,
    stagger: {
        amount: 0.4,
    },
});

//--------END Text Line Animation ---------------
//--------BEGIN Fade Transition ---------------



//--------END Fade Transition ---------------
//--------BEGIN Case Study Tiles Transition ---------------

/*
function hoverTile() {
    var navTl = document.getElementsByClassName(".opera-link");
    navTl.addEventListener("mouseover", function() {
        gsap.to(".opera-link", {
            opacity: .2, 
            duration: 1
        });
    })
  }
hoverTile();
*/


//--------END Case Study Tiles Transition ---------------
//--------BEGIN Page Transition ---------------

function pageTransition() {

    var tl = gsap.timeline();
    tl.to('ul.transition li', { duration : .5, scaleX: 1, transformOrigin: "top left" })
    tl.to('ul.transition li', { duration : .5, scaleX: 0, transformOrigin: "top left", delay: .4})
}

function delay(n) {
    n = n || 2000;
    return new Promise(done => {
        setTimeout(() => {
            done();
        }, n);
    });
}

barba.init({

    sync: true,

    transitions: [{

        async leave(data) {

            const done = this.async();

            pageTransition();
            await delay(500);
            done();
        }
    }]
  })


//--------End Page Transition ---------------
//--------BEGIN Nav Transition---------------

// Timeline created and paused
var tl = gsap.timeline({ paused: true });

function openNav() {
  animateOpenNav();
  var navBtn = document.getElementById("nav");
  navBtn.onclick = function (e) {
    zIndexMover("10");
    // Toggle reversed to it's opposite value
    tl.reversed(!tl.reversed());
    // Use the toggle method in the classList API
    navBtn.classList.toggle("active");
  };
}

var zIndexMover = function(newZ) {
    var element = document.getElementsByClassName("nav");
    element[0].style.zIndex = newZ;
}

function animateOpenNav() {
  var mobileNav = document.getElementsByClassName("nav__panels");
  tl.to(mobileNav, {
    onStart: zIndexMover("-10"),
    duration: 1,
    scaleY: 1,
    stagger: {
        each: 0.3,
        ease: "power3",
    }
  }).to(".nav__link", {
    opacity: 1,
    y: 0,
    duration: .1,
    stagger: {
      // wrap advanced options in an object
      each: 0.06,
      ease: "power3.in"
    }
  }).to(".nav__element", {
    opacity: 1,
    y: 0,
    duration: .1,
    stagger: {
      // wrap advanced options in an object
      each: 0.06,
      ease: "power3.in"
    }
  })
  .reverse(); // Finally reverse the timeline. reversed() is true
}

// init
openNav();


//--------END Nav Transition---------------
//--------Case study image reveal on scroll -----------


gsap.registerPlugin(ScrollTrigger)

let revealContainers = document.querySelectorAll(".cover");

revealContainers.forEach((container) => {
  let image = container.querySelector("img");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      toggleActions: "play none none none"
    }
  });

  tl.set(container, { autoAlpha: 1 });
  tl.from(container, 1.5, {
    xPercent: -100,
    ease: Power2.out
  });
  tl.from(image, 1.5, {
    xPercent: 100,
    scale: 1.1,
    delay: -1.5,
    ease: Power2.out
  });
});