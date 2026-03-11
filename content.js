function blockFeed() {
  const selectors = [
    '.scaffold-finite-scroll__content',  // main feed container
    '[data-finite-scroll-hotspot]',
    '.feed-shared-update-v2',            // individual posts
    '.occludable-update',
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.style.display = 'none';
    });
  });

  // Replace with a message
  const feed = document.querySelector('main .scaffold-layout__main');
  if (feed && !document.getElementById('feed-blocker-msg')) {
    const msg = document.createElement('div');
    msg.id = 'feed-blocker-msg';
    msg.style = `
      text-align: center;
      padding: 40px;
      font-size: 18px;
      color: #666;
      background: #f3f2ef;
      border-radius: 8px;
      margin: 20px;
    `;
    msg.innerText = '🚫 Feed blocked. Stay focused!';
    feed.prepend(msg);
  }
}

chrome.storage.sync.get({ feedBlocked: true }, ({ feedBlocked }) => {
  if (!feedBlocked) return;

  blockFeed();
  const observer = new MutationObserver(blockFeed);
  observer.observe(document.body, { childList: true, subtree: true });
});
