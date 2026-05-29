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

// === Helper: show success panel + hide form ===
function showSuccessPanel(form) {
  const successId = form.getAttribute('data-success-id');
  if (!successId) return;
  const panel = document.getElementById(successId);
  if (!panel) return;

  // Hide the form completely
  form.style.display = 'none';
  // Show the success panel
  panel.style.display = 'block';
  panel.classList.add('show');

  form.reset();

  // Scroll the panel into view
  panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        if (form.hasAttribute('data-success-id')) {
          showSuccessPanel(form);
        } else if (status) {
          status.className = 'form-status success';
          status.textContent = '✓ Message sent. We\'ll get back to you within 1 business day.';
          form.reset();
        }
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

// === Candidate registration form — Torren API intake (Phase 11A-8B) ===
// Replaced: JSON+base64 submission to n8n.torrentechnical.com/webhook/candidate-registration
// New:      multipart/form-data to https://intake.torrentechnical.com/public/candidate-applications
//
// ROLLBACK: revert this commit to restore the n8n JSON+base64 path (WF5 stays live throughout)
const candidateForm = document.getElementById('candidateForm');

if (candidateForm) {
  const status = document.getElementById('formStatus');
  const fileInput = document.getElementById('cv_file');
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  // File size check on selection (unchanged UX)
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

  function readVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  candidateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const ENDPOINT = 'https://intake.torrentechnical.com/public/candidate-applications';

    const submitBtn = candidateForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    if (status) {
      status.className = 'form-status';
      status.textContent = '';
    }

    try {
      // ── Read form fields ────────────────────────────────────────────────
      const firstName        = readVal('first_name');
      const lastName         = readVal('last_name');
      const fullName         = [firstName, lastName].filter(Boolean).join(' ');
      const email            = readVal('email');
      const phone            = readVal('phone');
      const location         = readVal('location');
      const workAuth         = readVal('work_auth');
      const disciplineSelect = readVal('discipline');
      const disciplineOther  = readVal('discipline_other');
      const discipline       = disciplineSelect === 'Other' ? disciplineOther : disciplineSelect;
      const linkedInUrl      = readVal('linkedin_url');
      const yearsExperience  = readVal('years_experience');
      const employedStatus   = readVal('employed_status');
      const noticePeriod     = readVal('notice_period_weeks');
      const salary           = readVal('salary_expectation');
      const motivation       = readVal('summary_self');
      const cvTextPasted     = readVal('cv_text_pasted');

      // Work preferences — checkbox group (at least one required, unchanged UX)
      const wpChecked = candidateForm.querySelectorAll('input[name="work_preferences"]:checked');
      if (wpChecked.length === 0) {
        throw new Error('Please select at least one work preference.');
      }
      const workPreferences = Array.from(wpChecked).map(cb => cb.value).join(',');

      // CV file size check
      const file = fileInput && fileInput.files[0] ? fileInput.files[0] : null;
      if (file && file.size > MAX_FILE_SIZE) {
        throw new Error('File too large. Maximum 5MB.');
      }

      // ── Build FormData ──────────────────────────────────────────────────
      const fd = new FormData();

      // Required
      fd.append('fullName',             fullName);
      fd.append('email',                email);
      fd.append('consentPrivacyPolicy', 'true');
      fd.append('referralSource',       'website');

      // Optional standard fields
      if (phone)       fd.append('phone',       phone);
      if (location)    fd.append('location',    location);
      if (workAuth)    fd.append('workRights',  workAuth);
      if (discipline)  fd.append('discipline',  discipline);
      if (linkedInUrl) fd.append('linkedInUrl', linkedInUrl);

      // Supplemental fields — stored in additionalInfo by API
      if (yearsExperience) fd.append('experience',      yearsExperience);
      if (employedStatus)  fd.append('employed',        employedStatus);
      if (noticePeriod)    fd.append('noticePeriod',    noticePeriod);
      if (salary)          fd.append('salary',          salary);
      if (motivation)      fd.append('motivation',      motivation);
      fd.append('workPreferences', workPreferences); // always non-empty (validated above)

      // CV: prefer uploaded file; fall back to pasted text as plain-text blob
      if (file) {
        if (status) {
          status.className = 'form-status';
          status.textContent = 'Uploading CV…';
        }
        fd.append('cv', file, file.name);
      } else if (cvTextPasted) {
        const blob = new Blob([cvTextPasted], { type: 'text/plain' });
        fd.append('cv', blob, 'cv.txt');
      }
      // No CV provided → API accepts CV as optional; submission proceeds

      if (status) {
        status.className = 'form-status';
        status.textContent = 'Submitting registration…';
      }

      // Do NOT set Content-Type — browser sets multipart/form-data + boundary automatically
      const response = await fetch(ENDPOINT, { method: 'POST', body: fd });

      if (response.ok) {
        // Reset discipline-other visibility (unchanged)
        const discOther = document.getElementById('disciplineOtherWrap');
        if (discOther) discOther.style.display = 'none';

        if (candidateForm.hasAttribute('data-success-id')) {
          showSuccessPanel(candidateForm);
        } else if (status) {
          status.className = 'form-status success';
          status.textContent = '✓ Registration received! Our team will review your details within 5 business days.';
          candidateForm.reset();
          status.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
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
