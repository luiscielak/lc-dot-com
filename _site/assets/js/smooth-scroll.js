// Smooth scroll implementation
document.addEventListener('DOMContentLoaded', function() {
    // Get all links with hash
    const links = document.querySelectorAll('a[href*="#"]');

    // Add click event listener to each link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if the link has a hash
            if (this.hash !== '') {
                e.preventDefault();

                // Get the target element
                const target = document.querySelector(this.hash);

                if (target) {
                    // Get header height for offset
                    const headerHeight = document.querySelector('.header').offsetHeight;

                    // Scroll to target with offset
                    window.scrollTo({
                        top: target.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });

                    // Update URL
                    history.pushState(null, null, this.hash);
                }
            }
        });
    });
}); 