document.addEventListener('DOMContentLoaded', function() {
  // Select all anchor links that start with #
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Skip if it's just a # link
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate the offset to account for fixed header
        const headerOffset = 80; // Adjust this value based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}); 