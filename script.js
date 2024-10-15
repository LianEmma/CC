// Function to handle dropdown animation for the hamburger menu
let Drop = () => {
    const dropDown = document.querySelector(".drop-down");
    const bars = document.querySelector(".bars");

    // Toggle drop-down menu with a smooth animation
    bars.addEventListener("click", () => {
        dropDown.classList.toggle("active");

        if (dropDown.classList.contains("active")) {
            dropDown.style.maxHeight = dropDown.scrollHeight + "px"; // Expand the dropdown
        } else {
            dropDown.style.maxHeight = "0"; // Collapse the dropdown
        }
    });
};

// Function to handle dropdown animation for the account section (desktop)
let DropDownCon = () => {
    const acc = document.querySelector("#acc");
    const signs = document.querySelector(".signs");
    const arrowup = document.querySelector(".fa-chevron-up");
    const arrowdown = document.querySelector(".fa-chevron-down");

    // Toggle account sign-in/sign-up with smooth animation
    acc.addEventListener("click", () => {
        if(!acc.classList.contains("active")){
            signs.classList.toggle("active");
            arrowup.classList.add("active");
            arrowdown.classList.add("hide");
        }else{
            signs.classList.remove("active")
        }
    });
};

// Function to handle dropdown animation for the account section (mobile)
let ProfDrop = () => {
    const accountD = document.querySelector(".accountD");
    const signsD = document.querySelector(".signsD");

    // Toggle account sign-in/sign-up with smooth animation (mobile)
    accountD.addEventListener("click", () => {
        signsD.classList.toggle("active");

        if (signsD.classList.contains("active")) {
            signsD.style.maxHeight = signsD.scrollHeight + "px"; // Expand the dropdown
        } else {
            signsD.style.maxHeight = "0"; // Collapse the dropdown
        }
    });
};

// Call the functions on page load
Drop();
DropDownCon();
ProfDrop();


let heroSlider = document.querySelector(".hero-slider");
let heroSlides = document.querySelectorAll(".hero-slide");
let heroIndex = 0;
let AutoPlayInterval;

let HeroSliding=(index)=>{

    heroSlides[heroIndex].classList.remove("active");
        heroIndex = index;

        if (heroIndex < 0) {
            heroIndex = heroSlides.length-1
        } else if(heroIndex > heroSlides.length - 1){
            heroIndex = 0;
        }

        heroSlides[heroIndex].classList.add("active");
}

let playNextSlideHero =()=>{
    HeroSliding(heroIndex + 1);
}

let startAutoPlayHeroSlider =()=>{
    AutoPlayInterval = setInterval(playNextSlideHero,5000);
}

let stopHeroslider=()=>{
    clearInterval=(AutoPlayInterval)
}

startAutoPlayHeroSlider();

let currentSlide = 0;
const Hslides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

const changeSlide = (index) => {
    Hslides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = index;
    Hslides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
};

document.querySelector(".next-slide").addEventListener("click", () => {
    changeSlide((currentSlide + 1) % Hslides.length);
});

document.querySelector(".prev-slide").addEventListener("click", () => {
    changeSlide((currentSlide - 1 + Hslides.length) % Hslides.length);
});

dots.forEach(dot => {
    dot.addEventListener("click", () => {
        changeSlide(parseInt(dot.dataset.slide));
    });
});


// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.classList.toggle('hidden');
        question.classList.toggle('active');  // Toggle active class for icon rotation
    });
});

// ##############Dark Mode#########
// Dark Mode Toggle
const darkModeBtn = document.getElementById('dark-mode-btn');
const darkModeIcon = darkModeBtn.querySelector('i');

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Toggle between moon and sun icons
    if (document.body.classList.contains('dark-mode')) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Check if dark mode was previously enabled
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
}


// ##########Live counter###########
// Countdown timer example script
const eventEndTime = new Date("2024-09-30T15:30:00").getTime(); // Replace with actual end time

const updateTimer = () => {
    const now = new Date().getTime();
    const timeLeft = eventEndTime - now;

    if (timeLeft < 0) {
        document.getElementById("event-timer").innerHTML = "Event Ended";
        return;
    }

    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("event-timer").innerHTML = `${hours}:${minutes}:${seconds}`;
};

// Update timer every second
setInterval(updateTimer, 1000);

