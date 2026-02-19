// Scroll animatie met Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// observe alle fade-in elementen
document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
});

// nochmaal elementen observeren na korte pauze
setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
    });
}, 100);
