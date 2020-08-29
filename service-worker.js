                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/index.html","revision":"e1adcfb830f2630ef9987531c3ae4ca7"},{"url":"/posts/maldoc-fud-1/","revision":"7efb9688f0fcc8866bc6bda03b4867f0"},{"url":"/posts/oneliners/","revision":"23d608d5ca116367fa1789139fea9f2d"}];
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

