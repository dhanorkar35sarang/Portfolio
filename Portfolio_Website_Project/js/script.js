// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');


        if(top >= offset && top < offset + height){
            //active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            //active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        //animation that repeats on scroll
        else{
            sec.classList.remove('show-animate')

        }

    })
    // sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');


    // animation footer on scroll

    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.sc)

}

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navbarLinks = document.querySelectorAll('.navbar a');

    function resetAnimation(element) {
        element.classList.remove('animate');
        void element.offsetWidth; // Trigger reflow
        element.classList.add('animate');
    }

    function handleAnimation() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;

            if (inView) {
                section.querySelectorAll('.animate').forEach(el => resetAnimation(el));
            }
        });
    }

    function scrollToSection(section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });

        // Delay animation reset until after scroll
        setTimeout(() => {
            section.querySelectorAll('.animate').forEach(el => resetAnimation(el));
        }, 500); // Adjust delay if necessary
    }

    // Trigger animation on navigation click
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            scrollToSection(targetSection);
        });
    });

    // Trigger animation on scroll
    window.addEventListener('scroll', handleAnimation);
    
    // Initial check in case sections are already in view
    handleAnimation();
});     