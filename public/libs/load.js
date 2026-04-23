var ua = navigator.userAgent;
var match = ua.match('MSIE (.)');
var versions = match && match.length > 1 ? match[1] : 'unknown';
var isTouchDevice =  "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch  || (navigator.msMaxTouchPoints>0) || (navigator.maxTouchPoints > 0);
var isDesktop = $(window).width() != 0 && !isTouchDevice ? true : false;
var IEMobile = ua.match(/IEMobile/i);
var isIE9 = /MSIE 9/i.test(ua); 
var isIE10 = /MSIE 10/i.test(ua);
var isIE11 = /rv:11.0/i.test(ua) && !IEMobile  ? true : false;
var isEge = /Edge\/12./i.test(navigator.userAgent)
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || ua.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isIE = false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia && !isIE11;
var isChrome = !!window.chrome && !!window.chrome.webstore ;
var isBlink = (isChrome || isOpera) && !!window.CSS;
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || !isChrome && !isOpera && window.webkitAudioContext !== undefined;
var isSafari5 = ua.match('Safari/') && !ua.match('Chrome') && ua.match(' Version/5.');
// Check Android version 
var AndroidVersion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
var Version = ua.match(/Android\s([0-9\.]*)/i);
// Check iOS8 version 
var isIOS8 = function() {
  var deviceAgent = navigator.userAgent.toLowerCase();
  return /iphone os 8_/.test(deviceAgent);
}
// Check iOS version 
function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
}
var iOS = iOSversion();

var ios, android, blackBerry, UCBrowser, Operamini, firefox, windows, smartphone, tablet,touchscreen, all;
var isMobile = {
  ios: (function(){
    return ua.match(/iPhone|iPad|iPod/i);
  }()),
  android: (function(){
    return ua.match(/Android/i);
  }()),
  blackBerry: (function(){
    return ua.match(/BB10|Tablet|Mobile/i);
  }()),
  UCBrowser: (function(){
    return ua.match(/UCBrowser/i);
  }()),
  Operamini: (function(){
    return ua.match(/Opera Mini/i);
  }()),
  
  windows: (function(){
    return ua.match(/IEMobile/i);
  }()),
  smartphone: (function(){
	return (ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && window.innerWidth <= 440 && window.innerHeight <= 740);
  }()),
  tablet: (function(){
    return (ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && window.innerWidth <= 1366 && window.innerHeight <= 800);
  }()),

  all: (function(){
    return ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
  }())
};



if(isTouchDevice  && isMobile.all !== null){
	var TouchLenght = true;
}else if(isMobile.tablet && isFirefox || isMobile.smartphone && isFirefox ){
	var TouchLenght = true;
}else{
	var TouchLenght = false;
}
if(isMobile.Operamini){
	alert('Please disable Data Savings Mode');
}


/*if(TouchLenght == true){
alert('Me')
}
*/

var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
 
//EXAMPLE ANIMATION CSS
/*$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});
$('#yourElement').animateCss('bounce');
*/

function changeUrl(url, title, description, keyword, dataName, titleog, descriptionog) {
    if (window.history.pushState !== undefined) {
        var c_href = document.URL;
        var httpserver = $('.httpserver').text();
        c_href = c_href.replace(httpserver, '');
        //console.log(c_href)
        //console.log(httpserver)
        //console.log(url)
        if (c_href != url && url != '')
            window.history.pushState({ path: url, dataName: dataName, title: title, keyword: keyword, description: description, titleog: titleog, descriptionog: descriptionog }, "", url);
    }
    if (title != '') {
        $('#hdtitle').html(title);
        $('meta[property="og:description"]').remove();
        $('#hdtitle').after('<meta property="og:description" content="' + descriptionog + '">');
        $('meta[property="og:title"]').remove();
        $('#hdtitle').after('<meta property="og:title" content="' + titleog + '">');
        $('meta[property="og:url"]').remove();
        $('#hdtitle').after('<meta property="og:url" content="' + url + '">');
        $('meta[name=keywords]').remove();
        $('#hdtitle').after('<meta name="keywords" content="' + keyword + '">');
        $('meta[name=description]').remove();
        $('#hdtitle').after('<meta name="description" content="' + description + '">');
    }
    $('#changlanguage_redirect').val(url);
}

var Loadx = 0;



function ResizeWindows() {
var Portrait = $(window).height() >= $(window).width();
var Landscape = $(window).height() < $(window).width();
var Xwidth = $(window).width();
var Yheight = $(window).height();
var RatioScreeen = Yheight / Xwidth; 
var RatioIMG = 1125 / 2000;
var RatioInner = 740 / 2000;
var RatioV = 1080 / 1920;
var RatioBanner = 2000/1125;

var percent1 = Xwidth/1900;
var percent2 = Xwidth/1600;
var percent3 = Xwidth/1700;
var percent4 = Xwidth/1500;

var HB = $('.slide-mask').innerHeight();
$('.title-page').css({'top': HB/2 - $('.title-page').innerHeight()/2});

 
    
		       if(Xwidth <= 1100){
					$('.banner-page').css({'-webkit-transform': 'translateY(0)', 'transform': 'translateY(0)'})
					if($('.scrollA, .scrollB, .scrollC').length){
				    	$('.scrollA, .scrollB, .scrollC').getNiceScroll().remove();
				  	}
					
				   	if(Xwidth <= 840){
                          $('.load-text img,.details-text img').addClass('zoom-pic');
                      }else{
						  $('.load-text img, .details-text img').removeClass('zoom-pic');
					}
					$('.all-tab-content, .tab-content').css({'width': '100%'});
					$('.all-tab-content').height('auto')

				 }else if( Xwidth > 1100){
                       	$('.tab-content').width(Xwidth);
						 $('.load-text img, .details-text img').removeClass('zoom-pic');
						
				 }
				 

}



function DrawLoad() {
	var Stroke = $('.load-present');
    var Paths = $(Stroke).find('path');

     $(Paths).each(function(index, element) {
		  var totalLength = this.getTotalLength();
		 if(isIE9 || isIE10 || isIE11 || isEdge){
			
               $(this).css({'stroke-dasharray': totalLength + ' ' + totalLength});
			    $(this).css({ 'stroke-dashoffset': totalLength, 'stroke-dasharray': totalLength + ' ' + totalLength});
			   $(this).stop().animate({'stroke-dashoffset': 0}, 1000, 'linear', function() {
				  $(this).stop().animate({'stroke-dashoffset': totalLength}, 1000, 'linear');
		       });
		   }
      });
	  
	 setTimeout(function(){ $('.loadicon').addClass('hide')}, 1100);
	 
}


function ScrollHoz() {
	var Scroll = $('.sub-nav, .scroll-slide, .content-table, .sub-nav, .info-facilities, .sub-news');
	if($(window).width() <= 1100){
		
       $(Scroll).css({'overflow-x':'scroll','overflow-y':'hidden','-ms-touch-action': 'auto','-ms-overflow-style' :'none', 'overflow':' -moz-scrollbars-none'});
	   $(Scroll).animate({scrollLeft: "0px"});
	   if(TouchLenght == false  || !isTouchDevice){ 
		   if($(window).width() <= 1100){
			  $(Scroll).mousewheel(function(e, delta) {
				  e.preventDefault();
				 if ($(window).width() <= 1100) {
				   this.scrollLeft -= (delta * 40);
				 }
			   });
			  
			    $(Scroll).addClass('dragscroll');
				$('.dragscroll').draptouch();
		   }
	   }
	    
	}
	 
}



function Done() {
ResizeWindows();
ScrollHoz();


 $('.go-top').removeClass('show');
 $('svg.shape').css({'transform-origin': '50% 0%', 'opacity': '1'});

   	if($(window).width() > 1100){
		 if($('#home-page, #products-page, #projects-page').length){
			  BoxSlide();
		 }
  	}



  $('.container').stop().animate({'opacity':1}, 600 ,'linear', function () {
	 $('html, body').animate({scrollTop:0}, 1);   
    ContentLoad();
	SlidePicture();
   });
   
    if($('.loadicon').length){
	  $('.loadicon').fadeOut(1000, function () {
		$('.loadicon').removeClass('loader');
		$('.loadicon').removeClass('show');
		$('.loadicon').removeClass('hide');
	  });
	}

  Loadpic()
}


function Loadpic(){
 $('.pic-img').each(function(index, element) {
 var IMG  = $(element).find('img').attr('src');
  if(IMG){
   var SRC = IMG.replace(/(^url\()|(\)$|[\"\'])/g, '');
   $(element).css({'background-image': 'url(' + SRC + ')'});
 }
});

}




$(document).ready(function () {
  ResizeWindows();
 $('html, body').animate({scrollTop:0}, 1);

if(!$('#home-page, #products-page, #projects-page').length){
  $('body, .footer').addClass('auto');
  if ($(window).width() > 1100) {
  	$('go-top').removeClass('show')
  }
}

 
  if(!$('.loadicon').hasClass('loader')){
       $('.loadicon').show();  
       $('.loadicon').addClass('loader');
	   DrawLoad();
 }
 
 	
  if( isIE10 || isIE11){
	  $('body').addClass('is-IE');
   }else if(isEdge){	
	  $('body').addClass('is-Edge');
  }else if(iOS){
	  $('body').addClass('is-IOS');
   }else if(isSafari){
	  $('body').addClass('is-Safari');	  
  }else if(isChrome){
	  $('body').addClass('is-Chrome');
  }	
  

  if($(".outer-nav").length ){
	   function CloneSub() {
		  var Clone = $(".outer-nav").clone();
		  $(".container").prepend(Clone);
		  $(Clone).addClass('second');
	  }

    CloneSub();
   }

  if(!isSafari){
   $('body').impulse({effect: 'easeOutQuad'});
  }
		
});



//SMOOTH WHEEL
// http://ataredo.com/external/code/lucid.js - to view the code
// http://ataredo.com/morphology/lucidscroll/ - documentation
(function($) {$.fn.impulse = function(options) {

	var gate = $(window),
	set = $.extend(true, {
	target: $(),
	delay: false
	}, $.fn.impulse.default, options),

	selector = this, object = set.target, gist, area = {}, edge = [],
	annul, entity, brink = [], outset = [], halt = [], flow, turned = 0,
	interrupt, kinetic, morph = [], hit, way, speed, destination = [],
	momentum, initial, bound;

	if (window.requestAnimationFrame) var neoteric = true;
	elementAnalysis();
	detectOverflow();
    

	selector.each(function(index) {
		
		var Scroll = $('.container');

		$(Scroll).mousewheel(function(ambit, delta) {

			if (annul) return false;
			else if (set.delay == true) annul = true;

			hit = index;

			if (gist && selector.length > 1) {
			entity = $(this);
			brink[0] = edge[hit];
			}
			else {
			entity = object;
			brink = edge;
			}

			entity.each(function(cue) {
			var genesis = outset[cue] = $(this).scrollTop();
			if (delta == 1 && genesis == 0 || delta == -1 && genesis == brink[cue]) halt[cue] = true;
			else halt[cue] = false;
			});

			if (ceaseOperation()) {
			annul = false;
			if (set.propagate == true) return;
			else return false;
			}

			if (flow != delta) turned = 1;
			else turned = Math.min(set.constrain, turned+1);

			if (set.fluid && turned == 1) morph[hit] = 'curve';
			else if (turned) morph[hit] = set.effect;

			interrupt = false;
			kinetic = delta;
			way = -delta*set.range*Math.pow(set.leap, turned-1);
			speed = set.tempo*Math.pow(set.sloth, turned-1);

			entity.each(function(order) {
			destination[order] = outset[order]+way;
			});

			if (neoteric) {
			if (momentum) cancelAnimationFrame(momentum);
			initial = Date.now();
			momentum = requestAnimationFrame(streamCore);
			}
			else inciteSource();

			return false;
		});
	});

	gate.resize(function() {
	clearTimeout(bound);
	bound = setTimeout(detectOverflow, 100);
	});

	return this;

	function streamCore() {
	flow = kinetic;
	var present = Date.now(),
	elapsed = Math.min(present-initial, speed),
	advance = elapsed/speed,
	increase = $.easing[morph[hit]](advance, elapsed, 0, 1, speed);
	entity.each(function(key) {
	if (!halt[key]) {
	var goal = outset[key]+increase*way;
	$(this).scrollTop(goal);
	checkLimits($(this), key, advance);
	}
	});
	if (advance < 1 && !interrupt) momentum = requestAnimationFrame(streamCore);
	else annul = false;
	}

	function inciteSource() {
	flow = kinetic;
	entity.each(function(beat) {
	if (!halt[beat]) {
	$(this).stop().animate({scrollTop: destination[beat]}, {
	duration: speed,
	easing: morph[hit],
	progress: function(current, sequence) {checkLimits($(this), beat, sequence)},
	complete: function() {annul = false}
	});
	}
	});
	}

	function checkLimits(essence, rank, factor) {
	if (100*factor >= set.reset) turned = 0;
	if (onFringe(essence, rank)) {
	halt[rank] = true;
	if (!neoteric) essence.stop(true, true);
	if (ceaseOperation()) {
	interrupt = true;
	turned = 0;
	}
	}
	}

	function onFringe(matter, cipher) {
	var put = matter.scrollTop(),
	above = put == 0 && destination[cipher] < 0,
	below = put == brink[cipher] && destination[cipher] > brink[cipher];
	return above || below;
	}

	function ceaseOperation() {
	return halt.every(function(flag) {return flag});
	}

	function elementAnalysis() {
	var item = $(), main;
	if (!object.length) {
	gist = true;
	object = selector;
	}
	object.each(function() {
	if (topLevel(this)) {
	if (!main) {
	if (neoteric) item = item.add(gate);
	else item = item.add(baseTag());
	main = true;
	}
	}
	else item = item.add($(this));
	});
	set.target = object = item;
	object.each(function(zest) {
	if (topLevel(this)) area[zest] = 'hub';
	else area[zest] = 'sub';
	});
	if (gist && selector.length != object.length) selector = object;
	}

	function topLevel(sample) {
	var peak = [window,document,'HTML','BODY'];
	return peak.indexOf(sample) > -1 || peak.indexOf(sample.tagName) > -1
	}

	function baseTag() {
	var origin = gate.scrollTop();
	gate.scrollTop(1);
	if ($('html').scrollTop()) var root = $('html');
	else if ($('body').scrollTop()) root = $('body');
	else root = $('html, body');
	if (origin) gate.scrollTop(origin);
	else gate.scrollTop(0);
	return root;
	}

	function detectOverflow() {
	object.each(function(unit) {
	if (area[unit] == 'hub') edge[unit] = $(document).height()-gate.height();
	else edge[unit] = this.scrollHeight-$(this).height();
	});
	}
};

$.fn.impulse.default = {
	range: 140,
	leap: 1.40,
	tempo: 500,
	sloth: 1.1,
	constrain: 5,
	reset: 85,
	effect: 'easeOutSine',
	fluid: false,
	propagate: true
};
}(jQuery));


$(window).on('beforeunload', function(){
  $(window).scrollTop(0);
});

if (!$('#projects-page, #products-page, #home-page, #thankyou').length){
	var el = document.querySelector('.ani-item:not(.thumb-pic)');
	if (el) {
		el.addEventListener('mouseenter', hintBrowser);
		el.addEventListener('animationEnd', removeHint);
	}

	function hintBrowser() {
	  this.style.willChange = 'transform, opacity';
	}
	function removeHint() {
	  this.style.willChange = 'auto';
	}
}
