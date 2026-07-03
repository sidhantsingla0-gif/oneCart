// Detects common in-app/embedded browsers (WebViews) where Google OAuth
// is blocked with "Error 403: disallowed_useragent". Google requires
// sign-in to happen in a standard, full browser.
export function isInAppBrowser() {
  const ua = navigator.userAgent || navigator.vendor || window.opera || "";

  const patterns = [
    /FBAN|FBAV/i,        // Facebook
    /Instagram/i,        // Instagram
    /Line\//i,           // LINE
    /MicroMessenger/i,   // WeChat
    /Twitter/i,           // X/Twitter
    /LinkedInApp/i,       // LinkedIn
    /Snapchat/i,          // Snapchat
    /TikTok|musical_ly/i, // TikTok
    /; wv\)/i,            // generic Android WebView marker
  ];

  return patterns.some((re) => re.test(ua));
}

