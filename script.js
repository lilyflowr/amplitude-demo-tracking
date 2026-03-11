// ============================================
// AMPLITUDE CONFIGURATION
// ============================================

const AMPLITUDE_API_KEY = 'YOUR_AMPLITUDE_API_KEY_HERE';

// ============================================
// INITIALIZE AMPLITUDE & USER ID
// ============================================

// Function to generate a random user ID
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

// Function to get or create user ID from localStorage
function getUserId() {
    let userId = localStorage.getItem('amplitude_user_id');
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem('amplitude_user_id', userId);
    }
    return userId;
}

// Initialize Amplitude with user ID
const amplitude = window.amplitude;
const userId = getUserId();
amplitude.init(AMPLITUDE_API_KEY, userId, {
    saveEvents: true,
    includeUtm: true,
    includeReferrer: true
});

// ============================================
// TRACK PAGE VIEWED EVENT
// ============================================

function trackPageViewed() {
    amplitude.track('Page Viewed', {
        page_name: 'Demo Landing Page',
        cta_location: 'hero_section'
    });
}

// Track page view when page loads
document.addEventListener('DOMContentLoaded', trackPageViewed);

// ============================================
// DOM ELEMENTS
// ============================================

const signupBtn = document.getElementById('signupBtn');
const demoBtn = document.getElementById('demoBtn');
const formSection = document.getElementById('formSection');
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const confirmationModal = document.getElementById('confirmationModal');
const confirmationTitle = document.getElementById('confirmationTitle');
const confirmationMessage = document.getElementById('confirmationMessage');
const closeBtn = document.getElementById('closeBtn');

// ============================================
// SIGN UP BUTTON CLICK HANDLER
// ============================================

signupBtn.addEventListener('click', function() {
    // Track event
    amplitude.track('Sign Up Clicked', {
        page_name: 'Demo Landing Page',
        cta_location: 'hero_section'
    });

    // Show form section
    formSection.style.display = 'block';
    
    // Scroll to form
    setTimeout(function() {
        formSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
});

// ============================================
// REQUEST DEMO BUTTON CLICK HANDLER
// ============================================

demoBtn.addEventListener('click', function() {
    // Track event
    amplitude.track('Request Demo Clicked', {
        page_name: 'Demo Landing Page',
        cta_location: 'hero_section'
    });

    // Show confirmation modal
    showConfirmation('Demo Request Received', 'Our team will review your request and contact you within 24 hours.');
});

// ============================================
// EMAIL FORM SUBMISSION HANDLER
// ============================================

emailForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = emailInput.value;

    // Track event with email submission
    amplitude.track('Email Submitted', {
        page_name: 'Demo Landing Page',
        cta_location: 'hero_section',
        email: email
    });

    // Show confirmation modal
    showConfirmation('Email Confirmed', 'Thank you for signing up! Check your inbox for updates.');

    // Reset form
    emailForm.reset();
    formSection.style.display = 'none';
});

// ============================================
// CONFIRMATION MODAL HANDLER
// ============================================

function showConfirmation(title, message) {
    confirmationTitle.textContent = title;
    confirmationMessage.textContent = message;
    confirmationModal.style.display = 'flex';

    // Scroll to modal
    document.body.style.overflow = 'hidden';
}

function closeConfirmation() {
    confirmationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when close button is clicked
closeBtn.addEventListener('click', closeConfirmation);

// Close modal when clicking outside the modal content
confirmationModal.addEventListener('click', function(e) {
    if (e.target === confirmationModal) {
        closeConfirmation();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && confirmationModal.style.display === 'flex') {
        closeConfirmation();
    }
});

// ============================================
// LOG USER INFORMATION (FOR DEVELOPMENT)
// ============================================

console.log('Analytics Tracking Initialized');
console.log('User ID:', userId);
console.log('Amplitude API Key:', AMPLITUDE_API_KEY === 'YOUR_AMPLITUDE_API_KEY_HERE' ? 'NOT SET' : 'SET');
