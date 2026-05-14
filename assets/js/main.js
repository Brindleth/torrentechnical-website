// === Mobile menu toggle ===
const menuBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// === Form submissions (employer enquiry + contact) ===
function bindFormHandler(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  const status = document.getElementById('formStatus');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    
    if (status) {
      status.className = 'form-status';
      status.textContent = '';
    }
    
    try {
      const formData = new FormData(form);
      const payload = {};
      formData.forEach((value, key) => {
        payload[key] = value;
      });
      payload.submitted_at = new Date().toISOString();
      payload.source = window.location.pathname;
      
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        if (status) {
          status.className = 'form-status success';
          status.textContent = '✓ Message sent. We\'ll get back to you within 1 business day.';
        }
        form.reset();
      } else {
        throw new Error('Server returned ' + response.status);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      if (status) {
        status.className = 'form-status error';
        status.innerHTML = 'Something went wrong. Email us directly at <a href="mailto:info@torrentechnical.com">info@torrentechnical.com</a> and we\'ll respond personally.';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

bindFormHandler('employerForm');
bindFormHandler('contactForm');

// === Active nav link based on path ===
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '/' && href === '/')) {
    link.classList.add('active');
  }
});
