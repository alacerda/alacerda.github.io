                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/index.html","revision":"5d77fcbadbbf8de65d494df6298e76d9"},{"url":"/posts/crto-certified-redteam-operator/","revision":"1dcd0f1b6368755adc61ff4d3855ed92"},{"url":"/posts/email-spoof-vs-spf/","revision":"7a0defb53010de4db4faf06b531c6c3c"},{"url":"/posts/internal-pentest-tricks/","revision":"ffbc2d2e3f38a30de2448c772a02f302"},{"url":"/posts/o-formato-elf/","revision":"24d672c564b99e808b34543815c756b7"},{"url":"/posts/word-objetos-com/","revision":"4d9d0f317ad30e35f2405c8e67c33dad"}];
            // service-worker.js

// set names for both precache & runtime cache
workbox.core.setCacheNameDetails({
	prefix: 'alacerda',
	suffix: 'v1',
	precache: 'precache',
	runtime: 'runtime-cache'
});

// let Service Worker take control of pages ASAP
workbox.skipWaiting();
workbox.clientsClaim();

// let Workbox handle our precache list
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// use `networkFirst` strategy for `*.html`, like all my posts
workbox.routing.registerRoute(
	/\.html$/,
	workbox.strategies.networkFirst()
);

// use `cacheFirst` strategy for images
workbox.routing.registerRoute(
	/assets\/(img|icons)/,
	workbox.strategies.cacheFirst()
);

// third party files
workbox.routing.registerRoute(
	/^https?:\/\/cdn.staticfile.org/,
	workbox.strategies.staleWhileRevalidate()
);

