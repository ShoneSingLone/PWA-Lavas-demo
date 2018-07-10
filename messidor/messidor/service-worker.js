importScripts('/messidor/static/js/workbox-sw.prod.v2.1.3.js');/**
 * @file service-worker.js with workbox api
 * @desc [example](https://workbox-samples.glitch.me/examples/workbox-sw/)
 * @author ShoneSingLone(ShoneSingLone@gmail.com)
 */

/* globals WorkboxSW */

const workboxSW = new WorkboxSW({
    cacheId: 'lavas-cache',
    ignoreUrlParametersMatching: [/^utm_/],
    skipWaiting: true,
    clientsClaim: true
});

// Define precache injection point.
workboxSW.precache([
  {
    "url": "/messidor/index.html",
    "revision": "fe4fbc55206c048f25ee3afd470c2138"
  },
  {
    "url": "/messidor/static/css/index.b2850153.css"
  },
  {
    "url": "/messidor/static/fonts/MaterialIcons-Regular.012cf6a1.woff"
  },
  {
    "url": "/messidor/static/fonts/MaterialIcons-Regular.a37b0c01.ttf"
  },
  {
    "url": "/messidor/static/img/icons/android-chrome-144x144.png",
    "revision": "5fe3aebf485bcbea49f010cae2ffcc73"
  },
  {
    "url": "/messidor/static/img/icons/android-chrome-192x192.png",
    "revision": "b8a42c4a3b00c4f75bc636f2923eaeca"
  },
  {
    "url": "/messidor/static/img/icons/android-chrome-512x512.png",
    "revision": "efbe0aa485b3aeaceb8ead9191f0c4c0"
  },
  {
    "url": "/messidor/static/img/icons/apple-touch-icon-120x120.png",
    "revision": "b451e38c6ee4b03781b1019c518e7894"
  },
  {
    "url": "/messidor/static/img/icons/apple-touch-icon-152x152.png",
    "revision": "83409fb3fe88cb94d7d3df5fe97569c9"
  },
  {
    "url": "/messidor/static/img/icons/apple-touch-icon-180x180.png",
    "revision": "0ff69c8fca81469c28f589d5fad0616e"
  },
  {
    "url": "/messidor/static/img/icons/apple-touch-icon-60x60.png",
    "revision": "4dc6fdc67611efce36a3c500cbe1c0ec"
  },
  {
    "url": "/messidor/static/img/icons/apple-touch-icon-76x76.png",
    "revision": "588079df8f1b8fde3b3cd691ee65bf06"
  },
  {
    "url": "/messidor/static/img/icons/favicon-16x16.png",
    "revision": "3742528143340e36915adf388d64060f"
  },
  {
    "url": "/messidor/static/img/icons/favicon-32x32.png",
    "revision": "047f3021e153c19951f86dd209904243"
  },
  {
    "url": "/messidor/static/js/0.77ba67d1.js"
  },
  {
    "url": "/messidor/static/js/1.fbf4c2aa.js"
  },
  {
    "url": "/messidor/static/js/2.87544355.js"
  },
  {
    "url": "/messidor/static/js/3.0933f9de.js"
  },
  {
    "url": "/messidor/static/js/index.8d42fa1b.js"
  },
  {
    "url": "/messidor/static/js/manifest.59b7f75c.js"
  },
  {
    "url": "/messidor/static/js/vendor.17ba7afe.js"
  },
  {
    "url": "/messidor/static/js/vue.448d43b6.js"
  },
  {
    "url": "/messidor/static/js/workbox-sw.prod.v2.1.3.js",
    "revision": "a9890beda9e5f17e4c68f42324217941"
  }
]);
workboxSW.router.registerNavigationRoute('/messidor/index.html');


// Define runtime cache.
workboxSW.router.registerRoute(new RegExp('https://query\.yahooapis\.com/v1/public/yql'),
    workboxSW.strategies.networkFirst());

/**
 * example runningCache with api
 */
workboxSW.router.registerRoute(/^https:\/\/lavas\.baidu\.com\/some\/api/,
    workboxSW.strategies.networkFirst());


/**
 * example runningCache with resources from CDN
 * including maxAge, maxEntries
 * cacheableResponse is important for CDN
 */
workboxSW.router.registerRoute(/^https:\/\/cdn\.baidu\.com/i,
    workboxSW.strategies.cacheFirst({
        cacheName: 'lavas-cache-images',
        cacheExpiration: {
            maxEntries: 100,
            maxAgeSeconds: 7 * 24 * 60 * 60
        },
        cacheableResponse: {
            statuses: [0, 200]
        }
    })
);
