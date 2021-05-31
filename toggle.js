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
    gsap.timeline().from(".js-line h1", 1.8, {
        y: 200,
        ease: "power4.out",
        delay: 1,
        skewY: 10,
        stagger: {
            amount: 0.4,
        },
    });
    gsap.timeline().fromTo(".study__hero--overlay", 1.2, {
        skewX: 30,
        scale: 1.4
    }, {
        skewX: 0,
        xPercent: 100,
        duration: 2,
        transformOrigin: "0% 100%",
        ease: Power3.out
    });
    // Title Animation End

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

    // Page Transition Start
    function pageTransition() {
        gsap.timeline().to('ul.transition li', { duration: .5, scaleX: 1, transformOrigin: "top left" })
        gsap.timeline().to('ul.transition li', { duration: .5, scaleX: 0, transformOrigin: "top left", delay: 1 })
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
        .to($('.js-nav__panels'), {
            //onStart: $('.main-nav').css('z-index', '-1'),
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
        });
    }

    $('.header__toggle--menu').on('click', function () {
        if ($(this).hasClass('disabled'))      // disables the click until the zindex is done being set.
            return;

        if (!$(this).hasClass('active')) {
            tl.timeScale(1);
            tl.play();
        } else {
            tl.timeScale(4);
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
    gsap.registerPlugin(ScrollTrigger)

    function scrollImages() {
        let revealContainers = document.querySelectorAll(".overlay");

        revealContainers.forEach((container) => {
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

    scrollImages();

    setTimeout(function () {
        $(".se-pre-con").slideUp("slow");;
    }, 1500);
});