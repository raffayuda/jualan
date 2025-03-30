document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved dark mode preference or use system preference
    if (localStorage.getItem('darkMode') === 'true' || 
        (localStorage.getItem('darkMode') === null && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      htmlElement.classList.add('dark');
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
      if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
    
    // FAQ accordions
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        answer.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
        
        // Close other FAQs
        faqQuestions.forEach(otherQuestion => {
          if (otherQuestion !== question) {
            const otherAnswer = otherQuestion.nextElementSibling;
            const otherIcon = otherQuestion.querySelector('i');
            
            otherAnswer.classList.add('hidden');
            otherIcon.classList.remove('rotate-180');
          }
        });
      });
    });
    
    // Template filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const mobileFilter = document.getElementById('mobileFilter');
    const templateCards = document.querySelectorAll('.template-card');
    
    function filterTemplates(category) {
      templateCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
          card.classList.remove('hidden');
          // Trigger animation
          card.style.animation = 'none';
          setTimeout(() => {
            card.style.animation = '';
          }, 10);
        } else {
          card.classList.add('hidden');
        }
      });
    }
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        filterTemplates(category);
        
        // Update mobile filter
        mobileFilter.value = category;
      });
    });
    
    mobileFilter.addEventListener('change', function() {
      const category = this.value;
      filterTemplates(category);
      
      // Update desktop filter buttons
      filterButtons.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Close mobile menu if open
          mobileMenu.classList.add('hidden');
        }
      });
    });
    
    // Initialize with all templates shown
    filterButtons[0].classList.add('active');
  });