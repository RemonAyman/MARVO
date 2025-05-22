// Initialize function
function initializePage() {
    // Add any initialization logic here (e.g., initialize Chart.js)
}

// Add Ripple Effect to Buttons
document.querySelectorAll(".report-filters button, .download-btn, .submit-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        ripple.style.left = `${e.clientX - e.target.offsetLeft}px`;
        ripple.style.top = `${e.clientY - e.target.offsetTop}px`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Generate Reports Button Logic
let generateCount = parseInt(localStorage.getItem('generateCount')) || 0;
const generateBtn = document.querySelector("#generateReport");
if (generateBtn) {
    generateBtn.addEventListener("click", () => {
        generateCount++;
        localStorage.setItem('generateCount', generateCount);
        alert(`Your report is being generated. Please wait... (Generated ${generateCount} times)`);
    });
}

// Store Complaints (Form Submission)
const complaintForm = document.querySelector('#complaintForm');
if (complaintForm) {
    complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const complaintText = document.querySelector('#complaintBox')?.value?.trim();
        const complaintType = document.querySelector('#complaintType')?.value || 'General';
        const reportPeriod = document.querySelector('#reportPeriod')?.value || 'Monthly';

        if (!complaintText) {
            alert('Please enter a complaint before submitting.');
            return;
        }

        const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
        complaints.push({
            text: complaintText,
            date: new Date().toLocaleDateString(),
            type: complaintType,
            period: reportPeriod
        });
        localStorage.setItem('complaints', JSON.stringify(complaints));

        // Clear form
        complaintForm.reset();
        alert('Complaint submitted successfully!');
    });
}

// Download Button Logic (PDF Generation)
const downloadBtn = document.querySelector("#downloadReport");
if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
        // Load jsPDF library dynamically if not already included
        if (typeof window.jspdf === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = generatePDF;
            document.head.appendChild(script);
        } else {
            generatePDF();
        }
    });
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get complaints and filter values
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
    const reportType = document.querySelector('#reportType')?.value || 'All';
    const reportPeriod = document.querySelector('#reportPeriod')?.value || 'All';

    // PDF Header
    doc.setFontSize(18);
    doc.text('Complaints Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);
    doc.text(`Report Type: ${reportType}`, 20, 40);
    doc.text(`Period: ${reportPeriod}`, 20, 50);
    doc.text(`Total Generations: ${generateCount}`, 20, 60);

    // Complaints List
    let y = 80;
    doc.setFontSize(14);
    doc.text('Complaints:', 20, y);
    y += 10;

    if (complaints.length === 0) {
        doc.setFontSize(12);
        doc.text('No complaints submitted.', 20, y);
    } else {
        complaints.forEach((complaint, index) => {
            doc.setFontSize(12);
            doc.text(`Complaint ${index + 1}:`, 20, y);
            y += 10;
            doc.text(`Text: ${complaint.text || 'N/A'}`, 20, y);
            y += 10;
            doc.text(`Date: ${complaint.date || 'N/A'}`, 20, y);
            y += 10;
            doc.text(`Type: ${complaint.type || 'N/A'}`, 20, y);
            y += 10;
            doc.text(`Period: ${complaint.period || 'N/A'}`, 20, y);
            y += 20;

            // Add new page if content exceeds page height
            if (y > 260) {
                doc.addPage();
                y = 20;
            }
        });
    }

    // Save PDF
    doc.save(`Complaints_Report_${new Date().toISOString().split('T')[0]}.pdf`);
}

// Scroll Animations for Report Section
window.addEventListener("scroll", () => {
    const reportSection = document.querySelector(".report-preview");
    if (reportSection) {
        const rect = reportSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            reportSection.style.opacity = "1";
            reportSection.style.transform = "translateY(0)";
        }
    }
});

// Initialize Scroll Animation for Report Section
const reportSection = document.querySelector(".report-preview");
if (reportSection) {
    reportSection.style.opacity = "0";
    reportSection.style.transform = "translateY(50px)";
    reportSection.style.transition = "all 0.8s ease";
}

// Theme Toggle Functionality
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggleBtn.querySelector('i');

if (themeToggleBtn) {
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