document.addEventListener('DOMContentLoaded', function() {
    // ========== Smooth Scrolling for Navigation ==========
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });

    // ========== Intersection Observer for Scroll Animations ==========
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('.section');
        const skills = document.querySelectorAll('.skill');
        const projects = document.querySelectorAll('.project');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('section')) {
                        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                    } else if (entry.target.classList.contains('skill')) {
                        entry.target.classList.add('animate__animated', 'animate__fadeIn', 'animate__delay-1s');
                    } else if (entry.target.classList.contains('project')) {
                        entry.target.classList.add('animate__animated', 'animate__fadeInRight');
                    }
                    animationObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        sections.forEach(section => animationObserver.observe(section));
        skills.forEach(skill => animationObserver.observe(skill));
        projects.forEach(project => animationObserver.observe(project));
    };

    // ========== Back to Top Button ==========
    const backToTopButton = document.getElementById('back-to-top');
    
    const toggleBackToTop = function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    };

    if (backToTopButton) {
        window.addEventListener('scroll', toggleBackToTop);
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== Profile Image Hover Effect ==========
    const profileImages = document.querySelectorAll('.profile-img, .profile-image img');
    
    profileImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0)';
        });
    });

    // ========== Initialize Functions ==========
    animateOnScroll();
    toggleBackToTop(); // Check on page load

    // ========== Console Greeting ==========
    console.log('%c👋 Hello! Thanks for checking out my portfolio.', 
        'color: #6a4c93; font-size: 16px; font-weight: bold;');
    console.log('%c🔍 View the code at: https://github.com/yourusername/yourrepo', 
        'color: #ff8a65; font-size: 14px;');
});
