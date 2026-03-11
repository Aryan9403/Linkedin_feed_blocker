 - popup.html — created with the UI you provided
  - manifest.json — added "action": { "default_popup": "popup.html" } so the popup appears when clicking the extension icon      
  - content.js — now reads feedBlocked from chrome.storage.sync on load; only runs the blocker + MutationObserver if the toggle  
  is enabled (defaults to true)

  To load the extension: go to chrome://extensions, enable Developer mode, click "Load unpacked", and select the
  linkedin_feed_blocker folder.