'use strict';

// Functions

function startTour() {
	$('#more').click(function (e) {
		$.scrollTo('#timeline', 400);
		e.preventDefault();
	});
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

function inView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

// States

function loopfirstResize() {
	$('#intro').css({ height : $(window).height() });
}

function loopfirstReady() {
	startTour();
	initStellar();
	loopfirstResize();

	loadSVG('#high', 'scores/high.svg');
	loadSVG('#low', 'scores/low.svg');
	loadSVG('#med', 'scores/med.svg');

	// inView("#score-attr");
}

function loopfirstLoad() {

}

// Init Everything

$(document).ready(loopfirstReady);
$(document).load(loopfirstLoad);
$(window).resize(loopfirstResize);