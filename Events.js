document.addEventListener("DOMContentLoaded", () => {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYear = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const selectedDateElement = document.getElementById('selected-date');
    const eventList = document.getElementById('event-list');
    const addEventButton = document.getElementById('add-event-button');
    const eventModal = document.getElementById('event-modal');
    const closeModal = document.querySelector('.close-btn');
    const eventForm = document.getElementById('event-form');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let events = {};

    function renderCalendar(month, year) {
        calendarGrid.innerHTML = '<div class="day-label">Sun</div><div class="day-label">Mon</div><div class="day-label">Tue</div><div class="day-label">Wed</div><div class="day-label">Thu</div><div class="day-label">Fri</div><div class="day-label">Sat</div>';
        
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            calendarGrid.appendChild(document.createElement('div'));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.classList.add('day');

            const dateKey = `${year}-${month}-${day}`;
            if (events[dateKey]) {
                dayElement.classList.add('event');
            }

            dayElement.addEventListener('click', () => {
                selectedDateElement.textContent = `${year}-${month + 1}-${day}`;
                renderEvents(dateKey);
            });

            calendarGrid.appendChild(dayElement);
        }

        monthYear.textContent = `${year}-${month + 1}`;
    }

    function renderEvents(dateKey) {
        eventList.innerHTML = '';
        if (events[dateKey]) {
            events[dateKey].forEach(event => {
                const li = document.createElement('li');
                li.textContent = `${event.name}: ${event.description}`;
                eventList.appendChild(li);
            });
        }
    }

    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    addEventButton.addEventListener('click', () => {
        eventModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        eventModal.style.display = 'none';
    });

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const dateKey = selectedDateElement.textContent;
        if (!events[dateKey]) events[dateKey] = [];

        const eventName = document.getElementById('event-name').value;
        const eventDescription = document.getElementById('event-description').value;
        events[dateKey].push({ name: eventName, description: eventDescription });

        renderEvents(dateKey);
        eventModal.style.display = 'none';
        renderCalendar(currentMonth, currentYear);
        eventForm.reset();
    });

    renderCalendar(currentMonth, currentYear);
});

// #####################################
// Example function to handle redirection to the live event
// Sample data for poll results
const pollResults = {
    Speakers: 0,
    Topics: 0,
    Networking: 0
};

// Function to handle "Join Live" redirection
function goToLiveEvent(liveUrl) {
    window.open(liveUrl, "_blank"); // Opens the live event in a new tab
}

// Function to handle poll submission
function submitPoll() {
    const selectedOption = document.querySelector('input[name="poll-option"]:checked');
    
    if (!selectedOption) {
        alert("Please select an option before voting!");
        return;
    }

    const optionValue = selectedOption.value;
    pollResults[optionValue]++;

    displayPollResults();
}

// Display poll results
function displayPollResults() {
    const pollResultsDiv = document.getElementById("poll-results");
    const pollResultsList = document.getElementById("poll-results-list");
    
    pollResultsList.innerHTML = ""; // Clear existing results

    for (const [option, votes] of Object.entries(pollResults)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${option}: ${votes} votes`;
        pollResultsList.appendChild(listItem);
    }

    document.getElementById("poll-form").style.display = "none";
    pollResultsDiv.style.display = "block";
}

// Function to handle Q&A submission
function submitQuestion() {
    const questionInput = document.getElementById("question-input");
    const question = questionInput.value.trim();

    if (!question) {
        alert("Please enter a question!");
        return;
    }

    const questionsList = document.getElementById("questions-list");
    const listItem = document.createElement("li");
    listItem.textContent = question;
    questionsList.appendChild(listItem);

    // Clear input field after submission
    questionInput.value = "";
}

// Function to check if the event is live and display the "Join Live" button
function checkLiveStatus(eventDate, eventTime, buttonId) {
    const eventDateTime = new Date(`${eventDate}T${eventTime}`).getTime();
    const currentTime = new Date().getTime();

    // Display the "Join Live" button only if the current time is within the event duration (assuming 2 hours duration)
    if (currentTime >= eventDateTime && currentTime <= eventDateTime + 2 * 60 * 60 * 1000) {
        document.getElementById(buttonId).style.display = "block";
    } else {
        document.getElementById(buttonId).style.display = "none";
    }
}

// Check the live status of the event (Replace the date and time accordingly)
checkLiveStatus('2024-09-03', '14:00', 'join-live-btn-1');


