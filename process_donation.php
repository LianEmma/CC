<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $donation_amount = filter_input(INPUT_POST, 'donation_amount', FILTER_VALIDATE_FLOAT);
    $donor_email = filter_input(INPUT_POST, 'donor_email', FILTER_VALIDATE_EMAIL);

    if ($donation_amount && $donor_email) {
        // Process the donation, e.g., save to database or use PayPal API
        echo "Thank you for your donation of $" . htmlspecialchars($donation_amount);
    } else {
        echo "Invalid input. Please provide a valid donation amount and email.";
    }
}
?>
