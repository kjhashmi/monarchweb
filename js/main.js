// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const dropdowns = document.querySelectorAll('.dropdown > a');

    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Handle dropdown menus on mobile
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                const isOpen = parent.classList.contains('active');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                if (!isOpen) {
                    parent.classList.add('active');
                } else {
                    parent.classList.remove('active');
                }
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && window.innerWidth <= 768) {
            document.querySelectorAll('.dropdown').forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    mainNav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
                
                // Scroll to target
                const targetElement = document.querySelector(targetId);
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add shadow to header on scroll
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const phoneInput = this.querySelector('input[type="text"]');
            const phoneNumber = phoneInput.value.trim();
            
            if (phoneNumber) {
                // Here you would typically send the phone number to your server
                alert(`Thank you! We'll call you back at ${phoneNumber} shortly.`);
                phoneInput.value = '';
            } else {
                alert('Please enter a valid phone number.');
            }
        });
    }
});

// Animate stats when scrolled into view
function animateStats() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const statsSectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (statsSectionTop < windowHeight - 100) {
        statsSection.classList.add('animate');
        // Remove the event listener after animation is triggered
        window.removeEventListener('scroll', animateStats);
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize stats animation
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        // Add scroll event listener for stats animation
        window.addEventListener('scroll', animateStats);
        // Check on load in case stats are already in view
        animateStats();
    }
});
