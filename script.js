// Page Navigation
const pages = {
  home: document.getElementById('home-page'),
  about: document.getElementById('about-page'),
  skills: document.getElementById('skills-page'),
  projects: document.getElementById('projects-page'),
  experience: document.getElementById('experience-page'),
  resume: document.getElementById('resume-page'),
  contact: document.getElementById('contact-page')
};

function showPage(pageId) {
  Object.keys(pages).forEach(key => {
    pages[key].classList.remove('active');
  });
  pages[pageId].classList.add('active');
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) {
      link.classList.add('active');
    }
  });
  
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('active');
  window.scrollTo(0, 0);
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.dataset.page;
    if (pageId && pages[pageId]) {
      showPage(pageId);
    }
  });
});

// Resume Download
const downloadBtn = document.getElementById('downloadResumeBtn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    const resumeContent = `KUMAR ADITYA SUBHAM
===================

CONTACT
Email: adityasubham66613@gmail.com
Location: Pune, Maharashtra

EDUCATION
B.E. Computer Engineering (Second Year)
Expected Graduation: 2028

SKILLS
Programming: C, C++, Python, Java, JavaScript
Web: HTML5, CSS3
Database: MySQL, MongoDB
Tools: Git/GitHub, Figma, VS Code

EXPERIENCE
Software Intern @ Software Elite Company (2025-Present)
Hackathon Participant (2024-2025)
Student Coordinator @ College Technical Events (2024-Present)

PROJECTS
• Cybersecurity Problem Statement - Hackathon project
• Healthcare System for Workers - Platform design
• Avishkar Competition - Research presentation
• Personal Portfolio - Responsive website

ACHIEVEMENTS
• 3 star Coder @ CodeChef (1334)
• Pupil @ CodeForces
• Knight @ LeetCode (1532)
• Participated in Avishkar Research Competition`;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Kumar_Aditya_Subham_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}

// Dark/Light Mode
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  if (themeToggle) themeToggle.textContent = '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Scroll Reveal
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
  scrollObserver.observe(el);
});

// Project Modal
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('#projectModal .modal-close');

const projectDetails = {
  cyber: {
    content: `<h2 style="color: var(--accent2);">Cyber Security Problem Statement</h2>
      <p style="color: var(--teal);">🏆 Hackathon Project</p>
      <p>Developed risk assessment framework and security solutions for small business networks. Received positive recognition for practical applicability.</p>`
  },
  healthcare: {
    content: `<h2 style="color: var(--accent2);">Healthcare System for Workers</h2>
      <p style="color: var(--teal);">🏥 Hackathon Project</p>
      <p>Designed mobile-friendly platform connecting workers to healthcare services, enabling appointment scheduling and health reminders.</p>`
  },
  avishkar: {
    content: `<h2 style="color: var(--accent2);">Avishkar Competition</h2>
      <p style="color: var(--teal);">📚 Research Competition</p>
      <p>Presented innovative engineering solutions and research on sustainable technology integration.</p>`
  },
  portfolio: {
    content: `<h2 style="color: var(--accent2);">Personal Portfolio Website</h2>
      <p style="color: var(--teal);">🎯 Personal Project</p>
      <p>Built responsive portfolio with dark/light mode, multi-page navigation, scroll animations, and contact form.</p>`
  }
};

function openModal(projectId) {
  const detail = projectDetails[projectId];
  if (detail && modal && modalBody) {
    modalBody.innerHTML = detail.content;
    modal.classList.add('active');
  }
}

function closeModal() {
  if (modal) modal.classList.remove('active');
}

if (modal && modalClose) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.project;
      if (projectId) openModal(projectId);
    });
  });
  
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) closeModal();
});

// Contact Form - FormSubmit (simple notification)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // Show sending message
    formStatus.innerHTML = '<div class="form-success">📨 Sending your message...</div>';
    
    // Form will submit normally to FormSubmit
    // The page will redirect, but we show a message first
    setTimeout(() => {
      formStatus.innerHTML = '<div class="form-success">✅ Redirecting... You\'ll receive a confirmation email.</div>';
    }, 500);
  });
}

// ========== SKILL BARS - ANIMATE ON VIEW ==========
// This ensures animations only trigger when user scrolls to the section

document.addEventListener('DOMContentLoaded', function() {
  
  // Get all skill bar items
  const skillItems = document.querySelectorAll('.skill-bar-item');
  
  // Target percentages for each skill
  const targetPercentages = {
    'Front-End': 75,
    'Back-End': 55,
    'Databases': 60,
    'Data-Structure': 50
  };
  
  // Initialize all bars to 0% width
  skillItems.forEach(item => {
    const barFill = item.querySelector('.skill-bar-fill');
    const percentElem = item.querySelector('.skill-percent');
    if (barFill) {
      barFill.style.width = '0%';
      barFill.classList.remove('animated');
    }
    if (percentElem) {
      percentElem.innerText = '0%';
      percentElem.classList.remove('animated');
    }
  });
  
  // Function to animate a single skill bar
  function animateSkillBar(item) {
    const skillNameElem = item.querySelector('.skill-name');
    const barFill = item.querySelector('.skill-bar-fill');
    const percentElem = item.querySelector('.skill-percent');
    
    if (!skillNameElem || !barFill || !percentElem) return;
    
    // Don't animate if already animated
    if (barFill.classList.contains('animated')) return;
    
    const skillName = skillNameElem.innerText;
    const targetPercent = targetPercentages[skillName];
    
    if (!targetPercent) return;
    
    // Mark as animated to prevent re-animation
    barFill.classList.add('animated');
    
    // Animate the bar width
    setTimeout(() => {
      barFill.style.transition = 'width 1.5s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
      barFill.style.width = targetPercent + '%';
    }, 100);
    
    // Animate the percentage number counting up
    let current = 0;
    const increment = targetPercent / 40; // 40 steps for smooth animation
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetPercent) {
        percentElem.innerText = targetPercent + '%';
        clearInterval(timer);
      } else {
        percentElem.innerText = Math.floor(current) + '%';
      }
    }, 35);
  }
  
  // Create an Intersection Observer to detect when skill bars come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Element is visible - animate it
        animateSkillBar(entry.target);
        // Stop observing after animation triggers
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.3,  // Trigger when 30% of the element is visible
    rootMargin: '0px 0px -50px 0px'  // Small offset for better timing
  });
  
  // Observe each skill bar item
  skillItems.forEach(item => {
    observer.observe(item);
  });
  
  // Also observe the entire skills section for any missed items
  const skillsSection = document.querySelector('.about-skills-section');
  if (skillsSection) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Check all skill items in the section
          const items = entry.target.querySelectorAll('.skill-bar-item');
          items.forEach(item => {
            const barFill = item.querySelector('.skill-bar-fill');
            if (barFill && !barFill.classList.contains('animated')) {
              animateSkillBar(item);
            }
          });
          // Keep observing but don't re-animate already animated ones
        }
      });
    }, { threshold: 0.2 });
    
    sectionObserver.observe(skillsSection);
  }
  
  // ========== TECH ICONS ANIMATION ==========
  const techIcons = document.querySelectorAll('.tech-icon');
  const iconObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        iconObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  techIcons.forEach(icon => {
    icon.style.opacity = '0';
    icon.style.transform = 'translateY(20px)';
    icon.style.transition = 'all 0.5s ease';
    iconObserver.observe(icon);
  });
  
  // ========== TIMELINE CARDS ANIMATION ==========
  const timelineCards = document.querySelectorAll('.timeline-card');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  timelineCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.9s ease';
    timelineObserver.observe(card);
  });
  
});