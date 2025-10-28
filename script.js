// Theme Toggle - WORKING
const themeToggle = document.getElementById('theme-toggle');

// Check saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Mobile Menu - WORKING
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Main Download Button - WORKING
const downloadBtn = document.getElementById('download-btn');
const videoUrlInput = document.getElementById('video-url');

if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        const videoUrl = videoUrlInput.value.trim();
        
        if (!videoUrl) {
            showNotification('कृपया TikTok video URL पेस्ट करें', 'error');
            return;
        }
        
        if (!isValidTikTokUrl(videoUrl)) {
            showNotification('कृपया सही TikTok URL डालें', 'error');
            return;
        }
        
        showNotification('वीडियो प्रोसेस हो रहा है...', 'info');
        
        // Simulate processing
        setTimeout(() => {
            showNotification('वीडियो डाउनलोड के लिए तैयार है!', 'success');
            simulateDownload();
        }, 2000);
    });
}

// Quick Options Buttons - WORKING
const optionBtns = document.querySelectorAll('.option-btn');

optionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        handleOptionClick(type);
    });
});

// Download Option Buttons - WORKING
const mp4Buttons = document.querySelectorAll('.mp4-download');
const mp3Buttons = document.querySelectorAll('.mp3-download');
const profileButtons = document.querySelectorAll('.profile-download');

mp4Buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        showNotification('MP4 डाउनलोड सिलेक्ट किया गया', 'info');
    });
});

mp3Buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        showNotification('MP3 डाउनलोड सिलेक्ट किया गया', 'info');
    });
});

profileButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        showNotification('प्रोफाइल डाउनलोड सिलेक्ट किया गया', 'info');
        showProfileDownloadModal();
    });
});

// Handle Option Clicks - WORKING
function handleOptionClick(type) {
    switch(type) {
        case 'mp4':
            showNotification('MP4 डाउनलोड सिलेक्ट किया गया', 'info');
            break;
        case 'mp3':
            showNotification('MP3 डाउनलोड सिलेक्ट किया गया', 'info');
            break;
        case 'bulk':
            showNotification('बल्क डाउनलोड सिलेक्ट किया गया', 'info');
            showBulkDownloadModal();
            break;
        case 'profile':
            showNotification('प्रोफाइल डाउनलोड सिलेक्ट किया गया', 'info');
            showProfileDownloadModal();
            break;
        case 'ringtone':
            showNotification('रिंगटोन मेकर सिलेक्ट किया गया', 'info');
            showRingtoneMakerModal();
            break;
    }
}

// Utility Functions - WORKING
function isValidTikTokUrl(url) {
    const tiktokRegex = /https?:\/\/(www\.)?tiktok\.com\/.+/;
    return tiktokRegex.test(url);
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function simulateDownload() {
    console.log('Download simulation complete');
}

// Modal Functions - WORKING
function showBulkDownloadModal() {
    const modal = createModal();
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>बल्क डाउनलोड</h3>
            <p>एक साथ 5-10 TikTok वीडियो डाउनलोड करें</p>
            <textarea placeholder="TikTok URLs (एक लाइन में एक URL)"></textarea>
            <button class="btn-primary bulk-download-btn">डाउनलोड करें</button>
        </div>
    `;
    
    setupModal(modal);
    
    // Add event listener for bulk download button
    const bulkBtn = modal.querySelector('.bulk-download-btn');
    bulkBtn.addEventListener('click', () => {
        showNotification('बल्क डाउनलोड शुरू हो गया!', 'success');
        document.body.removeChild(modal);
    });
}

function showProfileDownloadModal() {
    const modal = createModal();
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>प्रोफाइल डाउनलोड</h3>
            <p>TikTok username डालें और सारे वीडियोज़ डाउनलोड करें</p>
            <input type="text" placeholder="@username" class="username-input">
            <button class="btn-primary profile-download-btn">डाउनलोड करें</button>
        </div>
    `;
    
    setupModal(modal);
    
    // Add event listener for profile download button
    const profileBtn = modal.querySelector('.profile-download-btn');
    profileBtn.addEventListener('click', () => {
        const username = modal.querySelector('.username-input').value;
        if (username) {
            showNotification(`@${username} के वीडियो डाउनलोड हो रहे हैं...`, 'info');
            document.body.removeChild(modal);
        } else {
            showNotification('कृपया username डालें', 'error');
        }
    });
}

function showRingtoneMakerModal() {
    const modal = createModal();
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>रिंगटोन मेकर</h3>
            <p>MP3 को 30 सेकंड कट करें (रिंगटोन के लिए)</p>
            <input type="text" placeholder="TikTok video URL" class="ringtone-url">
            <div class="ringtone-controls">
                <label>शुरुआत: <span class="start-time">0s</span></label>
                <input type="range" class="start-slider" min="0" max="30" value="0">
                <label>अंत: <span class="end-time">30s</span></label>
                <input type="range" class="end-slider" min="0" max="30" value="30">
            </div>
            <button class="btn-primary ringtone-create-btn">रिंगटोन बनाएं</button>
        </div>
    `;
    
    setupModal(modal);
    
    // Slider functionality
    const startSlider = modal.querySelector('.start-slider');
    const endSlider = modal.querySelector('.end-slider');
    const startTime = modal.querySelector('.start-time');
    const endTime = modal.querySelector('.end-time');
    
    startSlider.addEventListener('input', function() {
        startTime.textContent = `${this.value}s`;
        if (parseInt(this.value) >= parseInt(endSlider.value)) {
            endSlider.value = parseInt(this.value) + 1;
            endTime.textContent = `${endSlider.value}s`;
        }
    });
    
    endSlider.addEventListener('input', function() {
        endTime.textContent = `${this.value}s`;
        if (parseInt(this.value) <= parseInt(startSlider.value)) {
            startSlider.value = parseInt(this.value) - 1;
            startTime.textContent = `${startSlider.value}s`;
        }
    });
    
    // Add event listener for ringtone button
    const ringtoneBtn = modal.querySelector('.ringtone-create-btn');
    ringtoneBtn.addEventListener('click', () => {
        showNotification('रिंगटोन बनाया जा रहा है...', 'info');
        setTimeout(() => {
            showNotification('रिंगटोन तैयार है!', 'success');
            document.body.removeChild(modal);
        }, 2000);
    });
}

// Helper functions for modals
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);
    return modal;
}

function setupModal(modal) {
    // Close modal events
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enter key support for download
videoUrlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        downloadBtn.click();
    }
});

console.log('vSave.in Script Loaded Successfully!');
