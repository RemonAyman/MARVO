function populatePaymentDetails(event) {
    document.getElementById('eventImage').src = event.image;
    document.getElementById('eventImage').alt = event.name;
    document.getElementById('eventName').textContent = event.name;
    document.getElementById('eventDescription').textContent = event.description;
    document.getElementById('totalTickets').textContent = event.info.totalTickets;
    document.getElementById('availableTickets').textContent = event.info.availableTickets;
    document.getElementById('reservedTickets').textContent = event.info.reservedTickets;
    document.getElementById('eventDate').textContent = event.info.date;
    document.getElementById('eventLocation').textContent = event.info.location;
    document.getElementById('eventDuration').textContent = event.info.duration;
    document.getElementById('eventGatesOpen').textContent = event.info.gatesOpen;
    document.getElementById('eventPrice').textContent = `${event.info.price} EGP`;
    document.getElementById('categoryPrice').textContent = '0 EGP';
    document.getElementById('totalPrice').textContent = '0 EGP';
    document.getElementById('summaryPrice').textContent = '0 EGP';
    document.getElementById('finalTotal').textContent = '0 EGP';
    document.getElementById('discount').textContent = '0 EGP';

    const categorySelect = document.getElementById('categorySelect');
    const option = document.createElement('option');
    option.value = event.name;
    option.textContent = event.name;
    categorySelect.innerHTML = ''; // Clear existing options
    categorySelect.appendChild(option);
}

function updateTotal() {
    const quantity = parseInt(document.getElementById('quantitySelect').value);
    const eventData = JSON.parse(localStorage.getItem('selectedEvent'));
    const basePrice = parseFloat(eventData.info.price);
    const totalTickets = eventData.info.totalTickets;
    let reservedTickets = eventData.info.reservedTickets;
    let availableTickets = eventData.info.availableTickets;

    if (quantity > 0 && quantity <= availableTickets) {
        const originalTotal = quantity * basePrice;
        const discount = originalTotal * 0.05; // 5% discount
        const finalTotal = originalTotal - discount;

        document.getElementById('priceBreakdown').style.display = 'block';
        document.getElementById('categoryItem').textContent = quantity;
        document.getElementById('selectedCategory').textContent = eventData.name;
        document.getElementById('categoryPrice').textContent = `${basePrice} EGP`;
        document.getElementById('totalPrice').textContent = `${originalTotal} EGP`;
        document.getElementById('summaryPrice').textContent = `${originalTotal} EGP`;
        document.getElementById('discount').textContent = `${discount.toFixed(2)} EGP`;
        document.getElementById('finalTotal').textContent = `${finalTotal.toFixed(2)} EGP`;
    } else if (quantity > availableTickets) {
        alert('Not enough tickets available!');
        document.getElementById('quantitySelect').value = 0;
        document.getElementById('priceBreakdown').style.display = 'none';
        document.getElementById('categoryPrice').textContent = '0 EGP';
        document.getElementById('totalPrice').textContent = '0 EGP';
        document.getElementById('summaryPrice').textContent = '0 EGP';
        document.getElementById('discount').textContent = '0 EGP';
        document.getElementById('finalTotal').textContent = '0 EGP';
    } else {
        document.getElementById('priceBreakdown').style.display = 'none';
        document.getElementById('categoryPrice').textContent = '0 EGP';
        document.getElementById('totalPrice').textContent = '0 EGP';
        document.getElementById('summaryPrice').textContent = '0 EGP';
        document.getElementById('discount').textContent = '0 EGP';
        document.getElementById('finalTotal').textContent = '0 EGP';
    }
}

function applyPromo() {
    const quantity = parseInt(document.getElementById('quantitySelect').value);
    if (quantity > 0) {
        const promoCode = document.getElementById('promoCode').value;
        const originalPrice = parseFloat(document.getElementById('summaryPrice').textContent);
        if (promoCode === 'EAM20') {
            const extraDiscount = originalPrice * 0.2; // 20% extra discount
            const finalTotal = originalPrice - extraDiscount;
            document.getElementById('discount').textContent = `${(parseFloat(document.getElementById('discount').textContent) + extraDiscount).toFixed(2)} EGP`;
            document.getElementById('finalTotal').textContent = `${finalTotal.toFixed(2)} EGP`;
            alert('Extra 20% discount applied successfully!');
        } else if (promoCode === "SAVE10") {
            const extraDiscount = originalPrice * 0.10; // 10% extra discount
            const finalTotal = originalPrice - extraDiscount;
            document.getElementById('discount').textContent = `${(parseFloat(document.getElementById('discount').textContent) + extraDiscount).toFixed(2)} EGP`;
            document.getElementById('finalTotal').textContent = `${finalTotal.toFixed(2)} EGP`;
            alert('Extra 10% discount applied successfully!');
        } else if (promoCode === "SAVE20") {
            const extraDiscount = originalPrice * 0.20; // 20% extra discount
            const finalTotal = originalPrice - extraDiscount;
            document.getElementById('discount').textContent = `${(parseFloat(document.getElementById('discount').textContent) + extraDiscount).toFixed(2)} EGP`;
            document.getElementById('finalTotal').textContent = `${finalTotal.toFixed(2)} EGP`;
            alert('Extra 20% discount applied successfully!');
        } else {
            alert('Invalid promo code!');
        }
    } else {
        alert('Please select a quantity first!');
    }
}

function validatePaymentDetails() {
    const cardName = document.querySelector('#card-name').value.trim();
    const cardNumber = document.querySelector('#card-number').value.trim();
    const expiryDate = document.querySelector('#expiry-date').value;
    const cvv = document.querySelector('#cvv').value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

    // Validation checks
    if (!paymentMethod) {
        alert('Please select a payment method.');
        return false;
    }

    // If credit card is selected, validate card details
    if (paymentMethod.value === 'creditCard') {
        // Card Name validation (letters and spaces only)
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!cardName || !nameRegex.test(cardName)) {
            alert('Please enter a valid cardholder name (letters and spaces only).');
            return false;
        }

        // Card Number validation (16 digits, allowing spaces or hyphens)
        const cardNumberClean = cardNumber.replace(/[\s-]/g, '');
        const cardRegex = /^\d{16}$/;
        if (!cardNumberClean || !cardRegex.test(cardNumberClean)) {
            alert('Please enter a valid 16-digit card number.');
            return false;
        }

        // Expiry Date validation (must be in the future)
        if (!expiryDate) {
            alert('Please enter the expiry date.');
            return false;
        }
        const today = new Date();
        const [expYear, expMonth] = expiryDate.split('-').map(Number);
        const expiry = new Date(expYear, expMonth - 1);
        if (expiry <= today) {
            alert('The card has expired or the expiry date is invalid.');
            return false;
        }

        // CVV validation (3 or 4 digits)
        const cvvRegex = /^\d{3,4}$/;
        if (!cvv || !cvvRegex.test(cvv)) {
            alert('Please enter a valid CVV (3 or 4 digits).');
            return false;
        }
    }

    return true;
}

function confirmPayment() {
    const quantity = parseInt(document.getElementById('quantitySelect').value);
    if (quantity <= 0) {
        alert('Please select a quantity to proceed!');
        return;
    }

    // Validate payment details
    if (!validatePaymentDetails()) {
        return;
    }

    // Update ticket data
    const eventData = JSON.parse(localStorage.getItem('selectedEvent'));
    eventData.info.reservedTickets += quantity;
    eventData.info.availableTickets = eventData.info.totalTickets - eventData.info.reservedTickets;
    localStorage.setItem('selectedEvent', JSON.stringify(eventData));

    alert('Payment confirmed! Thank you for your purchase.');
    window.location.href = 'paymentdetails.html'; // Redirect to paymentdetails.html
}

// Load event details when page loads
document.addEventListener('DOMContentLoaded', function() {
    const eventData = JSON.parse(localStorage.getItem('selectedEvent'));
    if (!eventData) {
        window.location.href = 'events.html';
        return;
    }

    // Update event details in the UI
    document.getElementById('eventImage').src = eventData.image;
    document.getElementById('eventName').textContent = eventData.name;
    document.getElementById('eventDescription').textContent = eventData.description;
    document.getElementById('eventDate').textContent = eventData.info.date;
    document.getElementById('eventLocation').textContent = eventData.info.location;
    document.getElementById('eventDuration').textContent = eventData.info.duration;
    document.getElementById('eventGatesOpen').textContent = eventData.info.gatesOpen;
    document.getElementById('eventPrice').textContent = eventData.info.price;
    document.getElementById('availableTickets').textContent = eventData.info.availableTickets;
    document.getElementById('reservedTickets').textContent = eventData.info.reservedTickets;

    // Update price display
    updatePriceDisplay();
});

// Update price display based on quantity
function updatePriceDisplay() {
    const quantity = parseInt(document.getElementById('quantitySelect').value);
    const priceText = document.getElementById('eventPrice').textContent;
    const price = parseInt(priceText.replace(/[^0-9]/g, ''));
    
    const total = quantity * price;
    document.getElementById('totalPrice').textContent = `${total} EGP`;
    document.getElementById('summaryPrice').textContent = `${total} EGP`;
    
    // Calculate discount (5% + any promo)
    const discount = total * 0.05;
    document.getElementById('discount').textContent = `${discount} EGP`;
    document.getElementById('finalTotal').textContent = `${total - discount} EGP`;
}

// Add event listener for quantity changes
document.getElementById('quantitySelect').addEventListener('change', updatePriceDisplay);

// Apply promo code
function applyPromo() {
    const promoCode = document.getElementById('promoCode').value;
    if (promoCode.toLowerCase() === 'EAM20') {
        const total = parseInt(document.getElementById('totalPrice').textContent);
        const discount = total * 0.20; // 20% discount
        document.getElementById('discount').textContent = `${discount} EGP`;
        document.getElementById('finalTotal').textContent = `${total - discount} EGP`;
        alert('Promo code applied successfully!');
    } else {
        alert('Invalid promo code!');
    }
}

// Confirm payment
function confirmPayment() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethod) {
        alert('Please select a payment method!');
        return;
    }

    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('0000 0000 0000 0000').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (!cardName || !cardNumber || !expiryDate || !cvv) {
        alert('Please fill in all payment details!');
        return;
    }

    // Here you would typically send the payment details to your server
    // For now, we'll just show a success message and redirect
    alert('Payment successful! Your tickets have been booked.');
    window.location.href = 'Success.html';
}


// Theme Toggle Functionality
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


// Activate Scroll Animations
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section, .complaint-section");
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
            section.style.transition = "all 0.5s ease";
        }
    });
});

// Reset Animation Effect on Page Load
document.querySelectorAll("section, .complaint-section").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
});

// Run Initialize Function After DOM is Loaded
document.addEventListener("DOMContentLoaded", initializePage);