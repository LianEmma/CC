// Scroll to gallery section
function scrollToGallery() {
    document.querySelector('.gallery-container').scrollIntoView({ behavior: 'smooth' });
}

// Gallery array with descriptions
const gallery = [
    { cat: "Annual concert", src: "images/28.jpg", description: "Celestial Chorale at the Annual Concert, performing in full harmony." },
    { cat: "Annual concert", src: "images/110.jpg", description: "Orchestra performing during our Annual Concert, an unforgettable night." },
    { cat: "Annual concert", src: "images/141.jpg", description: "The Celestial Chorale choir members in action." },
    { cat: "Annual concert", src: "images/chorale.jpg", description: "A powerful performance led by our talented conductor." },
    { cat: "community", src: "images/chorale1.jpg", description: "Bringing the community together with soulful music." },
    { cat: "Annual concert", src: "images/chorale2.jpg", description: "Harmony in every note during the concert finale." },
    { cat: "Annual concert", src: "images/chorale3.jpg", description: "Celestial Chorale at its peak performance." },
    { cat: "Annual concert", src: "images/chorale4.jpg", description: "An evening of music, joy, and memories." }
];

// DOM Elements
const GIC = document.querySelector(".gallery-image-container");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageIndex = -1;
let filteredGallery = [];

// Tabs
const TabAll = document.querySelector("#TabAll");
const Tab1 = document.querySelector("#Tab1");
const Tab2 = document.querySelector("#Tab2");
const Tab3 = document.querySelector("#Tab3");
const Tab4 = document.querySelector("#Tab4");
const Tab5 = document.querySelector("#Tab5");

// Display filtered images with descriptions
function displayImages(category) {
    GIC.innerHTML = ""; // Clear the container
    filteredGallery = (category === "all") ? gallery : gallery.filter(item => item.cat.toLowerCase() === category.toLowerCase());

    filteredGallery.forEach((item, index) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");

        const imgElement = document.createElement("img");
        imgElement.src = item.src;
        imgElement.alt = item.description;
        imgElement.addEventListener("click", () => openLightbox(index)); // Click event to open lightbox

        const description = document.createElement("p");
        description.classList.add("image-description");
        description.innerText = item.description;

        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(description);
        GIC.appendChild(imgContainer);
    });
}

// Set active tab styling
function setActiveTab(activeTab) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active-tab'));
    activeTab.classList.add('active-tab');
}

// Open the lightbox with description below the image
function openLightbox(index) {
    currentImageIndex = index;
    lightboxImage.src = filteredGallery[currentImageIndex].src;
    lightboxDescription.innerText = filteredGallery[currentImageIndex].description;
    lightbox.classList.add("active");
}

// Close the lightbox
function closeLightbox() {
    lightbox.classList.remove("active");
}

// Navigate to the next image in the lightbox
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredGallery.length;
    openLightbox(currentImageIndex);
}

// Navigate to the previous image in the lightbox
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredGallery.length) % filteredGallery.length;
    openLightbox(currentImageIndex);
}

// Event listeners for tabs
TabAll.addEventListener("click", () => { displayImages("all"); setActiveTab(TabAll); });
Tab1.addEventListener("click", () => { displayImages("Annual concert"); setActiveTab(Tab1); });
Tab2.addEventListener("click", () => { displayImages("community"); setActiveTab(Tab2); });
Tab3.addEventListener("click", () => { displayImages("Youth Choir"); setActiveTab(Tab3); });
Tab4.addEventListener("click", () => { displayImages("Music Therapy Sessions"); setActiveTab(Tab4); });
Tab5.addEventListener("click", () => { displayImages("Christmas Carols"); setActiveTab(Tab5); });

// Lightbox controls
lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", prevImage);
lightboxNext.addEventListener("click", nextImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard controls for navigation and closing the lightbox
document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("active")) {
        if (e.key === "Escape") closeLightbox();
        else if (e.key === "ArrowRight") nextImage();
        else if (e.key === "ArrowLeft") prevImage();
    }
});

// Full-screen toggle button
const fullscreenBtn = document.createElement('button');
fullscreenBtn.classList.add('fullscreen-btn');
fullscreenBtn.innerText = 'Fullscreen';
document.body.appendChild(fullscreenBtn);

fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenBtn.innerText = 'Exit Fullscreen';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            fullscreenBtn.innerText = 'Fullscreen';
        }
    }
});

// Initialize gallery with "All" tab active
window.onload = () => {
    displayImages("all");
    setActiveTab(TabAll);
};

