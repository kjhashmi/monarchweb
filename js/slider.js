document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show the selected slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Slide durations in milliseconds
    const slideDurations = [20000, 8000]; // 20s for slide 1, 8s for slide 2
    let slideInterval;

    function startSlideTimer() {
        clearInterval(slideInterval);
        const duration = slideDurations[currentSlide] || 5000; // Default to 5s if not specified
        slideInterval = setTimeout(nextSlide, duration);
    }

    // Pause on hover
    const slider = document.querySelector('.slider-container');
    slider.addEventListener('mouseenter', () => {
        clearTimeout(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        startSlideTimer();
    });
    
    // Start timer when showing a slide
    showSlide(currentSlide);
    startSlideTimer();

    // Show first slide initially
    showSlide(0);
});
