// Latest Match Result
const latestMatch = {
    team1: {
        name: "SC Mavro",
        logo: "3be07d4d222f06f0333810def3d4dfd7-removebg-preview.png",
        score: 3,
    },
    team2: {
        name: "SC Ravio",
        logo: "2ff91478be53050d0605f4905bfa3f5b-removebg-preview.png",
        score: 1,
    },
};

// Upcoming Matches
const upcomingMatches = [
    {
        date: "2025-6-15",
        opponent: "Edfu FC",
        time: "7:30 PM",
        location: "Mavro Stadium",
    },
    {
        date: "2025-6-22",
        opponent: "Elseil FC",
        time: "10:00 PM",
        location: "Elseil Stadium",
    },
    {
        date: "2025-6-31",
        opponent: "Karour SC",
        time: "10:00 PM",
        location: "Aswan Stadium",
    },
];

// Fan Comments
const fanComments = [
    { text: "Looking forward to the next match! SPORTING CLUB!", author: "DAVID" },
    { text: "Chasing greatness! THE CHAMPIONS!", author: "Magy" },
    { text: "Game time hustle! WINNING CREW!", author: "MARIO" },
];

// Render Latest Match
function renderLatestMatch() {
    const matchDetailsContainer = document.querySelector(".match-details");
    if (!matchDetailsContainer) {
        console.error("No container found for match details!");
        return;
    }
    matchDetailsContainer.innerHTML = `
        <div class="team-result">
            <img src="${latestMatch.team1.logo}" alt="${latestMatch.team1.name} Logo">
            <p>${latestMatch.team1.name}</p>
            <span>${latestMatch.team1.score}</span>
        </div>
        <h3>VS</h3>
        <div class="team-result2">
            <img src="${latestMatch.team2.logo}" alt="${latestMatch.team2.name} Logo">
            <p>${latestMatch.team2.name}</p>
            <span>${latestMatch.team2.score}</span>
        </div>
    `;
}

// Render Upcoming Matches
function renderUpcomingMatches() {
    const matchesTableBody = document.querySelector(".upcoming-matches tbody");
    if (!matchesTableBody) {
        console.error("No table found for upcoming matches!");
        return;
    }
    matchesTableBody.innerHTML = "";
    upcomingMatches.forEach((match) => {
        const row = `
            <tr>
                <td>${match.date}</td>
                <td>${match.opponent}</td>
                <td>${match.time}</td>
                <td>${match.location}</td>
            </tr>
        `;
        matchesTableBody.insertAdjacentHTML("beforeend", row);
    });
}

// Render Fan Comments
function renderFanComments() {
    const commentsContainer = document.querySelector(".fan-comments");
    const commentsSection = commentsContainer?.querySelector(".comments-list");
    if (!commentsSection) {
        console.error("No comments section found!");
        return;
    }
    commentsSection.innerHTML = "";
    fanComments.forEach((comment) => {
        const commentHTML = `
            <div class="comment">
                <p>"${comment.text}"</p>
                <span>- ${comment.author}</span>
            </div>
        `;
        commentsSection.insertAdjacentHTML("beforeend", commentHTML);
    });
}

// Add New Comment
function addComment(text, author) {
    if (text && author) {
        fanComments.push({ text, author });
        renderFanComments();
    } else {
        alert("Please fill in both fields!");
    }
}

// Toggle Player Details
function toggleDetails(playerId) {
    console.log("Toggle Details for: " + playerId);
    var details = document.getElementById(playerId);
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
    var allDetails = document.querySelectorAll('.player-details');
    allDetails.forEach(function(detail) {
        if (detail.id !== playerId) {
            detail.style.display = "none";
        }
    });
}

// Toggle Players List
function toggleDetails2() {
    if (document.querySelector(".member-item-main").style.height === "fit-content") {
        document.querySelector(".member-item-main").style.height = "25px";
    } else {
        document.querySelector(".member-item-main").style.height = "fit-content";
    }
}

// Initialize Page
function initializePage() {
    renderLatestMatch();
    renderUpcomingMatches();
    renderFanComments();

    // Add Comment Form Submission
    const commentForm = document.querySelector("#commentForm");
    if (commentForm) {
        commentForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const commentText = document.querySelector("#commentText").value;
            const commentAuthor = document.querySelector("#commentAuthor").value;
            addComment(commentText, commentAuthor);
            commentForm.reset();
        });
    }

    // Add Ripple Effect to Buttons
    document.querySelectorAll(".submit-btn, .report-filters button").forEach((button) => {
        button.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            ripple.classList.add("ripple");
            ripple.style.left = `${e.clientX - button.getBoundingClientRect().left}px`;
            ripple.style.top = `${e.clientY - button.getBoundingClientRect().top}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add Complaint Form Submission
    const complaintForm = document.querySelector("#complaintBox");
    const submitBtn = document.querySelector(".submit-btn");

    if (submitBtn && complaintForm) {
        submitBtn.addEventListener("click", () => {
            const complaintText = complaintForm.value.trim();
            if (complaintText) {
                alert("Thank you! Your complaint has been submitted.");
                complaintForm.value = "";
            } else {
                alert("Please fill in the complaint before submitting!");
            }
        });
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
}

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