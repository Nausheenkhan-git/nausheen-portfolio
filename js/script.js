/* ============================================================
   NAUSHEEN KHAN PORTFOLIO
   MAIN JAVASCRIPT
============================================================ */


/* ============================================================
   ELEMENTS
============================================================ */

const body = document.body;

const introScreen =
    document.getElementById("introScreen");

const siteHeader =
    document.getElementById("siteHeader");

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");

const navItems =
    document.querySelectorAll(".nav-link");

const revealElements =
    document.querySelectorAll(".reveal");

const currentYear =
    document.getElementById("currentYear");


/* ============================================================
   INTRO / LOADING ANIMATION
============================================================ */

window.addEventListener("load", () => {

    setTimeout(() => {

        introScreen.classList.add("hide");

    }, 2400);

});


/* ============================================================
   THEME
============================================================ */

function setTheme(theme) {

    if (theme === "light") {

        body.classList.add("light-theme");

        themeIcon.textContent = "☾";

    } else {

        body.classList.remove("light-theme");

        themeIcon.textContent = "☀";

    }

    localStorage.setItem(
        "portfolio-theme",
        theme
    );

}


/* Load saved theme */

const savedTheme =
    localStorage.getItem("portfolio-theme");

if (savedTheme) {

    setTheme(savedTheme);

} else {

    setTheme("dark");

}


/* Toggle theme */

themeToggle.addEventListener("click", () => {

    const isLight =
        body.classList.contains("light-theme");

    setTheme(
        isLight
            ? "dark"
            : "light"
    );

});


/* ============================================================
   NAVBAR SCROLL EFFECT
============================================================ */

function handleNavbarScroll() {

    if (window.scrollY > 30) {

        siteHeader.classList.add("scrolled");

    } else {

        siteHeader.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    handleNavbarScroll
);

handleNavbarScroll();


/* ============================================================
   MOBILE MENU
============================================================ */

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

});


/* Close mobile menu after clicking link */

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

    });

});


/* ============================================================
   ACTIVE NAVIGATION LINK
============================================================ */

const sections =
    document.querySelectorAll("section[id]");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 160;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach((link) => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();


/* ============================================================
   SCROLL REVEAL
============================================================ */

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* ============================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
============================================================ */

document.addEventListener("click", (event) => {

    const clickedInsideMenu =
        navLinks.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navLinks.classList.remove("open");

    }

});


/* ============================================================
   CURRENT YEAR
============================================================ */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* ============================================================
   SMOOTH SCROLL
============================================================ */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((anchor) => {

    anchor.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                targetId === "#" ||
                !targetId
            ) {
                return;
            }

            const target =
                document.querySelector(
                    targetId
                );

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                siteHeader.offsetHeight;

            const targetPosition =
                target.offsetTop -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }
    );

});


/* ============================================================
   IMAGE ERROR HANDLING
   Helps identify broken GitHub Pages image paths
============================================================ */

document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("error", () => {

        console.warn(
            "Portfolio image could not be loaded:",
            image.getAttribute("src")
        );

    });

});