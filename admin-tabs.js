document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("#nav-links a");
    const sections = document.querySelectorAll(".admin-section");

    function showSection(sectionId) {
        sections.forEach(section => {
            section.style.display = "none";
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = "block";
            // Trigger animation
            targetSection.classList.remove("fade-in");
            void targetSection.offsetWidth; // trigger reflow
            targetSection.classList.add("fade-in");
        }

        // Update active class in nav
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("data-section") === sectionId) {
                link.classList.add("active");
            }
        });
    }

    navLinks.forEach(link => {
        const sectionId = link.getAttribute("data-section");
        if (sectionId) {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                showSection(sectionId);
                // Update URL hash without jumping
                history.pushState(null, null, `#${sectionId}`);
                
                // Close mobile menu if open
                const navLinksContainer = document.getElementById('nav-links');
                const mobileMenu = document.getElementById('mobile-menu');
                if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                    if (mobileMenu) {
                        mobileMenu.classList.remove('active');
                        const icon = mobileMenu.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
            });
        }
    });

    // Check hash on load to open the correct tab
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    } else {
        // Default section if no hash
        showSection("overview-section");
    }
});
