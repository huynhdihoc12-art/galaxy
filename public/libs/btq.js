(function ($) {
	var methods = {
		on: $.fn.on,
		bind: $.fn.bind
	};
	$.each(methods, function (k) {
		$.fn[k] = function () {
			var args = [].slice.call(arguments),
				delay = args.pop(),
				fn = args.pop(),
				timer;
			args.push(function () {
				var self = this,
					arg = arguments;
				clearTimeout(timer);
				timer = setTimeout(function () {
					fn.apply(self, [].slice.call(arg));
				}, delay);
			});
			return methods[k].apply(this, isNaN(delay) ? arguments : args);
		};
	});
}(jQuery));

function myDetectExternalLinkFunction() {
	var x = document.getElementsByTagName("a");
	var i;
	for (i = 0; i < x.length; i++) {
		if (location.hostname != x[i].hostname) {
			x[i].rel = "nofollow";
			x[i].target = "_blank";
			x[i].title = "Click to open in new window";
		}
	}
}
mft = setTimeout("myDetectExternalLinkFunction()", 0);

function LoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function () {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
LoadEvent(function () {
	myDetectExternalLinkFunction();
});

var timex;
var show;
var News = 0;
var Details = 0;
var Videoload = 0;
var doWheel = true;
var doTouch = true;
var windscroll = $(document).scrollTop();
var Itemx = $('.nav li');
var timer;
var Arrhash;
var pageCount = 0;
var loading = true;
var isFirst = true;
var timeSlide = $('.slide-pics').attr('data-time');
//END

//FORMAT NUMBER
Number.prototype.formatMoney = function (c, d, t) {
	var n = this,
		c = isNaN(c = Math.abs(c)) ? 2 : c,
		d = d == undefined ? "." : d,
		t = t == undefined ? "," : t,
		s = n < 0 ? "-" : "",
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
		j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};


$.fn.isInViewport = function () {
	var elementTop = $(this).offset().top + 90;
	var elementBottom = elementTop + $(this).outerHeight();
	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + ($(window).height() + 90);
	return elementBottom > viewportTop && elementTop < viewportBottom;
};

function onScroll() {
	var items = $('.ani-item');
	$(items).each(function (index, element) {
		if ($(element).isInViewport()) {
			$(element).addClass("on-show");

		}
	});
}

function AnimationDelay() {
	var Itemx = $('.item-cer')
	$(Itemx).each(function (index, element) {
		var minDelay = 50;
		var maxDelay = 350;
		var time = Math.floor(index) * ((maxDelay - minDelay) / 2 - minDelay);
		$(element).css({
			'-webkit-animation-delay': time + 'ms',
			'animation-delay': time + 'ms'
		});
	});
}


function NavClick() {
	$('.nav-click').on('click', function () {

		if ($('.nav-click').hasClass('active')) {
			$('.navigation').scrollTop(0);
			$('.nav-click').removeClass('active');
			$('.bg-nav, .navigation').removeClass('show');
			$('html, body').removeClass('no-scroll');
			$('.scrollA').getNiceScroll().remove();
		} else {
			$('.navigation').scrollTop(0);
			$('.nav-click').addClass('active');
			$('.bg-nav, .navigation').addClass('show');
			$('html, body').addClass('no-scroll');
			setTimeout(function () {
				ScrollNiceA();
			}, 1200);

		}
		return false;

	});

	$('.bg-nav, .nav li a').on("click", function () {
		if ($('.nav-click').hasClass('active')) {
			$('.nav-click').trigger('click');
			$('.overlay-menu, .navigation').removeClass('show');
			$('html, body').removeClass('no-scroll');

		}

	});

	$('.link-home, .link-load, .link-load-page').on("click", function () {
		$('.container').addClass('show')
	});


}


function BoxSlide() {

	var groupLength = $('.group-central').length,
		groupIndex = $('.group-central').index(),
		startAni = false,
		Direction = 'down';

	TweenMax.set($('.group-central').not($('.group-central')[groupIndex]), {
		y: '100%'
	});

	function Modify() {
		setTimeout(function () {
			TweenMax.set($('.group-central').not($('.group-central')[groupIndex]), {
				y: '100%'
			});
			startAni = false;
		}, 1000);
	};


	function GoUp() {
		startAni = true;
		TweenMax.set($('.group-central'), {
			zIndex: ""
		});
		$('.footer').removeClass('show');
		$('.wheel').addClass('show');
		$('.box-nav li').removeClass('current  active');

		if ($('#home-page').length && $('.slide-pics .slide-item').length > 1) {
			$('.slide-pics').trigger('BTQ.stop');

		}

		if (timer > 0) {
			clearTimeout(timer);
			timer = 0;
		}

		if ($('.scrollB, .scrollC').length) {
			$('.scrollB, .scrollC').getNiceScroll().remove();
		}


		TweenLite.fromTo($('.group-central')[groupIndex], 0.8, {
			zIndex: 2
		}, {
			y: '0%',
			ease: Quad.easeOut,
			onComplete: function () {
				$('.group-central').removeClass('show-text');
				$('.group-central').eq(groupIndex).addClass('show-text');
				$('.box-nav li').eq(groupIndex).addClass('current active');
				setTimeout(function () {
					$('.box-nav li').removeClass('active');
				}, 1000);

				if ($('.scrollB, .scrollC').length) {
					setTimeout(function () {
						ScrollNiceB();
						ScrollNiceC();
					}, 2000);
				}


				if ($('.box-slider .group-central:last-child').hasClass('show-text')) {
					$('.footer').addClass('show');
				}

				Modify();

			}
		});

		if ($('#products-page, #projects-page').length) {
			//window.location.hash = $('.box-nav li a').eq(groupIndex).attr('data-page');

			var tmpurl = $('.box-nav li a').eq(groupIndex).attr('href');
			var tmptitle = $('.box-nav li a').eq(groupIndex).attr('data-title');
			var tmpkeyword = $('.box-nav li a').eq(groupIndex).attr('data-keyword');
			var tmpdescription = $('.box-nav li a').eq(groupIndex).attr('data-description');
			var tmpdataname = $('.box-nav li a').eq(groupIndex).attr('data-page');
			changeUrl(tmpurl, tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);
		}

	}


	function GoDown() {
		startAni = true;
		TweenMax.set($('.group-central'), {
			zIndex: ""
		});
		$('.footer').removeClass('show');
		$('.wheel').addClass('show');
		$('.box-nav li').removeClass('current active');
		if ($('#home-page').length && $('.slide-pics .slide-item').length > 1) {
			$('.slide-pics').trigger('BTQ.stop');
		}


		if (timer > 0) {
			clearTimeout(timer);
			timer = 0;
		}


		if ($('.scrollB, .scrollC').length) {
			$('.scrollB, .scrollC').getNiceScroll().remove();
		}


		TweenMax.fromTo($('.group-central')[groupIndex], 0.8, {
			y: '-100%',
			zIndex: 2
		}, {
			y: '0%',
			ease: Quad.easeOut,
			onComplete: function () {
				$('.group-central').removeClass('show-text');
				$('.group-central').eq(groupIndex).addClass('show-text');
				$('.box-nav li').eq(groupIndex).addClass('current active');
				setTimeout(function () {
					$('.box-nav li').removeClass('active');
				}, 1000);



				if ($('.scrollB, .scrollC').length) {
					setTimeout(function () {
						ScrollNiceB();
						ScrollNiceC();
					}, 2000);
				}


				if ($('.box-slider .group-central:last-child').hasClass('show-text')) {
					$('.footer').addClass('show');
				}



				Modify();

			}
		});
		if ($('#products-page, #projects-page').length) {
			//window.location.hash = $('.box-nav li a').eq(groupIndex).attr('data-page');
			var tmpurl = $('.box-nav li a').eq(groupIndex).attr('href');
			var tmptitle = $('.box-nav li a').eq(groupIndex).attr('data-title');
			var tmpkeyword = $('.box-nav li a').eq(groupIndex).attr('data-keyword');
			var tmpdescription = $('.box-nav li a').eq(groupIndex).attr('data-description');
			var tmpdataname = $('.box-nav li a').eq(groupIndex).attr('data-page');
			changeUrl(tmpurl, tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);
		}
	};




	var slideTimer;

	function StartTimer() {
		slideTimer = setInterval(function () {
			StartSlide();
		}, 10000);

		function StartSlide() {
			if (groupIndex >= groupLength - 1) {
				groupIndex = 0;
			} else {
				groupIndex++;
			}
			GoUp();
		};
	}





	if ($(window).width() > 1100) {

		$('.container, .footer').on('mousewheel', function (e) {

			var Direction;
			if (startAni === false) Direction = (function () {
				var delta = Math.max(-1, Math.min(1,
					(e.wheelDelta || -e.deltaY || -e.detail)));
				return delta;
			}());
			//console.log(Direction);

			if ($(window).width() > 1100) {

				if ($('.group-central')[groupIndex] != null && parseInt(Direction) === 1) {
					if (groupIndex >= groupLength - 1) {
						groupIndex = 0;
					} else {
						groupIndex++;
					}
					GoUp();
				} else if ($('.group-central')[groupIndex] != null && parseInt(Direction) === -1) {
					if (groupIndex <= 0) {
						groupIndex = groupLength - 1;
					} else {
						groupIndex--;
					};
					GoDown();
				};

			}

		});


		$('.container, .footer ').on('swipeup', function (e, touch) {
			if (!doTouch) {
				return;
			}
			doTouch = false;
			if ($(window).width() > 1100) {
				$('.box-nav li.current').next().trigger('click');

				setTimeout(turnWheelTouch, 500);
			}
		}).on('swipedown', function (e) {

			if (!doTouch) {
				return;
			}
			doTouch = false;
			if ($(window).width() > 1100) {
				$('.box-nav li.current').prev().trigger('click');

				setTimeout(turnWheelTouch, 500);
			}
		});

	}



	$(".box-nav li").on('click', function () {
		var navIndex = $(this).index();
		if (startAni) {
			return false;
		} else if (!startAni && navIndex > groupIndex) {
			groupIndex = navIndex;
			GoUp();
		} else if (!startAni && navIndex < groupIndex) {
			groupIndex = navIndex;
			GoDown();
		};
		return false;
	});


	setTimeout(function () {
		$('.group-central:first-child').addClass('show-text');
		$('.box-nav li:first-child').addClass('current');
		$('.show-text .box-intro h2').addClass('fadeinup');

	}, 500);


}

function execSearch() {
	var e = $("#qsearch").val(),
		t = $("#href_search").val(),
		a = $("#defaultvalue").val(),
		a = $("#defaultvalue").val(),
		i = $("#errorsearch").val();
	if (hidemsg(), e == a || "" == e) return !1;
	if (e.length <= 1) return $(".overlay-dark").after("<div  class='contact-success color-red'>" + i + "</div>"), setTimeout(hidemsg, 5e3), !1;
	if ("" != e) {
		var l = t + "?qsearch=" + encodeURIComponent(e);
		return window.location = l, !1
	}
}

function Search() {
	$(document).on('click', '.search-but', function (e) {

		if ($(this).hasClass('active')) {
			$('.search-form, .search-but').removeClass('active');
			execSearch();
		} else {
			$('.search-form, .search-but').addClass('active');
			document.getElementById("search").reset();
			if ($('.nav-click').hasClass('active')) {
				$('.nav-click').trigger('click');
			}
		}

	});

	$('#qsearch').keydown(function (e) {
		if (e.keyCode == 13) {
			execSearch();
		}
	});

}





function SlidePicture() {

	/*HOME PAGE*/

	if ($('.slide-pics').length) {

		if ($('.slide-pics').children().length > 1) {
			var timeSlide = $('.slide-pics').attr('data-time');
		} else {
			var timeSlide = false
		}

		$('.slide-pics').BTQSlider({
			animateOut: 'fadeout',
			animateIn: 'fadein',
			mouseDrag: false,
			touchDrag: false,
			pullDrag: false,
			loop: true,
			margin: 0,
			autoplay: true,
			autoplayTimeout: timeSlide,
			smartSpeed: 1000,
			items: 1,
			nav: false,
			dots: true,
			rewind: true,
		});


	}

	if ($('.slider-product').length) {

		if ($(window).width() > 1100) {
			$('.slider-product').each(function (index, element) {
				$(element).on('initialized.btq.slidebox', function () {
					var Length = $(element).find(".slide-item").length;

					if ($(window).width() >= 1100) {
						if (Length <= 4) {
							$(element).addClass('center-slidebox');
						} else {
							$(element).removeClass('center-slidebox');
						}
					}
				}).BTQSlider({
					slideSpeed: 600,
					nav: true,
					dots: true,
					margin: 10,
					rewind: true,
					items: 4,
				});
			});
		}
	}

	if ($('.slider-cate').length) {
		$('.slider-cate').on('initialized.btq.slidebox', function () {
			var Length = $('.slider-cate').find(".slide-item").length;

			if ($(window).width() >= 1100) {
				if (Length <= 4) {
					$('.slider-cate').addClass('center-slidebox');
				} else {
					$('.slider-cate').removeClass('center-slidebox');
				}
			} else if ($(window).width() < 1100 && $(window).width() >= 600) {

				if (Length <= 2) {
					$('.slider-cate').addClass('center-slidebox');
				} else {
					$('.slider-cate').removeClass('center-slidebox');
				}

			} else {
				$('.slider-cate').removeClass('center-slidebox');

			}
		}).BTQSlider({
			slideSpeed: 600,
			nav: true,
			dots: true,
			margin: 10,
			rewind: true,
			responsive: {
				0: {
					items: 1,
				},
				600: {
					items: 2,

				},
				1100: {
					items: 4,
				}
			}
		});
	}

	if ($('.slider-project').length) {
		$('.slider-project').each(function (index, element) {
			$(element).BTQSlider({
				slideSpeed: 600,
				nav: false,
				dots: false,
				margin: 10,
				items: 1,
				rewind: true,
				responsive: {
					0: {
						nav: false,
						dots: true,
					},
					670: {
						nav: false,
						dots: true,
					},
					1100: {
						nav: true,
						dots: true,
					}
				}
			});
		});
	}

	if ($('.slider-cer').length) {
		$('.slider-cer').on('initialized.btq.slidebox', function () {
			var Length = $('.slider-cer').find(".slide-item").length;

			if ($(window).width() >= 1100) {
				if (Length <= 3) {
					$('.slider-cer').addClass('center-slidebox');
				} else {
					$('.slider-cer').removeClass('center-slidebox');
				}
			} else if ($(window).width() < 1100 && $(window).width() >= 600) {

				if (Length <= 2) {
					$('.slider-cer').addClass('center-slidebox');
				} else {
					$('.slider-cer').removeClass('center-slidebox');
				}

			} else {
				$('.slider-cer').removeClass('center-slidebox');

			}
		}).BTQSlider({
			slideSpeed: 600,
			nav: false,
			dots: true,
			margin: 50,
			rewind: true,
			responsive: {
				0: {
					items: 1,
					margin: 0,
				},
				600: {
					items: 2,

				},
				1100: {
					items: 3,
				}
			}
		});
	}


	$('.slider-pic').each(function (index, element) {
		$(element).on('initialized.btq.slidebox', function () {
			var Length = $(element).find(".slide-item").length;
			if (Length <= 2) {
				$(element).addClass('center-slidebox');
			} else {
				$(element).removeClass('center-slidebox');
			}
		}).BTQSlider({
			margin: 40,
			smartSpeed: 600,
			nav: true,
			dots: true,
			rewind: true,
			responsive: {
				0: {
					items: 1,
					nav: false,
					margin: 0,
				},
				670: {
					items: 2,
					margin: 20,
				},

			}
		});

	});

	if ($('.slider-partner').length) {
		if ($(window).width() >= 540) {
			$('.slider-partner').on('initialized.btq.slidebox', function () {
				var Length = $('.slider-partner').find(".slide-item").length;

				if ($(window).width() >= 1100) {
					if (Length <= 4) {
						$('.slider-partner').addClass('center-slidebox');
					} else {
						$('.slider-partner').removeClass('center-slidebox');
					}
				} else if ($(window).width() < 1100 && $(window).width() >= 540) {

					if (Length <= 3) {
						$('.slider-partner').addClass('center-slidebox');
					} else {
						$('.slider-partner').removeClass('center-slidebox');
					}

				} else {
					$('.slider-partner').removeClass('center-slidebox');

				}
			}).BTQSlider({
				slideSpeed: 600,
				nav: true,
				dots: true,
				margin: 20,
				rewind: true,
				responsive: {
					0: {
						items: 1,
					},
					540: {
						items: 3,

					},
					1100: {
						items: 4,
					}
				}
			});
		}
	}

	if ($('.slider-project-1').length) {
		$('.slider-project-1').each(function (index, element) {
			$(element).on('initialized.btq.slidebox', function () {
				var Length = $(element).find(".slide-item").length;
				if (Length <= 2) {
					$(element).addClass('center-slidebox');
				} else {
					$(element).removeClass('center-slidebox');
				}
			}).BTQSlider({
				margin: 60,
				smartSpeed: 600,
				nav: true,
				dots: true,
				rewind: true,
				responsive: {
					0: {
						items: 1,
						nav: false,
						margin: 0,
					},
					700: {
						items: 2,
					},

				}
			});
		});
	}
	if ($('.slider-pic-project').length) {
		$('.slider-pic-project').BTQSlider({
			margin: 0,
			smartSpeed: 600,
			nav: true,
			dots: true,
			items: 1,
			loop: true,
			center: true,
			rewind: true,
		});
	}

	if ($('.slider-catalouge').length) {
		$('.slider-catalouge').on('initialized.btq.slidebox', function () {
			var Length = $('.slider-catalouge').find(".slide-item").length;

			if ($(window).width() >= 1100) {
				if (Length <= 3) {
					$('.slider-catalouge').addClass('center-slidebox');
				} else {
					$('.slider-catalouge').removeClass('center-slidebox');
				}
			} else if ($(window).width() < 1100 && $(window).width() >= 600) {

				if (Length <= 2) {
					$('.slider-catalouge').addClass('center-slidebox');
				} else {
					$('.slider-catalouge').removeClass('center-slidebox');
				}

			} else {
				$('.slider-catalouge').removeClass('center-slidebox');
			}
		}).BTQSlider({
			slideSpeed: 600,
			nav: true,
			dots: true,
			margin: 50,
			rewind: true,
			responsive: {
				0: {
					items: 1,
					margin: 0,
				},
				600: {
					items: 2,

				},
				1100: {
					items: 3,
				}
			}
		});
	}
	if ($('.slider-support').length) {
		if ($(window).width() >= 540) {
			$('.slider-support').on('initialized.btq.slidebox', function () {
				var Length = $('.slider-support').find(".slide-item").length;

				if ($(window).width() >= 1100) {
					if (Length <= 4) {
						$('.slider-support').addClass('center-slidebox');
					} else {
						$('.slider-support').removeClass('center-slidebox');
					}
				} else if ($(window).width() < 1100 && $(window).width() >= 600) {

					if (Length <= 2) {
						$('.slider-support').addClass('center-slidebox');
					} else {
						$('.slider-support').removeClass('center-slidebox');
					}

				} else {
					$('.slider-support').removeClass('center-slidebox');
				}
			}).BTQSlider({
				slideSpeed: 600,
				nav: false,
				dots: true,
				margin: 20,
				rewind: true,
				responsive: {
					0: {
						items: 1,
					},
					600: {
						items: 2,

					},
					1100: {
						items: 4,
					}
				}
			});
		}
	}


	if ($('.slider-resolution').length) {
		$('.slider-resolution').each(function (index, element) {
			$(element).on('initialized.btq.slidebox', function () {
				var Length = $(element).find(".slide-item").length;

				if ($(window).width() >= 1100) {
					if (Length <= 3) {
						$(element).addClass('center-slidebox');
					} else {
						$(element).removeClass('center-slidebox');
					}
				} else if ($(window).width() < 1100 && $(window).width() >= 600) {

					if (Length <= 2) {
						$(element).addClass('center-slidebox');
					} else {
						$(element).removeClass('center-slidebox');
					}

				} else {
					$(element).removeClass('center-slidebox');
				}
			}).BTQSlider({
				slideSpeed: 600,
				nav: true,
				dots: true,
				margin: 50,
				rewind: true,
				responsive: {
					0: {
						items: 1,
						margin: 0,
					},
					600: {
						items: 2,

					},
					1100: {
						items: 3,
					}
				}
			});
		});
	}
	if ($(window).width() >= 1100) {
		if ($('.slider-same').length) {
			$('.slider-same').on('initialized.btq.slidebox', function () {
				var Length = $('.slider-same').find(".slide-item").length;

				if ($(window).width() >= 1100) {
					if (Length <= 3) {
						$('.slider-same').addClass('center-slidebox');
					} else {
						$('.slider-same').removeClass('center-slidebox');
					}
				} else if ($(window).width() < 1100 && $(window).width() >= 600) {

					if (Length <= 2) {
						$('.slider-same').addClass('center-slidebox');
					} else {
						$('.slider-same').removeClass('center-slidebox');
					}

				} else {
					$('.slider-same').removeClass('center-slidebox');
				}
			}).BTQSlider({
				slideSpeed: 600,
				nav: true,
				dots: true,
				margin: 30,
				rewind: true,
				responsive: {
					0: {
						items: 1,
						margin: 0,
					},
					600: {
						items: 2,

					},
					1100: {
						items: 3,
					}

				}
			});
		}
	}

	//PAGINATION
	if ($('.slide-pagi').length) {
		$('.slide-pagi').on('initialized.btq.slidebox', function () {
			var Length = $('.slide-pagi').find(".slide-item").length;
			if (Length <= 5) {
				$('.slide-pagi').addClass('center-slidebox');
			} else {
				$('.slide-pagi').removeClass('center-slidebox');
			}

		}).BTQSlider({
			nav: true,
			dots: false,
			items: 5,
			margin: 2,
			dotNum: false,
			rewind: true,
		});
	}
}




function StartLazy() {
	$('.lazy').each(function (index, element) {
		var itemCount = $(element).find('.preloader').length;
		if (itemCount <= 0) {
			$(element).find('.loading').each(function (index, element) {
				$(element).children().append('<div class="preloader"></div>');
			});
		}

	});

}




function VideoLoad(idx, Source) {
	$.ajax({
		url: idx,
		cache: false,
		success: function (data) {
			$('.allvideo').append(data);


			$('.video-wrap').append(Source)

			$('.loadx').fadeOut(400, 'linear', function () {
				$('.loadx').remove();
			});

			$('.close-video').on('click', function () {

				$('.allvideo').fadeOut(500, 'linear', function () {
					$('.overlay-dark').removeClass('show');
					$('.allvideo .video-list').remove();
					$('html, body').removeClass('no-scroll');

					if ($('body').hasClass('scroll')) {
						ScrollBody();
					}

					if ($('.to-scrollV').length) {
						var top = $('.to-scrollV').offset().top;
						if ($(window).width() < 1100) {
							$('html, body').scrollTop(top);
						}
						$('.to-scrollV').removeClass('to-scrollV');
					}


				});

			});
		}


	});
}



function AlbumLoad(url, num) {
	$.ajax({
		url: url,
		cache: false,
		success: function (data) {



			if (TouchLenght == false || !isTouchDevice) {
				if ($('.slide-slidebox').length) {
					$('.slide-slidebox').trigger('stop.btq.autoplay');
				}
			}

			$('.all-album').append(data);

			if ($('.all-album .album-load').length > 1) {
				$('.all-album .album-load').last().remove();
			}

			$(".pic-name > h3").lettering('words').children("span").lettering().children("span").lettering();

			$('.album-center').on('initialized.btq.slidebox', function () {

				$('.container-zoom').each(function (index, element) {
					new PinchZoom.default(element, {
						draggableUnzoomed: false
					});
				});

				$('.album-center').find('.slide-item.active').addClass('selected');
				addText();

			}).BTQSlider({
				items: 1,
				margin: 0,
				smartSpeed: 600,
				loop: false,
				dots: true,
				nav: true,
				responsiveRefreshRate: 200,

			}).on('changed.btq.slidebox', function (el) {
				if ($('.thumbs').length) {
					syncPosition(el);
				}
			}).on('translate.btq.slidebox', function (el) {
				$('.album-center').find('.slide-item').removeClass('selected');
			}).on('translated.btq.slidebox', function (el) {
				$('.album-center').find('.slide-item.active').addClass('selected');
				addText();
			});



			$('.thumbs').on('initialized.btq.slidebox', function () {
				var Length = $('.thumbs').find(".slide-item").length

				if ($(window).width() >= 600) {
					if (Length <= 6) {
						$('.thumbs').addClass('center-slidebox');
					} else {
						$('.thumbs').removeClass('center-slidebox');
					}
				} else {
					if (Length <= 3) {
						$('.thumbs').addClass('center-slidebox');
					} else {
						$('.thumbs').removeClass('center-slidebox');
					}
				}

				$('.thumbs').find(".slide-item").eq(0).addClass("current");
			}).BTQSlider({
				margin: 5,
				smartSpeed: 300,
				dots: false,
				nav: false,
				responsiveRefreshRate: 100,
				responsive: {
					0: {
						items: 3,
						slideBy: 3,
					},

					600: {
						items: 6,
						slideBy: 6,
					},
				}
			});


			function syncPosition(el) {
				//set loop to true
				//var Current = Math.round(el.item.index - (el.item.Count/2) - .5);
				//set loop to false
				//var Current = el.item.index;

				var Count = el.item.Count - 1;
				var Current = el.item.index;

				if (Current < 0) {
					Current = Count;
				}
				if (Current > Count) {
					Current = 0;
				}

				$('.thumbs').find(".slide-item").removeClass("current").eq(Current).addClass("current");
				var Onscreen = $('.thumbs').find('.slide-item.active').length - 1;
				var Start = $('.thumbs').find('.slide-item.active').first().index();
				var End = $('.thumbs').find('.slide-item.active').last().index();
				console.log(End)

				console.log(Start)
				if (Current >= End - 1) {
					$('.thumbs').data('btq.slidebox').to(Current, 300, true);
				}

				if (Current <= Start) {
					$('.thumbs').data('btq.slidebox').to(Current - Onscreen, 300, true);
				}

			}


			$('.thumbs').on("click", ".slide-item", function (e) {
				e.preventDefault();
				var Num = $(this).index();
				$('.album-center').data('btq.slidebox').to(Num, 1000, true);
			});



			$('.all-album').on('mousewheel', '.album-center', function (e) {
				if (e.deltaY > 0) {
					if (!doWheel) {
						return;
					}
					doWheel = false;
					$('.album-center').trigger('prev.btq.slidebox');
					setTimeout(turnWheelTouch, 500);
				} else {
					if (!doWheel) {
						return;
					}
					doWheel = false;
					$('.album-center').trigger('next.btq.slidebox');
					setTimeout(turnWheelTouch, 500);
				}
				e.preventDefault();
			});

			function addText() {
				clearTimeout(timex);
				$('.pic-name').removeClass('move');
				$('.pic-name h3').children().children().removeClass('move');
				$('.selected').find('.pic-name').addClass('move');
				$('.move h3').children().children().each(function (i) {
					var box = $(this);
					var timex = setTimeout(function () {
						$(box).addClass('move')
					}, (i + 1) * 100);
				});

			}


			$('.album-load').animate({
				'opacity': 1
			}, 100, 'linear', function () {
				$('.loadx').fadeOut(400, 'linear', function () {
					$('.loadx').remove();
				});
			});


			$('.close-album').on("click", function () {
				$('.all-album').fadeOut(500, 'linear', function () {
					$('.overlay-dark').removeClass('show');
					$('.album-load').remove();
				});

				if (TouchLenght == false || !isTouchDevice) {
					if ($('.slide-slidebox').length) {
						$('.slide-slidebox').trigger('play.btq.autoplay');
					}
				}

				$('html, body').removeClass('no-scroll');
				return false;

			});


		}
	});
}

function thumbslider(url, num) {

	if (TouchLenght == false || !isTouchDevice) {
		if ($('.slide-slidebox').length) {
			$('.slide-slidebox').trigger('stop.btq.autoplay');
		}
	}

	$('.detail-center').on('initialized.btq.slidebox', function () {

		$('.detail-center').find('.slide-item.active').addClass('selected');

	}).BTQSlider({
		animateOut: 'fadeout',
		animateIn: 'fadein',
		items: 1,
		margin: 0,
		smartSpeed: 600,
		loop: false,
		dots: false,
		nav: true,
		responsiveRefreshRate: 200,

	}).on('changed.btq.slidebox', function (el) {
		if ($('.thumbs').length) {
			syncPosition(el);
		}
	}).on('translate.btq.slidebox', function (el) {
		$('.detail-center').find('.slide-item').removeClass('selected');
	}).on('translated.btq.slidebox', function (el) {
		$('.detail-center').find('.slide-item.active').addClass('selected');
	});



	if ($('#product-detail-page').length) {

		$('.thumbs').on('initialized.btq.slidebox', function () {
			var Length = $('.thumbs').find(".slide-item").length

			if ($(window).width() >= 600) {
				if (Length <= 4) {
					$('.thumbs').addClass('center-slidebox');
				} else {
					$('.thumbs').removeClass('center-slidebox');
				}
			} else {
				if (Length <= 3) {
					$('.thumbs').addClass('center-slidebox');
				} else {
					$('.thumbs').removeClass('center-slidebox');
				}
			}

			$('.thumbs').find(".slide-item").eq(0).addClass("current");
		}).BTQSlider({
			margin: 5,
			smartSpeed: 300,
			dots: false,
			nav: false,
			responsiveRefreshRate: 100,
			responsive: {
				0: {
					items: 3,
					slideBy: 3,
				},

				600: {
					items: 4,
					slideBy: 4,
				},
			}
		});

	}

	function syncPosition(el) {
		//set loop to true
		//var Current = Math.round(el.item.index - (el.item.Count/2) - .5);
		//set loop to false
		//var Current = el.item.index;

		var Count = el.item.Count - 1;
		var Current = el.item.index;

		if (Current < 0) {
			Current = Count;
		}
		if (Current > Count) {
			Current = 0;
		}

		$('.thumbs').find(".slide-item").removeClass("current").eq(Current).addClass("current");
		var Onscreen = $('.thumbs').find('.slide-item.active').length - 1;
		var Start = $('.thumbs').find('.slide-item.active').first().index();
		var End = $('.thumbs').find('.slide-item.active').last().index();
		if (Current >= End - 1) {
			$('.thumbs').data('btq.slidebox').to(Current, 300, true);
		}

		if (Current <= Start) {
			$('.thumbs').data('btq.slidebox').to(Current - Onscreen, 300, true);
		}

	}


	$('.thumbs').on("click", ".slide-item", function (e) {
		e.preventDefault();
		var Num = $(this).index();
		$('.detail-center').data('btq.slidebox').to(Num, 1000, true);
	});



	$('.center-detail').on('mousewheel', '.detail-center', function (e) {
		if (e.deltaY > 0) {
			if (!doWheel) {
				return;
			}
			doWheel = false;
			$('.detail-center').trigger('prev.btq.slidebox');
			setTimeout(turnWheelTouch, 500);
		} else {
			if (!doWheel) {
				return;
			}
			doWheel = false;
			$('.detail-center').trigger('next.btq.slidebox');
			setTimeout(turnWheelTouch, 500);
		}
		e.preventDefault();
	});

}





function PrintShare() {
	//EVENTS: FAVORITE - PRINT - SHARE
	var triggerBookmark = $('.save-but');
	$(triggerBookmark).on('click', function () {
		if (window.sidebar && window.sidebar.addPanel) {
			window.sidebar.addPanel(document.title, window.location.href, '');
		} else if (window.external && ('AddFavorite' in window.external)) {
			window.external.AddFavorite(location.href, document.title);
		} else {
			alert('Nhấn ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D để tạo bookmark cho trang này.');
		}
		return false;
	});

	$('.print-but').on('click', function () {
		window.print();
	});
	$('.share-but').on('mouseenter', function () {
		$(this).addClass('active');

	});

	$('.save-but, .print-but').on('mouseenter', function () {
		$('.share-but').removeClass('active');
	});

	$('.print-box').on('mouseleave', function () {
		$('.share-but').removeClass('active');
	});

}



//LOAD POPUP
function popupLoad(url) {
	$.ajax({
		url: url,
		cache: false,
		success: function (data) {
			$('.details-content').remove();
			$('body').append(data);
			if ($('form').length) {
				FocusText();
			}
			if ($(window).width() <= 840) {
				$('.details-text img').addClass('zoom-pic');
				ZoomPic();
			}

			$('.details-content').stop().animate({
				'opacity': 1
			}, 500, 'linear', function () {
				$('.details-content').scrollTop(0);
				$('.details-center').addClass('fadeinup');
				$('.loadx').fadeOut(400, 'linear', function () {

					$('.loadx').remove();
				});

			});


			$('.close-popup, .details-content span').on('click', function () {
				$('.details-content').animate({
					'opacity': 0
				}, 500, 'linear', function () {
					$('.details-content').remove();
					$('.overlay-dark').removeClass('show');
					$('html, body').removeClass('no-scroll');

				});

				return false;

			});

		}
	});
}


//LOAD POPUP Recruitment
function popupLoadRecruitment(url) {
	url = '/ajaxnews' + url;
	$.ajax({
		url: url,
		cache: true,
		method: "Post",
		success: function (data) {
			$('.details-content').remove();
			$('body').append(data);
			if ($('form').length) {
				FocusText();
			}
			if ($(window).width() <= 840) {
				$('.details-text img').addClass('zoom-pic');
				ZoomPic();
			}

			$('.details-content').stop().animate({
				'opacity': 1
			}, 500, 'linear', function () {
				$('.details-content').scrollTop(0);
				$('.details-center').addClass('fadeinup');
				$('.loadx').fadeOut(400, 'linear', function () {

					$('.loadx').remove();
				});

			});

			$('.close-popup, .details-content span').on('click', function () {
				var tmpurl = $('.sub-nav li.current a').attr('href');
				var tmptitle = $('.sub-nav li.current a').attr('data-title');
				var tmpkeyword = $('.sub-nav li.current a').attr('data-keyword');
				var tmpdescription = $('.sub-nav li.current a').attr('data-description');
				var tmpdataname = $('.sub-nav li.current a').attr('data-target');
				changeUrl(tmpurl, tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);
				console.log(tmpurl);
				$('.details-content').animate({
					'opacity': 0
				}, 500, 'linear', function () {
					$('.details-content').remove();
					$('.overlay-dark').removeClass('show');
					$('html, body').removeClass('no-scroll');

				});

				return false;

			});

		}
	});
}



function subNav() {

	var Head = $('.header').height();
	$('.sub-scroll:not(.release, .preload-product) li').on("click", function () {

		var id = $(this).find('a').attr('data-name');
		if (!doWheel) {
			return;
		}
		doWheel = false;
		$('.sub-scroll li').removeClass('current');
		$(this).addClass('current');
		var hash = $(this).find('a').attr("data-name");
		//window.location.hash = hash;	
		//WEB DYNAMIC	
		if (!$('#about-page, #recruitment-page').length) {
			var tmpurl = $(this).find('a').attr('href');
			var tmptitle = $(this).find('a').attr('data-title');
			var tmpkeyword = $(this).find('a').attr('data-keyword');
			var tmpdescription = $(this).find('a').attr('data-description');
			var tmpdataname = $(this).find('a').attr('data-name');
			changeUrl(tmpurl, tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);
		}
		var top = $(".set-post[data-post='" + id + "']").offset().top - Head - 20;
		$('html, body').stop().animate({
			scrollTop: top
		}, 1500, 'easeInOutExpo', function () {
			setTimeout(turnWheelTouch, 100);
		});

		return false;
	});
	var arrHash = window.location.hash;
	arrHash = arrHash.slice(1);
	setTimeout(function () {
		$(".sub-scroll li a[data-name='" + arrHash + "']").trigger('click');
	}, 500);
}


function onChange(input) {
	$('.file-name').html(input.files[0].name);

}

function FocusText() {
	$('input, textarea').focus(function (e) {
		if ($(this).attr('data-holder') == $(this).val()) {
			$(this).val("");
		}
	}).focusout(function (e) {
		if ($(this).val() == "") {
			$(this).prev().removeClass('hide');
			$(this).val($(this).attr('data-holder'));
		}
	});

}


function ScrollNiceA() {
	if ($(window).width() <= 1100) {
		$('.scrollA').getNiceScroll().remove();
		$('.scrollA').css({
			'overflow-x': 'visible',
			'overflow-y': 'visible'
		});
	} else {
		$('.navigation.show .scrollA').css({
			'overflow-x': 'hidden',
			'overflow-y': 'hidden'
		});
		$('.navigation.show .scrollA').getNiceScroll().show();
		$('.navigation.show .scrollA').niceScroll({
			touchbehavior: true,
			horizrailenabled: false,
			cursordragontouch: true,
			grabcursorenabled: false,
			cursorcolor: "#fff"
		});
		$('.navigation.show .scrollA').animate({
			scrollTop: "0px"
		});
	}

}

function ScrollNiceB() {
	if ($(window).width() <= 1100) {
		$('.scrollB').getNiceScroll().remove();
		$('.scrollB').css({
			'overflow-x': 'visible',
			'overflow-y': 'visible'
		});
	} else {
		$('.show-text .scrollB').css({
			'overflow-x': 'hidden',
			'overflow-y': 'hidden'
		});
		$('.show-text .scrollB').getNiceScroll().show();
		$('.show-text .scrollB').niceScroll({
			touchbehavior: true,
			horizrailenabled: false,
			cursordragontouch: true,
			grabcursorenabled: false,
			cursorcolor: "#98272b"
		});
		$('.show-text .scrollB').animate({
			scrollTop: "0px"
		});
	}
}

function ScrollNiceC() {
	if ($(window).width() <= 1100) {
		$('.scrollC').getNiceScroll().remove();
		$('.scrollC').css({
			'overflow-x': 'visible',
			'overflow-y': 'visible'
		});
	} else {
		$('.scrollC').css({
			'overflow-x': 'hidden',
			'overflow-y': 'hidden'
		});
		$('.scrollC').getNiceScroll().show();
		$('.scrollC').niceScroll({
			touchbehavior: true,
			horizrailenabled: false,
			cursorborderradius: "0px",
			cursordragontouch: true,
			grabcursorenabled: false,
			autohidemode: false,
			cursorcolor: "#98272b",
			zindex: 100
		});
		$('.scrollC').animate({
			scrollTop: "0px"
		});
	}

}

function ScrollNiceHide() {
	$('.scrollA, .scrollB, .scrollC').getNiceScroll().remove();
}


function LinkPage() {
	$('.link-load, .go-page, .more, .sub-nav li a, .go-page').on('click', function (e) {
		e.preventDefault();
		$('body').removeClass('show').addClass('show-page');
		var linkLocation = $(this).attr("href");

		$('.container, .footer, .slogan, .go-top').stop().animate({
			'opacity': 0
		}, 500, 'linear', function () {

			window.location = linkLocation;
		});
		return false;

	});



	$('.link-blank').on("click", function (e) {
		e.preventDefault();
		var url = $(this).attr('href');
		window.open(url, '_blank');
		return false;
	});


	$('.item-1, .news-item, .item-cate, .item-news-home, .item-pro, .item-project, .item-sol, .link-home, .item-product-home, .item-project-home').on('click', function (e) {
		e.preventDefault();
		$('body').removeClass('show').addClass('show-page');
		var linkLocation = $(this).find('a').attr('href')
		setTimeout(function () {
			$('.container, .footer, .slogan, .go-top').stop().animate({
				'opacity': 0
			}, 500, 'linear');
			window.location.href = linkLocation;

		}, 1000);
		return false;
	});

}
// Share face book
function popupwindow(url, title, w, h) {
	var left = (screen.width / 2) - (w / 2);
	var top = (screen.height / 2) - (h / 2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}
//End share face book
function ContentLoad() {
	ResizeWindows();


	FocusText();
	NavClick();
	Option();
	Search();
	ZoomPic();
	AnimationDelay();
	ShareSocial();
	// Share face book
	$(document).on("click", ".share-item li a", function (e) {
		e.preventDefault();
		popupwindow($(this).attr("href"), "Share this post", 800, 400);
	});
	//End share face book
	if ($('#name').length > 0) {
		$('#name').focusin();
		$('#name').focusout();
	}
	if ($('#email').length > 0) {
		$('#email').focusin();
		$('#email').focusout();
	}
	if ($('#phone').length > 0) {
		$('#phone').focusin();
		$('#phone').focusout();
	}
	if ($('#address').length > 0) {
		$('#address').focusin();
		$('#address').focusout();
	}
	if ($('#company').length > 0) {
		$('#company').focusin();
		$('#company').focusout();
	}
	if ($('#note').length > 0) {
		$('#note').focusin();
		$('#note').focusout();
	}

	if ($('#name_giohang').length > 0) {
		$('#name_giohang').focusin();
		$('#name_giohang').focusout();
	}
	if ($('#email_giohang').length > 0) {
		$('#email_giohang').focusin();
		$('#email_giohang').focusout();
	}
	if ($('#phone_giohang').length > 0) {
		$('#phone_giohang').focusin();
		$('#phone_giohang').focusout();
	}
	if ($('#address_giohang').length > 0) {
		$('#address_giohang').focusin();
		$('#address_giohang').focusout();
	}
	if ($('#company_giohang').length > 0) {
		$('#company_giohang').focusin();
		$('#company_giohang').focusout();
	}
	if ($('#note_giohang').length > 0) {
		$('#note_giohang').focusin();
		$('#note_giohang').focusout();
	}



	if ($('#nameapply').length > 0) {
		$('#nameapply').focusin();
		$('#nameapply').focusout();
	}
	if ($('#emailapply').length > 0) {
		$('#emailapply').focusin();
		$('#emailapply').focusout();
	}
	if ($('#phoneapply').length > 0) {
		$('#phoneapply').focusin();
		$('#phoneapply').focusout();
	}
	var slug = '';
	if (document.getElementById('slugCurrent') != null)
		slug = document.getElementById('slugCurrent').value;
	//if (slug != '') {
	//    $('ul #' + slug).addClass('current');
	//}
	//if (document.getElementById('slugCurrentParent') != undefined) {
	//    slugCurrentPrent = document.getElementById('slugCurrentParent').value;
	//    if (slugCurrentPrent != '') {
	//        $('ul #' + slugCurrentPrent).addClass('current');
	//    }
	//}


	//SET CURRENT BUTTON
	var IDPage = $('.container').attr('id');
	if ($('#news-detail-page').length) {
		IDPage = "news-page";
		$('.navigation a[data-name= "' + IDPage + '"]').parent().addClass('current');
	}
	if ($('#home-page').length) {
		$('.link-home a[data-name= "' + IDPage + '"]').parent().addClass('current');
	} else {
		$('.navigation a[data-name= "' + IDPage + '"]').parent().addClass('current');
	}

	if ($('.scrollA, .scrollB, .scrollC').length) {
		setTimeout(function () {
			ScrollNiceA();
			ScrollNiceB();
			ScrollNiceC();
		}, 1500);
	}

	$('.wheel').addClass('show');
	$('html, body').removeClass('no-scroll');

	if ($('.section-first').length) {
		$('.section-first').addClass('on-show');
	}
	if ($('.sub-nav').length) {
		setTimeout(function () {
			detectBut()
		}, 1000);
	}

	if (!$('#home-page').length) {
		$('.logo').css({
			'cursor': 'pointer'
		});
		$('.logo').on('click', function () {
			$('.link-home a').trigger('click');
		});

	}
	if (!$('#home-page, #products-page, #projects-page').length) {
		onScroll();
	}

	$('body').addClass('show');
	setTimeout(function () {
		$('.header').addClass('show');
	}, 200);
	setTimeout(function () {
		$('.title-page').addClass('on-show');
	}, 500);
	setTimeout(function () {
		$('.box-nav').addClass('show')
	}, 800);
	setTimeout(function () {
		$('.full-central').addClass('show-text')
	}, 800);
	if ($('.outer-nav')) {
		var NamePage = $('.container').attr('data-page');
		$(".outer-nav li a[data-name='" + NamePage + "']").parent().addClass('current');
	}
	$('.video-box').on('click', function () {
		$(this).find('a').trigger('click');
	});

	/* HOME PAGE */
	if ($('#home-page').length) {
		$('.wheel').addClass('screen-wheel');
		// agencyMap();
	}

	/* PRODUCT PAGE */
	if ($('#products-page').length) {
		$('.wheel').addClass('screen-wheel');
	}


	/* NEWS DETAIL PAGE */
	if ($('#news-detail-page').length) {
		PrintShare();
	}

	//RECRUITMENT PAGE
	if ($('#recruitment-page').length) {
		$('td a').on('click', function (e) {
			e.preventDefault();
			var url = $(this).attr('href');

			var tmpurl = $(this).attr('href');
			var tmptitle = $(this).attr('data-title');
			var tmpkeyword = $(this).attr('data-keyword');
			var tmpdescription = $(this).attr('data-description');
			var tmpdataname = $(this).attr('data-details');
			changeUrl(tmpurl, tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);
			$('html, body').addClass('no-scroll');

			//hash = $(this).attr('data-name');
			//window.location.hash = hash;

			if (!$('.loadicon').hasClass('loader') || !$('.loadx').length) {
				$('body').append('<div class="loadx" style="display:block"></div>');
				$('.overlay-dark').addClass('show');
				//popupLoad(url);
				var datahref = $(this).attr("data-href");
				popupLoadRecruitment(datahref);
			}

			return false;
		});
		if (window.location.hash) {
			LocationHash();
		} else {
			$('.loadx').fadeOut(400, 'linear', function () {
				$('.loadx').remove();
			});
		}

		$('tbody td:nth-child(2)').on('click', function (e) {
			e.preventDefault();
			$(this).find('a').trigger('click');
			return false;
		});

	}

	/* PRODUCT DETAIL PAGE */
	if ($('#product-detail-page').length) {


		$('.item-color').on('click', function () {
			$('.item-color').removeClass('current')
			$(this).addClass('current')
		});

		$('.tab-des li a').on('click', function () {
			$('.tab-des li').removeClass('current');
			var Openpage = $(this).attr("data-target");
			$(this).parent().addClass('current');
			$('.tab-content').removeClass('active');
			var allItem = $('.tab-content').length;
			var widthItem = $('.tab-content').width();
			var heightItem = $('.all-tab-content .tab-content[data-tab= "' + Openpage + '"]').innerHeight();
			$('.all-tab-content').width(allItem * widthItem);
			var XCurrent = $('.all-tab-content').offset().left;
			var XItem = $('.tab-content[data-tab= "' + Openpage + '"]').offset().left;
			$('.all-tab-content').stop().animate({
				'left': XCurrent - XItem,
				'height': heightItem
			}, 800, 'easeInOutExpo', function () {
				$('.all-tab-content .tab-content[data-tab= "' + Openpage + '"]').addClass('active');
			});
		});

		$(".tab-des li:first-child a").trigger('click');


		$('.button-add-cart').on('click', function (e) {
			var obj = {
				id: $(this).attr("data-id"),
				group: $(this).attr('data-group'),
				code: $(this).attr('data-code'),
				name: $(this).attr('data-name'),
				ref: $(this).attr('data-ref'),
				price: $(this).attr('data-price'),
				image: $(this).attr('data-image'),
				url: $(this).attr('data-url')
			};

			var tmp = 0;
			$('.cart-box .cart-group').parent().parent().remove();

			//var cartlocal = localStorage.getItem("cartHTML");
			var cartlocal = unescape(getCookie("cartHTML"));

			$(cartlocal).each(function (index, element) {
				var data1 = $('.button-add-cart').attr('data-group');
				var data2 = $(element).attr('data-group');
				if (data1 == data2) {
					tmp = 1;
				}
			});

			if (tmp == 0) {
				//localStorage.setItem("newRow", JSON.stringify(obj));
				setCookie("newRow", JSON.stringify(obj), 30);
				loadCart();
				$('.mes-cart').removeClass('show');
			} else {
				$('.mes-cart').addClass('show')
				setTimeout(function () {
					$('.mes-cart').removeClass('show')
				}, 2000);
			}

			return false;

		});

		$('.cart-box .cart-group').parent().parent().remove();

		$('.buy-product').on('click', function (e) {
			e.preventDefault();
			var url = $(this).attr('href');
			var obj = {
				id: $(this).attr("data-id"),
				group: $(this).attr('data-group'),
				code: $(this).attr('data-code'),
				name: $(this).attr('data-name'),
				ref: $(this).attr('data-ref'),
				price: $(this).attr('data-price'),
				image: $(this).attr('data-image'),
				url: $(this).attr('data-url')
			};
			//localStorage.setItem("newRow", JSON.stringify(obj));
			setCookie("newRow", JSON.stringify(obj), 30);
			$('.container').stop().animate({
				'opacity': 0
			}, 300, 'linear', function () {
				window.location = url;
			});
		});

		$('.item-color').on('click', function (e) {
			e.preventDefault();
			$('.item-color').removeClass('current');
			$(this).addClass('current');
			if (!$('.loadx').length) {
				$('body').append('<div class="loadx" style="display:block"></div>');
			}
			url = $(this).attr('href')
			productImg(url);

			if ($(window).width() <= 1100) {
				var scrollTop = $('.content-detail').offset().top;
				$('html, body').stop().animate({
					scrollTop: scrollTop - 50
				}, 1000, 'easeInOutExpo');
			}

		});
		$(".item-color:first-child").trigger('click');

	}

	/* PROJECT PAGE */
	if ($('#projects-page').length) {
		$('.wheel').addClass('screen-wheel');
	}

	//Get cart number
	setTimeout(function () {
		var Num = $('.cart-text').html();
		if (Num > 0) {
			$('.cart-text').addClass("color");
		}

	}, 1000);
	//var count	= Number(localStorage.cartCount) || 0 ;
	var count = Number(getCookie("cartCount")) || 0;
	$('.cart-text').html(count);


	/* CART PAGE */
	if ($('#cart-page').length) {
		$('.cart-complete').on('click', function (e) {
			$('html, body').addClass('no-scroll');
			$('.overlay-dark').addClass('show')
			setTimeout(function () {
				$('.cart-popup').addClass('show');
			}, 500);
		});

		$('.close-popup, .cart-popup > span').on('click', function (e) {
			$('html, body').removeClass('no-scroll');
			$('.overlay-dark').removeClass('show')
			$('.cart-popup').removeClass('show');
		});

		$('.select-header').bind("click", function () {
			$('.scrollC').getNiceScroll().remove();
			if (!$('.select-header').hasClass('onclick')) {
				$(this).addClass('onclick');
				$(this).next('.select-box').fadeIn(100, 'linear');

				$(this).closest('.select-list').on("mouseleave", function () {
					$(this).find('.select-box').fadeOut(100, 'linear');
					$('.select-header').removeClass('onclick')
				});
				setTimeout(function () {
					ScrollNiceC();
				}, 200);
			} else {
				$('.select-header').removeClass('onclick');
				$(this).next('.select-box').fadeOut(100, 'linear');
			}

		});

		$('.select-list li a').on('click', function (e) {
			e.preventDefault();
			$('.select-list li').removeClass('selected');
			$('.select-header').removeClass('current');
			$(this).parent().addClass('selected');
			$(this).parent().parent().parent().parent().find('.select-header').addClass('current');
			txt = $(this).text()
			$(this).parent().parent().parent().parent().parent().find('.select-header h3').text(txt)
			$(this).parent().parent().parent().parent('.select-box').fadeOut(100, 'linear');

		});
		$('.select-list:first').find('.quick-col:first-child a').trigger('click');


	}

	/* RESOLUTION DETAIL PAGE */
	if ($('#resolution-detail-page').length) {
		PrintShare();
	}


	/* MENU NAV */
	if (!$('#document-page, #news-page, #products-page').length) {
		$(".box-menu ul").each(function (index, element) {
			var idnav = $(element).attr('class');
			var idpage = $(".container").attr('id');
			if (idnav == idpage) {
				$(element).find('a').removeClass('link-load').addClass('link-noload')
			}
		});
	}
	if ($('#products-page').length) {
		$(".box-menu ul").each(function (index, element) {
			var idnav = $(element).attr('class');
			var idpage = $(".container").attr('data-page');
			if (idnav == idpage) {
				$(element).find('a').removeClass('link-load').addClass('link-noload')
			}
		});
	}
	if ($('#projects-page, #products-page').length) {
		var PageActive = window.location.hash;
		PageActive = PageActive.slice(1);
		$(".box-nav a[data-page='" + PageActive + "']").trigger('click');
		$('.link-noload').on('click', function (e) {
			if ($(this).parent().parent().parent().find('a.current').length) {
				e.preventDefault();
			}

			$('html, body').removeClass('no-scroll');
			$('.box-menu li').removeClass('current');
			$('.nav-click').removeClass('active');
			$('.navigation').removeClass('show');
			$('.bg-nav').removeClass('show');
			$(this).parent().addClass('current');
			var nav = $(this).attr('data-target');
			//window.location.hash = nav
			var tmpurl = $(this).attr('href');
			var tmptitle = $(this).attr('data-title');
			var tmpkeyword = $(this).attr('data-keyword');
			var tmpdescription = $(this).attr('data-description');
			var tmpdataname = $(this).attr('data-target');
			changeUrl(tmpurl, tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);


			$(".box-nav li a[data-page='" + nav + "']").trigger('click');
		});

		if ($(".box-nav li.current").length) {
			setTimeout(function () {
				$(".box-nav li.current").trigger('click');
			}, 500);
		}
		//setTimeout(function(){$(".box-menu li a.link-noload[data-target='" + PageActive + "']").trigger('click')},500);
	}

	if ($('#resolution-page, #about-page, #about-quality-page, #about-library-page, #contact-page').length) {
		var PageActive = window.location.hash;
		PageActive = PageActive.slice(1);


		$('.link-noload').on('click', function (e) {

			e.preventDefault();
			$('html, body').removeClass('no-scroll');
			$('.box-menu li').removeClass('current')
			$('.nav-click').removeClass('active');
			$('.navigation').removeClass('show');
			$('.bg-nav').removeClass('show');
			$(this).parent().addClass('current')
			var nav = $(this).attr('data-target');
			var tmpurl = $(this).attr('href');
			var tmptitle = $(this).attr('data-title');
			var tmpkeyword = $(this).attr('data-keyword');
			var tmpdescription = $(this).attr('data-description');
			var tmpdataname = $(this).attr('data-target');
			changeUrl(tmpurl, tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);


			//window.location.hash = nav
			var div1 = $(".sec-post[data-name='" + nav + "']").offset().top;
			$('html, body').stop().animate({
				scrollTop: div1 - 100
			}, 2000, 'easeInOutExpo');
			return false;
		});
		setTimeout(function () {
			$(".box-menu li a[data-target='" + PageActive + "']").trigger('click')
		}, 500);

		$(".box-menu li a[data-target='" + PageActive + "']").parent().addClass('current');
		if ($('#resolution-page,#contact-page').length) {
			if ($('.padding-main.current').length) {
				setTimeout(function () {
						var div1 = $(".padding-main.current").offset().top;
						$('html, body').stop().animate({
							scrollTop: div1 - 100
						}, 2000, 'easeInOutExpo');
					},
					500);
			};
		};
		if ($('#about-page, #about-quality-page, #about-library-page').length) {
			if ($('.sec-post.current').length) {
				setTimeout(function () {
						var div1 = $(".sec-post.current").offset().top;
						$('html, body').stop().animate({
							scrollTop: div1 - 100
						}, 2000, 'easeInOutExpo');
					},
					500);
			};
		};
	}
	if ($('.sub-nav').length) {
		var page = $(".sub-nav li.current a").attr('data-target');
		$(".box-menu li a[data-target='" + page + "']").parent().addClass('current');
	}
	if (document.getElementById('slugCurrent') != null) {
		slug = document.getElementById('slugCurrent').value;
	}

	if (slug != '') {
		$("[data-slug]").removeClass("current");
		$("[data-slug='" + slug + "']").addClass('current');
	}

	if (document.getElementById('slugCurrentParent') != undefined) {
		slugCurrentPrent = document.getElementById('slugCurrentParent').value;
		if (slugCurrentPrent != '') {
			$("[data-slug]").removeClass("current");
			$("[data-slug='" + slugCurrentPrent + "']").addClass("current");
		}
	}


	LinkPage();

	// $("a[href='" + window.location.href + "']").parent().addClass("current");

	$("[data-slug='" + slug + "']").addClass("current");
	var SlugActive = $("#SlugActive").val();
	$("[data-slug='" + SlugActive + "']").parent().addClass("current");



}

function CountTo() {
	/* SCROLL NUMBER */
	$('.show-text .num-s, .on-show .num-s').each(function () {

		var $this = $(this),
			countTo = $this.attr('data-count');
		$({
			countNum: $this.text()
		}).animate({
				countNum: countTo
			},

			{
				duration: 2000,
				easing: 'swing',
				step: function () {
					$this.text(Math.floor(this.countNum));
				},
				complete: function () {
					$this.text(this.countNum);
					//alert('finished');
				}

			});
	});
}


function ThumbZoom(img, Text) {

	$('html, body').addClass('no-scroll');
	$(this).parent().addClass('to-scroll');
	if (!$('.loadx').length) {
		$('body').append('<div class="loadx" style="display:block"></div>');
	}
	$('.all-pics').addClass('show');
	$('.all-pics').append('<div class="full"  style="display:block"></div>');
	$('.overlay-dark').addClass('show');

	var newActive = img;

	$('.all-pics').find('.full').append('<img src ="' + (newActive) + '" alt="pic" >');
	$('.all-pics').find('.full').append('<span></span>');
	$('body').append('<a class="close-pics" href="javascript:void(0);"></a>');
	$('.all-pics').append('<a class="close-pics-small" href="javascript:void(0);"></a>');
	$('.all-pics').prepend('<div class="text-length"><h3></h3></div>');

	$('.all-pics img').on("load", function () {
		$('.all-pics').addClass('show');
		$('.text-length h3').text(Text);

		if (TouchLenght == false || !isTouchDevice) {
			$('.full').addClass('dragscroll');
			$('.dragscroll').draptouch();
		} else {
			$('.full').addClass('pinch-zoom');
			$('.pinch-zoom').each(function (index, element) {
				new PinchZoom.default(element, {});
			});
		}



		if ($('.full img').length > 1) {
			$('.full img').last().remove()
		}


		$('.loadx').fadeOut(500, function () {
			if (TouchLenght == false || !isTouchDevice) {
				detectMargin();
			}

			$('.full img, .text-length').addClass('fadein');

			$('.loadx').remove();

		});

	});

	if ($(window).width() > 1100) {
		$('.full span').on('click', function () {
			$('.close-pics').trigger('click');
		});
	}

	$('.close-pics, .close-pics-small').on('click', function () {

		$('.full').fadeOut(300, 'linear', function () {
			$('.overlay-dark').removeClass('show');
			$('.all-pics .full, .all-pics .text-length, .all-pics .pinch-zoom-container').remove();
			$('.close-pics, .close-pics-small').remove();
			$('.all-pics').removeClass('show');
			$('html, body').removeClass('no-scroll');

			if ($('.to-scroll').length) {
				var top = $('.to-scroll').offset().top;
				if ($(window).width() < 1100) {
					$('html, body').scrollTop(top - 60);
				}
				$('.to-scroll').removeClass('to-scroll');
			}
		});

	});
}

function Zoom(elm) {

	$('html, body').addClass('no-scroll');
	zoomPC = true;
	$(this).parent().addClass('to-scrollZ');

	if (!$('.loadicon').hasClass('loader')) {
		$('.loadicon').show();
		$('.loadicon').addClass('loader');
		DrawLoad();
	}

	$('.all-pics').addClass('show');
	$('.all-pics').append('<div class="full size-large"  style="display:block"></div>');

	$('.overlay-dark').addClass('show');

	var activePicLarge = $(elm).attr("src");
	$('.all-pics').find('.full').append('<img src ="' + (activePicLarge) + '" alt="pic" />');

	$('.all-pics').find('.full').append('<span></span>');
	$('body').append('<div class="close-pics"></div>');
	$('.all-pics').append('<div class="close-pics-small"></div>');

	$('.all-pics img').on("load", function () {
		$('.all-pics').addClass('show');

		if (TouchLenght == false || !isTouchDevice) {
			$('.full').addClass('dragscroll');
			$('.dragscroll').draptouch();

		} else {
			$('.full').addClass('pinch-zoom');
			$('.pinch-zoom').each(function () {
				new Pic.PinchZoom($(this), {});
			});
		}

		if ($('.full img').length > 1) {
			$('.full img').last().remove()
		}

		$('.loadicon').fadeOut(400, 'linear', function () {

			if (TouchLenght == false || !isTouchDevice) {
				detectMargin();
			}

			$('.full img').addClass('fadein');
			$('.loadicon').removeClass('loader');
			$('.loadicon').removeClass('show');

		});

	});

	if ($(window).width() > 1100) {
		$('.full span').on('click', function () {
			$('.close-pics').trigger('click');
		});
	}

	$('.close-pics-small, .close-pics').on("click", function () {
		zoomPC = false;

		$('.loadicon').removeClass('loader');
		$('.loadicon').removeClass('show');
		$('.full').fadeOut(300, 'linear', function () {
			$('.overlay-dark').removeClass('show');
			$('.all-pics .full,  .all-pics .pinch-zoom-container').remove();
			$('.close-pics-small, .close-pics').remove();
			$('.all-pics').removeClass('show');

			if (!$('.house').length) {
				$('html, body').removeClass('no-scroll');

				if ($('.to-scrollZ').length) {
					var top = $('.to-scrollZ').offset().top;
					$('.to-scrollZ').removeClass('to-scrollZ');
					if ($(window).width() < 1100) {
						$('html, body').scrollTop(top - 60);
					}
				}
			}

		});

	});

}

function ShareSocial() {

	//var btq_google = 'https://plus.google.com/share?url=' + encodeURI(window.location.href);
	var btq_fb = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURI(window.location.href);
	var btq_linkedin = 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURI(window.location.href);
	// var btq_twitter = 'https://twitter.com/intent/tweet?text=' + encodeURI(window.location.href);
	$('.item-facebook').attr('href', btq_fb);
	$('.item-linkedin').attr('href', btq_linkedin);
	// $('.item-twitter').attr('href', btq_twitter);
	//$('.item-google').attr('href', btq_google);

}

function ZoomPic() {

	$('img').on("click", function () {

		if ($(this).hasClass('zoom-pic') && $(window).width() <= 840) {
			$('html, body').addClass('no-scroll');
			$(this).parent().addClass('to-scrollZ');

			if (!$('.loadx').length) {
				$('body').append('<div class="loadx" style="display:block"></div>');
			}

			$('.all-pics').addClass('show');
			$('.all-pics').append('<div class="full"  style="display:block"></div>');
			if (!$('.details-content').length) {
				$('.overlay-dark').addClass('show');
			} else {
				$('.overlay-dark').addClass('level-index-in');
			}
			var activePicLarge = $(this).attr("src");

			$('.all-pics').find('.full').append('<img src ="' + (activePicLarge) + '" alt="pic" />');
			$('.all-pics').find('.full').append('<span></span>');
			$('body').append('<div class="close-pics"></div>');
			$('.all-pics').append('<div class="close-pics-small"></div>');

			$('.all-pics img').on("load", function () {
				$('.all-pics').addClass('show');

				if (TouchLenght == false || !isTouchDevice) {
					$('.full').addClass('dragscroll');
					$('.dragscroll').draptouch();

				} else {
					$('.full').addClass('pinch-zoom');
					$('.pinch-zoom').each(function (index, element) {
						new PinchZoom.default(element, {});
					});
				}

				if ($('.full img').length > 1) {
					$('.full img').last().remove()
				}

				$('.loadx').fadeOut(400, 'linear', function () {

					if (TouchLenght == false || !isTouchDevice) {
						detectMargin();
					}

					$('.full img').addClass('fadein');
					$('.loadx').remove();


				});

			});

			if ($(window).width() > 1100) {
				$('.full span').on('click', function () {
					$('.close-pics').trigger('click');
				});
			}

			$('.close-pics-small, .close-pics').on("click", function () {
				$('.loadx').remove();
				$('.full').fadeOut(300, 'linear', function () {
					$('.all-pics .full,  .all-pics .pinch-zoom-container').remove();
					$('.close-pics-small, .close-pics').remove();
					$('.all-pics').removeClass('show');

					if (!$('.details-content').length) {
						$('html, body').removeClass('no-scroll');
						$('.overlay-dark').removeClass('show');
						if ($('.to-scrollZ').length) {
							var top = $('.to-scrollZ').offset().top;
							$('.to-scrollZ').removeClass('to-scrollZ');
							if ($(window).width() < 1100) {
								$('html, body').scrollTop(top - 60);
							}
						}
					} else {
						$('.overlay-dark').removeClass('level-index-in');
					}

				});

			});

		}

		return false;

	});

}

function productImg(url) {

	$.ajax({
		url: url,
		cache: false,
		success: function (data) {
			$('.img-detail-load').remove();

			$('.left-detail').append(data);

			$('.loadx').fadeOut(400, 'linear', function () {
				$('.loadx').remove();
			});
			thumbslider();
			$('.left-detail').animate({
				'opacity': 1
			}, 500, 'linear', function () {
				$('.left-detail').addClass('show');

			});

		}
	});

}

//NEWS
function NewsLoad(url) {

	$('.load-details').remove();

	$.ajax({
		url: url,
		cache: false,
		success: function (data) {

			$('.load-data').append(data);
			$('.load-content').css({
				'min-height': $(window).height() - 100
			});

			$('.load-text a, .load-text p a').click(function (e) {
				e.preventDefault();
				var url = $(this).attr('href');
				window.open(url, '_blank');
				return false;
			});

			if ($(window).width() <= 840) {
				$('.load-text img').addClass('zoom-pic');
				ZoomPic();
			}

			$('.loadx').fadeOut(400, 'linear', function () {
				$('.news-link').removeClass('no-link');
				$('.loadx').remove();
			});

			$('.load-data').animate({
				'opacity': 1
			}, 500, 'linear', function () {
				Details = 1;
				$('.load-content').addClass('show');


				if ($(window).width() > 1100) {
					$('.news-link').each(function (index, element) {
						var Goto = $(element).find('.link-page.current').parent().index();
						$(element).data('btq.slidebox').to(Goto, 300, true);
					});

				} else {
					detectBut();
				}
				onScroll();
			});


		}
	});

}


function NewsListLoad(url) {
	$('.news-list').remove();

	$.ajax({
		url: url,
		cache: false,
		success: function (data) {

			$('.load-list').append(data);
			Loadpic();
			onScroll();

			$('.loadx').fadeOut(400, 'linear', function () {
				$('.loadx').remove();
			});

			$('.load-list').animate({
				'opacity': 1
			}, 500, 'linear', function () {
				Details = 1;
				$('.load-list').addClass('show');

			});


			var Goto = $('.slide-pagi a.current').parent().parent().index() - 1;
			setTimeout(function () {
				$('.slide-pagi').data('btq.slidebox').to(Goto, 300, true);
			}, 500);

			LinkPage()

		}
	});

}

function loadData(url) {
	$('.list-pro').remove();

	$.ajax({
		url: url,
		cache: false,
		success: function (data) {

			$('.load-data').append(data);
			Loadpic();
			onScroll();

			$('.loadx').fadeOut(400, 'linear', function () {
				$('.loadx').remove();
			});

			$('.load-data').animate({
				'opacity': 1
			}, 500, 'linear', function () {
				Details = 1;
				$('.load-data').addClass('show');

			});
			LinkPage()
		}
	});

}

function Option() {

	$('.brochure-but, .item-catalogue a, .pdf-download').on("click", function (e) {
		e.preventDefault();
		var url = $(this).attr('href');
		window.open(url, '_blank');
		return false;

	});


	$('.item-box, .item-box img, .item-video, .item-pic-pro').on("click", function (e) {
		$(this).find('a').trigger('click');
	});




	$('.player').on('click', function (e) {
		e.preventDefault();
		$(this).parent().addClass('to-scrollV');

		var idx = $(this).attr('href');

		var youTubeUrl = $(this).attr('data-embed');
		var youTubeId;
		var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		var match = youTubeUrl.match(regExp);
		if (match && match[2].length == 11) {
			youTubeId = match[2];
		} else {
			youTubeId = 'no video found';
		}


		var Source = '<iframe id="VYT" src="https://www.youtube.com/embed/' + youTubeId + '?autoplay=1&enablejsapi=1&controls=1&loop=0&playsinline=1&color=white&rel=0&cc_load_policy=1&playlist=' + youTubeId + '" frameborder="0"  allow="autoplay" allowfullscreen></iframe>';
		console.log(Source)
		if (!$('.loadx').length) {
			$('body').append('<div class="loadx" style="display:block"></div>');
		}

		$('html, body').addClass('no-scroll');
		$('.overlay-dark').addClass('show');

		$('.allvideo').fadeIn(300, 'linear', function () {
			VideoLoad(idx, Source);
		});
		return false;
	});



	$('.view-album, .view-album-1').on("click", function (e) {

		e.preventDefault();
		var url = $(this).attr('href');

		var num = $(this).attr('data-go') || -1;
		if ($('.slide-pic').length) {
			$('.slide-pic').trigger('stop.btq.autoplay');
		}

		if (!$('.loadx').length) {
			$('body').append('<div class="loadx" style="display:block"></div>');
		}

		$('html, body').addClass('no-scroll');
		$('.overlay-dark').addClass('show');

		$('.all-album').fadeIn(300, 'linear', function () {
			AlbumLoad(url, num);

		});

		return false;


	});


	$('.zoom').on("click", function () {


		$('html, body').addClass('no-scroll');

		if (!$('.loadx').length) {
			$('body').append('<div class="loadx" style="display:block"></div>');
		}

		$('.all-pics').addClass('show');
		$('.all-pics').append('<div class="full"  style="display:block"></div>');
		$('.overlay-dark').addClass('show');

		var newActive = $(this).attr('data-pic');
		var Text = $(this).parent().find('h3').text();
		$('.all-pics').find('.full').append('<img src ="' + (newActive) + '" alt="pic" />');
		$('.all-pics').find('.full').append('<span></span>');
		$('body').append('<div class="close-pics"></div>');
		$('.all-pics').append('<div class="close-pics-small"></div>');
		$('.all-pics').prepend('<div class="text-length"><h3></h3></div>');
		$('.text-length h3').text(Text);

		$('.all-pics img').on("load", function () {
			$('.all-pics').addClass('show');

			if (TouchLenght == false || !isTouchDevice) {
				$('.full').addClass('dragscroll');
				$('.dragscroll').draptouch();
			} else {
				$('.full').addClass('pinch-zoom');
				$('.pinch-zoom').each(function (index, element) {
					new PinchZoom.default(element, {});
				});
			}

			if ($('.full img').length > 1) {
				$('.full img').last().remove()
			}

			$('.loadx').fadeOut(400, 'linear', function () {

				if (TouchLenght == false || !isTouchDevice) {
					detectMargin();
				}

				$('.full img, .text-length').addClass('fadein');
				$('.loadx').remove();

			});

		});

		if ($(window).width() > 1100) {
			$('.full span').on('click', function () {
				$('.close-pics').trigger('click');
			});
		}


		$('.close-pics, .close-pics-small').on("click", function () {

			$('.loadx').remove();
			$('.full').fadeOut(300, 'linear', function () {

				$('.overlay-dark').removeClass('show');
				$('.all-pics .full, .all-pics .text-length, .all-pics .pinch-zoom-container').remove();
				$('.close-pics, .close-pics-small').remove();
				$('.all-pics').removeClass('show');
				$('html, body').removeClass('no-scroll');

			});

		});

		return false;
	});



}



function turnWheelTouch() {
	doWheel = true;
	doTouch = true;
}


function detectBut() {


	if ($(window).width() <= 1100 && $('.sub-nav li.current').length) {
		var Left = $('.sub-nav ul').offset().left;
		var XLeft = $('.sub-nav li.current').offset().left;
		var Middle = $(window).width() / 2 - $('.sub-nav li.current').width() / 2;
		$('.sub-nav').stop().animate({
			scrollLeft: (XLeft - Middle) - Left
		}, 'slow');

	}


	if ($(window).width() <= 1100 && $('.sub-news').length) {
		var Left = $('.sub-news ul').offset().left;
		var XLeft = $('.sub-news li.current').offset().left;
		var Middle = $(window).width() / 2 - $('.sub-news li.current').width() / 2;
		$('.sub-news').stop().animate({
			scrollLeft: (XLeft - Middle) - Left
		}, 'slow');
	}

	if ($(window).width() <= 1100 && $('.link-page').hasClass('current')) {

		var Current = $('.link-page.current').parent().parent();
		var Left = $('.news-link').offset().left;
		var XLeft = $('.link-page.current').offset().left;
		var Center = $('.scroll-slide').width() / 2 - $('.link-page.current').width() / 2;
		$(Current).stop().animate({
			scrollLeft: (XLeft - Center) - Left
		}, 'slow');

	}


}


function detectMargin() {
	var ImgW = $('.full img').width();
	var ImgH = $('.full  img').height();
	var Yheight = $(window).height();
	var Xwidth = $(window).width();

	if (Xwidth > ImgW) {
		$('.full img').css({
			'margin-left': Xwidth / 2 - ImgW / 2
		});
	} else {
		$('.full img').css({
			'margin-left': 0
		});
	}
	if (Yheight > ImgH) {
		$('.full img').css({
			'margin-top': Yheight / 2 - ImgH / 2
		});
	} else {
		$('.full img').css({
			'margin-top': 0
		});
	}
}




$(document).ready(function () {
/*	$('.container').on('click', function () {
		if ($(window).width() > 1100) {
			if ($('.search-but').hasClass('active')) {
				$('.search-form, .search-but').removeClass('active');
			}
			if ($('.nav-click').hasClass('active')) {
				$('.nav-click').trigger('click');
			}
		}
		return false;
	});*/

	var langId = getCookie("lang");
	if (langId != undefined)
		$(".language #lang-" + langId).addClass("active");


	$(document).bind('scroll', function () {
		var currenttop = $(document).scrollTop();
		var scrollY = $(window).scrollTop();
		var Banner = $('.slide-pics ').innerHeight();

		if ($(window).width() <= 1100) {
			if (currenttop > 100) {
				$('.scroll-down').fadeOut(500, 'linear');
			} else {
				$('.scroll-down').fadeIn(500, 'linear');
			}
		}
		if (windscroll >= 100) {
			$('.header').addClass('hide');
		} else {
			$('.header').removeClass('hide');
		}


		if (currenttop > $(window).height() / 2) {
			$('.go-top').addClass('show');
		} else {
			$('.go-top').removeClass('show');
		}

		if ($('.second').length) {
			if (currenttop >= Banner) {
				$('.second').addClass('fixed');
			} else {
				$('.second').removeClass('fixed');
			}
		}


		if (!$('#home-page').length) {
			window.requestAnimationFrame(function () {
				if ($(window).width() > 1100) {
					$('.banner-page').css({
						'-webkit-transform': 'translateY(' + scrollY * 0.3 + 'px)',
						'transform': 'translateY(' + scrollY * 0.3 + 'px)'
					});
				}
				onScroll()
			})

		}
		if ($('.item-num').length) {
			$('.num-s').addClass('on-show')
			CountTo()
		}
		var items = $('.item-left, .item-right');
		$(items).each(function (index, element) {
			var speed = $(this).attr('data-scroll');
			if (speed !== '') {
				var pos = scrollY / speed;
				window.requestAnimationFrame(function () {
					$(element).css({
						"-webkit-transform": "translate3d( 0px, " + pos / 0.9 + "px, 0px)",
						"transform": "translate3d(0px, " + pos / 0.9 + "px, 0px)"
					});
				});
			}
		});

		windscroll = currenttop;

	});


	document.addEventListener('keydown', function (e) {

		var keyCode = e.keyCode || e.which;
		if (keyCode === 38) {
			$('.box-nav li.current').prev().trigger('click');
		}
		if (keyCode === 40) {
			$('.box-nav li.current').next().trigger('click');
		}
		if (keyCode === 27) {
			if ($('.content-popup-marterial').length) {
				$('.close-box').trigger('click');
			}
			if ($('.full img').length) {
				$('.close-pics').trigger('click');
			}

		}

	});



	$('.go-top').on('click', function () {
		$('html, body').animate({
			scrollTop: 0
		}, 'slow');
	});


	$('.container').on("click", function () {
		$('.nav-click').removeClass('active');
		$('.bg-nav').removeClass('show');
		$('.container').removeClass('wrap');

		if ($('a.search').hasClass('active')) {
			$('.search-form').removeClass('show');
			$('a.search').removeClass('active');
		}

	});

	setTimeout(function () {
		if (Loadx == 0) {
			Loadx = 1;
			Done();
		}
	}, 1500);


});

window.onorientationchange = ResizeWindows;
$(window).on("orientationchange", function () {
	if ($(window).width() <= 1100) {
		ScrollHoz();
	}

});

$(window).resize(function () {
	if ($(window).width() > 1100) {
		if ($('.news-text img').hasClass('zoom-pic')) {
			$('.close-pics-small').trigger('click');
		}
	}


	ResizeWindows();

});

$(window).on('resize', function () {
	ResizeWindows();
	detectMargin();
	//-----------------------------			
	//  DESKTOP 	
	if ($(window).width() > 1100) {
		var startAni = false;



		if ($('.dragscroll').length) {
			detectMargin();
			$('.dragscroll').draptouch();

		}

		if ($('#home-page, #products-page, #projects-page').length) {
			if (!$('.group-central').hasClass('show-text')) {
				BoxSlide();
			}
		}

		if ($('.slider-same').length) {
			if (!$('.slider-same').hasClass('slide-slidebox')) {
				SlidePicture();
			}
		}

		if ($('.slider-support').length) {
			if (!$('.slider-support').hasClass('slide-slidebox')) {
				SlidePicture();
			}
		}

		if ($('.slider-product').length) {
			if (!$('.slider-product').hasClass('slide-slidebox')) {
				SlidePicture();
			}
		}

		if ($('.scrollA, .scrollB, .scrollC').length) {
			setTimeout(function () {
				ScrollNiceA();
				ScrollNiceB();
				ScrollNiceC();
			}, 250);
		}
		$('.tab-des li.current a').trigger('click');


		if ($('.news-list, .tab-contentle, .sub-nav, .info-facilities, sub-news').hasClass('dragscroll')) {
			$('.news-list, .tab-contentle, .sub-nav, .info-facilities, .sub-news').removeClass('dragscroll draptouch-active draptouch-moving-left draptouch-moving-down');
			$('.news-list, .tab-contentle, .sub-nav, .info-facilities, .sub-news').css({
				'overflow': 'visible'
			});
		}



		//  DESKTOP 

		//-----------------------------		

		//  MOBILE 		
	} else {



		///////////////

		var startAni = true;


		if ($('.scrollA, .scrollB, .scrollC').length) {
			$('.scrollA, .scrollB, .scrollC').getNiceScroll().remove();
		}

		if ($('.slider-same').length) {
			if ($('.slider-same').hasClass('slide-slidebox')) {
				$('.slider-same').data('btq.slidebox').destroy();
			}
		}
		if ($('.item-color').length) {
			$('.item-color').on('click', function (e) {
				if ($(window).width() <= 1100) {
					var scrollTop = $('.content-detail').offset().top;
					$('html, body').stop().animate({
						scrollTop: scrollTop - 50
					}, 1000, 'easeInOutExpo');
				}

			});
		}

		if ($('.slider-support').length) {
			if ($('.slider-support').hasClass('slide-slidebox')) {
				$('.slider-support').data('btq.slidebox').destroy();
			}
		}

		if ($('.slider-product').length) {
			if ($('.slider-product').hasClass('slide-slidebox')) {
				$('.slider-product').each(function (index, element) {
					$(element).data('btq.slidebox').destroy();

				});
			}
		}


		setTimeout(function () {
			detectBut()
		}, 1000);

	}



	//  MOBILE 	 
	//-----------------------------	

	if ($('.slider-partner').length) {
		if ($(window).width() <= 540) {
			if ($('.slider-partner').hasClass('slide-slidebox')) {
				$('.slider-partner').data('btq.slidebox').destroy();
			}
		} else {
			if (!$('.slider-partner').hasClass('slide-slidebox')) {
				SlidePicture();
			}
		}
	}

}, 250);




function LocationHash() {
	var PageActive = window.location.hash;
	PageActive = PageActive.slice(1);
	$(".link-page a[data-details='" + PageActive + "']").trigger('click');
	$(".slide-pagi a[data-number='" + PageActive + "']").trigger('click');
	$(".table-re td a[data-name='" + PageActive + "']").trigger('click');
}


//WEB DYNAMIC

//popstate
$(window).bind("popstate", function (e) {
	if ($(window).width() > 1100) {
		e.preventDefault();
	}
	var httpserver = $('.httpserver').text();

	if ($(window).width() > 1100) {

		if (e.originalEvent.state !== null) {
			var tmp_url = e.originalEvent.state.path;
			var tmp_dataName = e.originalEvent.state.dataName;
			var tmptitle = e.originalEvent.state.title;
			var tmpurl = document.URL;
			changeUrl(tmp_url, tmptitle, '', '', tmp_dataName, '', '');
			var temp_url_1 = tmp_url.replace(httpserver, "");
			var tmp_1 = temp_url_1.split('/');

			if ($('#recruitment-page').length) {
				if ($('.close-popup').length) {
					$('.close-popup').trigger('click');
				} else {
					$(".nav li a").each(function (index, element) {
						if ($(element).attr('href') == tmp_url) {
							window.history.back();
						}
					});

					//$(".career-list td a").each(function(index, element) {
					$("td h3 a").each(function (index, element) {
						console.log($(element).attr('href'));
						if ($(element).attr('href') == tmp_url) {
							$(element).trigger('click');
						}
					});
				}
			}

			if ($('#logistics-page').length) {
				if ($('.close-popup').length) {
					$('.close-popup').trigger('click');
				} else {
					$(".nav li a").each(function (index, element) {
						if ($(element).attr('href') == tmp_url) {
							window.history.back();
						}
					});

					//$(".career-list td a").each(function(index, element) {
					$(".item-bus-a a").each(function (index, element) {
						if ($(element).attr('href') == tmp_url) {
							$(element).trigger('click');
						}
					});
				}
			}


			if ($('#news-detail-page').length) {

				$(".nav li a").each(function (index, element) {
					if ($(element).attr('href') == tmp_url) {
						window.history.back();
					}
				});
				$(".sub-nav li a").each(function (index, element) {
					if ($(element).attr('href') == tmp_url) {
						//window.history.back();
						$(element).trigger('click');
					}
				});
				$(".link-page a").each(function (index, element) {
					if ($(element).attr('href') == tmp_url) {
						$(element).trigger('click');
					}
				});
			}




		} else {
			var tmpurl = document.URL;

			var temp_url_1 = tmpurl.replace(httpserver, "");
			var tmp_1 = temp_url_1.split('/');


			if ($('#logistics-page').length) {
				if ($('.close-popup').length) {
					$('.close-popup').trigger('click');
				} else {
					$(".nav li a").each(function (index, element) {
						if ($(element).attr('href') == tmpurl) {
							window.history.back();
						}
					});

					$(".item-bus-a a").each(function (index, element) {
						if ($(element).attr('href') == tmpurl) {
							$(element).trigger('click');
						}
					});
				}
			}

			if ($('#recruitment-page').length) {
				if ($('.close-popup').length) {
					$('.close-popup').trigger('click');
				} else {
					$(".nav li a").each(function (index, element) {
						if ($(element).attr('href') == tmpurl) {
							window.history.back();
						}
					});

					$("td h3 a").each(function (index, element) {
						if ($(element).attr('href') == tmpurl) {
							$(element).trigger('click');
						}
					});
				}
			}



			if ($('#news-detail-page').length) {
				$(".nav li a").each(function (index, element) {
					if ($(element).attr('href') == temp_url_1) {
						window.history.back();
					}
				});
				$(".sub-nav li a").each(function (index, element) {
					if ($(element).attr('href') == temp_url_1) {
						//window.history.back();
						$(element).trigger('click');
					}
				});
				$(".link-page a").each(function (index, element) {
					if ($(element).attr('href') == temp_url_1) {
						$(element).trigger('click');
					}
				});
			}



		}
	} else {

		if (e.originalEvent.state !== null) {
			var tmp_url = e.originalEvent.state.path;
		} else {
			var tmp_url = document.URL;
		}

		var temp_url_1 = tmp_url.replace(httpserver, "");
		var tmp_1 = temp_url_1.split('/');

		if ($('#logistics-page').length) {
			if ($('.close-popup').length) {
				$('.close-popup').trigger('click');
			} else {
				$(".nav li a").each(function (index, element) {
					if ($(element).attr('href') == tmp_url) {
						window.history.back();
					}
				});

				$(".item-bus-a a").each(function (index, element) {
					if ($(element).attr('href') == tmp_url) {
						$(element).trigger('click');
					}
				});
			}

		}


		if ($('#recruitment-page').length) {
			if ($('.close-popup').length) {
				$('.close-popup').trigger('click');
			} else {
				$(".nav li a").each(function (index, element) {
					if ($(element).attr('href') == tmp_url) {
						window.history.back();
					}
				});

				$("td h3 a").each(function (index, element) {
					if ($(element).attr('href') == tmp_url) {
						$(element).trigger('click');
					}
				});
			}

		}



		if ($('#news-detail-page').length) {

			$(".nav li a").each(function (index, element) {
				if ($(element).attr('href') == temp_url_1) {
					window.history.back();
				}
			});

			$(".sub-menu li a").each(function (index, element) {
				if ($(element).attr('href') == temp_url_1) {
					$(element).trigger('click');
				}
			});

			$(".link-page a").each(function (index, element) {
				if ($(element).attr('href') == temp_url_1) {
					$(element).trigger('click');
					window.location = tmp_url;
				}
			});
		}
	}

});

if (iOS || isFirefox) {
	$(window).bind("pageshow", function (event) {
		if (event.originalEvent.persisted) {
			window.location.reload();
		}
	});
}


var agenMarker = [];
var agenShowInfo = [];



//var Local = [
//        {id:'agen_01',
//        lat:10.845265,
//        lng:106.677825,
//        html:'<h3>Showroom TP.Hồ Chí Minh</h3><p>462 – 464 Nguyễn Oanh, Phường 6, Quận Gò Vấp<br>Điện thoại: 0283) 895 2807'
//		},
//		{id:'agen_02',
//        lat:20.850262, 
//        lng:106.673434,
//        html:'<h3>Showroom Hải Phòng</h3><p>384 Tô Hiệu, Quận Lê Chân<br>Điện thoại: (0213) 3955.111'
//		},
//		{id:'agen_03',
//        lat:20.968469, 
//        lng:105.786943,
//        html:'<h3>Showroom hà nội</h3><p>211 Phùng Hưng, Phúc La, Quận Hà Đông<br>Điện thoại: (0243) 3120 90'
//		},
//		{id:'agen_04',
//        lat:16.003903, 
//        lng:108.207363,
//        html:'<h3>Showroom đà nẵng</h3><p>05 Phạm Hùng, P. Hòa Xuân, Q. Cẩm Lệ<br>Điện thoại: (0236).368.7876'
//		},
//]

var Local = [];

$.ajax({
	async: false,
	url: "/Home/GetListGoogleMap",
	method: "Post",
	success: function (result) {
		console.log(result);
		Local = result;
	}
});
//console.log(Local);

function agencyMap() {
	var URL = $('.sub-nav li.current a').attr('data-name');

	var agenLocations = Local;
	var Center = new google.maps.LatLng(16.003903, 108.207363);
	var Zoom = 5;


	var marker = null;
	var styles = [{
		stylers: [
			// { hue: "#929292"},
			{
				saturation: -30
			}
		]
	}, {
		featureType: "road",
		elementType: "geometry",
		stylers: [{
				lightness: -5
			},
			{
				visibility: "simplified"
			}
		]
	}, {
		featureType: "road",
		elementType: "labels",
		stylers: [{
			visibility: "on"
		}]
	}];

	var styledMap = new google.maps.StyledMapType(styles, {
		name: "Styled Map"
	});



	var mapOptions = {
		center: Center,
		zoom: Zoom,
		disableDefaultUI: true,
		clickableIcons: false,
		scrollwheel: false,
		gestureHandling: 'cooperative',
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'],
			position: google.maps.ControlPosition.TOP_RIGHT
		}
	};

	google.maps.event.addDomListener(window, "resize", function () {
		google.maps.event.trigger(map, "resize")
		map.setCenter(Center);
		map.setZoom(Zoom);
	});

	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

	var styledMapOptions = {
		name: "Galaxydoor"
	};
	var logo = '/Content/theme_btq/images/marker.png';



	for (var i = 0; i < agenLocations.length; ++i) {
		var Id = agenLocations[i].id;
		var Lat = agenLocations[i].lat;
		var Lng = agenLocations[i].lng;
		var Html = agenLocations[i].html;
		var Index = i;
		var showInfo = new google.maps.InfoWindow();
		var infobox = "<div class='infobox'><span class='close-infobox'></span><div class='infobox-inner'>" + Html + "</div></div>";

		agenMarker[Index] = new google.maps.Marker({
			position: {
				lat: Lat,
				lng: Lng
			},
			icon: logo,
			map: map,
			info: infobox,
			draggable: false,
			animation: google.maps.Animation.DROP,
		});

		agenMarker[Index].id = Id;
		agenInfo(map, agenMarker[i], Index, Id, Html);

	}


	function agenInfo(map, marker, Index, Id, Html) {

		google.maps.event.addListener(marker, 'click', function () {
			showInfo.setContent(this.info);
			showInfo.open(map, this);
			map.setCenter(marker.getPosition());
			// $(".list-view li").removeClass('active');
			// $(".list-view li[agen-id='" + Id + "']").addClass('active');
			// var Top =  $(".list-view li.active").offset().top;
			// var Height = $(".list-view ul").offset().top;
			// $(".list-view").stop().animate({ scrollTop: Top - (Height + 130)}, 600, 'easeInOutExpo');
			closeInfobox(map);
		});


		//   $('.list-view li').on('click', function(e){

		// 	e.preventDefault();
		// 	   if($(window).width() > 840){
		// 		  var agenId = $(this).attr('agen-id');
		// 		  for(var i = 0; i < agenMarker.length; i++){
		// 			  if(agenMarker[i].id == agenId){
		// 				  marker = agenMarker[i];
		// 				  break;
		// 			  }
		// 		  }

		// 		google.maps.event.trigger(agenMarker[i], 'click');

		// 		}

		//   return false;
		// });	
		function closeInfobox(map) {
			$('#map-canvas').on('click', '.close-infobox', function () {
				showInfo.close(map, this);
			});
		}

	}


	ZoomControl(map)
}

function ZoomControl(map) {
	$('.zoom-control a').on('click', function () {
		var zoom = map.getZoom();
		switch ($(this).attr("data-id")) {
			case "zoom-full":

				if ($('.map-view').hasClass('full-screen')) {
					$('html,body').removeClass('no-scroll');
					$('.header,.quick-box, .second, .title-page,.go-top, .outer-nav, .footer-inner').removeClass('no-index');
					$('.map-inner').removeClass('level-index-in');
					$('.map-view').removeClass('full-screen');
					$('.zoom-full').removeClass('active');
					map.setOptions({
						scrollwheel: false
					});
				} else {
					$('html,body').addClass('no-scroll');
					$('.header,.quick-box, .second, .title-page,.go-top, .outer-nav, .footer-inner').addClass('no-index');
					$('.map-inner').addClass('level-index-in');
					$('.map-view').addClass('full-screen');
					$('.zoom-full').addClass('active');
					map.setOptions({
						scrollwheel: true
					});

				}
				break;
			case "zoom-in":
				map.setZoom(++zoom);
				break;
			case "zoom-out":
				map.setZoom(--zoom);
				break;
			default:
				break
		}
		return false

	});

}

function DetectMap(map) {
	if ($('.gm-style').hasClass('fullcontent')) {
		$('body').addClass('fullcontent');
	} else {
		$('body').removeClass('fullcontent');
	}
}