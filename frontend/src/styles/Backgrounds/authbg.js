// src/styles/backgrounds/authBackgrounds.js
export const authBackgrounds = {
  // Registration page background
  registration: {
    // Replace with your actual background image URL
    backgroundImage: "url('/assets/images/auth-room-background.jpg')",
    
    // Fallback gradient that matches the warm tone in your UI
    background: 'linear-gradient(135deg, #f7f3e9 0%, #ede0d3 100%)',
    
    // Background properties
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  },
  
  // Login page background (you can add this later)
  login: {
    backgroundImage: "url('/assets/images/auth-room-background.jpg')",
    background: 'linear-gradient(135deg, #f7f3e9 0%, #ede0d3 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  }
}