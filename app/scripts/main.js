'use strict';

// Functions

function tourNav() {

	function navTo(link,target) {

		$(link).click(function (e) {
			var offsetVal =
				Math.abs(
					$(window).height() - (
						$(target).height() + $(target).css('padding-top').replace('px','')*2
					)
				)/-2;

			$.scrollTo(target, 600, { offset: offsetVal });
			e.preventDefault();
		});

	}

	navTo('#more', '#timeline');
}

function initStellar() {

	$.stellar.positionProperty.css3transform = {
		setPosition: function($el, x, startX, y, startY) {
			var trans = 'matrix(1, 0, 0, 1, ' +
			(x - startX) + ', ' +
			(y - startY) + ')';

			$el.css({
				'transform': trans
			});
		}
	};

	$.stellar({
		positionProperty: 'css3transform',
		hideDistantElements: false
	});

	$('.photo .img').each(function() {
		$(this).css({
			'background-image': 'url(' + $(this).data('background') + ')'
		});
	});

}

function loadSVG(id, filename) {
	$(id).load('../shapes/' + filename,function(response){
		$(this).addClass('svgLoaded');

		if(!response){
			console.log('errored');
		}
	});
}

function svgInView(elem, offset){
	$(elem).waypoint(function() {
		$(this).addClass('start');
	}, { offset: $(window).height()/2 + offset, triggerOnce: true });
}

// States

function loopfirstResize() {
	$('#intro').css({ height : $(window).height() });
}

function loopfirstReady() {
	tourNav();
	initStellar();
	loopfirstResize();


	/* Loading SVGs */
	// loadSVG('#high', 'scores/high.svg');
	// loadSVG('#low', 'scores/low.svg');
	// loadSVG('#med', 'scores/med.svg');

	loadSVG('#scoresvg', 'scores/score-attr.svg');

	loadSVG('#timelinesvg', 'timeline/timeline.svg');

	loadSVG('#listsvg', 'lists/lists.svg');

	loadSVG('#tldrsvg', 'tldr/tldr.svg');
	loadSVG('#longsvg', 'tldr/long.svg');

	loadSVG('#businesssvg', 'business/business.svg');


	/* Start SVG animations */
	svgInView('#score-anim', 0);
	svgInView('#timeline-anim', 0);
	svgInView('#lists-anim', 0);
	svgInView('#tldr-anim', 0);
	svgInView('#business-anim', 350);
}

function loopfirstLoad() {

}

// Init Everything

$(document).ready(loopfirstReady);
$(document).load(loopfirstLoad);
$(window).resize(loopfirstResize);

