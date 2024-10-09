// Account Creation Functionality

// Function to handle form submission for registration
function handleRegister(event) {
    event.preventDefault();  // Prevent form from submitting the usual way

    // Get form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate input fields
    if (username === "" || password === "" || confirmPassword === "") {
        alert("All fields are required!");
        return;
    }

    // Validate password match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Mock registration request (replace with actual backend API)
    const newUser = {
        username: username,
        password: password
    };

    // Simulate an API call with a timeout
    fakeApiRegister(newUser)
        .then(response => {
            if (response.success) {
                alert("Account created successfully! Redirecting to login...");
                // You can redirect to the login page
                window.location.href = 'login.html';
            } else {
                alert("Username is already taken. Please choose another.");
            }
        })
        .catch(error => {
            console.error("Registration error:", error);
            alert("An error occurred during registration. Please try again later.");
        });
}

// Fake API register function (Replace with actual API call)
function fakeApiRegister(newUser) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock response (replace with real backend logic)
            const existingUsers = ["admin", "testUser"];
            if (!existingUsers.includes(newUser.username)) {
                resolve({ success: true });
            } else {
                resolve({ success: false });
            }
        }, 1000);
    });
}

// Attach the registration handler to the form
document.getElementById('registerForm').addEventListener('submit', handleRegister);


