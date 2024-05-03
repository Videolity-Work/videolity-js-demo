let aspectRatio = 1920 / 950;

const setAspectRatio = (newAspectRatio) => {
    aspectRatio = newAspectRatio;
};

const handleResize = () => {
    const iframe = document.querySelector('iframe');
    const width = iframe.offsetWidth;
    iframe.style.height = `${width / aspectRatio}px`;
};

const handleMessage = (event) => {
    if (event.data && event.data.for === 'videolityIframeResize') {
        setAspectRatio(event.data.aspectRatio);
        handleResize();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('message', handleMessage, false);
    window.addEventListener('resize', handleResize);

    handleResize();

    window.addEventListener('beforeunload', () => {
        window.removeEventListener('message', handleMessage, false);
        window.removeEventListener('resize', handleResize);
    });
});
