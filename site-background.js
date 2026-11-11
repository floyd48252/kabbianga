(() => {
    const images = [
        'https://ks.sc.ke/wp-content/uploads/2025/07/KABIANGA-2-1.jpg',
        'https://ks.sc.ke/wp-content/uploads/2025/07/KABIANGA-4-1.jpg',
        'https://ks.sc.ke/wp-content/uploads/2024/02/DSC_1458-scaled.jpg',
        'https://ks.sc.ke/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-21-at-22.21.24-1.jpeg',
        'https://ks.sc.ke/wp-content/uploads/2024/02/DSC_1513-scaled.jpg',
        'https://ks.sc.ke/wp-content/uploads/2024/02/DSC_1520-2-e1708950469400.jpg',
        'https://ks.sc.ke/wp-content/uploads/2026/09/Dr.-Chelule-KS-1.png'
    ];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const backdrop = document.createElement('div');
    const layers = [document.createElement('div'), document.createElement('div')];
    let activeLayer = 0;
    let currentImage = 0;
    let timer;

    backdrop.className = 'school-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    layers.forEach((layer, index) => {
        layer.className = 'school-backdrop-image';
        layer.style.opacity = index === 0 ? '1' : '0';
        backdrop.appendChild(layer);
    });
    document.body.prepend(backdrop);

    function showNextImage() {
        if (document.hidden || reducedMotion.matches) return;

        const nextImage = (currentImage + 1) % images.length;
        const nextLayer = 1 - activeLayer;
        const image = new Image();

        image.onload = () => {
            layers[nextLayer].style.backgroundImage = `url("${images[nextImage]}")`;
            layers[nextLayer].style.opacity = '1';
            layers[activeLayer].style.opacity = '0';
            activeLayer = nextLayer;
            currentImage = nextImage;
        };
        image.onerror = () => {
            currentImage = nextImage;
        };
        image.src = images[nextImage];
    }

    layers[0].style.backgroundImage = `url("${images[0]}")`;
    if (!reducedMotion.matches) {
        timer = window.setInterval(showNextImage, 7000);
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            window.clearInterval(timer);
        } else {
            showNextImage();
            timer = window.setInterval(showNextImage, 7000);
        }
    });

    reducedMotion.addEventListener('change', () => {
        if (reducedMotion.matches) {
            window.clearInterval(timer);
        } else if (!document.hidden) {
            showNextImage();
            timer = window.setInterval(showNextImage, 7000);
        }
    });
})();
