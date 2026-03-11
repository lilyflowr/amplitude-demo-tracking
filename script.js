// ============================================
// AMPLITUDE INITIALIZATION (BEFORE DOM LOAD)
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
// DOM CONTENT LOADED
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // CREATE SIGNUP MODAL DYNAMICALLY
    // ============================================

    /**
     * Create the signup modal if it doesn't exist
     */
    function createSignupModal() {
        // Check if modal already exists
        if (document.getElementById('signupModal')) {
            return;
        }

        const modalHTML = `
            <div id="signupModal" class="modal hidden">
                <div class="modal-content">
                    <h2>Sign Up</h2>
                    <input type="email" id="emailInput" placeholder="Enter your email" required />
                    <button id="submitEmail" class="btn btn-primary">Submit</button>
                    <button id="closeModal" class="btn btn-secondary">Close</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Create the modal
    createSignupModal();

    // ============================================
    // DOM ELEMENTS
    // ============================================

    const signupBtn = document.getElementById('signupBtn');
    const demoBtn = document.getElementById('demoBtn');
    const signupModal = document.getElementById('signupModal');
    const emailInput = document.getElementById('emailInput');
    const submitEmailBtn = document.getElementById('submitEmail');
    const closeModalBtn = document.getElementById('closeModal');

    // ============================================
    // EMAIL VALIDATION FUNCTION
    // ============================================

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ============================================
    // MODAL FUNCTIONS
    // ============================================

    function openSignupModal() {
        signupModal.classList.remove('hidden');
        emailInput.focus();
    }

    function closeSignupModal() {
        signupModal.classList.add('hidden');
        emailInput.value = '';
    }

    // ============================================
    // SIGN UP BUTTON CLICK HANDLER
    // ============================================
    /**
     * Event: User clicked the Sign Up button
     */
    signupBtn.addEventListener('click', function() {
        amplitude.track('Sign Up Clicked', {
            page_name: 'Demo Landing Page',
            cta_location: 'hero_section'
        });

        openSignupModal();
    });

    // ============================================
    // REQUEST DEMO BUTTON CLICK HANDLER
    // ============================================
    /**
     * Event: User clicked the Request Demo button
     */
    demoBtn.addEventListener('click', function() {
        amplitude.track('Request Demo Clicked', {
            page_name: 'Demo Landing Page',
            cta_location: 'hero_section'
        });

        showDemoConfirmation();
    });

    // ============================================
    // SIGNUP MODAL CLOSE HANDLERS
    // ============================================

    // Close modal when close button is clicked
    closeModalBtn.addEventListener('click', closeSignupModal);

    // Close modal when clicking outside the modal content
    signupModal.addEventListener('click', function(e) {
        if (e.target === signupModal) {
            closeSignupModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !signupModal.classList.contains('hidden')) {
            closeSignupModal();
        }
    });

    // ============================================
    // EMAIL FORM SUBMISSION HANDLER
    // ============================================
    /**
     * Event: User submitted their email for signup
     */
    submitEmailBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();

        // Validate email format
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Track event with email submission
        amplitude.track('Email Submitted', {
            page_name: 'Demo Landing Page',
            cta_location: 'hero_section'
        });

        // Show success message
        showSuccessConfirmation();

        // Close modal
        closeSignupModal();
    });

    // ============================================
    // CONFIRMATION MESSAGE HANDLER
    // ============================================

    function showDemoConfirmation() {
        const message = document.createElement('div');
        message.className = 'demo-confirmation';
        message.textContent = 'Demo request received. Our team will contact you.';
        message.style.cssText = `
            margin-top: 20px;
            padding: 15px;
            background-color: #4CAF50;
            color: white;
            border-radius: 4px;
            text-align: center;
            animation: slideInUp 0.3s ease-out;
        `;

        const demoSection = demoBtn.closest('section') || demoBtn.parentElement;
        demoSection.insertAdjacentElement('afterend', message);

        // Remove message after 5 seconds
        setTimeout(function() {
            message.remove();
        }, 5000);
    }

    function showSuccessConfirmation() {
        alert('Thanks for signing up!');
    }

    // ============================================
    // TRACK PAGE VIEWED EVENT
    // ============================================
    /**
     * Track when a visitor loads the landing page
     * Includes event properties: page_name and cta_location
     */
    amplitude.track('Page Viewed', {
        page_name: 'Demo Landing Page',
        cta_location: 'hero_section'
    });

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

}); // END DOMContentLoaded
