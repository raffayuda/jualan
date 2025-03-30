
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
          const icon = mobileMenuBtn.querySelector('i');
          if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
          } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        });
        
        // FAQ accordions
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
          question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            answer.classList.toggle('hidden');
            if (!answer.classList.contains('hidden')) {
              answer.style.animation = 'slide-up 0.3s ease forwards';
            }
            
            icon.parentElement.classList.toggle('rotate-180');
            
            // Close other FAQs
            faqQuestions.forEach(otherQuestion => {
              if (otherQuestion !== question) {
                const otherAnswer = otherQuestion.nextElementSibling;
                const otherIcon = otherQuestion.querySelector('i');
                
                otherAnswer.classList.add('hidden');
                otherIcon.parentElement.classList.remove('rotate-180');
              }
            });
          });
        });
        
        // Template filtering with animation
        const filterButtons = document.querySelectorAll('.filter-btn');
        const mobileFilter = document.getElementById('mobileFilter');
        const templateCards = document.querySelectorAll('.template-card');
        
        function filterTemplates(category) {
          templateCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
              card.classList.remove('hidden');
              card.style.animation = 'none';
              setTimeout(() => {
                card.style.animation = '';
                card.classList.add('animate-slide-up');
                setTimeout(() => {
                  card.classList.remove('animate-slide-up');
                }, 500);
              }, 10);
            } else {
              card.classList.add('hidden');
            }
          });
        }
        
        filterButtons.forEach(button => {
          button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-primary-600', 'text-white'));
            this.classList.add('active', 'bg-primary-600', 'text-white');
            
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
              btn.classList.add('active', 'bg-primary-600', 'text-white');
            } else {
              btn.classList.remove('active', 'bg-primary-600', 'text-white');
            }
          });
        });
        
        // Set first button as active by default
        filterButtons[0].classList.add('active', 'bg-primary-600', 'text-white');
        
        // Scroll reveal animation
        function revealOnScroll() {
          const reveals = document.querySelectorAll('.reveal');
          
          reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
              element.classList.add('active');
            }
          });
        }
        
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Trigger on initial load
        
        // Scroll progress bar
        const progressBar = document.getElementById('progressBar');
        
        window.addEventListener('scroll', () => {
          const totalScroll = document.body.scrollHeight - window.innerHeight;
          const scrollPosition = window.pageYOffset;
          const scrolled = (scrollPosition / totalScroll) * 100;
          progressBar.style.width = scrolled + '%';
        });
        
        // Back to top button
        const backToTopButton = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
          if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
          } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
          }
        });
        
        backToTopButton.addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
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
              const icon = mobileMenuBtn.querySelector('i');
              if (icon.classList.contains('fa-times')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
              }
            }
          });
        });
        
        // Mouse cursor trailer
        const cursorTrailer = document.getElementById('cursorTrailer');
        
        document.addEventListener('mousemove', (e) => {
          const x = e.clientX;
          const y = e.clientY;
          
          cursorTrailer.style.opacity = '1';
          cursorTrailer.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        });
        
        document.addEventListener('mouseout', () => {
          cursorTrailer.style.opacity = '0';
        });
        
        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .hover-perspective');
        
        interactiveElements.forEach(element => {
          element.addEventListener('mouseenter', () => {
            cursorTrailer.style.width = '40px';
            cursorTrailer.style.height = '40px';
            cursorTrailer.style.borderColor = '#38bdf8';
            cursorTrailer.style.backgroundColor = 'rgba(14, 165, 233, 0.1)';
          });
          
          element.addEventListener('mouseleave', () => {
            cursorTrailer.style.width = '20px';
            cursorTrailer.style.height = '20px';
            cursorTrailer.style.borderColor = '#0ea5e9';
            cursorTrailer.style.backgroundColor = 'transparent';
          });
        });

        // Counter animation
        const counters = document.querySelectorAll('.counter');
        const counterSpeed = 200; // Lower is faster
        
        function animateCounter(counter) {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const increment = target / counterSpeed;
          
          const updateCount = () => {
            if(count < target) {
              count += increment;
              counter.innerText = Math.ceil(count);
              setTimeout(updateCount, 1);
            } else {
              counter.innerText = target.toLocaleString();
            }
          };
          
          updateCount();
        }
        
        const counterObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
          counterObserver.observe(counter);
        });
      });