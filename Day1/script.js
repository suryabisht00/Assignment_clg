document.addEventListener('DOMContentLoaded', function() {
    // Handle regular hover images
    const normalImages = document.querySelectorAll('.hover-image');
    normalImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            console.log('Normal image now colorful!');
        });
        
        img.addEventListener('mouseleave', function() {
            console.log('Normal image back to grayscale');
        });
    });
    
    // Handle reverse hover images
    const reverseImages = document.querySelectorAll('.reverse-hover-image');
    reverseImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            console.log('Reverse image now grayscale!');
        });
        
        img.addEventListener('mouseleave', function() {
            console.log('Reverse image back to colorful');
        });
    });
    
    // New code for synchronized behavior
    const allImages = document.querySelectorAll('.hover-image, .reverse-hover-image');
    const imageArray = Array.from(allImages);
    
    // Function to make one image colorful and others grayscale
    function syncImages(hoveredIndex) {
        imageArray.forEach((img, index) => {
            if (index === hoveredIndex) {
                // This is the hovered image - make it colorful
                if (img.classList.contains('hover-image')) {
                    img.style.filter = 'grayscale(0%)'; // Make hovered image colorful
                } else {
                    img.style.filter = 'grayscale(0%)'; // Always make hovered image colorful
                }
            } else {
                // Other images - make them black and white
                img.style.filter = 'grayscale(100%)'; // Always make non-hovered images B&W
            }
        });
    }
    
    // Add event listeners for synchronized behavior
    imageArray.forEach((img, index) => {
        img.addEventListener('mouseenter', function() {
            syncImages(index);
        });
        
        // Remove mouseout/leave event as we don't need to reset
    });
    
    // Initialize with the first image colorful and second grayscale by default
    syncImages(0);
});
