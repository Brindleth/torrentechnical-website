// === Mobile menu toggle ===
const menuBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// === Generic form handler (employer enquiry + contact) ===
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

// === Candidate registration form (with file upload + base64) ===
const candidateForm = document.getElementById('candidateForm');

if (candidateForm) {
  const status = document.getElementById('formStatus');
  const fileInput = document.getElementById('cv_file');
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  // File size validation on selection
  if (fileInput) {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file && file.size > MAX_FILE_SIZE) {
        if (status) {
          status.className = 'form-status error';
          status.textContent = `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum is 5MB. Please compress or paste CV text instead.`;
        }
        fileInput.value = '';
      } else if (status) {
        status.className = 'form-status';
        status.textContent = '';
      }
    });
  }

  // Helper: convert File to base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Strip the "data:application/pdf;base64," prefix
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  candidateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = candidateForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    if (status) {
      status.className = 'form-status';
      status.textContent = '';
    }

    try {
      const formData = new FormData(candidateForm);
      const payload = {};

      // Collect work_preferences as array (multi-checkbox)
      const workPrefs = formData.getAll('work_preferences');
      payload.work_preferences = workPrefs;

      // Collect all other fields as strings
      for (const [key, value] of formData.entries()) {
        if (key === 'work_preferences' || key === 'cv_file') continue;
        payload[key] = value;
      }

      // Validate work preferences
      if (workPrefs.length === 0) {
        throw new Error('Please select at least one work preference.');
      }

      // Handle file upload
      const file = fileInput && fileInput.files[0];
      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          throw new Error(`File too large. Maximum 5MB.`);
        }
        if (status) {
          status.className = 'form-status';
          status.textContent = 'Encoding CV file…';
        }
        payload.cv_base64 = await fileToBase64(file);
        payload.cv_filename = file.name;
        payload.cv_mime_type = file.type || 'application/octet-stream';
      } else {
        payload.cv_base64 = '';
        payload.cv_filename = '';
        payload.cv_mime_type = '';
      }

      payload.submitted_at = new Date().toISOString();
      payload.source = window.location.pathname;

      if (status) {
        status.className = 'form-status';
        status.textContent = 'Submitting registration…';
      }

      const response = await fetch(candidateForm.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        if (status) {
          status.className = 'form-status success';
          status.textContent = '✓ Registration received! Matt will personally review your details within 5 business days. Check your email for confirmation.';
        }
        candidateForm.reset();
        // Reset discipline-other dropdown visibility
        const discOther = document.getElementById('disciplineOtherWrap');
        if (discOther) discOther.style.display = 'none';
        // Scroll to status
        if (status) status.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        throw new Error('Server returned ' + response.status);
      }
    } catch (err) {
      console.error('Candidate form error:', err);
      if (status) {
        status.className = 'form-status error';
        status.innerHTML = err.message + ' If problems persist, email <a href="mailto:candidates@torrentechnical.com">candidates@torrentechnical.com</a>.';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// === Active nav link based on path ===
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '/' && href === '/')) {
    link.classList.add('active');
  }
});
