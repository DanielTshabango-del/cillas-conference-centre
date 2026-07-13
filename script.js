document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  console.log('App loaded successfully!');
  
  // Add some interactivity
  app.addEventListener('click', () => {
    app.style.transform = 'scale(1.05)';
    setTimeout(() => {
      app.style.transform = 'scale(1)';
    }, 200);
  });
});


   const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');

        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });



        /* Lindys Place packages */
        function openPackage(evt, packageName) {
  // 1. Hide all tab content elements completely
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active-content");
  }

  // 2. Remove the "active" visual highlight color from all selection buttons
  const tabButtons = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  // 3. Show the specific chosen package content block, and mark the button as active
  document.getElementById(packageName).classList.add("active-content");
  evt.currentTarget.classList.add("active");
}



function openSubPackage(evt, subPackageName) {
  // 1. Hide all sub-tab event content containers completely
  const subContents = document.getElementsByClassName("sub-tab-content");
  for (let i = 0; i < subContents.length; i++) {
    subContents[i].classList.remove("active-sub-content");
  }

  // 2. Remove the active color styling layer from all sub-buttons
  const subButtons = document.getElementsByClassName("sub-tab-btn");
  for (let i = 0; i < subButtons.length; i++) {
    subButtons[i].classList.remove("active-sub-st");
    // Also captures any dynamically structured active class changes
    subButtons[i].classList.remove("active-sub");
  }

  // 3. Reveal target selected item structure, add class trigger reference
  document.getElementById(subPackageName).classList.add("active-sub-content");
  evt.currentTarget.classList.add("active-sub");
}

/* gallery lindys place */
function openGallery(evt, categoryId) {
  // 1. Hide all gallery content blocks completely
  const galleryContents = document.getElementsByClassName("gallery-content");
  for (let i = 0; i < galleryContents.length; i++) {
    galleryContents[i].classList.remove("active-gallery-content");
  }

  // 2. Remove the highlight active underline class from all gallery buttons
  const galleryTabs = document.getElementsByClassName("gallery-tab-btn");
  for (let i = 0; i < galleryTabs.length; i++) {
    galleryTabs[i].classList.remove("active-gallery-tab");
  }

  // 3. Make the clicked category box visible and mark the tab as highlighted
  document.getElementById(categoryId).classList.add("active-gallery-content");
  evt.currentTarget.classList.add("active-gallery-tab");
}

/* award img  */
const triggers = document.querySelectorAll('.lightbox-trigger');
const lightbox = document.getElementById('custom-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

triggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const imageSrc = trigger.getAttribute('data-image');
    lightboxImg.src = imageSrc;
    lightbox.style.display = 'flex';
  });
});

// Close lightbox when clicking the 'X' or outside the image
closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.style.display = 'none';
});


// function for Services section conference layout//
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const slides = Array.from(document.querySelectorAll('.review-slide'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentIndex = 0;
    let cardsPerView = getCardsPerView();

    // Determine viewport sizing dynamically matching CSS Media queries
    function getCardsPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    // Calculate maximum available index frame step ranges
    function getMaxIndex() {
        return Math.max(0, slides.length - cardsPerView);
    }

    // Generate responsive control pagination dot interfaces
    function setupDots() {
        dotsContainer.innerHTML = '';
        const totalDots = getMaxIndex() + 1;
        
        // Hide navigation elements entirely if content fits without scrolling
        if (totalDots <= 1) {
            dotsContainer.style.display = 'none';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        } else {
            dotsContainer.style.display = 'flex';
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSliderPosition();
            });
            dotsContainer.appendChild(dot);
        }
    }

    // Execute translation transform calculations
    function updateSliderPosition() {
        const maxIdx = getMaxIndex();
        if (currentIndex > maxIdx) currentIndex = maxIdx;
        
        const cardWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = translateX(-${currentIndex * cardWidth}px);
        
        // Update active classes across matching dots indexes
        const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Event Bindings
    nextBtn.addEventListener('click', () => {
        const maxIdx = getMaxIndex();
        if (currentIndex < maxIdx) {
            currentIndex++;
        } else {
            currentIndex = 0; // Seamless loop fallback back to structural array index origin
        }
        updateSliderPosition();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = getMaxIndex(); // Loop jump back down toward the tail-end limit indices
        }
        updateSliderPosition();
    });

    // Handle viewport resize recalculations cleanly
    window.addEventListener('resize', () => {
        const newCardsPerView = getCardsPerView();
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            setupDots();
            updateSliderPosition();
        }
    });

    // Run structural initialization layer definitions 
    setupDots();
    updateSliderPosition();
});