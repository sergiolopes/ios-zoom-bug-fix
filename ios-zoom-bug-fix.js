// Fix viewport zoom bug on iOS. Script by Sergio Lopes, Public Domain.
//
// See README for details.

if (/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1) {
	(function(win, doc) {

		// change viewport to landscape size (device-height)
		var viewport = doc.querySelector('meta[name=viewport]');
		viewport.content = 'width=device-height';

		// creates height guard
		var heightGuard = doc.createElement('div');
		heightGuard.id = 'heightGuard';
		doc.body.appendChild(heightGuard);

		// must know if it's an iPad since it has a different screen proportion
		var isiPad = /iPad/.test(navigator.platform);

		// new style element
		var css = doc.createElement('style');
		doc.body.appendChild(css);
		css.innerText = 
			"@media screen and (orientation:portrait){" +
				"body{"+
					"position:relative;"+
				"}"+
				"#heightGuard{" +
					"position:absolute;" +
					"top:0;" +
					"left:0;" +
					"width:1px;" +
					"zIndex:-1;" +
					"visibility:hidden;" +
					"height:" + (isiPad? '133.333%' : '150%') + ";" +
				"}" +
				"#" + (doc.body.getAttribute('data-container') || 'container') + "{" +
					"-webkit-transform:" + (isiPad? 'scale(1.33333)' : 'scale(1.5)') + ";" +
					"-webkit-transform-origin:top left;" +
					"width:" + (isiPad? '768px' : '320px') + ";" +
				"}" +
			"}";

	})(window, document);
}