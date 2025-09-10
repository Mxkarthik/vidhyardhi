// Supabase credentials
const SUPABASE_URL = "https://dnjdfebvagwrhyxolssr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuamRmZWJ2YWd3cmh5eG9sc3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTU5NDgsImV4cCI6MjA3MzA5MTk0OH0.p5_zPJ2jfpJTHnTJrI3CQuxGhignaKD51a1kYGU4VJM";

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Toggle forms (login/signup) - your existing code
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

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

// Handle Login
async function handleLogin() {
  const email = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Login failed: " + error.message);
  } else {
    alert("Login successful!");
    window.location.href = "pages/main.html"; // redirect to main page
  }
}

// Handle Signup
async function handleSignup() {
  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert("Signup failed: " + error.message);
  } else {
    alert("Signup successful! Please check your email to confirm your account.");
    toggleForm(true); // Switch to login form after signup
  }
}
