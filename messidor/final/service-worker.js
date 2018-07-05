importScripts('../../static/js/workbox-sw.prod.v2.1.3.js');/**
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
    "url": "../../index.html",
    "revision": "7fc367e844e0459682f0d72a2e7e055f"
  },
  {
    "url": "../../static/css/index.d28f3ba4.css"
  },
  {
    "url": "../../static/fonts/MaterialIcons-Regular.012cf6a1.woff"
  },
  {
    "url": "../../static/fonts/MaterialIcons-Regular.a37b0c01.ttf"
  },
  {
    "url": "../../static/js/index.7b1d31b3.js"
  },
  {
    "url": "../../static/js/manifest.eaccc200.js"
  },
  {
    "url": "../../static/js/vendor.e410d344.js"
  },
  {
    "url": "../../static/js/vue.353db202.js"
  },
  {
    "url": "../../static/js/workbox-sw.prod.v2.1.3.js",
    "revision": "a9890beda9e5f17e4c68f42324217941"
  }
]);
workboxSW.router.registerNavigationRoute('../../index.html');


/**
 * example runningCache with api
 */
// workboxSW.router.registerRoute(/^https:\/\/lavas\.baidu\.com\/some\/api/,
//     workboxSW.strategies.networkFirst());


/**
 * example runningCache with resources from CDN
 * including maxAge, maxEntries
 * cacheableResponse is important for CDN
 */
// workboxSW.router.registerRoute(/^https:\/\/cdn\.baidu\.com/i,
//     workboxSW.strategies.cacheFirst({
//         cacheName: 'lavas-cache-images',
//         cacheExpiration: {
//             maxEntries: 100,
//             maxAgeSeconds: 7 * 24 * 60 * 60
//         },
//         cacheableResponse: {
//             statuses: [0, 200]
//         }
//     })
// );
