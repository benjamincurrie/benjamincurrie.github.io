// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

(function() {
	var navSticky, navTop;

	function stickyNav(){
		var scrollpos = $(window).scrollTop();
		if(!navSticky && scrollpos > navTop) {
			$("#navigation .sticky").addClass('fixed');
			navSticky = true;
		} else if(scrollpos < navTop) {
			$("#navigation .sticky").removeClass('fixed');
			navSticky = false;
		}

		if($("#navigation table").css('position') == "fixed") {
			$('#navigation .fade').fadeIn();
		} else {
			//$('#navigation .fade').fadeOut();
		}
	}
	
	function windowInit(){
		//HERO DIMENSTION AND CENTER
		var hero = $('#hero'),
			wh = $(window).height(),
			nh = $('#navigation').height(),
			heroHeight = wh + nh;

		hero.css({
			height: heroHeight+"px",
		});

		var heroContent = $('#hero .content'),
			contentHeight = heroContent.height(),
			parentHeight = hero.height(),
			topMargin = (parentHeight - contentHeight) / 2;

		heroContent.css({
			"margin-top" : topMargin+"px"
		});
		
		// NAV FIXED
		navTop = $('#navigation').position().top;
		navSticky = false;
		$(window).on('scroll', stickyNav).scroll();
		// $(window).on('touchmove', stickyNav).scroll();
		
		// PARALLAX EFFECTS
		$('#hero').parallax("90%", 0.5);
		$('#services').parallax("50%", 0.5);
	}

	$(window).on("resize", windowInit);
	$(document).on("ready", windowInit);
})();

/* =Document Ready Trigger
-------------------------------------------------------------- */
$(document).ready(function(){
	$('a.scroll').on('click', function() {
		var target = $(this).attr('href');
		$(window).scrollTo($(target), 800);
		return false;
	});
	$('#navigation').onePageNav({
		filter: ':not(.contact)'
	});
	$('#navigation a.handle').click(function() {
		$('#navigation').toggleClass('expanded');
		return false;
	});
	$('#navigation a:not(.handle)').click(function() {
		$('#navigation').removeClass('expanded');
	});
	
	// FANCYBOX
	// $('.overlay').onDemandLoader({
	//	spinner: 'images/loading.gif'
	// });
	
	$("a.fancybox").fancybox({
		padding: 0,
		afterLoad  : function (current) {
			// $(current.href).loadImages();
			$(current.href+' .flexslider').flexslider();
		}
	});
	$(".fancybox.ajax").fancybox({
		type: 'ajax',
		padding: 0,
		afterShow  : function () {
			$('.fancybox-opened .flexslider').flexslider();
			// $(current.href).loadImages();
			// $('.flexslider').flexslider();
		}
	});

	// EXTERNAL LINKS
	$(document).on('click', "a[href*='http://']:not([href*='"+location.hostname+"']),[href*='https://']:not([href*='"+location.hostname+"'])", function(e) {
		e.preventDefault();
		e.stopPropagation();
		window.open(this.href, '_blank');
		return false;
	});
	
	// FOLIO FILTER
	$('#folionav a').click(function() {
		$('#folionav a').removeClass('current');
		$(this).addClass('current');
		var c = $(this).attr('href').substring(1);
		$('#foliogrid a.fancybox.' + c + '').fadeTo('fast', 1);
		$('#foliogrid a.fancybox:not(.' + c + ')').fadeTo('fast', 0.1);
		return false;
	});
	
	// FOLIO GRID
	$('#foliogrid a').hover(function(){
		$('hgroup', this).fadeIn();
	}, function() {
		$('hgroup', this).fadeOut();
	});
	
	// AJAX FORM
	$("form.ajax").submit(function() {
		var form = $(this);
		var data = form.serialize();
		$('.alerts .alert', form).slideUp();
		$('input, textarea, button', form).attr('disabled', 'disabled');
		$.ajax({
			type: "POST",
			url: form.attr('action'),
			data: data, // serializes the form's elements.
			dataType: 'json',
			success: function(data)
			{
				var status = data.success ? 'success' : 'failed';
				$('<div class="alert '+status+'"/>')
					.hide()
					.html(data.message)
					.appendTo('.alerts', form)
					.slideDown('normal');
				$('input, textarea, button', form).removeAttr('disabled');
			}
		});

		return false; // avoid to execute the actual submit of the form.
	});
});
/* END ------------------------------------------------------- */