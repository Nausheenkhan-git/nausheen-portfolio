document.addEventListener("DOMContentLoaded", function () {

    const intro = document.getElementById("intro");

    /*
        Prevent the loading screen from appearing
        again if the user navigates around the page.
    */

    setTimeout(function () {

        intro.classList.add("intro-finished");

    }, 3800);


    /*
        Smooth reveal for sections when they
        enter the viewport.
    */

    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    sections.forEach(function (section) {

        observer.observe(section);

    });

});