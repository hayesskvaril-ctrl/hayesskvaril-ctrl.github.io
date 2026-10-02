/* RiskLens Australia: privacy-friendly visit counting (GoatCounter, https://www.goatcounter.com).
   Sends only the page address, the referring site and the screen width: no cookies, no IP storage
   by us, nothing personal. Skips counting if the browser asks not to be tracked, and on local copies. */
(function () {
  var s = document.currentScript, endpoint = s && s.getAttribute('data-goatcounter');
  if (!endpoint || navigator.doNotTrack === '1' || !/github\.io$|\.au$|\.com$/.test(location.hostname)) return;
  var q = '?p=' + encodeURIComponent(location.pathname) +
    '&r=' + encodeURIComponent(document.referrer || '') +
    '&s=' + encodeURIComponent(screen.width) + '&rnd=' + Math.random().toString(36).slice(2);
  var img = new Image(1, 1); img.alt = ''; img.src = endpoint + q;
})();
