     var _sf_startpt=(new Date()).getTime();
var _sf_async_config={uid:8544,domain:"bostonglobe.com"};
    _sf_async_config.path = location.pathname;
    _sf_async_config.sections = s.channel.toLowerCase()+','+s.prop1.toLowerCase();
_sf_async_config.authors = s.prop6.toLowerCase();
    (function(){
	function loadChartbeat() {
	    window._sf_endpt=(new Date()).getTime();
	    var e = document.createElement('script');
	    e.setAttribute('language', 'javascript');
	    e.setAttribute('type', 'text/javascript');
	    e.setAttribute('src',
			   (("https:" == document.location.protocol) ? "https://s3.amazonaws.com/" : "http://") + "static.chartbeat.com/js/chartbeat.js");
	    document.body.appendChild(e);
	}
	var oldonload = window.onload;
	window.onload = (typeof window.onload != 'function') ?
	    loadChartbeat : function() { oldonload(); loadChartbeat(); }; })();
