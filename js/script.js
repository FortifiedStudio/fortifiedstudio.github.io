Modernizr.addTest('unicode', function() {

	var bool,
		missingGlyph = document.createElement('span'),
		star = document.createElement('span');

	Modernizr.testStyles('#modernizr{font-family:Arial,sans;font-size:300em;}', function(node) {

		missingGlyph.innerHTML = '&#5987';
		star.innerHTML = '&#9734';

		node.appendChild(missingGlyph);
		node.appendChild(star);

		bool = 'offsetWidth' in missingGlyph && missingGlyph.offsetWidth !== star.offsetWidth;
	});

	return bool;
});


function swfObjectCallback(e) {
	if(!e.success) {
		jQuery('body').addClass('noFlash');
	}
}


function initSWFObject() {

	var flashvars = {};
	flashvars.config = "/assets/xml/site-config.xml";
	flashvars.locale = "en";

	var params = {};
	params.movie = "/assets/swf/Main.swf";
	params.play = "true";
	params.loop = "true";
	params.menu = "false";
	params.quality = "high";
	params.scale = "default";
	params.salign = "tl";
	params.wmode = "transparent";
	params.bgcolor = "#333333";
	params.base = "../";
	params.swliveconnect = "false";
	params.flashvars = "";
	params.devicefont = "_sans";
	params.allowscriptaccess = "always";
	params.seamlesstabbing = "true";
	params.allowfullscreen = "true";
	params.allownetworking = "all";

	var attributes = {};
	attributes.classid = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
	attributes.type = "application/x-shockwave-flash";
	attributes.data = "/assets/swf/Shell.swf";
	attributes.width = "400";
	attributes.height = "200";
	attributes.id = "logo";
	attributes.name = "logo";
	attributes.align = "tl";

	swfobject.embedSWF(
		"/assets/swf/Main.swf",
		"logo",
		"400",
		"200",
		"9.0.0",
		"expressInstall.swf",
		flashvars,
		params,
		attributes,
		swfObjectCallback
	);
}


function initLocalScroll() {
	jQuery(document).localScroll({easing:'easeOutExpo', duration:500});
}


jQuery(document).ready(function() {
	initSWFObject();
	initLocalScroll();
});
