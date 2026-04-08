document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect
    const navContainer = document.getElementById('nav-container');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navContainer.classList.add('py-2', 'bg-white/90', 'backdrop-blur-md');
            navContainer.classList.remove('py-0', 'bg-white');
        } else {
            navContainer.classList.add('py-0', 'bg-white');
            navContainer.classList.remove('py-2', 'bg-white/90', 'backdrop-blur-md');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const line1 = document.getElementById('line-1');
    const line2 = document.getElementById('line-2');
    const line3 = document.getElementById('line-3');
    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            line1.classList.add('translate-y-2', 'rotate-45');
            line2.classList.add('opacity-0');
            line3.classList.add('-translate-y-2', '-rotate-45');
        } else {
            mobileMenu.classList.add('hidden');
            line1.classList.remove('translate-y-2', 'rotate-45');
            line2.classList.remove('opacity-0');
            line3.classList.remove('-translate-y-2', '-rotate-45');
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close mobile menu on link click
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // 3. Embla Carousel Initialization
    const emblaNodes = document.querySelectorAll('.embla');
    emblaNodes.forEach((emblaNode) => {
        const embla = EmblaCarousel(emblaNode, {
            align: 'start',
            dragFree: true,
            containScroll: 'trimSnaps'
        });
    });

    // 4. Image Modal Logic
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModalBtn = document.getElementById('close-modal');
    const previewBtns = document.querySelectorAll('.preview-btn');

    const openModal = (src) => {
        modalImage.src = src;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    };

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modalImage.src = '';
    };

    previewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(btn.getAttribute('data-src'));
        });
    });

    closeModalBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

});
