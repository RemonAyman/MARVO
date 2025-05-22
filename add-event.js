// DOM Elements
const eventForm = document.getElementById('add-event-form');
const eventNameInput = document.getElementById('eventName');
const eventTypeInput = document.getElementById('eventType');
const eventDateInput = document.getElementById('eventDate');
const eventTimeInput = document.getElementById('eventTime');
const eventLocationInput = document.getElementById('location');
const eventDescriptionInput = document.getElementById('description');
const ticketPriceInput = document.getElementById('price');
const durationInput = document.getElementById('duration');
const totalTicketsInput = document.getElementById('totalTickets');
const availableTicketsInput = document.getElementById('availableTickets');
const eventImageInput = document.getElementById('eventImage');
const previewImage = document.getElementById('previewImage');

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
        setupEventListeners();
        setupFormValidation();
        loadEventForEditing();
    }
}

// Load event for editing if in edit mode
function loadEventForEditing() {
    const editingEventId = localStorage.getItem('editingEventId');
    if (editingEventId) {
        const events = JSON.parse(localStorage.getItem('events') || '[]');
        const event = events.find(e => e.id === editingEventId);
        if (event) {
            // Fill form with event data
            eventNameInput.value = event.name;
            eventTypeInput.value = event.type;
            eventDateInput.value = event.date;
            eventTimeInput.value = event.time;
            eventLocationInput.value = event.location;
            eventDescriptionInput.value = event.description;
            ticketPriceInput.value = event.ticketPrice;
            durationInput.value = event.duration;
            totalTicketsInput.value = event.totalTickets;
            availableTicketsInput.value = event.availableTickets;
            previewImage.src = event.image;
            previewImage.style.display = 'block';
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    eventForm.addEventListener('submit', handleEventSubmit);
    eventImageInput.addEventListener('change', handleImagePreview);
    totalTicketsInput.addEventListener('input', updateAvailableTickets);
}

// Setup form validation
function setupFormValidation() {
    const inputs = eventForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });
}

// Validate single input
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch(input.id) {
        case 'eventName':
            isValid = value.length >= 3;
            errorMessage = 'Event name must be at least 3 characters long';
            break;
        case 'eventDate':
            isValid = new Date(value) > new Date();
            errorMessage = 'Event date must be in the future';
            break;
        case 'eventTime':
            isValid = value !== '';
            errorMessage = 'Please select event time';
            break;
        case 'location':
            isValid = value.length >= 5;
            errorMessage = 'Location must be at least 5 characters long';
            break;
        case 'description':
            isValid = value.length >= 20;
            errorMessage = 'Description must be at least 20 characters long';
            break;
        case 'price':
            isValid = parseFloat(value) > 0;
            errorMessage = 'Price must be greater than 0';
            break;
        case 'duration':
            isValid = parseInt(value) > 0;
            errorMessage = 'Duration must be greater than 0';
            break;
        case 'totalTickets':
            isValid = parseInt(value) > 0;
            errorMessage = 'Total tickets must be greater than 0';
            break;
    }

    if (!isValid) {
        input.classList.add('invalid');
        showInputError(input, errorMessage);
    } else {
        input.classList.remove('invalid');
        removeInputError(input);
    }

    return isValid;
}

// Show input error
function showInputError(input, message) {
    let errorDiv = input.parentElement.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        input.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

// Remove input error
function removeInputError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Handle image preview
function handleImagePreview(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            showErrorMessage('Image size should be less than 5MB');
            eventImageInput.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
}

// Update available tickets based on total tickets
function updateAvailableTickets() {
    availableTicketsInput.value = totalTicketsInput.value;
}

// Handle event form submission
async function handleEventSubmit(e) {
    e.preventDefault();

    // Validate all inputs
    const inputs = eventForm.querySelectorAll('input, select, textarea');
    let isValid = true;
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showErrorMessage('Please fix the errors in the form');
        return;
    }

    // Create event object
    const eventData = {
        id: localStorage.getItem('editingEventId') || generateEventId(),
        name: eventNameInput.value.trim(),
        type: eventTypeInput.value,
        date: eventDateInput.value,
        time: eventTimeInput.value,
        location: eventLocationInput.value.trim(),
        description: eventDescriptionInput.value.trim(),
        ticketPrice: parseFloat(ticketPriceInput.value),
        duration: parseInt(durationInput.value),
        totalTickets: parseInt(totalTicketsInput.value),
        availableTickets: parseInt(availableTicketsInput.value),
        image: previewImage.src
    };

    try {
        // Save event to localStorage
        saveEvent(eventData);
        
        // Show success message
        showSuccessMessage('Event saved successfully!');
        
        // Reset form and clear editing state
        eventForm.reset();
        previewImage.style.display = 'none';
        localStorage.removeItem('editingEventId');
        
        // Ask user if they want to add another event
        const addAnother = confirm('Event saved successfully! Would you like to add another event?');
        if (!addAnother) {
            window.location.href = 'view-events.html';
        }
    } catch (error) {
        showErrorMessage('Error saving event. Please try again.');
    }
}

// Generate unique event ID
function generateEventId() {
    return 'EVT_' + Date.now();
}

// Save event to localStorage
function saveEvent(eventData) {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const existingEventIndex = events.findIndex(e => e.id === eventData.id);
    
    if (existingEventIndex !== -1) {
        // Update existing event
        events[existingEventIndex] = eventData;
    } else {
        // Add new event
        events.push(eventData);
    }
    
    localStorage.setItem('events', JSON.stringify(events));
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