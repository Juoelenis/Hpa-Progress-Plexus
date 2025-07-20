<?php
session_start();

// Simulate a database of users (you should replace this with actual database queries)
$users = [
    "admin" => "1234",  // username => password
    "testUser" => "password"
];

// Function to log login attempts to a file
function logLoginAttempt($username, $status) {
    $logFile = 'login_attempts.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] Username: $username - Status: $status" . PHP_EOL;
    file_put_contents($logFile, $logEntry, FILE_APPEND);
}

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
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
        $error = "Invalid username or password";
    }
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
    <?php if (isset($error)) { echo '<div style="color:red;">' . htmlspecialchars($error) . '</div>'; } ?>
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
