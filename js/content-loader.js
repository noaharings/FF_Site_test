// alle JSON content laden
(async function() {
    try {
        const response = await fetch('content.json');
        const content = await response.json();
        
        // Load Navigation
        const navLinks = document.getElementById('nav-links');
        if (navLinks && content.navigation) {
            navLinks.innerHTML = content.navigation.links.map(link => 
                `<li><a href="#${link.id}">${link.label}</a></li>`
            ).join('');
        }
        
        // hero sectie laden
        if (content.hero) {
            const heroTitle = document.getElementById('hero-title');
            const typedStatic = document.getElementById('typed-static');
            const heroDescription = document.getElementById('hero-description');
            const btnPrimary = document.querySelector('#btn-primary span');
            const btnSecondary = document.getElementById('btn-secondary');
            
            if (heroTitle) heroTitle.textContent = content.hero.title;
            if (typedStatic) typedStatic.textContent = content.hero.taglineStatic;
            if (heroDescription) heroDescription.textContent = content.hero.description;
            if (btnPrimary) btnPrimary.textContent = content.hero.buttons.primary;
            if (btnSecondary) btnSecondary.textContent = content.hero.buttons.secondary;
            
            // getypte text saven
            window.typedTexts = content.hero.taglineTyped;
        }
        
        // resultaten laden
        if (content.resultaten) {
            document.getElementById('resultaten-label').textContent = content.resultaten.sectionLabel;
            document.getElementById('resultaten-title').textContent = content.resultaten.title;
            document.getElementById('resultaten-description').textContent = content.resultaten.description;
            
            // achievements laden
            const achievementsGrid = document.getElementById('achievements-grid');
            if (achievementsGrid) {
                achievementsGrid.innerHTML = content.resultaten.achievements.map(achievement => `
                    <div class="achievement-card fade-in">
                        <div class="achievement-icon">
                            <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" fill="none" stroke-width="2">
                                ${getIconPath(achievement.title)}
                            </svg>
                        </div>
                        <h3>${achievement.title}</h3>
                        <p>${achievement.description}</p>
                    </div>
                `).join('');
            }
            
            // stats laden
            document.getElementById('stats-title').textContent = content.resultaten.stats.title;
            const statsGrid = document.getElementById('stats-grid');
            if (statsGrid) {
                statsGrid.innerHTML = content.resultaten.stats.items.map(stat => `
                    <div>
                        <div style="font-size: 3rem; font-weight: 800; color: var(--accent); margin-bottom: 0.5rem;">${stat.value}</div>
                        <div style="color: rgba(255, 255, 255, 0.9); font-weight: 500;">${stat.label}</div>
                    </div>
                `).join('');
            }
        }
        
        // standpunten laden
        if (content.standpunten) {
            document.getElementById('standpunten-label').textContent = content.standpunten.sectionLabel;
            document.getElementById('standpunten-title').textContent = content.standpunten.title;
            document.getElementById('standpunten-description').innerHTML = content.standpunten.description.replace(/\n\n/g, '<br><br>');
            
            const standpuntenGrid = document.getElementById('standpunten-grid');
            if (standpuntenGrid) {
                standpuntenGrid.innerHTML = content.standpunten.items.map(item => `
                    <div class="standpunt-card fade-in" data-modal="${item.id}">
                        <div class="standpunt-header">
                            <div class="standpunt-icon-box">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    ${getStandpuntIcon(item.id)}
                                </svg>
                            </div>
                            <div>
                                <h3>${item.title}</h3>
                            </div>
                        </div>
                        <p>${item.preview}</p>
                        <a href="#" class="read-more">
                            ${content.standpunten.readMore}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a>
                    </div>
                `).join('');
            }
            
            // modals maken
            createModals(content.standpunten.items);
            
            // Attach event listeners to standpunt cards
            attachModalListeners();
        }
        
        // Load Piet sectie
        if (content.piet) {
            document.getElementById('piet-label').textContent = content.piet.sectionLabel;
            document.getElementById('piet-title').textContent = content.piet.title;
            document.getElementById('piet-description').textContent = content.piet.description;
            
            // Intro
            document.getElementById('piet-intro-title').textContent = content.piet.intro.title;
            const introParagraphs = document.getElementById('piet-intro-paragraphs');
            if (introParagraphs) {
                introParagraphs.innerHTML = content.piet.intro.paragraphs.map(p => `<p>${p}</p>`).join('');
            }
            document.getElementById('piet-contact-label').textContent = content.piet.intro.contactLabel;
            document.getElementById('piet-phone').textContent = content.piet.intro.phone;
            
            //Stories
            const storiesContainer = document.getElementById('piet-stories');
            if (storiesContainer) {
                storiesContainer.innerHTML = content.piet.stories.map((story, index) => `
                    <div class="story-card fade-in">
                        <div class="story-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                ${getStoryIcon(index)}
                            </svg>
                        </div>
                        <h4>${story.title}</h4>
                        <p>${story.text}</p>
                    </div>
                `).join('');
            }
            
            //vsie
            document.getElementById('piet-vision-title').textContent = content.piet.vision.title;
            const visionParagraphs = document.getElementById('piet-vision-paragraphs');
            if (visionParagraphs) {
                visionParagraphs.innerHTML = content.piet.vision.paragraphs.map(p => `<p>${p}</p>`).join('');
            }
            document.getElementById('piet-signature').textContent = content.piet.vision.signature;
        }
        
        //laad kandidaten sectie
        //laad kandidaten sectie
        if (content.kandidaten) {
            document.getElementById('kandidaten-label').textContent = content.kandidaten.sectionLabel;
            document.getElementById('kandidaten-title').textContent = content.kandidaten.title;
            document.getElementById('kandidaten-description').textContent = content.kandidaten.description;

            const voorkeurText = document.getElementById('kandidaten-voorkeur');
            if (voorkeurText && content.kandidaten.voorkeursstemmenIntro) {
                voorkeurText.innerHTML = content.kandidaten.voorkeursstemmenIntro;
            }

            const kandidatenGrid = document.getElementById('kandidaten-grid');
            if (kandidatenGrid) {
                kandidatenGrid.innerHTML = content.kandidaten.list.map(kandidaat => `
                    <div class="kandidaat-card fade-in">
                        <div class="kandidaat-photo">
                            <img src="${kandidaat.image}" alt="${kandidaat.name} Poster">
                        </div>
                        <div class="kandidaat-info">
                            <h3>${kandidaat.name}</h3>
                            <div class="kandidaat-functie">${kandidaat.role}</div>
                            <p>${kandidaat.description}</p>
                        </div>
                    </div>
                `).join('');
            }
        }
        
        //footer laden
        if (content.footer) {
            document.getElementById('footer-title').textContent = content.footer.about.title;
            document.getElementById('footer-description').textContent = content.footer.about.description;
            document.getElementById('footer-election-date').textContent = content.footer.about.electionDate;
            document.getElementById('footer-nav-title').textContent = content.footer.navigation.title;
            document.getElementById('footer-contact-title').textContent = content.footer.contact.title;
            document.getElementById('footer-email').textContent = content.footer.contact.email;
            document.getElementById('footer-website').textContent = content.footer.contact.website;
            document.getElementById('footer-bottom').innerHTML = `${content.footer.copyright}<br>${content.footer.designer}`;
            
            // Footer navigatie
            const footerLinks = document.getElementById('footer-links');
            if (footerLinks && content.navigation) {
                footerLinks.innerHTML = content.navigation.links.map(link => 
                    `<li><a href="#${link.id}">${link.label}</a></li>`
                ).join('');
            }
        }
        
        console.log('Content loaded successfully from JSON');
        
    } catch (error) {
        console.error('Error loading content:', error);
    }
})();

// helpers icon
function getIconPath(title) {
    const icons = {
        'Iedere kern een accommodatie': '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
        'Reconstructie van de Wittemer Allee': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
        'Meer subsidie voor verenigingen en evenementen': '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
        'Voortzetting van het jeugdontbijt': '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>'
    };
    return icons[title] || '';
}

function getStandpuntIcon(id) {
    const icons = {
        'woningen': '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
        'verenigingen': '<circle cx="9" cy="7" r="4"></circle><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path><path d="M16 11h6"></path><path d="M19 8v6"></path>',
        'limburgs': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 10h.01"></path><path d="M12 10h.01"></path><path d="M16 10h.01"></path>',
        'verkeer': '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path><circle cx="8" cy="16" r="2"></circle><circle cx="16" cy="16" r="2"></circle>',
        'steun': '<path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path>',
        'cultuur': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
        'groen': '<path d="M12 22c4.97 0 9-1.79 9-4s-4.03-4-9-4-9 1.79-9 4 4.03 4 9 4z"></path><path d="M12 14V2"></path><path d="M7 5c-.66 0-1.26.12-1.78.34C4.21 5.91 3.5 6.9 3.5 8c0 1.66 1.34 3 3 3h1"></path><path d="M17 5c.66 0 1.26.12 1.78.34.99.57 1.72 1.56 1.72 2.66 0 1.66-1.34 3-3 3h-1"></path>',
        'financien': '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>'
    };
    return icons[id] || '';
}

function getStoryIcon(index) {
    const icons = [
        '<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>',
        '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
        '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>'
    ];
    return icons[index] || '';
}

//modals dynamisch laten lopen
function createModals(standpuntenItems) {
    const modalsContainer = document.getElementById('modals-container');
    if (!modalsContainer) return;
    
    modalsContainer.innerHTML = standpuntenItems.map(item => `
        <div id="modal-${item.id}" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="modal-close">&times;</button>
                    <div class="modal-icon-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            ${getStandpuntIcon(item.id)}
                        </svg>
                    </div>
                    <h2 class="modal-title">${item.title}</h2>
                </div>
                <div class="modal-body">
                    ${item.modalContent}
                </div>
            </div>
        </div>
    `).join('');
}

//event listener modal
function attachModalListeners() {
    const standpuntCards = document.querySelectorAll('.standpunt-card');
    const modals = document.querySelectorAll('.modal');

    //modal openen wanneer erop geklikt wordt
    standpuntCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = 'modal-' + card.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    //sluit button
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-close')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    //erbuiten klikken om te sluiten
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // esc voor te escapen uit de modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
}