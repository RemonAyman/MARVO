document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginForm");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // الحصول على قيم ID والباسورد
        const userId = document.querySelector("#userId").value.trim();
        const password = document.querySelector("#password").value.trim();

        // التحقق من القيم
        if (userId === "12345" && password === "@admin123") {
            window.location.href = "admin.html"; // توجيه المستخدم
        } else {
            alert("Incorrect ID or Password. Please try again!");
        }
    });

    // التعامل مع أزرار تسجيل الدخول الاجتماعي
    const socialButtons = document.querySelectorAll(".social-buttons button");

    socialButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const platform = button.textContent.trim().split(" ")[2];
            alert(`You selected to continue with ${platform}!`);
        });
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