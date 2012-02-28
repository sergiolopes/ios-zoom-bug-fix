// Fix viewport zoom bug on iOS. Script by Sergio Lopes, Public Domain.
//
// See README for details.

if (/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1) {
	(function(win, doc) {

		// change viewport to landscape size (device-height)
		var viewport = doc.querySelector('meta[name=viewport]');
		viewport.content = 'width=device-height';

		// cache DOM elements
		var container = doc.getElementById('container');
		var containerStyle = container.style;

		// adjusts body
		doc.body.style.position = 'relative';

		// creates height guard
		var heightGuard = document.createElement('div');
		var heightGuardStyle = heightGuard.style;
		heightGuardStyle.position = 'absolute';
		heightGuardStyle.top = '0';
		heightGuardStyle.left = '0';
		heightGuardStyle.width = '1px';
		heightGuardStyle.zIndex = '-1';
		heightGuardStyle.visibility = 'hidden';
		doc.body.appendChild(heightGuard);

		// must know if it's an iPad since it has a different screen proportion
		var isiPad = /iPad/.test(navigator.platform);

		// fix iOS bug
		function fix() {
			// are we in landscape mode? we should scale only in landscape!
			var portrait = win.orientation === 0 || win.orientation === 180;
			
			// increases container by device-height/device-width fraction
			containerStyle.webkitTransform = portrait? (isiPad? 'scale(1.33333)' : 'scale(1.5)') : 'none';
			containerStyle.webkitTransformOrigin = portrait? 'top left' : '50% 50%';

			// set width as device-width
			containerStyle.width = portrait? (isiPad? '768px' : '320px') : '100%';

			// adjusts height
			heightGuardStyle.height = portrait? (isiPad? '133.333%' : '150%') : '100%';
		}

		fix(); // fix on page load (if user loads in portrait mode)
		doc.addEventListener('orientationchange', fix); // fix everytime orientation changes

	})(window, document);
}