// Import CSS only - legacy JS libs are loaded as traditional scripts in index.html
import './style.css';
import './data.js';

// --- Security Features ---
// 1. Disable Right Click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// 2. Disable Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Disable F12
    if (e.key === 'F12') {
        e.preventDefault();
    }
    // Disable Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+U (View Source)
    if (e.ctrlKey && (e.shiftKey && (e.key === 'I' || e.key === 'J') || e.key === 'U')) {
        e.preventDefault();
    }
});

// 3. Prevent Dragging images (additional layer)
document.addEventListener('dragstart', (e) => {
    if (e.target.nodeName === 'IMG') {
        e.preventDefault();
    }
});

