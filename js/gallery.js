// Scroll to gallery section
function scrollToGallery() {
    document.querySelector('.gallery-container').scrollIntoView({ behavior: 'smooth' });
}

// Gallery array with descriptions
const gallery = [
    { cat: "Annual concert", src: "images/28.jpg", description: "Celestial Chorale at the Annual Concert, performing in full harmony." },
    { cat: "Annual concert", src: "images/IMG_3636.jpg", description: "Orchestra performing during our Annual Concert, an unforgettable night." },
    { cat: "Annual concert", src: "images/Image-2024-02-20.jpeg", description: "The Celestial Chorale choir members in action." },
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

// Display filtered images or a message if no images are available
function displayImages(category) {
    GIC.innerHTML = ""; // Clear the container
    GIC.classList.remove('no-images'); // Remove the no-images class in case it's set

    filteredGallery = (category === "all") ? gallery : gallery.filter(item => item.cat.toLowerCase() === category.toLowerCase());

    // Check if there are any images to display
    if (filteredGallery.length === 0) {
        GIC.classList.add('no-images'); // Add the no-images class to center the message
        const noImagesMessage = document.createElement("div");
        noImagesMessage.classList.add("no-images-message");
        noImagesMessage.innerHTML = `
            <h3>No images available</h3>
            <p>Currently, there are no images in the <strong>${category}</strong> category. Please check back later or explore other categories.</p>
        `;
        GIC.appendChild(noImagesMessage);
        return;
    }

    // Display images if available
    filteredGallery.forEach((item, index) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");

        const imgElement = document.createElement("img");
        imgElement.src = item.src;
        imgElement.alt = item.description;

        // Add a listener to apply the "loaded" class once the image is loaded
        imgElement.onload = () => {
            imgElement.classList.add('loaded');
        };

        imgElement.addEventListener("click", () => openLightbox(index)); // Click event to open lightbox

        const descriptionOverlay = document.createElement("div");
        descriptionOverlay.classList.add("img-description-overlay");
        descriptionOverlay.innerText = item.description;

        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(descriptionOverlay);
        GIC.appendChild(imgContainer);
    });
}


// Set active tab styling
function setActiveTab(activeTab) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active-tab'));
    activeTab.classList.add('active-tab');
}

// Open the lightbox
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

// Initialize gallery with "All" tab active
window.onload = () => {
    displayImages("all");
    setActiveTab(TabAll);
};
