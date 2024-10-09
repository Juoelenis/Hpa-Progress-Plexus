<?php
session_start();

// Simulate a database of users (you should replace this with actual database queries)
$users = [
    "admin" => "1234",  // username => password
    "testUser" => "password"
];

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the username and password from the form
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    // Check if the username exists and the password is correct
    if (isset($users[$username]) && $users[$username] === $password) {
        // Login successful
        $_SESSION['username'] = $username;
        logLoginAttempt($username, "SUCCESS");
        header('Location: dashboard.php');  // Redirect to a protected page (dashboard, etc.)
        exit();
    } else {
        // Login failed
        logLoginAttempt($username, "FAILURE");
        echo "Invalid username or password";
    }
}

/**
 * Function to log login attempts to a file
 *
 * @param string $username The username of the person attempting to log in
 * @param string $status The status of the login attempt ("SUCCESS" or "FAILURE")
 */
function logLoginAttempt($username, $status) {
    // Path to the log file
    $logFile = 'login_attempts.log';
    
    // Get the current timestamp
    $timestamp = date('Y-m-d H:i:s');

    // Format the log entry
    $logEntry = "[$timestamp] Username: $username - Status: $status" . PHP_EOL;

    // Write the log entry to the file
    file_put_contents($logFile, $logEntry, FILE_APPEND);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>
    <form method="POST" action="login.php">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br><br>
        <button type="submit">Login</button>
    </form>
</body>
</html>
