// DOM Elements
const eventsGrid = document.getElementById('eventsGrid');
const searchInput = document.getElementById('searchInput');

// Check admin authentication
function checkAdminAuth() {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
        showErrorMessage('Please login to access this page');
        return false;
    }
    return true;
}

// Initialize page
function init() {
    if (checkAdminAuth()) {
        loadEvents();
        setupEventListeners();
    }
}

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
}

// Use only the static events from detailsparty.js for display
const staticEvents = [
    {
        id: 1,
        name: "Pyramids Sound & Light Show",
        date: "2024-06-01",
        time: "19:00",
        location: "Giza Pyramids, Cairo",
        price: 300,
        availableTickets: 100,
        description: "A magical night at the pyramids with sound and light effects.",
        image: "images/pyramids.jpg"
    },
    {
        id: 2,
        name: "Nile Jazz Night",
        date: "2024-06-10",
        time: "20:00",
        location: "Nile Ritz-Carlton, Cairo",
        price: 450,
        availableTickets: 80,
        description: "Enjoy smooth jazz by the Nile with top artists.",
        image: "images/jazz.jpg"
    },
    // ... add all other events from detailsparty.js here ...
];

function loadEvents() {
    displayEvents(staticEvents);
}

// Display events
function displayEvents(events) {
    eventsGrid.innerHTML = '';
    
    if (events.length === 0) {
        eventsGrid.innerHTML = '<p class="no-events">No events found</p>';
        return;
    }

    // Create event rows (2 events per row)
    for (let i = 0; i < events.length; i += 2) {
        const eventRow = document.createElement('div');
        eventRow.className = 'event-row';

        // Add first event
        const event1 = createEventCard(events[i]);
        eventRow.appendChild(event1);

        // Add second event if exists
        if (i + 1 < events.length) {
            const event2 = createEventCard(events[i + 1]);
            eventRow.appendChild(event2);
        }

        eventsGrid.appendChild(eventRow);
    }
}

// Create event card
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card event-card-horizontal';
    card.setAttribute('data-event-id', event.id);
    
    card.innerHTML = `
        <img src="${event.image}" alt="${event.name}" class="event-image">
        <div class="event-info">
            <h3>${event.name}</h3>
            <p class="event-desc">${event.description}</p>
            <div class="event-details">
                <p><i class="fas fa-calendar"></i> ${event.info?.date || event.date}</p>
                <p><i class="fas fa-clock"></i> ${event.info?.gatesOpen || event.time}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${event.info?.location || event.location}</p>
                <p><i class="fas fa-ticket-alt"></i> Available Tickets: ${event.info?.availableTickets || event.availableTickets}/${event.info?.totalTickets || event.totalTickets}</p>
                <p><i class="fas fa-dollar-sign"></i> Price: ${event.info?.price || `$${event.ticketPrice}`}</p>
                <p><i class="fas fa-hourglass-half"></i> Duration: ${event.info?.duration || `${event.duration} hours`}</p>
            </div>
            <div class="event-actions">
                <button class="edit-btn" onclick="editEvent('${event.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteEvent('${event.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const allEvents = staticEvents;
    const filteredEvents = allEvents.filter(event =>
        (event.name && event.name.toLowerCase().includes(searchTerm)) ||
        (event.type && event.type.toLowerCase().includes(searchTerm)) ||
        (event.location && event.location.toLowerCase().includes(searchTerm))
    );
    displayEvents(filteredEvents);
}

// Edit event (only for localStorage events)
function editEvent(eventId) {
    // Only allow editing for events in localStorage
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    if (storedEvents.some(ev => String(ev.id) === String(eventId))) {
        localStorage.setItem('editingEventId', eventId);
        window.location.href = 'add-event.html';
    } else {
        showErrorMessage('You can only edit events you created.');
    }
}

// Delete event (only for localStorage events)
function deleteEvent(eventId) {
    // Only allow deleting for events in localStorage
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    if (storedEvents.some(ev => String(ev.id) === String(eventId))) {
        if (confirm('Are you sure you want to delete this event?')) {
            const updatedEvents = storedEvents.filter(event => String(event.id) !== String(eventId));
            localStorage.setItem('events', JSON.stringify(updatedEvents));
            showSuccessMessage('Event deleted successfully');
            loadEvents();
        }
    } else {
        showErrorMessage('You can only delete events you created.');
    }
}

// Show success message
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

// Show error message
function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 