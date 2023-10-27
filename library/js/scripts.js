/*
 * Bones Scripts File
 * Author: Eddie Machado
 *
 * This file should contain any js scripts you want to add to the site.
 * Instead of calling it in the header or throwing it inside wp_head()
 * this file will be called automatically in the footer so as not to
 * slow the page load.
 *
 * There are a lot of example functions and tools in here. If you don't
 * need any of it, just remove it. They are meant to be helpers and are
 * not required. It's your world baby, you can do whatever you want.
*/


/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
*/
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y };
}
// setting the viewport width
var viewport = updateViewportDimensions();


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
*/
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
		if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;


/*
 * Here's an example so you can see how we're using the above function
 *
 * This is commented out so it won't work, but you can copy it and
 * remove the comments.
 *
 *
 *
 * If we want to only do it on a certain page, we can setup checks so we do it
 * as efficient as possible.
 *
 * if( typeof is_home === "undefined" ) var is_home = $('body').hasClass('home');
 *
 * This once checks to see if you're on the home page based on the body class
 * We can then use that check to perform actions on the home page only
 *
 * When the window is resized, we perform this function
 * $(window).resize(function () {
 *
 *    // if we're on the home page, we wait the set amount (in function above) then fire the function
 *    if( is_home ) { waitForFinalEvent( function() {
 *
 *	// update the viewport, in case the window size has changed
 *	viewport = updateViewportDimensions();
 *
 *      // if we're above or equal to 768 fire this off
 *      if( viewport.width >= 768 ) {
 *        console.log('On home page and window sized to 768 width or more.');
 *      } else {
 *        // otherwise, let's do this instead
 *        console.log('Not on home page, or window sized to less than 768.');
 *      }
 *
 *    }, timeToWaitForLast, "your-function-identifier-string"); }
 * });
 *
 * Pretty cool huh? You can create functions like this to conditionally load
 * content and other stuff dependent on the viewport.
 * Remember that mobile devices and javascript aren't the best of friends.
 * Keep it light and always make sure the larger viewports are doing the heavy lifting.
 *
*/

/*
 * We're going to swap out the gravatars.
 * In the functions.php file, you can see we're not loading the gravatar
 * images on mobile to save bandwidth. Once we hit an acceptable viewport
 * then we can swap out those images since they are located in a data attribute.
*/
function loadGravatars() {
	// set the viewport using the function above
	viewport = updateViewportDimensions();
	// if the viewport is tablet or larger, we load in the gravatars
	if (viewport.width >= 768) {
		jQuery('.comment img[data-gravatar]').each(function(){
			jQuery(this).attr('src',jQuery(this).attr('data-gravatar'));
		});
	}
} // end function

// get query string parameters
// http://stackoverflow.com/questions/4656843/jquery-get-querystring-from-url
function getQueryString() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		// if the key in the query string has no value, set the value to true
		if (hash[1] == undefined) {
			hash[1] = true;
		}
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

// The YouTube Iframe API function has to be in the global scope, so it's out here outside of jQuery document.ready
// Using jQuery deferred objects to be able to run jQuery when the function runs
// http://stackoverflow.com/questions/17753525/onyoutubeiframeapiready-inside-jquerydocument-ready
var YouTubeDeferred = jQuery.Deferred();
window.onYouTubeIframeAPIReady = function(){
	YouTubeDeferred.resolve(window.YT);
}


/*
 * Put all your regular jQuery in here.
*/
jQuery(document).ready(function($) {
	loadGravatars();
	var win = $(window);
	var html = $('html');
	var body = $('body');
	
	// Check what page we're on
	if (typeof isHome === "undefined") var isHome = body.hasClass('home');
	if (typeof isVideo === "undefined") var isVideo = body.hasClass('video-gallery') || body.hasClass('single-show') || body.hasClass('home');
	if (typeof isVideoGallery === "undefined") var isVideoGallery = body.hasClass('video-gallery');
	if (typeof isSingleShow === "undefined") var isSingleShow = body.hasClass('single-show');
	
	win.resize(function() {
		waitForFinalEvent( function() {
			headerHeight();
			if ($('.ov.active').length > 0) {
				ovCheckHeight($('.ov.active'));
			}
			if (isHome) {
				screenRatioCheck();
			}
		}, timeToWaitForLast, 'resizeWindow');
	});
	
	win.scroll(function() {
		headerHeight();
	});
	
	// Control mobile main nav
	$('.TRIGGER_NAV').click(function(e) {
		e.preventDefault();
		$(this).add('.MAIN_NAV').toggleClass('active');
		html.toggleClass('mobile-nav-active');
	});
	
	function headerHeight() {
		var scrollTrigger = 0;
		if (win.scrollTop() > scrollTrigger) {
			html.addClass('scrolled');
		} else {
			html.removeClass('scrolled');
		}
	}
	
	function screenRatioCheck() {
		console.log('screenRatioCheck');
		var winHeight = $(window).height();
		var winWidth = $(window).width();
		var HDRatio = 16 / 9;
		if (winWidth / winHeight > HDRatio) {
			body.addClass('widerScreenRatio').removeClass('tallerScreenRatio');
		} else if(winWidth / winHeight < HDRatio) {
			body.addClass('tallerScreenRatio').removeClass('widerScreenRatio');
		} else {
			body.removeClass('widerScreenRatio tallerScreenRatio');
		}
	}
	
	function ovOpen(ov) {
		console.log('clicked');
		console.log(ov);
		if (ov.parents('#ov_container').length < 1) {
			ov.appendTo('#ov_container');
		}
		ov.addClass('active');
		ovCheckHeight(ov);
		$('html').addClass('ov-active');
	}
	function ovClose(ov,callback) {
		ov.removeClass('active');
		if ($('.ov.active').length < 1) {
			$('html').removeClass('ov-active');
		}
		if (callback) { callback(); }
	}
	function ovCheckHeight(ov) {
		var ovChild = ov.children().first();
		if (ovChild.outerHeight() > ov.height()) {
			ov.addClass('too-tall');
		} else {
			ov.removeClass('too-tall');
		}
	}
	$('.OV_CLOSE').click(function(e) {
		e.preventDefault();
		ovClose($(this).closest('.OV'));
	});
	win.keyup(function(e) {
		if (e.keyCode == 27 || e.which == 27) {
			if (player) {
				player.pauseVideo();
				clearVideoIntervalCheck();
			}
			if ($('.OV.active').length > 0) {
				$('.OV.active').find('.OV_CLOSE,.GALLERY_OV_CLOSE').click();
			}
		} else if ($('.GALLERY_OV.active').length > 0 && (e.keyCode == 37 || e.which == 37 || e.keyCode == 39 || e.which == 39)) {
			var galSlider = $('.GALLERY_OV.active .GALLERY_SLIDER');
			if (e.keyCode == 37 || e.which == 37) {
				galSlider.slick('slickPrev');
			} else if (e.keyCode == 39 || e.which == 39) {
				galSlider.slick('slickNext');
			} 
		}
	});
	
	if (isHome) {
		screenRatioCheck();
	}
	
	if (isVideoGallery) {
		var catSelect = $('.CAT_SELECT');
		var thumbsList = $('.VID_THUMBS_LIST');
		function makeCatSelection() {
			if (catSelect.val() == '') {
				thumbsList.children('li').addClass('selected');
			} else {
				thumbsList.children('li').removeClass('selected').filter('.'+catSelect.val()).addClass('selected');
			}
		}
		makeCatSelection();
		catSelect.change(function() {
			makeCatSelection();
		});
		var queryString = getQueryString();
		if (queryString['filter']) {
			var queryStringFilter = queryString['filter'];
			if (queryStringFilter == 'all') {
				catSelect.val('');
				catSelect.change();
			} else if (catSelect.find('option[value="cat-'+queryStringFilter+'"]').length > 0) {
				catSelect.val('cat-'+queryStringFilter);
				catSelect.change();
			}
		}
	}
	
	if (isVideo) {
		var player;
		var videoUpdateInterval;
		var nextVideoTriggered = false;
		var nextPlayCountdownNumber = 15;
		var playerContainer = $('.VID_PLAYER_OV');
		var playerWrap = playerContainer.find('.VID_PLAYER_WRAPPER');
		var vid_player_current_id = playerContainer.find('.VID_PLAYER_CURRENT_ID');
		var vid_next_id = playerContainer.find('.VID_NEXT_ID');
		var vid_next_page = playerContainer.find('.VID_NEXT_PAGE');
		var vid_next_title = playerContainer.find('.VID_NEXT_TITLE');
		var vid_next_thumb = playerContainer.find('.VID_NEXT_THUMB');
		var vid_credits_timecode = playerContainer.find('.VID_CREDITS_TIMECODE');
		var vid_episode_index = playerContainer.find('.VID_EPISODE_INDEX');
		var next_play_countdown = $('.NEXT_PLAY_COUNTDOWN');
		var closeButton = $('.VID_PLAYER_OV .OV_CLOSE');
		function videoIntervalCheck() {
			clearInterval(videoUpdateInterval);
			if (vid_credits_timecode.val() != '' && vid_next_id.val()) {
				videoUpdateInterval = setInterval(function () {
					if (parseInt(player.getCurrentTime()) > parseInt(vid_credits_timecode.val())) {
						if (!nextVideoTriggered) {
							playerWrap.addClass('next-video-triggered');
							if (document.exitFullscreen) {
								document.exitFullscreen();
							} else if (document.msExitFullscreen) {
								document.msExitFullscreen();
							} else if (document.mozCancelFullScreen) {
								document.mozCancelFullScreen();
							} else if (document.webkitExitFullscreen) {
								document.webkitExitFullscreen();
							}
							nextVideoTriggered = true;
							nextPlayCountdownNumber = parseInt(player.getDuration()) - parseInt(player.getCurrentTime()) -1 < 12 ? parseInt(player.getDuration()) - parseInt(player.getCurrentTime()) -1  : 12
						} else {
							nextPlayCountdownNumber = nextPlayCountdownNumber - 1;
						}
						next_play_countdown.text(nextPlayCountdownNumber);
						if (nextPlayCountdownNumber <= 0) {
							clearVideoIntervalCheck();
							var nextPageHref = vid_next_page.filter(':first').attr('href');
							if (isSingleShow && vid_episode_index.val() == 0 && typeof nextPageHref !== typeof undefined && nextPageHref != false) {
								location.href = vid_next_page.attr('href');
							} else {
								playNextVideo();
							}
						}
					}
				}, 1000);
			}
		}
		function clearVideoIntervalCheck() {
			clearInterval(videoUpdateInterval);
			playerWrap.removeClass('next-video-triggered');
		}
		YouTubeDeferred.done(function(YT) {
			player = new YT.Player('video_player', {
				width:1920,
				height:1080,
				events: {
					onReady: function() {
						if (isSingleShow) {
							var queryString = getQueryString();
							if (queryString['autoplay']) {
								$('.TRIGGER_VIDEO').click();
							}
						}
					},
					onStateChange : function(e) {
						if (e.data == 1 && !mobileDeviceType()) {
							videoIntervalCheck() ;
						} else {
							clearVideoIntervalCheck();
						}
					}
				},
				playerVars: {
					'rel':0,
					'showinfo':0
				}
			});
			
		});
		$('.VID_THUMBS_LIST a.VIDEO_PLAY, .TRIGGER_VIDEO').click(function(e) {
			e.preventDefault();
			vid_episode_index.val(0); // only the first episode on a series page uses this counter to go the next video
			// all other episodes are just treated as single videos
			playVideo($(this));
		});
		function playVideo(instigator) {
			playerContainer.data('instigator',instigator);
			clearVideoIntervalCheck();
			var episodeIndex = parseInt(vid_episode_index.val());
			nextVideoTriggered = false;
			var videoID = instigator.attr('data-video-ID-'+episodeIndex);
			if (videoID) {
				playerContainer.addClass('active');
				if (videoID != vid_player_current_id.val()) {
					vid_player_current_id.val(videoID);
					var nextVideoID = instigator.attr('data-video-ID-'+ (episodeIndex + 1));
					if (instigator.attr('data-show-type') == 'series' && typeof nextVideoID !== typeof undefined && nextVideoID !== false) {
						var nextTitle = instigator.attr('data-show-title') + ' - Episode '+ (episodeIndex + 2);
						vid_next_id.val(nextVideoID);
						vid_next_title.text(nextTitle);
						vid_next_thumb.attr({
							'src':instigator.attr('data-thumb-src-'+ (episodeIndex + 1)),
							'alt':nextTitle
						});
						vid_episode_index.val(episodeIndex + 1);
					} else {
						vid_next_id.val(instigator.attr('data-next-ID'));
						vid_next_title.text(instigator.attr('data-next-title'));
						vid_next_thumb.attr({
							'src':instigator.attr('data-next-thumb-src'),
							'alt':instigator.attr('data-next-title')
						});
						vid_episode_index.val(0);
					}
					var nextPageAttr = instigator.attr('data-next-page');
					if (typeof nextPageAttr !== typeof undefined && nextPageAttr != false) {
						vid_next_page.attr('href', instigator.attr('data-next-page') + '?autoplay');
					} else {
						vid_next_page.attr('href', '');
					}
					vid_credits_timecode.val(instigator.attr('data-credits-timecode-'+(episodeIndex)));
					//player.loadVideoById(videoID); // this will load and then immediately play the video
					player.cueVideoById(videoID); // this will load the video but require the user to press the play button
				}
				player.playVideo();
			}
		}
		closeButton.click(function() {
			player.pauseVideo();
			clearVideoIntervalCheck();
		});
		$('.CANCEL_AUTOPLAY').click(function(e) {
			e.preventDefault();
			clearVideoIntervalCheck();
		});
		vid_next_page.click(function(e) {
			var nextHref = $(this).attr('href');
			if (!isSingleShow || vid_episode_index.val() != 0 || typeof $(this).attr('href') === typeof undefined || $(this).attr('href') == false) {
				e.preventDefault();
				playNextVideo();
			}
		});
		function playNextVideo() {
			if (vid_episode_index.val() == 0) {
				$('.VIDEO_PLAY').each(function() {
					if ($(this).attr('data-video-ID-0') == vid_next_id.val()) {
						$(this).click();
						return false;
					}
				});
			} else {
				playVideo(playerContainer.data('instigator'));
			}
		}
	}
}); /* end of as page load scripts */
