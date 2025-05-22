// Constants
const API_KEY = "aac1fb6c2685a25643c1ccb5474a8025";

// Sample events data (from detailsparty.js)
const events = [
    {
        id: 0,
        name: "Pyramids Sound & Light Show",
        image: "WhatsApp Image 2025-05-18 at 07.24.18_6dab85f3.jpg",
        description: "Experience the magic of ancient Egypt at the Pyramids Sound & Light Show! Set against the breathtaking backdrop of the Giza Pyramids, this mesmerizing event brings history to life with vibrant lights, captivating narration, and enchanting music.",
        type: "Theater",
        info: {
            shows: 1,
            date: "20 May 2025",
            time: "7:00 PM",
            location: "Giza Pyramids Plateau",
            price: 1500,
            duration: "2 hours",
            gatesOpen: "6:30 PM",
            totalTickets: 700,
            reservedTickets: 500,
            availableTickets: 200
        }
    },
    {
        id: 1,
        name: "Project Meem: Marwan Pablo & Marwan Moussa",
        image: "WhatsApp Image 2025-05-18 at 07.24.18_640aeaf6.jpg",
        description: "Get ready for a historic night that will shake Cairo! Marwan Pablo and Marwan Moussa, Egypt's rap legends, join forces on one explosive stage.",
        type: "Concert",
        info: {
            shows: 1,
            date: "23 May 2025",
            time: "8:00 PM",
            location: "Cairo Festival City Mall",
            price: 750,
            duration: "3 hours",
            gatesOpen: "7:00 PM",
            totalTickets: 600,
            reservedTickets: 400,
            availableTickets: 200
        }
    },
    {
        id: 2,
        name: "Disney On Ice (Let's Celebrate)",
        image: "WhatsApp Image 2025-05-18 at 07.24.18_387ea5b6.jpg",
        description: "Step into a magical world of wonder with Disney On Ice! Join Mickey, Minnie, and all your favorite Disney characters as they glide across the ice in a spectacular show filled with dazzling lights, stunning costumes, and heartwarming stories.",
        type: "Theater",
        info: {
            shows: 2,
            date: "25 May 2025",
            time: "6:00 PM",
            location: "Cairo International Stadium",
            price: 350,
            duration: "2 hours",
            gatesOpen: "6:00 PM",
            totalTickets: 800,
            reservedTickets: 600,
            availableTickets: 200
        }
    },
    {
        id: 3,
        name: "Travis Scott",
        image: "c8aef1ee1deb0403f30b32873428117f.jpg",
        description: "Cairo is about to get lit! Travis Scott brings his UTOPIA tour to Egypt with mind-blowing visuals, high-energy performances, and chart-topping hits like 'SICKO MODE' and 'Goosebumps.'",
        type: "Concert",
        info: {
            shows: 1,
            date: "27 May 2025",
            time: "8:00 PM",
            location: "Gezira Sporting Club",
            price: 4000,
            duration: "2.5 hours",
            gatesOpen: "8:00 PM",
            totalTickets: 900,
            reservedTickets: 700,
            availableTickets: 200
        }
    },
    {
        id: 4,
        name: "Justin Bieber",
        image: "190a60d1175a621df4b5dab8d1870db3.jpg",
        description: "Pop superstar Justin Bieber is coming to Cairo! Get ready to sing along to global hits like 'Baby,' 'Sorry,' and 'Peaches' in a night of pure stardom.",
        type: "Concert",
        info: {
            shows: 1,
            date: "29 May 2025",
            time: "7:30 PM",
            location: "Zamalek Open Air Theater",
            price: 7000,
            duration: "3 hours",
            gatesOpen: "7:30 PM",
            totalTickets: 1000,
            reservedTickets: 900,
            availableTickets: 100
        }
    },
    {
        id: 5,
        name: "Mohamed Hamaki",
        image: "8aece73ebb3351635f4b57d55ba0c6d4.jpg",
        description: "Prepare for a night of romance and rhythm with Hamagy! His soulful voice and energetic performance will take you on a journey through his biggest hits.",
        type: "Concert",
        info: {
            shows: 1,
            date: "31 May 2025",
            time: "7:00 PM",
            location: "El Sawy Culturewheel",
            price: 600,
            duration: "2 hours",
            gatesOpen: "7:00 PM",
            totalTickets: 500,
            reservedTickets: 300,
            availableTickets: 200
        }
    },
    {
        id: 6,
        name: "Tamer Hosny",
        image: "007f3ce5e34531ac1fe846a247945270.jpg",
        description: "The king of Arab pop, Tamer Hosny, is back to light up Cairo! Join thousands of fans for a night filled with passion, love, and unforgettable music.",
        type: "Concert",
        info: {
            shows: 1,
            date: "2 June 2025",
            time: "7:30 PM",
            location: "Al Manara International Conferences Center",
            price: 800,
            duration: "3 hours",
            gatesOpen: "7:30 PM",
            totalTickets: 1000,
            reservedTickets: 800,
            availableTickets: 200
        }
    },
    {
        id: 7,
        name: "Amr Diab",
        image: "2ff00f7ee03740e5ee07a80380d6d7eb.jpg",
        description: "The legend Amr Diab returns for a summer concert you can't miss! Dance the night away to iconic hits like 'Nour El Ain,' 'Tamally Maak,' and 'Leily Nahary.'",
        type: "Concert",
        info: {
            shows: 1,
            date: "4 June 2025",
            time: "9:00 PM",
            location: "Arab Academy for Science, Technology & Maritime Transport",
            price: 1200,
            duration: "3 hours",
            gatesOpen: "9:00 PM",
            totalTickets: 1000,
            reservedTickets: 850,
            availableTickets: 150
        }
    },
    {
        id: 8,
        name: "Tamer Ashour",
        image: "2ed1205fce091c30b47bc46b8c6eaf62.jpg",
        description: "Let your heart soar with Tamer Ashour's emotional melodies! Known for his heartfelt lyrics and soulful voice, Tamer will take you on an emotional journey.",
        type: "Concert",
        info: {
            shows: 1,
            date: "6 June 2025",
            time: "7:00 PM",
            location: "Cairo Opera House",
            price: 1000,
            duration: "2 hours",
            gatesOpen: "7:00 PM",
            totalTickets: 600,
            reservedTickets: 400,
            availableTickets: 200
        }
    },
    {
        id: 9,
        name: "Wegz",
        image: "15da3e386f272a3c6c0f84a0837ba857.jpg",
        description: "The trap king of Egypt, Wegz, is here to set the stage ablaze in Cairo! Known for his groundbreaking hits like 'Dory,' 'Bozluf,' and 'El Bakht.'",
        type: "Concert",
        info: {
            shows: 1,
            date: "8 June 2025",
            time: "7:00 PM",
            location: "AUC Tahrir Square Campus",
            price: 850,
            duration: "2.5 hours",
            gatesOpen: "7:00 PM",
            totalTickets: 700,
            reservedTickets: 500,
            availableTickets: 200
        }
    },
    {
        id: 10,
        name: "Sherine",
        image: "22dce9c30ca41e6832e69b1144f1c63f.jpg",
        description: "Feel the magic of Sherine's voice in a night that will touch your soul! With her timeless hits like 'Sabry Aalil,' 'Kolly Melkak,' and 'Hobbak Wajaa.'",
        type: "Concert",
        info: {
            shows: 1,
            date: "10 June 2025",
            time: "8:00 PM",
            location: "Cairo International Conference Center",
            price: 900,
            duration: "2.5 hours",
            gatesOpen: "8:00 PM",
            totalTickets: 800,
            reservedTickets: 600,
            availableTickets: 200
        }
    }
];

// DOM Elements
const addEventBtn = document.getElementById('add-event-btn');
const viewEventsBtn = document.getElementById('view-events-btn');
const reportsBtn = document.getElementById('reports-btn');
const logoutBtn = document.getElementById('logout-btn');
const addEventForm = document.getElementById('add-event-form');
const eventsSection = document.getElementById('events-section');
const reportsSection = document.getElementById('reports-section');
const searchInput = document.getElementById('search-input');
const menuIcon = document.getElementById('menu-icon');
const sideBar = document.getElementById('side-bar');
const closeSideBar = document.getElementById('close-side-bar');
const eventsGrid = document.getElementById('eventsGrid');
const exploreBtn = document.getElementById('exploreBtn');
const eventModal = document.getElementById('eventModal');
const closeBtn = document.querySelector('.close-btn');
const ticketQuantity = document.getElementById('ticketQuantity');

// Sections
const addEventSection = document.getElementById('addEventSection');

// Check admin authentication
function checkAdminAuth() {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
        window.location.href = 'login.html';
    }
}

// Navigation functions
function showAddEvent() {
    addEventForm.classList.remove('hidden');
    eventsSection.classList.add('hidden');
    reportsSection.classList.add('hidden');
}

function showEvents() {
    addEventForm.classList.add('hidden');
    eventsSection.classList.remove('hidden');
    reportsSection.classList.add('hidden');
    loadEvents();
}

function showReports() {
    addEventForm.classList.add('hidden');
    eventsSection.classList.add('hidden');
    reportsSection.classList.remove('hidden');
    loadReports();
}

// Event Handlers
addEventBtn.addEventListener('click', showAddEvent);
viewEventsBtn.addEventListener('click', showEvents);
reportsBtn.addEventListener('click', showReports);
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    window.location.href = 'login.html';
});

exploreBtn.addEventListener('click', () => {
    showEvents();
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        const eventName = card.querySelector('h3').textContent.toLowerCase();
        const eventType = card.querySelector('.event-type').textContent.toLowerCase();
        const eventLocation = card.querySelector('.event-location').textContent.toLowerCase();
        
        if (eventName.includes(searchTerm) || 
            eventType.includes(searchTerm) || 
            eventLocation.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Weather API function
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        if (data.cod === 200) {
            return {
                temp: Math.round(data.main.temp),
                description: data.weather[0].description,
                humidity: data.main.humidity
            };
        }
        throw new Error("Weather data not found");
    } catch (error) {
        console.error("Error fetching weather:", error);
        return {
            temp: "N/A",
            description: "Unable to fetch weather data",
            humidity: "N/A"
        };
    }
}

// Function to show event details
function showEventDetails(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const modal = document.getElementById('eventModal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${event.name}</h2>
            <button class="close-btn" onclick="closeModal()">&times;</button>
        </div>
        <img src="${event.image}" alt="${event.name}" class="modal-image">
        <p class="modal-description">${event.description}</p>
        <div class="modal-info">
            <p><i class="fas fa-calendar icon"></i> Date: ${event.info.date}</p>
            <p><i class="fas fa-clock icon"></i> Time: ${event.info.time}</p>
            <p><i class="fas fa-map-marker-alt icon"></i> Location: ${event.info.location}</p>
            <p><i class="fas fa-ticket-alt icon"></i> Price: EGP ${event.info.price}</p>
            <p><i class="fas fa-hourglass-half icon"></i> Duration: ${event.info.duration}</p>
            <p><i class="fas fa-door-open icon"></i> Gates Open: ${event.info.gatesOpen}</p>
            <p><i class="fas fa-ticket-alt icon"></i> Available Tickets: ${event.info.availableTickets}</p>
        </div>
        <div class="quantity-section">
            <label for="ticketQuantity">Number of Tickets:</label>
            <select id="ticketQuantity" onchange="updateTotalPrice(${event.info.price})">
                ${Array.from({length: Math.min(10, event.info.availableTickets)}, (_, i) => 
                    `<option value="${i + 1}">${i + 1}</option>`
                ).join('')}
            </select>
            <p class="total-price">Total: EGP ${event.info.price}</p>
        </div>
        <div class="modal-buttons">
            <button class="back-btn" onclick="closeModal()">Back</button>
            <button class="buy-btn" onclick="buyTickets(${event.id})">Buy Tickets</button>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
}

// Function to buy tickets
function buyTickets(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const quantity = parseInt(document.getElementById('ticketQuantity').value);
    if (quantity > event.info.availableTickets) {
        alert('Not enough tickets available!');
        return;
    }

    // Update available tickets
    event.info.availableTickets -= quantity;
    event.info.reservedTickets += quantity;

    // Show success message
    alert(`Successfully purchased ${quantity} ticket(s) for ${event.name}!`);
    closeModal();
    loadEvents(); // Refresh the events display
}

// Load all events
function loadEvents() {
    displayEvents(events);
}

// Display events in grid
function displayEvents(events) {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;
    
    eventsGrid.innerHTML = '';
    
    if (!events || events.length === 0) {
        // If no events, show a test card
        const eventRow = document.createElement('div');
        eventRow.className = 'event-row';
        eventRow.innerHTML = `
            <div class="event-card event-card-horizontal">
                <img src="https://via.placeholder.com/300x200.png?text=No+Events" alt="Test Event">
                <div class="event-info">
                    <h3>Test Event</h3>
                    <p class="event-desc">This is a test event card. If you see this, the layout works!</p>
                    <div class="event-actions">
                        <button class="view-details">View Details</button>
                        <button class="buy-tickets">Buy Tickets</button>
                    </div>
                </div>
            </div>
        `;
        eventsGrid.appendChild(eventRow);
        return;
    }
    // Create rows of 2 events each
    for (let i = 0; i < events.length; i += 2) {
        const eventRow = document.createElement('div');
        eventRow.className = 'event-row';
        
        // First event in row
        const event1 = events[i];
        const eventCard1 = createEventCard(event1);
        eventRow.appendChild(eventCard1);
        
        // Second event in row (if exists)
        if (i + 1 < events.length) {
            const event2 = events[i + 1];
            const eventCard2 = createEventCard(event2);
            eventRow.appendChild(eventCard2);
        }
        
        eventsGrid.appendChild(eventRow);
    }
}

function createEventCard(event) {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card event-card-horizontal';
    eventCard.innerHTML = `
        <img src="${event.image}" alt="${event.name}">
        <div class="event-info">
            <h3>${event.name}</h3>
            <p class="event-desc">${event.description}</p>
            <div class="event-actions">
                <button onclick="editEvent(${event.id})" class="view-details">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="deleteEvent(${event.id})" class="buy-tickets">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;
    return eventCard;
}

// View event details
function viewEventDetails(eventId) {
    const event = events.find(e => e.id === eventId);
    if (event) {
        showEventDetails(eventId);
    }
}

// Load reports
function loadReports() {
    const reports = {
        totalEvents: events.length,
        ticketsSold: events.reduce((sum, event) => sum + (event.info.totalTickets - event.info.availableTickets), 0),
        revenue: events.reduce((sum, event) => sum + (event.info.price * (event.info.totalTickets - event.info.availableTickets)), 0),
        mostPopularEvent: events.reduce((max, event) => 
            (event.info.totalTickets - event.info.availableTickets) > (max.info.totalTickets - max.info.availableTickets) ? event : max
        , events[0]).name,
        upcomingEvents: events.filter(event => new Date(event.info.date) > new Date()).length,
        averageTicketPrice: Math.round(events.reduce((sum, event) => sum + event.info.price, 0) / events.length)
    };
    
    displayReports(reports);
}

function displayReports(reports) {
    const reportsContainer = document.querySelector('.reports-container');
    reportsContainer.innerHTML = `
        <div class="report-card">
            <h3><i class="fas fa-calendar-check"></i> Total Events</h3>
            <p>${reports.totalEvents}</p>
        </div>
        <div class="report-card">
            <h3><i class="fas fa-ticket-alt"></i> Tickets Sold</h3>
            <p>${reports.ticketsSold}</p>
        </div>
        <div class="report-card">
            <h3><i class="fas fa-money-bill-wave"></i> Revenue</h3>
            <p>${reports.revenue} EGP</p>
        </div>
        <div class="report-card">
            <h3><i class="fas fa-star"></i> Most Popular Event</h3>
            <p>${reports.mostPopularEvent}</p>
        </div>
        <div class="report-card">
            <h3><i class="fas fa-calendar"></i> Upcoming Events</h3>
            <p>${reports.upcomingEvents}</p>
        </div>
        <div class="report-card">
            <h3><i class="fas fa-chart-line"></i> Average Ticket Price</h3>
            <p>${reports.averageTicketPrice} EGP</p>
        </div>
    `;
}

// Edit event
function editEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (event) {
        document.getElementById('eventName').value = event.name;
        document.getElementById('eventType').value = event.type;
        document.getElementById('eventDate').value = event.info.date;
        document.getElementById('eventTime').value = event.info.time;
        document.getElementById('location').value = event.info.location;
        document.getElementById('description').value = event.description;
        document.getElementById('price').value = event.info.price;
        document.getElementById('duration').value = parseInt(event.info.duration);
        document.getElementById('totalTickets').value = event.info.totalTickets;
        document.getElementById('availableTickets').value = event.info.availableTickets;
        
        showAddEvent();
    }
}

// Delete event
function deleteEvent(eventId) {
    if (confirm('Are you sure you want to delete this event?')) {
        const index = events.findIndex(e => e.id === eventId);
        if (index !== -1) {
            events.splice(index, 1);
            loadEvents();
        }
    }
}

// Event listeners
closeBtn.addEventListener('click', closeModal);
ticketQuantity.addEventListener('change', () => {
    const event = events.find(e => e.id === currentEventId);
    if (event) {
        updateTotalPrice(event.info.price);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    loadEvents();
});

// Sidebar functionality
menuIcon.addEventListener('click', () => {
    sideBar.classList.add('active');
});

closeSideBar.addEventListener('click', () => {
    sideBar.classList.remove('active');
});

// Logout function
function logout() {
    // Clear admin token and any other session data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'تم تسجيل الخروج بنجاح';
    document.body.appendChild(successMessage);
    
    // Remove message after 2 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 2000);
    
    // Redirect to software.html
    window.location.href = 'software.html';
}

// Add event listener for logout button
document.addEventListener('DOMContentLoaded', () => {
    // Add click event listener to logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
    
    // Check admin authentication
    checkAdminAuth();
    loadEvents();
});
