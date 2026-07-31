/**
 * Single Page Application Router & State Manager
 * Developer: Bhavika Tewari
 */

// Route view templates
const routes = {
    '/': {
        title: 'Home | Bhavika Tewari',
        render: () => `
            <section class="view hero-card">
                <h1>Welcome, I'm <span class="highlight">Bhavika Tewari</span></h1>
                <p class="subtitle">First-Year BCA Student & Aspiring Web Developer</p>
                <p>This Single Page Application dynamically loads views using vanilla JavaScript and the HTML5 History API without triggering page refreshes.</p>
                <br>
                <a href="/skills" class="btn nav-link" data-route="/skills">Explore My Skills</a>
            </section>
        `
    },
    '/about': {
        title: 'About | Bhavika Tewari',
        render: () => `
            <section class="view info-card">
                <h1>About Me</h1>
                <p class="subtitle">Academic Background & Passion</p>
                <p>I am a first-year Bachelor of Computer Applications (BCA) student focused on modern web architectures, client-side routing, and responsive design systems. My goal is to build fast, accessible, and intuitive user experiences.</p>
            </section>
        `
    },
    '/skills': {
        title: 'Skills | Bhavika Tewari',
        render: () => `
            <section class="view info-card">
                <h1>Technical Skills</h1>
                <p class="subtitle">Core Competencies</p>
                <div class="grid">
                    <div class="card">
                        <h3>HTML5 & CSS3</h3>
                        <p>Semantic structuring, CSS Variables, Flexbox, and Grid layouts.</p>
                    </div>
                    <div class="card">
                        <h3>JavaScript (ES6+)</h3>
                        <p>DOM manipulation, Asynchronous routing, and Event-driven state.</p>
                    </div>
                    <div class="card">
                        <h3>SPA Architecture</h3>
                        <p>Client-side routing via History API and dynamic component rendering.</p>
                    </div>
                </div>
            </section>
        `
    },
    '/contact': {
        title: 'Contact | Bhavika Tewari',
        render: () => `
            <section class="view info-card">
                <h1>Get In Touch</h1>
                <p class="subtitle">Feel free to reach out for collaborations</p>
                <ul class="contact-list">
                    <li><strong>Email:</strong> <a href="mailto:bhavikatewari@gmail.com">bhavikatewari@gmail.com</a></li>
                    <li><strong>Phone:</strong> <a href="tel:+918979132080">+91 8979132080</a></li>
                    <li><strong>Degree:</strong> Bachelor of Computer Applications (1st Year)</li>
                </ul>
            </section>
        `
    }
};

const appContainer = document.getElementById('app');

/**
 * Render view based on route path
 * @param {string} pathname 
 */
function navigateTo(pathname) {
    const route = routes[pathname] || {
        title: '404 - Not Found',
        render: () => `
            <section class="view info-card">
                <h1>404</h1>
                <p class="subtitle">Page Not Found</p>
                <p>The requested path "<code>${pathname}</code>" does not exist.</p>
                <br>
                <a href="/" class="btn nav-link" data-route="/">Return Home</a>
            </section>
        `
    };

    // Update document title
    document.title = route.title;

    // Inject View
    appContainer.innerHTML = route.render();

    // Trigger smooth fade-in animation
    const currentView = appContainer.querySelector('.view');
    requestAnimationFrame(() => {
        if (currentView) currentView.classList.add('fade-in');
    });

    // Update active state on navbar
    updateNavActiveState(pathname);
}

/**
 * Update navigation highlight styling
 * @param {string} pathname 
 */
function updateNavActiveState(pathname) {
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-route') === pathname) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Handle route changes and history pushState
 * @param {Event} e 
 */
document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('[data-route]');
    if (targetLink) {
        e.preventDefault();
        const targetRoute = targetLink.getAttribute('data-route');
        
        if (window.location.pathname !== targetRoute) {
            window.history.pushState({}, '', targetRoute);
            navigateTo(targetRoute);
        }
    }
});

// Handle browser Back / Forward buttons
window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname);
});

// Initial application load
document.addEventListener('DOMContentLoaded', () => {
    navigateTo(window.location.pathname);
});
