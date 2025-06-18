// This file can be used for general site-wide JavaScript functionality
// For now, it's mostly a placeholder for future shared scripts or initializations.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Andes Trekker website loaded!');

    // Example of a simple shared function
    function showAlert(message, type = 'info') {
        const alertBox = document.createElement('div');
        alertBox.textContent = message;
        alertBox.style.padding = '10px';
        alertBox.style.margin = '10px 0';
        alertBox.style.borderRadius = '5px';
        alertBox.style.textAlign = 'center';

        if (type === 'success') {
            alertBox.style.backgroundColor = '#d4edda';
            alertBox.style.color = '#155724';
            alertBox.style.border = '1px solid #c3e6cb';
        } else if (type === 'error') {
            alertBox.style.backgroundColor = '#f8d7da';
            alertBox.style.color = '#721c24';
            alertBox.style.border = '1px solid #f5c6cb';
        } else { // info
            alertBox.style.backgroundColor = '#cfe2ff';
            alertBox.style.color = '#052c65';
            alertBox.style.border = '1px solid #b9d1f1';
        }

        // Append to body or a specific notification area
        document.body.prepend(alertBox);

        // Remove after a few seconds
        setTimeout(() => {
            alertBox.remove();
        }, 3000);
    }

    // You can call showAlert from other JS files if needed.
    // Example: showAlert('Welcome to Andes Trekker!');
});