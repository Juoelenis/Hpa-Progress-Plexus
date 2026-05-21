// Login Functionality

// Function to handle form submission
function handleLogin(event) {
    event.preventDefault();  // Prevent form from submitting the usual way

    // Get form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate input fields
    if (username === "" || password === "") {
        alert("Both fields are required!");
        return;
    }

    // Mock login request (replace with actual backend API)
    const credentials = {
        username: username,
        password: password
    };

    // Simulate an API call with a timeout
    fakeApiLogin(credentials)
        .then(response => {
            if (response.success) {
                // Store token/session details as needed
                alert("Login successful! Redirecting...");
                // You can redirect to a new page using window.location
                // window.location.href = '/dashboard';
            } else {
                alert("Invalid username or password, try again bozo");
            }
        })
        .catch(error => {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again later.");
        });
}

// Fake API login function (Replace with actual API call)
function fakeApiLogin(credentials) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock response (replace with real backend authentication logic)
            if (credentials.username === "admin" && credentials.password === "1234") {
                resolve({ success: true, token: "fake-jwt-token" });
            } else {
                resolve({ success: false });
            }
        }, 1000);
    });
}

// Attach the login handler to the form
document.getElementById('loginForm').addEventListener('submit', handleLogin);



