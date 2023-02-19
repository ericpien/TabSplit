
const iframesWrapper = document.querySelector('.iframes-wrapper');
const iframes = document.querySelectorAll('.iframe');
const iframeResizes = document.querySelectorAll('.iframe-resize');

let isResizing = false;
let lastDownX = 0;

for (let i = 0; i < iframeResizes.length; i++) {
    iframeResizes[i].addEventListener('mousedown', function(event) {
        isResizing = true;
        lastDownX = event.clientX;
    });
    
    iframeResizes[i].addEventListener('touchstart', function(event) {
        isResizing = true;
        lastDownX = event.touches[0].clientX;
    });
}

document.addEventListener('mousemove', function(event) {
    if (!isResizing) {
        return;
    }
    
    const offsetRight = iframesWrapper.offsetWidth - (lastDownX - iframesWrapper.offsetLeft);
    
    for (let i = 0; i < iframes.length; i++) {
        iframes[i].style.flex = `1 1 ${iframes[i].offsetWidth}px`;
    }
    
    iframes[0].style.maxWidth = `${offsetRight}px`;
    
    iframes[1].style.maxWidth = `${iframesWrapper.offsetWidth - offsetRight}px`;
});

document.addEventListener('touchmove', function(event) {
    if (!isResizing) {
        return;
    }
    
    const offsetRight = iframesWrapper.offsetWidth - (lastDownX - iframesWrapper.offsetLeft);
    
    for (let i = 0; i < iframes.length; i++) {
        iframes[i].style.flex = `1 1 ${iframes[i].offsetWidth}px`;
    }
    
    iframes[0].style.maxWidth = `${offsetRight}px`;
    
    iframes[1].style.maxWidth = `${iframesWrapper.offsetWidth - offsetRight}px`;
});

document.addEventListener('mouseup', function(event) {
    isResizing = false;
});

document.addEventListener('touchend', function(event) {
    isResizing = false;
});
