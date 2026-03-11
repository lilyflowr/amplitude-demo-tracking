// ============================================
// AMPLITUDE INITIALIZATION
// ============================================

/**
 * Generate a random user ID for first-time visitors
 */
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Get or create user ID from localStorage
 * Ensures consistent user identification across sessions
 */
function getUserId() {
    let userId = localStorage.getItem('amplitude_user_id');
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem('amplitude_user_id', userId);
    }
    return userId;
}

/**
 * Initialize Amplitude SDK with API key from config
 */
const userId = getUserId();
const amplitude = window.amplitude;

// Initialize with API key from config file
amplitude.init(window.APP_CONFIG.AMPLITUDE_API_KEY, {
    userId: userId,
    defaultTracking: false
});

console.log('Analytics Tracking Initialized');
console.log('User ID:', userId);

// ============================================
// SCROLL DEPTH TRACKING
// ============================================

/**
 * Track scroll depth - fires once when user scrolls to 50% of page height
 */
let scrollDepth50Tracked = false;

window.addEventListener('scroll', function() {
    if (scrollDepth50Tracked) return;

    // Calculate scroll depth percentage
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

    // Track event when user reaches 50% scroll depth
    if (scrollPercent >= 50) {
        amplitude.track('Scroll Depth Reached', {
            scroll_percent: 50,
            page_name: 'Demo Landing Page'
        });
        scrollDepth50Tracked = true;
    }
});

// ============================================
// TRACK PAGE VIEWED EVENT
// ============================================

/**
 * Track when a visitor loads the landing page
 * Includes event properties: page_name and cta_location
 */
function trackPageViewed() {
    amplitude.track('Page Viewed', {
        page_name: 'Demo Landing Page',
        cta_location: 'hero_section'
    });
}

// Track page view when DOM is ready
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
// EMAIL VALIDATION FUNCTION
// ============================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// SIGN============================================
    // TRACK SIGN UP CLICKED EVENT
    // ============================================
    // Event: User clicked the Sign Up buttonCLICK HANDLER
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
// ================================================
    // TRACK REQUEST DEMO CLICKED EVENT
    // ============================================
    // Event: User clicked the Request Demo button=============================

demoBtn.addEventListener('click', function() {
    // Track event
    amplitude.track('Request Demo Clicked', {
        page_name: 'Demo Landing Page',
        cta_location: 'hero_section'
    });

    // Show confirmation modal
    showConfirmation('Demo Request Received', 'Demo request received. Our team will contact you.');
});

// ============================================
// EMAIL FORM SUBMISSION HANDLER
// ============================================

emailForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    // ============================================
    // TRACK EMAIL SUBMITTED EVENT
    // ============================================
    // Event: User submitted their email for signup
    amplitude.track('Email Submitted', {
        page_name: 'Demo Landing Page',
        cta_location: 'hero_section'

    // Track event with email submission
    amplitude.track('Email Submitted', {
        page_name: 'Demo Landing Page',
        cta_location: 'hero_section',
        email: email
    });

    // Show confirmation modal
    showConfirmation('Thanks for signing up!', '');

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

// 
// ============================================

console.log('Analytics Tracking Initialized');
console.log('User ID:', userId);
console.log('Amplitude API Key:', AMPLITUDE_API_KEY === 'd1a9600a9ea214d1820e6c28c54e3d0f' ? 'NOT SET' : 'SET');
