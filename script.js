const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Toggle forms and update ARIA attributes
function toggleForm(showLogin) {
  if (showLogin) {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    loginTab.classList.add('active');
    signupTab.classList.remove('active');

    loginTab.setAttribute('aria-selected', 'true');
    signupTab.setAttribute('aria-selected', 'false');
  } else {
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    signupTab.classList.add('active');
    loginTab.classList.remove('active');

    signupTab.setAttribute('aria-selected', 'true');
    loginTab.setAttribute('aria-selected', 'false');
  }
}

loginTab.addEventListener('click', () => toggleForm(true));
signupTab.addEventListener('click', () => toggleForm(false));

function handleLogin() {
  const uname = document.getElementById('loginUsername').value.trim();
  const passwd = document.getElementById('loginPassword').value;
  if (!uname || !passwd) {
    alert('Please fill in all fields.');
    return;
  }
  if (uname === 'karthik' && passwd === '1') {
    // Redirect to main page on successful login
    window.location.href = 'pages/main.html';
  } else {
    alert('Invalid username or password.');
  }
}


function handleSignup() {
  const uname = document.getElementById('signupUsername').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const passwd = document.getElementById('signupPassword').value;
  if (!uname || !email || !passwd) {
    alert('Please fill in all fields.');
    return;
  }

  // Mock signup - store in localStorage
  let users = JSON.parse(localStorage.getItem('vidyarthiUsers')) || [];
  if (users.find(u => u.username === uname)) {
    alert('Username already exists.');
    return;
  }
  users.push({ username: uname, email: email, password: passwd });
  localStorage.setItem('vidyarthiUsers', JSON.stringify(users));
  alert('Account created successfully! You can now login.');
  toggleForm(true);
}
