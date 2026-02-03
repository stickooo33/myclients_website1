async function loadNavbar() {
  const res = await fetch('partials/navbar.html');
  const html = await res.text();
  document.body.insertAdjacentHTML('afterbegin', html);
}

loadNavbar();

const form = document.querySelector('.contact-form');
const status = document.querySelector('.form-status');

// Form validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateForm() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  
  let isValid = true;

  // Clear previous errors
  name.parentElement.classList.remove('error');
  email.parentElement.classList.remove('error');
  message.parentElement.classList.remove('error');
  status.textContent = '';

  // Validate name
  if (!name.value.trim()) {
    name.parentElement.classList.add('error');
    isValid = false;
  }

  // Validate email
  if (!email.value.trim()) {
    emailError.textContent = 'Email is required';
    email.parentElement.classList.add('error');
    isValid = false;
  } else if (!validateEmail(email.value)) {
    emailError.textContent = 'Please enter a valid email';
    email.parentElement.classList.add('error');
    isValid = false;
  }

  // Validate message
  if (!message.value.trim()) {
    message.parentElement.classList.add('error');
    isValid = false;
  }

  return isValid;
}

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!validateForm()) {
      status.textContent = 'Please fill in all fields correctly.';
      status.style.color = '#ff6b6b';
      return;
    }

    status.textContent = 'Sending…';
    status.style.color = 'var(--color-text-muted)';

    setTimeout(() => {
      status.textContent = 'Message sent. I will get back to you shortly.';
      status.style.color = '#4ade80';
      form.reset();
    }, 900);
  });

  // Clear error on input
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      input.parentElement.classList.remove('error');
    });
  });
}

