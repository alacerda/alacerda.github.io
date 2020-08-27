const MY_SELECTOR = "asciinema-player";
let mobserver = new MutationObserver(function (mutations) {
	for (let i = 0; i < mutations.length; i++) {
		for (let j = 0; j < mutations[i].addedNodes.length; j++) {
			if (typeof mutations[i].addedNodes[j].matches === 'function') {
				if (mutations[i].addedNodes[j].matches(MY_SELECTOR)) {
					$.getScript("/assets/js/lib/asciinema-player.min.js", function (data, textStatus, jqxhr) {
					});
					mobserver.disconnect();
				}
			}
		}
	}
});
mobserver.observe(document.documentElement, {
	childList: true,
	subtree: true
});
