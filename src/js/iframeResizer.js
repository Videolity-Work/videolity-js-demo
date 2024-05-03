// you can read the video ratio from the viewRatio value in the video URL
// or you can write it here statically.
let aspectRatio = 1920 / 950;

// updates the aspectRatio value.
const setAspectRatio = (newAspectRatio) => {
    aspectRatio = newAspectRatio;
};

// resizes the iframe when the screen size changes.
const handleResize = () => {
    const iframe = document.querySelector('iframe');
    const width = iframe.offsetWidth;
    iframe.style.height = `${width / aspectRatio}px`;
};

const handleMessage = (event) => {
    // checks whether the incoming message is a request to update the video size.
    if (event.data && event.data.for === 'videolityIframeResize') {
        setAspectRatio(event.data.aspectRatio);
        handleResize();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('message', handleMessage, false);
    // event listener is added to update the iframe size when the screen size changes.
    window.addEventListener('resize', handleResize);

    // first resizing process is done.
    handleResize();

    window.addEventListener('beforeunload', () => {
        window.removeEventListener('message', handleMessage, false);
        window.removeEventListener('resize', handleResize);
    });
});
