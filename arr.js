// script.js

let memslider = document.querySelector(".mem-slider");
let slides = document.querySelectorAll(".slide");
let currentIndex = 0;
let autoPlay;
let isTransitioning = false;
let lastMovedSlide = null; // Track the last moved-out slide

// Move the initially active slide to the mem-slider
let initializeSlider = () => {
    let activeSlide = document.querySelector(".slide.active");
    memslider.appendChild(activeSlide);
    adjustMemSliderHeight(activeSlide);
};

// Function to move the active slide into mem-slider and swap it with the current one
let moveCarousel = () => {
    if (isTransitioning) return; // Prevent new transitions while one is in progress

    isTransitioning = true; // Set the flag to block new transitions

    // Remove the current slide from mem-slider and track the outgoing div
    if (memslider.children.length > 0) {
        let currentSlide = memslider.children[0];

        // Add animation for moving out the current slide
        currentSlide.classList.add("full-width");

        // Temporarily place it at the bottom of the grid container
        setTimeout(() => {
            let slidesContainer = document.querySelector(".slides");
            slidesContainer.appendChild(currentSlide);
            currentSlide.classList.remove("full-width");
            currentSlide.style.gridColumn = "1 / -1"; // Make it occupy the full width in the grid
            currentSlide.style.gridRow = "3 / span 1"; // Ensure it occupies the bottom row

            // Reset the previous slide to its original position if any
            if (lastMovedSlide) {
                lastMovedSlide.style.gridColumn = ""; // Reset to original
                lastMovedSlide.style.gridRow = ""; // Reset to original
            }

            // Update the last moved slide to the current one
            lastMovedSlide = currentSlide;
            isTransitioning = false; // Allow the next transition to proceed
        }, 1000); // Timeout matches the fade-in duration
    }

    // Move the next slide into mem-slider
    currentIndex = (currentIndex + 1) % slides.length; // Update current index safely
    let nextSlide = slides[currentIndex];
    nextSlide.style.animation = "zoomIn 0.8s ease-out";
    memslider.appendChild(nextSlide);

    // Adjust the mem-slider height based on the new slide's height (if needed)
    adjustMemSliderHeight(nextSlide);
};

// Function to adjust mem-slider height dynamically (we're using 100dvh for full screen)
let adjustMemSliderHeight = (slide) => {
    memslider.style.height = `calc(100dvh)`; // Use 100dvh for full-screen effect
};

// Start the automatic carousel
let startCarousel = () => {
    autoPlay = setInterval(() => {
        moveCarousel();
    }, 5000); // Move to the next slide every 5 seconds
};

// Initialize the slider with the active slide
initializeSlider();
startCarousel();
