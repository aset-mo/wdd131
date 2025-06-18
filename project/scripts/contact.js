// JavaScript for the Contact Form
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const newsletter = document.getElementById('newsletter').checked;

        // Basic validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            displayFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            displayFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission (e.g., to a server)
        console.log('Form Submitted:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);
        console.log('Newsletter Subscription:', newsletter);

        // In a real application, you would send this data to a backend server using fetch() or XMLHttpRequest
        // For demonstration, we'll just show a success message.
        setTimeout(() => {
            displayFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset(); // Clear the form
            // Optionally save newsletter preference to localStorage
            if (newsletter) {
                localStorage.setItem('subscribedToNewsletter', 'true');
                console.log('Newsletter subscription saved to localStorage.');
            }
        }, 1000);
    });
}

// Function to display form messages
function displayFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`; // Add type class for styling
    formMessage.classList.remove('hidden'); // Make sure it's visible

    // Hide message after a few seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// Basic email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}