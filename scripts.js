// Select elements
const menuIcon = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const toggle = document.getElementById('darkModeToggle');
const body = document.body;

// Toggle mobile menu when the menu icon is clicked
if (menuIcon && mobileMenu) {
    menuIcon.addEventListener('click', () => {
        mobileMenu.classList.toggle('visible');
        menuIcon.classList.toggle('open'); // Toggles the 'X' effect
    });
}

// Close the mobile menu when the X button is clicked
if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('visible');
        menuIcon.classList.remove('open'); // Resets the hamburger icon
    });
}

// Close the mobile menu when any of the menu links are clicked
const menuLinks = document.querySelectorAll('.mobile-menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('visible');
        menuIcon.classList.remove('open');
    });
});

// Ensure mobile menu closes when switching to desktop view
function handleResize() {
    if (window.innerWidth > 768) { // Adjust this value based on your breakpoints
        mobileMenu.classList.remove('visible');
        menuIcon.classList.remove('open');
    }
}

window.addEventListener('resize', handleResize);

// Store the dark mode state in localStorage and update the icon
function updateDarkModeState() {
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }

    const icon = toggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Toggle dark mode on click
toggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    updateDarkModeState();
});

// Load the theme from localStorage when the page loads
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    updateDarkModeState(); // Ensure icon is set correctly based on theme
});

// Keyboard shortcut (Ctrl + M) to toggle dark mode
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'm') {
        body.classList.toggle('dark-mode');
        updateDarkModeState();
    }
});

// Form submission handling for commissions (this part is correct)
document.getElementById("commissionForm")("submit", function(event) {
    event.preventDefault();  // Prevent the default form submit behavior (reloading the page)
    
    const formData = new FormData(this);
    fetch("https://formspree.io/f/xldrqwzb", {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            document.getElementById("form-message").innerText = "Thank you! Your request has been submitted.";
            document.getElementById("form-message").classList.remove("hidden");
            this.reset();  // Reset the form after successful submission
        } else {
            alert("There was an issue submitting the form. Please try again.");
        }
    }).catch(error => {
        alert("There was an error. Please try again later.");
    });
});