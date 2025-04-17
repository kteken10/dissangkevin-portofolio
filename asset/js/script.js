feather.replace();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get required elements
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    // Track menu state
    let isMenuOpen = false;

    // Function to open menu
    const openMenu = () => {
        mobileMenu.classList.remove('opacity-0', '-translate-y-2', 'pointer-events-none');
        mobileMenu.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        isMenuOpen = true;
    };

    // Function to close menu
    const closeMenu = () => {
        mobileMenu.classList.add('opacity-0', '-translate-y-2', 'pointer-events-none');
        mobileMenu.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        isMenuOpen = false;
    };

    // Toggle menu on button click
    mobileMenuButton.addEventListener('click', () => {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when clicking menu items
    const menuItems = mobileMenu.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    // Close menu on window resize (if desktop breakpoint is reached)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMenuOpen) { // 768px is the md breakpoint in Tailwind
            closeMenu();
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700');
            });
            button.classList.remove('bg-white', 'text-gray-700');
            button.classList.add('bg-blue-600', 'text-white');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') ===
                    filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            // Show menu
            mobileMenu.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
            mobileMenu.classList.remove('opacity-0', '-translate-y-2', 'pointer-events-none');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            // Hide menu
            mobileMenu.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
            mobileMenu.classList.add('opacity-0', '-translate-y-2', 'pointer-events-none');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    mobileMenuButton.addEventListener('click', toggleMenu);

    const mobileMenuItems = mobileMenu.querySelectorAll('a');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMenuOpen) {
            toggleMenu();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.testimonials-slider', {
        effect: 'slide',
        loop: true,
        spaceBetween: 30,
        keyboard: {
            enabled: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Auto play
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 800,
        grabCursor: true,
    });

    swiper.on('slideChangeTransitionEnd', function () {
        feather.replace();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#contact form");
    const inputs = form.querySelectorAll("input, textarea");
    
    // Helper function to show messages
    const showMessage = (message, isSuccess = true) => {
        const messageContainer = document.createElement("div");
        messageContainer.textContent = message;
        messageContainer.className = `mt-4 p-4 rounded-lg ${
            isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`;
        form.appendChild(messageContainer);

        setTimeout(() => {
            messageContainer.remove();
        }, 5000);
    };

    // Helper function to validate inputs
    const validateForm = () => {
        let isValid = true;

        inputs.forEach(input => {
            const value = input.value.trim();
            const fieldType = input.getAttribute("type");

            if (input.hasAttribute("required") && !value) {
                isValid = false;
                input.classList.add("border-red-500");
            } else {
                input.classList.remove("border-red-500");
            }

            if (fieldType === "email" && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    input.classList.add("border-red-500");
                } else {
                    input.classList.remove("border-red-500");
                }
            }
        });

        return isValid;
    };

    // Submit form handler
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Clear previous messages
        form.querySelectorAll(".mt-4").forEach(el => el.remove());

        if (validateForm()) {
            // Simulate an API call
            const formData = new FormData(form);
            document.getElementById("submitting-button").setAttribute("disabled",true);
            document.getElementById("submitting-button").innerHTML = "Submitting...";
            fetch("api/contact", {
                method: "POST",
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    showMessage("Your message has been sent successfully!", true);
                    document.getElementById("submitting-button").removeAttribute("disabled");
                    document.getElementById("submitting-button").innerHTML = "Send Message";
                    form.reset();
                } else {
                    showMessage("An error occurred. Please try again later.", false);
                    document.getElementById("submitting-button").removeAttribute("disabled");
                    document.getElementById("submitting-button").innerHTML = "Send Message";
                }
            })
            .catch(() => {
                showMessage("Unable to send the message. Check your internet connection.", false);
            });
        } else {
            showMessage("Please fill in all required fields correctly.", false);
        }
    });
});
