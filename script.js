document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple interaction for citation chips in the mockup
    const chips = document.querySelectorAll('.cite-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            this.style.background = 'rgba(56, 189, 248, 0.5)';
            this.style.color = '#fff';
            setTimeout(() => {
                this.style.background = 'rgba(56, 189, 248, 0.2)';
                this.style.color = '#38bdf8';
            }, 1000);
        });
    });

    // Browser detection and button updating
    function detectBrowser() {
        const userAgent = navigator.userAgent.toLowerCase();
        
        // Check for specific browsers as requested
        if (userAgent.includes("comet")) return "Comet";
        if (userAgent.includes("atlas")) return "Atlas";
        
        // Standard browsers
        if (userAgent.includes("edg/")) return "Edge";
        if (userAgent.includes("opr/") || userAgent.includes("opera")) return "Opera";
        if (userAgent.includes("brave")) return "Brave";
        if (userAgent.includes("firefox") && !userAgent.includes("seamonkey")) return "Firefox";
        if (userAgent.includes("chrome") || userAgent.includes("crios")) return "Chrome";
        if (userAgent.includes("safari") && !userAgent.includes("chrome")) return "Safari";
        
        return "Browser";
    }

    const browserName = detectBrowser();
    
    document.querySelectorAll('.add-extension-btn').forEach(btn => {
        // Update the button text to match the detected browser
        btn.innerHTML = `Add to ${browserName} ${btn.classList.contains('large') ? "- It's Free" : ""}`;
        
        // Link directly to the zipped extension for download
        btn.href = "askthepage-extension.zip";
        btn.setAttribute("download", "askthepage-extension.zip");
        
        btn.addEventListener('click', (e) => {
            // We do NOT prevent default, so the download actually happens!
            
            // Set browser text in modal
            const browserSpan = document.getElementById('modal-browser-url');
            if(browserSpan) browserSpan.textContent = browserName.toLowerCase() + '://extensions';

            // Show the modal
            setTimeout(() => {
                const modal = document.getElementById('installModal');
                if (modal) modal.classList.add('active');
            }, 100);
        });
    });

    // Modal close logic
    const modal = document.getElementById('installModal');
    const closeBtn = document.getElementById('closeModal');
    const gotItBtn = document.getElementById('btnGotIt');

    function closeModal() {
        if (modal) modal.classList.remove('active');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (gotItBtn) gotItBtn.addEventListener('click', closeModal);
    
    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Mockup Tab Switching Logic
    const mockTabs = document.querySelectorAll('.mock-tab');
    const mockContents = document.querySelectorAll('.mock-tab-content');

    mockTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active classes
            mockTabs.forEach(t => {
                t.classList.remove('active');
                t.style.color = '#a1a1aa';
                t.style.background = 'transparent';
                t.style.boxShadow = 'none';
            });
            mockContents.forEach(c => c.style.display = 'none');

            // Set current active
            tab.classList.add('active');
            tab.style.color = '#fafafa';
            tab.style.background = '#18181b';
            tab.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';

            const targetId = tab.getAttribute('data-mocktab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'flex';
            }
        });
    });

    // Citation Chip Click Handler
    const citationSources = {
        '1': '"The theory papers will now carry 80 marks, with competency-based questions comprising up to 50% of the paper."',
        '2': '"Internal Assessment (IA) and Practical components shall collectively account for 20 marks in all applicable subjects."',
        '3': '"New modules have been introduced for Artificial Intelligence, Data Science, and Coding as part of the revised skill subjects."',
        '4': '"Practical examinations must be conducted under the supervision of an external examiner appointed by the Board."',
        '5': '"A candidate shall be declared to have passed if they obtain 33% marks in aggregate as well as separately in Theory and Practicals."',
        '6': '"The Board shall release the final date sheet for the upcoming Board Examinations on its official website by the end of December."'
    };

    document.addEventListener('click', (e) => {
        // Remove any existing popup
        const existing = document.querySelector('.citation-popup');
        if (existing) existing.remove();
        document.querySelectorAll('.cite-chip.active').forEach(c => c.classList.remove('active'));

        const chip = e.target.closest('.cite-chip');
        if (!chip || !chip.closest('.sidepanel-mockup')) return;

        const num = chip.textContent.replace(/[\[\]]/g, '').trim();
        const quote = citationSources[num];
        if (!quote) return;

        chip.classList.add('active');
        chip.style.position = 'relative';

        const popup = document.createElement('div');
        popup.className = 'citation-popup';
        popup.innerHTML = `
            <div class="citation-popup-label">Source Fragment [${num}]</div>
            <div class="citation-popup-quote">${quote}</div>
        `;
        chip.appendChild(popup);
    });
});
