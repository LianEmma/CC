// Function to fetch the live event
function fetchLiveEvent() {
    fetch('backend/get_live_event.php')
        .then(response => response.json())
        .then(data => {
            if (data.no_live_event) {
                fetchUpcomingEvent(); // If no live event, fetch upcoming event info
            } else {
                displayLiveEvent(data);
            }
        });
}

// Function to display live event details
function displayLiveEvent(event) {
    // Update the Live Updates section
    const liveUpdatesDiv = document.querySelector('.live-updates .update-feed');
    liveUpdatesDiv.innerHTML = `<p>${event.title}: ${event.description}</p>`;

    // Update countdown timer for live event end time
    const eventEndTime = new Date(event.end_time).getTime();
    updateCountdown(eventEndTime, true);

    // Show the "Join Now" button for the live event
    const joinNowButton = document.querySelector('.countdown-timer button');
    joinNowButton.style.display = "block";
    joinNowButton.addEventListener("click", () => {
        // Redirect to the live event page or URL
        window.location.href = "live-event.html"; // Replace with the actual live event page or URL
    });
}

// Function to fetch the upcoming event
function fetchUpcomingEvent() {
    fetch('backend/get_upcoming_event.php')
        .then(response => response.json())
        .then(data => {
            if (!data.no_upcoming_event) {
                displayUpcomingEvent(data);
            } else {
                displayNoEvents();
            }
        });
}

// Function to display upcoming event details
function displayUpcomingEvent(event) {
    // Update the Live Updates section with the next upcoming event
    const liveUpdatesDiv = document.querySelector('.live-updates .update-feed');
    liveUpdatesDiv.innerHTML = `<p>Upcoming Event: ${event.title}</p><p>${event.description}</p>`;

    // Update countdown timer for upcoming event start time
    const eventStartTime = new Date(event.start_time).getTime();
    updateCountdown(eventStartTime, false);
}

// Function to display message when no events are found
function displayNoEvents() {
    const liveUpdatesDiv = document.querySelector('.live-updates .update-feed');
    liveUpdatesDiv.innerHTML = `<p>No ongoing or upcoming events available at the moment.</p>`;

    const countdownTimerDiv = document.querySelector('.countdown-timer .timer');
    countdownTimerDiv.innerHTML = "<p>No events scheduled</p>";
}

// Function to update the countdown timer
function updateCountdown(targetTime, isLiveEvent) {
    const countdownTimerDiv = document.querySelector('.countdown-timer .timer');
    const joinNowButton = document.querySelector('.countdown-timer button');

    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = targetTime - now;

        if (timeLeft <= 0) {
            if (isLiveEvent) {
                countdownTimerDiv.innerHTML = "<p>Event has ended.</p>";
                joinNowButton.style.display = "none";
            } else {
                fetchLiveEvent(); // Fetch live event once the upcoming event starts
            }
            clearInterval(timerInterval);
            return;
        }

        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownTimerDiv.innerHTML = `<p>${hours}:${minutes}:${seconds}</p>`;
    }

    updateTimer(); // Initialize timer immediately
    const timerInterval = setInterval(updateTimer, 1000);
}

// Initialize fetching events
document.addEventListener('DOMContentLoaded', () => {
    fetchLiveEvent();
});
