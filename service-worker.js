                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/404.html","revision":"958bdc17cb6f3fd30c2da0a7d3eebb58"},{"url":"/about-me/index.html","revision":"95a10ddce9180b57ad605e58c6410969"},{"url":"/assets/css/categories.css","revision":"1caab19236e7fcf21ba93fc5f7864e38"},{"url":"/assets/css/category-tag.css","revision":"50098fa3c4c194cfbcc43c752ec19f80"},{"url":"/assets/css/home.css","revision":"26e5ba6614423a84331ad3f083eb5215"},{"url":"/assets/css/lib/asciinema-player.css","revision":"e6681ece4699e626176f79fb63525575"},{"url":"/assets/css/lib/asciinema-player.min.css","revision":"ddc13200fbd7fb87b44a2d4955a875fa"},{"url":"/assets/css/lib/bootstrap-toc.min.css","revision":"6f5af0bb9aab25d79b2448143cbeaa88"},{"url":"/assets/css/page.css","revision":"6d87177c7881f9ff937d674fa2381659"},{"url":"/assets/css/post.css","revision":"a989d13cfaad87b6ceb322dcaee08ac9"},{"url":"/assets/css/tags.css","revision":"c42e7b0cb9a94329b7b15cb08b618053"},{"url":"/assets/css/timeline.css","revision":"b4cc27da611aa10b111cbfbb75b7bb62"},{"url":"/assets/index.html","revision":"2c4495bc52875a11624051078511b54d"},{"url":"/assets/js/categories.min.js","revision":"82d550e3971e4909563f2c31960ddf51"},{"url":"/assets/js/data/cache-list.js","revision":"4205c6d0c9fc053d837510eb3a206967"},{"url":"/assets/js/data/pv-data.js","revision":"216bb7b9f78cde0d639347058835381e"},{"url":"/assets/js/home.min.js","revision":"d8da68c1910ea5ca32a3490869e9d57f"},{"url":"/assets/js/lib/asciinema-player.js","revision":"d0c1836c58199a23cd95cd7171d3a455"},{"url":"/assets/js/lib/asciinema-player.min.js","revision":"18e1994e6420179f81d6738e92105bd3"},{"url":"/assets/js/lib/jquery.disqusloader.min.js","revision":"ae6102e1e3f50a487a6882568d3ce61b"},{"url":"/assets/js/lib/mutation-observer.js","revision":"2fac5f1247ce5038a95951fd4d39060d"},{"url":"/assets/js/lib/mutation-observer.min.js","revision":"9a97653b4ee269b94cfe358842635cb9"},{"url":"/assets/js/page.min.js","revision":"1a20fdf6f453308d8f641508a8af87b4"},{"url":"/assets/js/post.min.js","revision":"998108d7ae48ef39a5dcddd5c4b0a001"},{"url":"/categories/index.html","revision":"2c4495bc52875a11624051078511b54d"},{"url":"/index.html","revision":"92f8fd4fc17cf43d0c212fa44baf8b17"},{"url":"/norobots/index.html","revision":"2c4495bc52875a11624051078511b54d"},{"url":"/page2/index.html","revision":"e818916f2874edc99f032fff6d2e896d"},{"url":"/posts/amsi-bypass/index.html","revision":"fc956230ffeabde1d6227ea2df340ca6"},{"url":"/posts/clonando-cartao-de-acesso-com-proxmark3/index.html","revision":"4bd41884cfaeb0ad33059a3720eeccd0"},{"url":"/posts/crto-certified-redteam-operator/index.html","revision":"383bf5d23eb6d7b12ce0c7c0e0c50ad0"},{"url":"/posts/email-spoof-vs-spf/index.html","revision":"931487a9b3c50858a1a80ff93fde696e"},{"url":"/posts/index.html","revision":"2c4495bc52875a11624051078511b54d"},{"url":"/posts/internal-pentest-tricks/index.html","revision":"d13e3d05fdca97e6be6a1759f3960066"},{"url":"/posts/links-e-referencias/index.html","revision":"851fe53ae545588fa17c5e256fda0c52"},{"url":"/posts/maldoc-fud-1/index.html","revision":"0f1e821c0e8aeb1154af1cf37290a33b"},{"url":"/posts/o-formato-elf/index.html","revision":"36ad121c471de599633e807ce6f44f0e"},{"url":"/posts/oneliners/index.html","revision":"abf887d29b4160c11374b6868613bdf2"},{"url":"/posts/versao-powershell/index.html","revision":"be88f0cd3d53bb346d3abe094eb24611"},{"url":"/posts/word-objetos-com/index.html","revision":"b309b14623a0af8cb202e66f7c81ec8d"},{"url":"/service-worker.js","revision":"6d6f880e9328426805e8559ee1461905"},{"url":"/sw-register.js","revision":"d8b0c2782873d6ac0d8e26d35eb0034d"},{"url":"/tabs/about-me/index.html","revision":"d6fd29cf6264ab8dc243b2032ef906e8"},{"url":"/tabs/categories/index.html","revision":"3a685dfef7bbc9f965be9e90082ebf96"},{"url":"/tabs/index.html","revision":"2c4495bc52875a11624051078511b54d"},{"url":"/tabs/tags/index.html","revision":"53abb63a3fc0a852863a1836726d1867"},{"url":"/tabs/timeline/index.html","revision":"ceb4058e3e935952ab5a545f674b41a7"},{"url":"/tags/index.html","revision":"2c4495bc52875a11624051078511b54d"}];
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

