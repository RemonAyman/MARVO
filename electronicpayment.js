document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with the Public Key
    emailjs.init("N-iStC8SnKgqZ-O6C");

    const paymentForm = document.querySelector('#payment-form');

    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.querySelector('#email').value; // Email of the buyer
        const cardNumber = document.querySelector('#card-number').value;
        const expiryDate = document.querySelector('#expiry-date').value;
        const cvv = document.querySelector('#cvv').value;
        const paymentMethod = document.querySelector('#payment-method').value;

        if (email && cardNumber && expiryDate && cvv) {
            const paymentAmount = 100; // Default payment amount
            const itemsPurchased = 3; // Example: Number of items purchased

            // Data to send to the customer
            const buyerData = {
                to_email: email,
                message: `Dear customer, your payment of $${paymentAmount} for ${itemsPurchased} items has been successfully processed to Mavro SC using ${paymentMethod.toUpperCase()}. Thank you for choosing our service!`
            };

            // Send email to the customer
            emailjs.send("service_kd7xwtt", "template_46bxzk2", buyerData)
                .then(() => {
                    alert("Payment successful. A confirmation email has been sent to your email.");
                })
                .catch(error => {
                    console.error("Failed to send email to the buyer:", error);
                    alert("Payment successful, but failed to send confirmation email.");
                });

            // Data to send to the admin
            const adminData = {
                to_email: "elkootfyoussef@gmail.com",
                message: `Payment received: $${paymentAmount} for ${itemsPurchased} items from customer ${email}. The amount has been successfully deposited to Mavro SC account.`
            };

            // Send email to the admin
            emailjs.send("service_dq7g8og", "template_2xgrejh", adminData)
                .then(() => {
                    console.log("Admin notified successfully.");
                })
                .catch(error => {
                    console.error("Failed to send email to the admin:", error);
                });

            // Redirect to the success page
            window.location.href = 'Success.html'; // Redirect after successful payment
        } else {
            alert('Please fill in all the required fields correctly.');
        }
    });
});


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



