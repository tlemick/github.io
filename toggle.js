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

const options = {
    animateHistoryBrowsing: true,
    plugins: [new SwupScrollPlugin({
        doScrollingRightAway: true,
        animateScroll: true,
        scrollFriction: 0.3,
        scrollAcceleration: 0.04,
    })]
};
const swup = new Swup(options);

//document.addEventListener('swup:popState', event => {
//    setTimeout(function() {window.scrollTo(0, 0);},1)
//});

//swup.on('contentReplaced', function () {
//    setTimeout(function() {window.scrollTo(0, 0);},1)
//});