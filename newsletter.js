// Newsletter subscription form validation
document.querySelector('.newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
    }

    // Display a success message or submit the form
    alert('Thank you for subscribing!');
    emailInput.value = '';
});
