document.addEventListener('DOMContentLoaded', function() {
  
  // Dr. Carter background slider (NEW)
  const carterSlides = document.querySelectorAll('.carter-bg-slider .carter-slide');
  if (carterSlides.length > 0) {
      let currentCarterSlide = 0;
      setInterval(() => {
          carterSlides[currentCarterSlide].classList.remove('active');
          currentCarterSlide = (currentCarterSlide + 1) % carterSlides.length;
          carterSlides[currentCarterSlide].classList.add('active');
      }, 6000); // Slower transition for better visual effect
  }

  // Video Carousel for Hero Section
  const videoCarouselItems = document.querySelectorAll('.video-carousel-bg video, .video-carousel-bg .carousel-image');
  if (videoCarouselItems.length > 0) {
      let currentVideoSlide = 0;
      setInterval(() => {
          videoCarouselItems[currentVideoSlide].classList.remove('active');
          currentVideoSlide = (currentVideoSlide + 1) % videoCarouselItems.length;
          videoCarouselItems[currentVideoSlide].classList.add('active');
      }, 5000);
  }

  // Conditions filter and category functionality
  const searchInput = document.getElementById('cond-search');
  const conditionsGrid = document.getElementById('conditions-grid');
  if (searchInput && conditionsGrid) {
      const cards = conditionsGrid.querySelectorAll('.condition-card');
      const countEl = document.getElementById('cond-count');
      const categoryTabs = document.querySelectorAll('.category-tab');

      // Search functionality
      searchInput.addEventListener('input', () => {
          const query = searchInput.value.toLowerCase().trim();
          let visibleCount = 0;
          cards.forEach(card => {
              const keywords = card.dataset.keywords.toLowerCase();
              const title = card.querySelector('h3').textContent.toLowerCase();
              if (keywords.includes(query) || title.includes(query)) {
                  card.style.display = 'block';
                  visibleCount++;
              } else {
                  card.style.display = 'none';
              }
          });
          if(countEl) countEl.textContent = `${visibleCount} conditions found`;
      });

      // Category filter functionality
      categoryTabs.forEach(tab => {
          tab.addEventListener('click', () => {
              // Update active tab
              categoryTabs.forEach(t => t.classList.remove('active'));
              tab.classList.add('active');
              
              // Clear search
              searchInput.value = '';
              
              const category = tab.dataset.category;
              let visibleCount = 0;
              
              cards.forEach(card => {
                  if (category === 'all' || card.dataset.category === category) {
                      card.style.display = 'block';
                      visibleCount++;
                  } else {
                      card.style.display = 'none';
                  }
              });
              
              if(countEl) countEl.textContent = `${visibleCount} conditions found`;
          });
      });

      // Initialize count
      if(countEl) countEl.textContent = `${cards.length} conditions found`;
  }
  
  // Shop Modal
  const shopModal = document.getElementById('shop-modal');
  if (shopModal) {
      const shopLinks = document.querySelectorAll('#shop-link-footer, a[href="#shop"]');
      
      shopModal.innerHTML = `
          <div>
              <h3>Visit Arbonne Products?</h3>
              <p>You will be redirected to an external site.</p>
              <div class="modal-buttons">
                  <button id="shop-yes" class="btn btn-primary">Yes, Continue</button>
                  <button id="shop-no" class="btn btn-ghost">Cancel</button>
              </div>
          </div>
      `;
      
      shopLinks.forEach(link => {
          link.addEventListener('click', (e) => {
              e.preventDefault();
              shopModal.style.display = 'flex';
          });
      });
      
      shopModal.addEventListener('click', (e) => {
          if (e.target.id === 'shop-modal' || e.target.id === 'shop-no') {
              shopModal.style.display = 'none';
          }
          if (e.target.id === 'shop-yes') {
              window.open('https://www.arbonne.com/us/en/arb/featuredpromotions/shop-all/skincare/c/skincare', '_blank');
              shopModal.style.display = 'none';
          }
      });
  }

});

// Dr. Carter Image Gallery
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.dr-carter-image-gallery .thumbnail');
    const mainImage = document.getElementById('main-img');
    const imageCaption = document.querySelector('.dr-carter-image-gallery .image-caption');

    console.log('Found thumbnails:', thumbnails.length); // Debug log

    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent any default behavior
                e.stopPropagation(); // Stop event bubbling
                
                console.log('Thumbnail clicked:', index); // Debug log
                
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Get image data
                const newImage = this.dataset.image;
                const captionData = this.dataset.caption ? this.dataset.caption.split('|') : [];
                
                console.log('Switching to image:', newImage); // Debug log
                
                // Update main image with fade effect
                mainImage.style.opacity = '0';
                
                setTimeout(() => {
                    mainImage.src = newImage;
                    mainImage.style.opacity = '1';
                    
                    // Update caption if it exists
                    if (imageCaption && captionData.length >= 2) {
                        const title = imageCaption.querySelector('h5');
                        const description = imageCaption.querySelector('p');
                        
                        if (title) title.textContent = captionData[0];
                        if (description) description.textContent = captionData[1];
                    }
                }, 150);
            });
        });
    } else {
        console.log('Thumbnails or main image not found'); // Debug log
    }
});

// Family Widescreen Gallery
let currentFamilyImageIndex = 0;
const familyImages = document.querySelectorAll('.widescreen-image');
const familyBackgrounds = document.querySelectorAll('.widescreen-background');
const familyIndicators = document.querySelectorAll('.indicator');
const familyCaption = document.querySelector('.widescreen-caption');

function showWideScreenImage(index) {
    if (familyImages.length === 0) return;
    
    // Remove active from all images and backgrounds
    familyImages.forEach(img => img.classList.remove('active'));
    familyBackgrounds.forEach(bg => bg.classList.remove('active'));
    familyIndicators.forEach(ind => ind.classList.remove('active'));
    
    // Set current index
    currentFamilyImageIndex = index;
    
    // Show current image, background, and indicator
    familyImages[currentFamilyImageIndex].classList.add('active');
    familyBackgrounds[currentFamilyImageIndex].classList.add('active');
    familyIndicators[currentFamilyImageIndex].classList.add('active');
    
    // Update caption
    if (familyCaption) {
        const captionData = familyImages[currentFamilyImageIndex].dataset.caption.split(' - ');
        if (captionData.length >= 2) {
            const title = familyCaption.querySelector('h4');
            const description = familyCaption.querySelector('p');
            
            if (title) title.textContent = captionData[0];
            if (description) description.textContent = captionData[1];
        }
    }
}

function changeWideScreenImage(direction) {
    if (familyImages.length === 0) return;
    
    currentFamilyImageIndex += direction;
    
    if (currentFamilyImageIndex >= familyImages.length) {
        currentFamilyImageIndex = 0;
    } else if (currentFamilyImageIndex < 0) {
        currentFamilyImageIndex = familyImages.length - 1;
    }
    
    showWideScreenImage(currentFamilyImageIndex);
}

// Auto-advance family slideshow
document.addEventListener('DOMContentLoaded', function() {
    if (familyImages.length > 0) {
        setInterval(() => {
            changeWideScreenImage(1);
        }, 5000); // Change image every 5 seconds
    }
});