$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        if ($(this).attr('href') === '#' || $(this).attr('href').length < 2) return;
        if (!$($(this).attr('href')).length) return;
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- kirim form kontak lewat FormSubmit (tanpa perlu backend sendiri) -->
    $("#contact-form").submit(function (event) {
        event.preventDefault();

        const form = document.getElementById("contact-form");
        const submitBtn = form.querySelector("button[type='submit']");
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Mengirim...";

        fetch("https://formsubmit.co/ajax/revanmalang584@gmail.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                Nama: form.name.value,
                Email: form.email.value,
                Telepon: form.phone.value,
                Pesan: form.message.value,
                _subject: "Pesan Baru dari Portfolio - " + form.name.value
            })
        })
            .then(function (response) {
                return response.json();
            })
            .then(function () {
                form.reset();
                alert("Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.");
            })
            .catch(function (error) {
                console.log('FAILED...', error);
                alert("Pesan gagal dikirim. Silakan coba lagi atau hubungi lewat email langsung.");
            })
            .finally(function () {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            });
    });
    // <!-- kirim form kontak lewat FormSubmit -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Moch Revano Budiansyah";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
const typed = new Typed(".typing-text", {
    strings: ["IT Support", "IT Security", "Web Developer", "Network Administration"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

/* ===== SCROLL REVEAL ANIMATION (shared instance) ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* re-init tilt on any .tilt element currently in the DOM */
function initTilt() {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
}

async function fetchData(type = "projects") {
    const response = await fetch("./projects/projects.json");
    return response.json();
}

function renderProjectCard(project) {
    return `
        <div class="box tilt">
      <div class="proj-banner" style="background: linear-gradient(135deg, ${project.color}, #0b0b1a);">
        <i class="fas ${project.icon}"></i>
      </div>
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.code}" class="btn" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> Lihat di GitHub</a>
          </div>
        </div>
      </div>
    </div>`;
}

function showProjects(projects) {
    const projectsContainer = document.querySelector("#work .box-container");
    projectsContainer.innerHTML = projects.slice(0, 6).map(renderProjectCard).join("");

    // <!-- tilt js effect starts -->
    initTilt();
    // <!-- tilt js effect ends -->

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });
}

fetchData("projects").then(showProjects);

// <!-- tilt js effect starts -->
initTilt();
// <!-- tilt js effect ends -->

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* SCROLL HOME (srtop instance defined earlier, shared across the page) */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
