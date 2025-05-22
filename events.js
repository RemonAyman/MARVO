const API_KEY = "aac1fb6c2685a25643c1ccb5474a8025";

function extractCityFromLocation(location) {
    const lowerLocation = location.toLowerCase();
    const cairoKeywords = [
        "cairo", "zamalek", "gezira", "festival city", "international stadium", 
        "sawy culturewheel", "opera house", "conference centre", "tahrir square", 
        "katameya", "darwish theater", "dar el-orman", "dream park", "azhar park"
    ];
    if (cairoKeywords.some(keyword => lowerLocation.includes(keyword))) {
        return "Cairo";
    }
    if (lowerLocation.includes("academy")) {
        return "Aswan";
    }
    const locationToCityMap = {
        "saqqara country club": "Giza",
    };
    for (const [place, city] of Object.entries(locationToCityMap)) {
        if (lowerLocation.includes(place.toLowerCase())) {
            return city;
        }
    }
    const parts = location.split(",");
    const cityPart = parts[0].trim();
    const cityWords = cityPart.split(" ");
    const excludeWords = [
        "international", "sporting", "open", "air", "culturewheel", "opera", 
        "conference", "conferences", "academy", "science", "technology", 
        "maritime", "transport", "tahrir", "square", "campus", "country", 
        "park", "amphitheater", "heights", "festival", "city", "mall", 
        "stadium", "club", "theater"
    ];
    const filteredWords = cityWords.filter(word => !excludeWords.includes(word.toLowerCase()));
    const extractedCity = filteredWords.length > 0 ? filteredWords.join(" ") : null;
    if (extractedCity) {
        const egyptianCities = [
            "Cairo", "Giza", "Aswan", "Sohag", "Alexandria", "Luxor", 
            "Mansoura", "Tanta", "Assiut", "Fayoum", "Minya", "Damietta"
        ];
        const matchedCity = egyptianCities.find(city => city.toLowerCase() === extractedCity.toLowerCase());
        if (matchedCity) {
            return matchedCity;
        }
    }
    return "Cairo";
}

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
        } else {
            throw new Error("Weather data not found");
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        return {
            temp: "N/A",
            description: "Unable to fetch weather data",
            humidity: "N/A"
        };
    }
}

const events = [
    {
        id: 0,
        name: "Pyramids Sound & Light Show",
        image: "WhatsApp Image 2025-05-18 at 07.24.18_6dab85f3.jpg",
        description: "Experience the magic of ancient Egypt at the Pyramids Sound & Light Show! Set against the breathtaking backdrop of the Giza Pyramids, this mesmerizing event brings history to life with vibrant lights, captivating narration, and enchanting music.",
        info: {
            shows: 1,
            date: "20 May 2025",
            location: "Giza Pyramids Plateau",
            price: "1500 EGP",
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
        info: {
            shows: 1,
            date: "23 May 2025",
            location: "Cairo Festival City Mall",
            price: "750 EGP",
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
        description: "Step into a magical world of wonder with Disney On Ice! Join Mickey, Minnie, and all your favorite Disney characters as they glide across the ice in a spectacular show filled with dazzling lights, stunning costumes, and heartwarming stories. Perfect for families, this celebration on ice will leave you with memories to cherish forever.",
        info: {
            shows: 2,
            date: "25 May 2025",
            location: "Cairo International Stadium",
            price: "350 EGP",
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
        description: "Cairo is about to get lit! Travis Scott brings his UTOPIA tour to Egypt with mind-blowing visuals, high-energy performances, and chart-topping hits like 'SICKO MODE' and 'Goosebumps.' Expect a night of non-stop hype, immersive stage effects, and an electrifying atmosphere that will keep you on your feet!",
        info: {
            shows: 1,
            date: "27 May 2025",
            location: "Gezira Sporting Club",
            price: "4000 EGP",
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
        description: "Pop superstar Justin Bieber is coming to Cairo! Get ready to sing along to global hits like 'Baby,' 'Sorry,' and 'Peaches' in a night of pure stardom. With stunning visuals and an electrifying performance, Bieber will make this concert an unforgettable experience for fans of all ages.",
        info: {
            shows: 1,
            date: "29 May 2025",
            location: "Zamalek Open Air Theater",
            price: "7000 EGP",
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
        description: "Prepare for a night of romance and rhythm with Hamagy! His soulful voice and energetic performance will take you on a journey through his biggest hits. Dance, sing, and feel every beat as Hamagy creates an intimate yet electrifying atmosphere that will leave you wanting more.",
        info: {
            shows: 1,
            date: "31 May 2025",
            location: "El Sawy Culturewheel",
            price: "600 EGP",
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
        description: "The king of Arab pop, Tamer Hosny, is back to light up Cairo! Join thousands of fans for a night filled with passion, love, and unforgettable music. From romantic ballads like 'Bahebak' to upbeat hits like 'Eish Besho'ak,' Tamer will deliver a performance that captures every emotion. Don't miss this magical evening with a true superstar!",
        info: {
            shows: 1,
            date: "2 June 2025",
            location: "Al Manara International Conferences Center",
            price: "800 EGP",
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
        description: "The legend Amr Diab returns for a summer concert you can't miss! Dance the night away to iconic hits like 'Nour El Ain,' 'Tamally Maak,' and 'Leily Nahary.' With his signature style, electrifying energy, and timeless charm, Amr Diab will make this a night of pure joy and nostalgia for every fan of Arabic music. Get ready for an unforgettable experience under the stars!",
        info: {
            shows: 1,
            date: "4 June 2025",
            location: "Arab Academy for Science, Technology & Maritime Transport",
            price: "1200 EGP",
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
        description: "Let your heart soar with Tamer Ashour's emotional melodies! Known for his heartfelt lyrics and soulful voice, Tamer will take you on an emotional journey with hits like 'Ekhtarna Leh' and 'Tegy Ntrahen.' This intimate concert promises a night of deep feelings and beautiful music under the stars.",
        info: {
            shows: 1,
            date: "6 June 2025",
            location: "Cairo Opera House",
            price: "1000 EGP",
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
        description: "The trap king of Egypt, Wegz, is here to set the stage ablaze in Cairo! Known for his groundbreaking hits like 'Dory,' 'Bozluf,' and 'El Bakht,' Wegz brings an unmatched energy that blends raw emotion with electrifying beats. Expect a night filled with non-stop vibes, powerful lyrics, and a performance that will resonate with every fan of Egyptian trap music. Don't miss this chance to witness a true pioneer of the genre live!",
        info: {
            shows: 1,
            date: "8 June 2025",
            location: "AUC Tahrir Square Campus",
            price: "850 EGP",
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
        description: "Feel the magic of Sherine's voice in a night that will touch your soul! With her timeless hits like 'Sabry Aalil,' 'Kolly Melkak,' and 'Hobbak Wajaa,' Sherine has captured the hearts of millions across the Arab world. Her powerful voice and emotional delivery will make this concert an unforgettable experience. Get ready for a night of love, heartbreak, and pure musical brilliance under the Cairo sky!",
        info: {
            shows: 1,
            date: "10 June 2025",
            location: "Cairo International Conference Centre",
            price: "700 EGP",
            duration: "2 hours",
            gatesOpen: "7:30 PM",
            totalTickets: 600,
            reservedTickets: 450,
            availableTickets: 150
        }
    },
    {
        id: 11,
        name: "Hussain Al Jassmi",
        image: "288b8fed5aecd97ab62545d606ab7629.jpg",
        description: "Hussain Al Jassmi, the voice of the Gulf, brings his soulful melodies to Cairo! Known for his heartfelt songs like 'Boshret Kheir,' 'Set El Kol,' and 'Mohem Jedan,' Hussain's performances are a celebration of love, joy, and unity. His powerful voice and charismatic stage presence will make this a night to remember. Join thousands of fans for an evening filled with warmth and unforgettable music!",
        info: {
            shows: 1,
            date: "12 June 2025",
            location: "Katameya Heights",
            price: "900 EGP",
            duration: "2.5 hours",
            gatesOpen: "8:00 PM",
            totalTickets: 800,
            reservedTickets: 600,
            availableTickets: 200
        }
    },
    {
        id: 12,
        name: "Angham",
        image: "42580e36c49b656bf02887e9ae904316.jpg",
        description: "Angham's enchanting voice will take you on an emotional journey in this special Cairo concert! With a career spanning decades, Angham has given us timeless classics like 'Sidi Wesalak,' 'Halet Hob,' and 'Mahzouza.' Her ability to convey deep emotions through her music is unmatched, making this a night of pure musical magic. Prepare for an intimate evening filled with nostalgia, love, and heartfelt melodies!",
        info: {
            shows: 1,
            date: "14 June 2025",
            location: "Mustafa Darwish Theater",
            price: "600 EGP",
            duration: "2 hours",
            gatesOpen: "7:00 PM",
            totalTickets: 500,
            reservedTickets: 350,
            availableTickets: 150
        }
    },
    {
        id: 13,
        name: "Assala",
        image: "d151638c3ffe466365ee0defe9caf0b5.jpg",
        description: "Assala's powerful voice will leave you speechless in this unforgettable Cairo concert! With hits like 'Shayfa Feek,' 'Bent Akaber,' and 'Thak El Ghaby,' Assala has solidified her place as one of the Arab world's most beloved singers. Her raw emotion and dynamic stage presence will make this a night of passion and music you'll never forget. Join her for an evening of soul-stirring performances that will touch your heart!",
        info: {
            shows: 1,
            date: "16 June 2025",
            location: "Dar El-Orman Amphitheater",
            price: "800 EGP",
            duration: "2.5 hours",
            gatesOpen: "7:30 PM",
            totalTickets: 700,
            reservedTickets: 500,
            availableTickets: 200
        }
    },
    {
        id: 14,
        name: "Ruby",
        image: "كل-ما-ترغب-في-معرفته-عن-روبي.jpg",
        description: "Ruby brings her vibrant energy and infectious charm to Cairo! Known for her catchy hits like 'Leih Beydary Keda,' 'Enta Aref Leih,' and 'Yala,' Ruby has been a pop sensation in the Arab world for years. Her lively performances and upbeat music will have you dancing all night long. Don't miss this chance to experience Ruby's electrifying stage presence and celebrate the joy of music with thousands of fans!",
        info: {
            shows: 1,
            date: "18 June 2025",
            location: "Saqqara Country Club",
            price: "700 EGP",
            duration: "2 hours",
            gatesOpen: "7:00 PM",
            totalTickets: 600,
            reservedTickets: 450,
            availableTickets: 150
        }
    },
    {
        id: 15,
        name: "Ahmed Saad",
        image: "866ee091b18e66708200b99588381874.jpg",
        description: "Ahmed Saad is here to light up Cairo with his electrifying energy! Known for his massive hits like 'El Youm El Helw Dah,' 'Wasa Wasa,' and 'Mabrouk Alina,' Ahmed Saad blends pop, shaabi, and oriental vibes in a way that gets everyone on their feet. His dynamic stage presence and heartfelt lyrics will make this a night of pure celebration. Get ready to dance, sing, and feel the joy of music with one of Egypt's most beloved stars!",
        info: {
            shows: 1,
            date: "20 June 2025",
            location: "Dream Park Amphitheater",
            price: "750 EGP",
            duration: "2.5 hours",
            gatesOpen: "7:30 PM",
            totalTickets: 700,
            reservedTickets: 500,
            availableTickets: 200
        }
    },
    {
        id: 16,
        name: "Kazem El Saher",
        image: "a0e0e6d5d5e733fc94a395da1ddc59d0.jpg",
        description: "The Caesar of Arabic music, Kazem El Saher, returns to Cairo for a night of timeless romance! With a career spanning over three decades, Kazem has enchanted the world with classics like 'Ahebini,' 'Zidini Ishqan,' and 'Ana Wa Laila.' His poetic lyrics and soulful voice will transport you to a world of love and nostalgia. Join thousands of fans for an unforgettable evening of elegance, passion, and musical mastery under the stars!",
        info: {
            shows: 1,
            date: "22 June 2025",
            location: "Al Azhar Park",
            price: "1000 EGP",
            duration: "2 hours",
            gatesOpen: "8:00 PM",
            totalTickets: 800,
            reservedTickets: 600,
            availableTickets: 200
        }
    }
];

async function showEventDetails(eventId) {
    // Remove any existing modal first
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }

    const event = events.find(e => e.id === eventId);
    const city = extractCityFromLocation(event.info.location);
    const weather = await fetchWeather(city);

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal(this.parentElement.parentElement)">×</span>
            <div class="modal-header">
                <h2>${event.name}</h2>
            </div>
            <div class="modal-body">
                <img src="${event.image}" alt="${event.name}" class="modal-image">
                <p class="modal-description">${event.description}</p>
                <div class="modal-info">
                    <p><span class="icon">🎤</span> No. of shows: ${event.info.shows}</p>
                    <p><span class="icon">📍</span> Location: ${event.info.location}</p>
                    <p><span class="icon">📅</span> Date: ${event.info.date}</p>
                    <p><span class="icon">💵</span> Price: ${event.info.price}</p>
                    <p><span class="icon">⏳</span> Duration: ${event.info.duration}</p>
                    <p><span class="icon">🚪</span> Gates Open: ${event.info.gatesOpen}</p>
                    <p><span class="icon">🎫</span> Total Tickets: ${event.info.totalTickets}</p>
                    <p><span class="icon">✅</span> Reserved Tickets: ${event.info.reservedTickets}</p>
                    <p><span class="icon">📦</span> Available Tickets: ${event.info.availableTickets}</p>
                </div>
                <div class="weather-section">
                    <p><span class="icon">🌡️</span> Temperature: ${weather.temp}°C</p>
                    <p><span class="icon">☁️</span> Weather: ${weather.description}</p>
                    <p><span class="icon">💧</span> Humidity: ${weather.humidity}%</p>
                </div>
                <div class="modal-buttons">
                    <button class="back-btn" onclick="closeModal(this.closest('.modal'))">Back</button>
                    <button class="buy-btn" onclick="buyTickets(${eventId})">Buy Tickets</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');
}

function closeModal(modal) {
    modal.remove();
    document.body.classList.remove('modal-open');
}

function buyTickets(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    // Store event details in localStorage
    localStorage.setItem('selectedEvent', JSON.stringify({
        id: event.id,
        name: event.name,
        image: event.image,
        description: event.description,
        info: event.info
    }));

    // Redirect to payment page
    window.location.href = 'payment.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        const eventId = parseInt(card.getAttribute('data-event-id'));
        
        const viewDetailsBtn = card.querySelector('.view-details');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showEventDetails(eventId);
            });
        }

        const buyTicketsBtn = card.querySelector('.buy-tickets');
        if (buyTicketsBtn) {
            buyTicketsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                buyTickets(eventId);
            });
        }
    });
});

function saveEventDetails() {
    // Check login status
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
        alert('Please login first');
        window.location.href = 'software.html';
        return;
    }

    // Get field values
    const eventName = document.getElementById('eventName').value.trim();
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const location = document.getElementById('location').value.trim();
    const guestCount = document.getElementById('guestCount').value;
    const budget = document.getElementById('budget').value;

    // Validate data
    if (!eventName || !eventDate || !eventTime || !location || !guestCount || !budget) {
        alert('Please fill all required fields');
        return;
    }

    // Send data to backend
    const eventData = {
        userId: user.id,
        eventName,
        eventDate,
        eventTime,
        location,
        guestCount: parseInt(guestCount),
        budget: parseFloat(budget)
    };

    fetch('http://localhost:5000/save-event-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Event details saved successfully!');
        } else {
            alert(data.message || 'Error saving event details');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error connecting to server');
    });
}

// دالة لتحميل أحداث المستخدم
function loadUserEvents() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
        return;
    }

    fetch(`http://localhost:5000/get-user-events?userId=${user.id}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                displayEvents(data.events);
            } else {
                console.error('Error loading events:', data.message);
                // عرض الأحداث الافتراضية في حالة فشل تحميل الأحداث من قاعدة البيانات
                displayEvents(events);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // عرض الأحداث الافتراضية في حالة حدوث خطأ
            displayEvents(events);
        });
}

// دالة لعرض الأحداث
function displayEvents(events) {
    const eventsContainer = document.getElementById('eventsContainer');
    if (!eventsContainer) return;

    eventsContainer.innerHTML = '';
    
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event-card';
        eventElement.innerHTML = `
            <img src="${event.image}" alt="${event.name}" class="event-image">
            <div class="event-details">
                <h3>${event.name}</h3>
                <p>التاريخ: ${event.date}</p>
                <p>الوقت: ${event.time}</p>
                <p>الموقع: ${event.location}</p>
                <p>عدد الضيوف: ${event.guestCount}</p>
                <p>الميزانية: ${event.budget} EGP</p>
                <div class="event-buttons">
                    <button class="view-details" onclick="showEventDetails(${event.id})">عرض التفاصيل</button>
                    <button class="buy-tickets" onclick="buyTickets(${event.id})">شراء تذاكر</button>
                </div>
            </div>
        `;
        eventsContainer.appendChild(eventElement);
    });
}

// تحميل الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadUserEvents);




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