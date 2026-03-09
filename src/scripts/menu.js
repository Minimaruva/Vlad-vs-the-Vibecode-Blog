const menu = document.querySelector('.menu');

menu?.addEventListener('click', () => {
    const isExpanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', `${!isExpanded}`);
});

// Expose highestZIndex globally
window.highestZIndex = window.highestZIndex || 10;

const windows = document.querySelectorAll('.desktop-window');

windows.forEach(win => {
  const titleBar = win.querySelector('.title-bar');
  const closeBtn = win.querySelector('[aria-label="Close"]');
  const windowBody = win.querySelector('.window-body');

  function bringToFront() {
    window.highestZIndex++;
    win.style.zIndex = window.highestZIndex;
  }

  win.addEventListener('mousedown', bringToFront);

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      win.style.display = 'none';
    });
  }

  if (titleBar) {
    dragElement(win, titleBar, bringToFront, windowBody);
  }
});

function dragElement(win, handle, bringToFront, windowBody) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  handle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    bringToFront();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    
    if (windowBody) windowBody.style.pointerEvents = 'none';
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    win.style.top = (win.offsetTop - pos2) + "px";
    win.style.left = (win.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    
    if (windowBody) windowBody.style.pointerEvents = 'auto';
  }
}