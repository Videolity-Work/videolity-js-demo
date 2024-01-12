// Başlangıçta belirlenmiş en-boy oranı (16:9)
let aspectRatio = 16 / 8;

const setAspectRatio = (newAspectRatio) => {
    aspectRatio = newAspectRatio;
};

const handleMessage = (event) => {
    if (event.data && event.data.for === 'videolityIframeResize') {
        setAspectRatio(event.data.aspectRatio);
    }
};

// iframe'ın yüksekliğini ayarlayan fonksiyon
const handleResize = () => {
    const iframe = document.querySelector('iframe');
    const width = iframe.offsetWidth;
    iframe.style.height = `${width / aspectRatio}px`;
};

// iframe'den gelen iletileri dinle ve pencere boyutu değiştiğinde iframe yüksekliğini güncelle
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('message', handleMessage, false);
    window.addEventListener('resize', handleResize);

    handleResize();

    window.addEventListener('beforeunload', () => {
        window.removeEventListener('message', handleMessage, false);
        window.removeEventListener('resize', handleResize);
    });
});
