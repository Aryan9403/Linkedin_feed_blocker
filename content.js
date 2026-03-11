const MSG_ID = 'feed-blocker-msg';

function isHomeFeed() {
  return /^\/(feed\/?)?$/.test(location.pathname);
}

function blockFeed() {
  if (!isHomeFeed()) {
    const msg = document.getElementById(MSG_ID);
    if (msg) msg.remove();
    return;
  }

  const main = document.querySelector('main');
  if (!main) return;

  // Hide all of main's children using inline !important (beats any stylesheet)
  Array.from(main.children).forEach(child => {
    if (child.id !== MSG_ID) {
      child.style.setProperty('display', 'none', 'important');
    }
  });

  if (!document.getElementById(MSG_ID)) {
    const msg = document.createElement('div');
    msg.id = MSG_ID;
    msg.style.cssText = `
      text-align: center;
      padding: 60px 40px;
      font-size: 18px;
      color: #666;
      background: #f3f2ef;
      border-radius: 8px;
      margin: 40px auto;
      max-width: 600px;
    `;
    msg.textContent = '🚫 Feed blocked. Stay focused!';
    main.prepend(msg);
  }
}

function startBlocking() {
  blockFeed();

  const observer = new MutationObserver(blockFeed);
  observer.observe(document.body, { childList: true, subtree: true });

  const patchHistory = (method) => {
    const original = history[method].bind(history);
    history[method] = function (...args) {
      original(...args);
      blockFeed();
    };
  };
  patchHistory('pushState');
  patchHistory('replaceState');

  window.addEventListener('popstate', blockFeed);
}

chrome.storage.sync.get({ feedBlocked: true }, ({ feedBlocked }) => {
  if (!feedBlocked) return;
  startBlocking();
});
