var bLoading = false;
var zindex = 'z-index';
var noshow = '-1';
var show = '5';
var darkclass = 'dark-theme';
var lightclass = 'light-theme';

$(document).ready(function () {
    if (!bLoading) {
        $('.main-nav').css(zindex, noshow);
    }

    // Load the theme from the local cookies when reloading (defaults to light theme)
    if (localStorage.getItem("theme") == "dark") {
        $('body').addClass(darkclass);
        $('body').removeClass(lightclass);
    }
    else {
        $('body').addClass(lightclass);
        $('body').removeClass(darkclass);
    }

    // Day Night Toggle Start
    $('.header__toggle--mode').on('click', function () {
        var theme = localStorage.getItem('theme');
        if ($('body').hasClass(lightclass)) {
            $('body').removeClass(lightclass);
            $('body').addClass(darkclass);
            theme = 'dark';
        } else {
            $('body').removeClass(darkclass);
            $('body').addClass(lightclass);
            theme = 'light';
        }
        // store the active theme in the environment
        localStorage.setItem("theme", theme);
    });
    // Day Night Toggle End

    // Title Animation Start
/*
    gsap.timeline().to(".js-text-reveal", 1.8, {
        y: -15,
        ease: "power1.out",
        opacity: 1
    });
    */

    // Title Animation End    

    // Page Transition Start
    function pageTransition() {
        let frivolity = ['Reticulating Splines', 'Synthesizing Gravity', 'Deciding What Message to Display Next', 'Adding Hidden Agenda', 'Error 404: Joke Not Found', 'Ready Player One', 'Switching Sides', 'Cheat Code Activated'];
        let indexOfFrivolity = Math.floor(Math.random() * frivolity.length);
        document.getElementById("theTitleSpline").innerHTML = frivolity[indexOfFrivolity];
        gsap.timeline()
            .to('ul.transition li', { duration: .5, scaleX: 1, transformOrigin: "top left" })
            .to('.transition__h1', { duration: .5, opacity: 1 })
            .to('.transition__h1', { duration: .75, opacity: 0, y: "-=24" })
            .to('ul.transition li', { duration: .75, scaleX: 0, transformOrigin: "top right" })
    }
    function delay(n) {
        return new Promise(done => {
            setTimeout(() => {
                done();
            }, n || 2000);
        });
    }
    // Page Transition End

    //------------------Inserting barba prefetch--------------
    barba.use(barbaPrefetch);

    //------------------Barba Page Transitions--------------
    barba.init({
        sync: true,
        transitions: [{
            async leave(data) {
                if ($('.main-nav').css(zindex) != show)
                    pageTransition();   // only do the transition if the main nav is not open.
                else
                    bLoading = true;
                await delay(500);
                this.async();
            },
            async after(data) {
                if ($('.header__toggle--menu').hasClass('active')) {
                    tl.timeScale(1);
                    tl.reverse();
                }
                // reload the images 
                scrollImages();
                // go to the top
                window.scrollTo(0, 0);

                setTimeout(function () {
                    handleMenu(true);   // close the menu\
                }, 500);
                bLoading = false;
            }
        }]
    })

    //-------- Nav Transitions---------------
    var tl = gsap.timeline({ paused: true });

    function openNav() {
        tl.fromTo($(".main-nav"), {zIndex: -1}, {zIndex: 5})
        .to($('.js-main-nav'), {
            duration: 0.5,
            opacity: 1,
            ease: "power1.inOut"
        }).to($('.js-nav__panels'), {
            duration: 0.3,
            opacity: 1,
            ease: "power1.inOut"
        }).to(".js-nav__sublink", {
            opacity: 1,
            duration: .5,
        }).to(".js-nav__link", {
            opacity: 1,
            y: 0,
            duration: .5,
            ease: "power1.inOut",
            stagger: 0.1
        }, ">-.6",
        );
    }

    $('.header__toggle--menu').on('click', function () {
        if ($(this).hasClass('disabled'))      // disables the click until the zindex is done being set.
            return;

        if (!$(this).hasClass('active')) {
            tl.timeScale(1);
            tl.play();
        } else {
            tl.timeScale(1.4);
            tl.reverse();
        }
        handleMenu($(this).hasClass('active'));
    })

    function handleMenu(bClose)
    {
        if (bClose) {
            $('.header__toggle--menu').removeClass('active');
            $('.header__toggle--menu').addClass('disabled');
            $('.header__toggle--menu').removeClass('disabled');
        }
        else {
            $('.header__toggle--menu').addClass('active');
        }
    }

    openNav();


    //--------Case study image reveal on scroll -----------

    function scrollImages() {
        
    }

    scrollImages();

    setTimeout(function () {
        $(".se-pre-con").slideUp("slow");;
    }, 1500);
});

    gsap.registerPlugin(ScrollTrigger)

    let revealContainers = document.querySelectorAll(".cover");

    revealContainers.forEach((container) => {
        let image = container.querySelector("img");
        let tl = gsap.timeline({
            scrollTrigger: {
            trigger: container,
            toggleActions: "restart none none none"
            }
        });

        tl.set(container, { autoAlpha: 1 });
        tl.from(container, 1.5, {
            ease: Power2.out
        });
        tl.from(image, 1.3, {
            scale: 1.1,
            delay: -1.5,
            ease: Power2.out
        });
    });






  