                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/index.html","revision":"96c9185f2325dfc1382eda6d07756371"},{"url":"/posts/email-spoof-vs-spf/","revision":"9299e8728d7ac1c4f185ab1bffe7d8b9"},{"url":"/posts/internal-pentest-tricks/","revision":"79b05d70c6a09cc739971c5f9da19c6b"},{"url":"/posts/o-formato-elf/","revision":"c104dbcbb3de0291f9fdf4751975df99"},{"url":"/posts/word-objetos-com/","revision":"77d73970c7f07b62049c53416fc13b15"},{"url":"/posts/versao-powershell/","revision":"a909219e727f0a2eb83917fc3de42661"}];
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

