function preloadImage(img) {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = function() {
        img.removeAttribute('data-src')
    }
}
const config = {
    rootMargin: '50px 0px',
    threshold: 0.01
};
let observer = new IntersectionObserver(onIntersection, config);
const images = document.querySelectorAll('img[data-src]');
images.forEach(image => { observer.observe(image); })
function onIntersection(entries) {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
            observer.unobserve(entry.target);
            preloadImage(entry.target);
        }
    });
}