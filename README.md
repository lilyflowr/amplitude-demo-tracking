# Analytics Demo - Amplitude Tracking

A minimal landing page demonstrating user behavior tracking with Amplitude analytics. This project showcases how to integrate event tracking into a modern web application.

## 🚀 Project Overview

This is a clean, responsive landing page with integrated Amplitude analytics. It demonstrates:
- Event tracking for user interactions
- User identification and persistence
- Event properties and custom data
- Conversion funnel setup

## 📁 Project Structure

```
amplitude-demo/
├── index.html      # Landing page markup
├── styles.css      # Responsive styling
├── script.js       # Amplitude integration & event tracking
└── README.md       # This file
```

## ⚙️ Setup Instructions

### 1. Get Your Amplitude API Key

1. Sign up for a free Amplitude account at https://amplitude.com
2. Create a new project
3. Copy your API key from the project settings
4. Open `script.js` in a text editor
5. Replace `'YOUR_AMPLITUDE_API_KEY_HERE'` with your actual API key

```javascript
// In script.js, line 6
const AMPLITUDE_API_KEY = 'YOUR_AMPLITUDE_API_KEY_HERE';
```

### 2. Run the Project

You can run this project in any of these ways:

#### Option A: Python (Python 2.7+)
```bash
python -m SimpleHTTPServer 8000
# or Python 3:
python -m http.server 8000
```

#### Option B: Node.js with http-server
```bash
npm install -g http-server
http-server
```

#### Option C: Live Server (VS Code)
1. Install the "Live Server" extension in VS Code
2. Right-click `index.html` and select "Open with Live Server"

#### Option D: Direct file access
Simply open `index.html` in your browser (less reliable for some features)

3. Open your browser to `http://localhost:8000` (or the provided URL)

## 📊 Tracked Events

### Event 1: Page Viewed
**When:** User lands on the page  
**Properties:**
```javascript
{
  page_name: "Demo Landing Page",
  cta_location: "hero_section"
}
```

### Event 2: Sign Up Clicked
**When:** User clicks the "Sign Up" button  
**Properties:**
```javascript
{
  page_name: "Demo Landing Page",
  cta_location: "hero_section"
}
```
**Action:** Email signup form appears

### Event 3: Request Demo Clicked
**When:** User clicks the "Request Demo" button  
**Properties:**
```javascript
{
  page_name: "Demo Landing Page",
  cta_location: "hero_section"
}
```
**Action:** Confirmation modal appears

### Event 4: Email Submitted
**When:** User submits their email in the form  
**Properties:**
```javascript
{
  page_name: "Demo Landing Page",
  cta_location: "hero_section",
  email: "user@example.com"
}
```
**Action:** Confirmation modal appears, form is reset

## 🔍 How User Tracking Works

### User ID Generation & Persistence

Each visitor receives a unique user ID that is generated once and stored in browser localStorage:

```javascript
// Generated format: "user_abc123def45"
const userId = generateUserId();
localStorage.setItem('amplitude_user_id', userId);
```

This means:
- First visit: New user ID is generated and saved
- Subsequent visits: Same user ID is retrieved from storage
- You can identify the same user across multiple sessions

### Event Tracking Flow

1. **Initialization**: When the page loads, Amplitude is initialized with the user's ID
2. **Page View**: "Page Viewed" event is tracked automatically
3. **User Interactions**: Each button click or form submission triggers an event
4. **Event Properties**: Each event includes standardized properties (page_name, cta_location)
5. **Data Sent to Amplitude**: Events are batched and sent to Amplitude servers

## 📈 Funnel Analysis Setup

To set up a conversion funnel in Amplitude, use these events in this order:

**Signup Funnel:**
1. `Page Viewed` - Users who land on the page
2. `Sign Up Clicked` - Users who click Sign Up
3. `Email Submitted` - Users who complete the email form

**Demo Funnel:**
1. `Page Viewed` - Users who land on the page
2. `Request Demo Clicked` - Users who request a demo

**Combined Purchase/Conversion Funnel:**
1. `Page Viewed` - All visitors
2. `Sign Up Clicked` OR `Request Demo Clicked` - Users who take action
3. `Email Submitted` - Users who complete signup (note: demo clicks don't have a submission event)

## 🎯 Using This Demo for Loom Walkthrough

### Code Highlights to Explain:

**1. Amplitude Initialization (script.js, lines 21-27)**
- Show how the API key is configured
- Explain the user ID persistence mechanism

**2. Event Tracking (script.js, lines 51-62)**
- Show "Page Viewed" event
- Explain event properties and why they're standardized

**3. Button Click Handlers (script.js, lines 71-96)**
- Demonstrate Sign Up button tracking
- Show how modal appears after tracking
- Compare with Request Demo button

**4. Form Submission (script.js, lines 101-121)**
- Show email capture and validation
- Explain how email is included in event properties
- Show form reset after submission

## 🧪 Testing & Debugging

### Console Logging

When you open the browser console (F12), you'll see:
```
Analytics Tracking Initialized
User ID: user_abc123def45
Amplitude API Key: SET
```

### Verify Events in Amplitude Dashboard

1. Log in to your Amplitude account
2. Go to your project
3. Click "Events" or "Live view"
4. You should see:
   - "Page Viewed" when you load the page
   - "Sign Up Clicked" when you click Sign Up
   - "Request Demo Clicked" when you click Request Demo
   - "Email Submitted" when you submit the email form

### Check localStorage

In browser console, run:
```javascript
localStorage.getItem('amplitude_user_id')
// Returns: "user_abc123def45"
```

## 🎨 Customization

### Change the API Key
Edit line 6 in `script.js`:
```javascript
const AMPLITUDE_API_KEY = 'your-api-key-here';
```

### Add More Events
In `script.js`, add a new tracking call:
```javascript
amplitude.track('Event Name', {
  page_name: 'Demo Landing Page',
  cta_location: 'hero_section',
  custom_property: 'value'
});
```

### Modify Event Properties
All events currently include `page_name` and `cta_location`. To add more context:
```javascript
amplitude.track('Sign Up Clicked', {
  page_name: 'Demo Landing Page',
  cta_location: 'hero_section',
  button_color: 'blue',  // Add custom properties
  timestamp: new Date().toISOString()
});
```

## 📚 Resources

- [Amplitude Documentation](https://www.docs.amplitude.com/)
- [JavaScript SDK Reference](https://www.docs.amplitude.com/docs/sdks/javascript/)
- [Funnel Analysis Guide](https://help.amplitude.com/hc/en-us/articles/235649748-Funnel-Analysis)
- [Event Properties Best Practices](https://help.amplitude.com/hc/en-us/articles/115001361248-Event-properties-and-event-items)

## 🔐 Security Notes

- **DO NOT commit** your actual API key to version control
- **Use environment variables** in production
- Consider using a backend server to initialize Amplitude with secret keys
- The API key in `script.js` is publicly visible; this is acceptable for frontend analytics but should be different from any secret/backend keys

## 📝 License

This project is provided as-is for educational and demonstration purposes.
