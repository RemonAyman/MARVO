// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggleBtn.querySelector('i');

// Check saved theme in localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

// Toggle theme on button click
themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    }
});

// Initialize Google Map
let map;
let marker;
let locationConfirmed = false; // Flag to track if location is confirmed

function initMap() {
    // Center on Aswan
    const aswanCenter = { lat: 24.0889, lng: 32.8998 };

    map = new google.maps.Map(document.getElementById('map'), {
        center: aswanCenter,
        zoom: 12,
        mapTypeId: 'roadmap'
    });

    marker = new google.maps.Marker({
        position: aswanCenter,
        map: map,
        title: 'Delivery Location'
    });

    // Places Autocomplete with strict focus on Aswan
    const input = document.getElementById('address');
    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['address'],
        componentRestrictions: { country: 'eg' },
        bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(23.9, 32.7), // Southwest corner of Aswan
            new google.maps.LatLng(24.2, 33.1)  // Northeast corner of Aswan
        ),
        strictBounds: true
    });

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            alert('Please select a valid address in Aswan');
            return;
        }

        const location = place.geometry.location;
        map.setCenter(location);
        marker.setPosition(location);
        map.setZoom(15);

        document.getElementById('latitude').value = location.lat();
        document.getElementById('longitude').value = location.lng();
        locationConfirmed = true; // Set flag to true
    });

    // Click on map to set location
    map.addListener('click', (event) => {
        const location = event.latLng;
        marker.setPosition(location);
        document.getElementById('latitude').value = location.lat();
        document.getElementById('longitude').value = location.lng();

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: location }, (results, status) => {
            if (status === 'OK' && results[0]) {
                document.getElementById('address').value = results[0].formatted_address;
                locationConfirmed = true; // Set flag to true
            } else {
                alert('Unable to geocode this location. Please try another spot in Aswan.');
                locationConfirmed = false;
            }
        });
    });
}

// Update Cart Display
function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)} (x${item.quantity || 1}) 
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </p>
        `;
        cartContainer.appendChild(cartItem);
    });

    const totalPrice = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Confirm Location
document.getElementById('confirm-location').addEventListener('click', () => {
    const lat = document.getElementById('latitude').value;
    const lng = document.getElementById('longitude').value;
    if (lat && lng) {
        document.getElementById('location-warning').style.display = 'none';
        locationConfirmed = true; // Set flag to true
        alert('Location confirmed! Ready to place your order.');
    } else {
        document.getElementById('location-warning').style.display = 'block';
        locationConfirmed = false;
    }
});

// Handle Form Submission
document.getElementById('checkout-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const fullName = document.getElementById('full-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    if (!latitude || !longitude || !locationConfirmed) {
        document.getElementById('location-warning').style.display = 'block';
        alert('Please confirm your delivery location before placing the order.');
        return;
    }

    const order = {
        fullName,
        phoneNumber,
        email,
        address,
        location: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        items: cart,
        total: cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0),
        timestamp: new Date().toISOString()
    };

    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    alert('Order placed successfully! Proceeding to payment.');
    localStorage.setItem('cart', JSON.stringify([])); // Clear cart
    window.location.href = 'electronicpayment.html'; // Redirect to payment page
});

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    try {
        if (typeof google !== 'undefined' && google.maps) {
            initMap();
        } else {
            throw new Error('Google Maps API not loaded. Check your API key and internet connection.');
        }
    } catch (error) {
        console.error(error.message);
        alert('Failed to load Google Maps. Please check your internet connection or API key settings.');
    }
});