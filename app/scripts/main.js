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

function svgInView(){
	$('#score-anim').waypoint(function() {
		$(this).addClass('start');

	}, { offset: $(window).height()/2, triggerOnce: true });
}

// States

function loopfirstResize() {
	$('#intro').css({ height : $(window).height() });
}

function loopfirstReady() {
	tourNav();
	initStellar();
	loopfirstResize();

	loadSVG('#high', 'scores/high.svg');
	loadSVG('#low', 'scores/low.svg');
	loadSVG('#med', 'scores/med.svg');

	svgInView();
}

function loopfirstLoad() {

}

// Init Everything

$(document).ready(loopfirstReady);
$(document).load(loopfirstLoad);
$(window).resize(loopfirstResize);

