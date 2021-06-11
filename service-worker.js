                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/index.html","revision":"10b5ea65aae43bcfd9bc9a0ed838eb97"},{"url":"/posts/tricks-powershell/","revision":"84712b67289ea0edd643a4cc69b74db5"},{"url":"/posts/o-formato-elf-copy/","revision":"c104dbcbb3de0291f9fdf4751975df99"},{"url":"/posts/word-objetos-com/","revision":"77d73970c7f07b62049c53416fc13b15"},{"url":"/posts/versao-powershell/","revision":"a909219e727f0a2eb83917fc3de42661"},{"url":"/posts/amsi-bypass/","revision":"47f83da8cc1f1f67ec3af9d6743d4256"}];
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

