document.addEventListener("DOMContentLoaded", function() {
    // Load data from localStorage
    loadDataFromLocalStorage();

    // Event listener to add new row
    const addRowBtn = document.getElementById("addRowBtn");
    if (addRowBtn) {
        addRowBtn.addEventListener("click", addNewRow);
    } else {
        console.warn("Element with ID 'addRowBtn' not found.");
    }

    // Event listener to save changes
    const saveBtn = document.getElementById("saveBtn");
    if (saveBtn) {
        saveBtn.addEventListener("click", saveChanges);
    } else {
        console.warn("Element with ID 'saveBtn' not found.");
    }

    // Event delegation for Edit and Delete buttons
    const table = document.getElementById("employeeTable");
    if (table) {
        table.addEventListener("click", function(e) {
            if (e.target.classList.contains("edit-btn")) {
                editRow(e.target);
            } else if (e.target.classList.contains("delete-btn")) {
                deleteRow(e.target);
            }
        });
    } else {
        console.warn("Element with ID 'employeeTable' not found.");
    }

    // Theme toggle for Dark Mode
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector("i");
        // Check saved theme
        if (localStorage.getItem("theme") === "dark") {
            body.classList.add("dark-mode");
            if (themeIcon) {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            }
        }
        // Toggle theme
        themeToggleBtn.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            if (body.classList.contains("dark-mode")) {
                if (themeIcon) {
                    themeIcon.classList.remove("fa-sun");
                    themeIcon.classList.add("fa-moon");
                }
                localStorage.setItem("theme", "dark");
            } else {
                if (themeIcon) {
                    themeIcon.classList.remove("fa-moon");
                    themeIcon.classList.add("fa-sun");
                }
                localStorage.setItem("theme", "light");
            }
        });
    }
});

// Function to add a new row to the table
function addNewRow() {
    const existingData = JSON.parse(localStorage.getItem("employees")) || [];
    const employeeID = prompt("Enter Employee ID:");
    if (!employeeID) {
        alert("Employee ID is required.");
        return;
    }
    // Check for duplicate ID
    if (existingData.some(emp => emp.employeeID === employeeID)) {
        alert("Employee ID already exists. Please use a unique ID.");
        return;
    }

    const name = prompt("Enter Employee Name:");
    if (!name) {
        alert("Employee Name is required.");
        return;
    }

    const age = prompt("Enter Employee Age:");
    if (!age || isNaN(age) || age < 18 || age > 100) {
        alert("Please enter a valid age (18–100).");
        return;
    }

    const phone = prompt("Enter Employee Phone:");
    const phoneRegex = /^[0-9+\-\s]{7,15}$/;
    if (!phone || !phoneRegex.test(phone)) {
        alert("Please enter a valid phone number (7–15 digits, may include +, -, or spaces).");
        return;
    }

    const role = prompt("Enter Employee Role:");
    if (!role) {
        alert("Employee Role is required.");
        return;
    }

    const tableBody = document.querySelector("#employeeTable tbody");
    if (!tableBody) {
        console.warn("Table body not found.");
        return;
    }

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td contenteditable="false">${employeeID}</td>
        <td contenteditable="false">${name}</td>
        <td contenteditable="false">${age}</td>
        <td contenteditable="false">${phone}</td>
        <td contenteditable="false">${role}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;
    tableBody.appendChild(newRow);
    alert("Employee added successfully!");
}

// Function to edit a row
function editRow(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td:not(:last-child)"); // Exclude action cell
    const isEditing = cells[0].hasAttribute("contenteditable") && cells[0].getAttribute("contenteditable") === "true";

    cells.forEach(cell => {
        cell.setAttribute("contenteditable", !isEditing);
    });

    button.textContent = isEditing ? "Edit" : "Save";
}

// Function to delete a row
function deleteRow(button) {
    if (!confirm("Are you sure you want to delete this employee?")) {
        return;
    }
    const row = button.closest("tr");
    row.remove();
}

// Function to save changes to localStorage
function saveChanges() {
    const table = document.getElementById("employeeTable");
    if (!table) {
        console.warn("Employee table not found.");
        return;
    }

    const rows = table.querySelectorAll("tbody tr");
    const data = [];

    for (const row of rows) {
        const cells = row.querySelectorAll("td:not(:last-child)");
        if (cells.length < 5) {
            console.warn("Invalid row structure:", row);
            continue;
        }
        const employeeID = cells[0].innerText.trim();
        const name = cells[1].innerText.trim();
        const age = cells[2].innerText.trim();
        const phone = cells[3].innerText.trim();
        const role = cells[4].innerText.trim();

        // Basic validation
        if (!employeeID || !name || !age || !phone || !role) {
            alert("All fields must be filled for all employees.");
            return;
        }
        if (isNaN(age) || age < 18 || age > 100) {
            alert(`Invalid age for employee ID ${employeeID}. Please enter a number between 18 and 100.`);
            return;
        }
        const phoneRegex = /^[0-9+\-\s]{7,15}$/;
        if (!phoneRegex.test(phone)) {
            alert(`Invalid phone number for employee ID ${employeeID}. Please use 7–15 digits, +, -, or spaces.`);
            return;
        }

        data.push({ employeeID, name, age, phone, role });
    }

    // Save to localStorage with error handling
    try {
        localStorage.setItem("employees", JSON.stringify(data));
        alert("Changes saved successfully!");
    } catch (e) {
        console.error("Failed to save to localStorage:", e);
        alert("Failed to save changes. Please check browser settings (e.g., localStorage may be disabled).");
    }
}

// Function to load data from localStorage
function loadDataFromLocalStorage() {
    let data;
    try {
        data = JSON.parse(localStorage.getItem("employees"));
    } catch (e) {
        console.error("Failed to load from localStorage:", e);
        return;
    }

    if (data && Array.isArray(data)) {
        const tableBody = document.querySelector("#employeeTable tbody");
        if (!tableBody) {
            console.warn("Table body not found.");
            return;
        }

        tableBody.innerHTML = ""; // Clear existing rows
        data.forEach(employee => {
            if (!employee.employeeID || !employee.name || !employee.age || !employee.phone || !employee.role) {
                console.warn("Invalid employee data:", employee);
                return;
            }
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td contenteditable="false">${employee.employeeID}</td>
                <td contenteditable="false">${employee.name}</td>
                <td contenteditable="false">${employee.age}</td>
                <td contenteditable="false">${employee.phone}</td>
                <td contenteditable="false">${employee.role}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            tableBody.appendChild(newRow);
        });
    }
}