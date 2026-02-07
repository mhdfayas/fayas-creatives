document.addEventListener('DOMContentLoaded', () => {
    console.log('Fayas Creatives website loaded.');
    
    // Navbar Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });

    // Portfolio Modal Logic
    const initModal = () => {
        // Create Modal HTML
        const modalHTML = `
            <div class="modal-overlay" id="portfolio-modal">
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <div class="modal-image">
                        <div class="placeholder-img" id="modal-img-placeholder"></div>
                    </div>
                    <div class="modal-body">
                        <h3 class="modal-title" id="modal-title">Project Title</h3>
                        <span class="modal-category" id="modal-category">Category</span>
                        <p class="modal-desc">This is a detailed description of the project. It showcases our ability to deliver high-quality work that meets client needs. We used modern technologies and creative design principles.</p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.querySelector('.modal-overlay');
        const closeBtn = document.querySelector('.modal-close');
        const projectCards = document.querySelectorAll('.project-card');
        const modalTitle = document.getElementById('modal-title');
        const modalCategory = document.getElementById('modal-category');
        const modalImgPlaceholder = document.getElementById('modal-img-placeholder');

        const openModal = (card) => {
            const title = card.querySelector('h4').textContent;
            const category = card.querySelector('.category').textContent;
            const imgStyle = card.querySelector('.placeholder-img').getAttribute('style');

            modalTitle.textContent = title;
            modalCategory.textContent = category;
            modalImgPlaceholder.setAttribute('style', imgStyle);

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        };

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        projectCards.forEach(card => {
            card.addEventListener('click', () => openModal(card));
        });

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    };

    initModal();
});
