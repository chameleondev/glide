'use strict';

angular.module('slideWebcastV3App')
	.directive('reveal',function(){
		return {
			restrict : 'A',
			link : function(scope,elem,attrs){

				
				
				Reveal.initialize({

				  // The "normal" size of the presentation, aspect ratio will be preserved
				  // when the presentation is scaled to fit different resolutions. Can be
				  // specified using percentage units.
				  width: 1024,
    			  height: 768,

    			  // Factor of the display size that should remain empty around the content
				  margin: 0,

				  // Bounds for smallest/largest possible scale to apply to content
				  minScale: 1,
				  maxScale: 1,

		          // Display controls in the bottom right corner
		          controls: false,

		          // Display a presentation progress bar
		          progress: false,

		          // Display the page number of the current slide
		          slideNumber: true,

		          // Push each slide change to the browser history
		          history: false,

		          // Enable keyboard shortcuts for navigation
		          keyboard: false,

		          // Enable the slide overview mode
		          overview: true,

		          // Vertical centering of slides
		          center: true,

		          // Enables touch navigation on devices with touch input
		          touch: false,

		          // Loop the presentation
		          loop: false,

		          // Change the presentation direction to be RTL
		          rtl: false,

		          // Turns fragments on and off globally
		          fragments: true,

		          // Flags if the presentation is running in an embedded mode,
		          // i.e. contained within a limited portion of the screen
		          embedded: true,

		          // Number of milliseconds between automatically proceeding to the
		          // next slide, disabled when set to 0, this value can be overwritten
		          // by using a data-autoslide attribute on your slides
		          autoSlide: 0,

		          // Stop auto-sliding after user input
		          autoSlideStoppable: true,

		          // Enable slide navigation via mouse wheel
		          mouseWheel: false,

		          // Hides the address bar on mobile devices
		          hideAddressBar: true,

		          // Opens links in an iframe preview overlay
		          previewLinks: false,

		          // Transition style
		          transition: 'cube', // default/cube/page/concave/zoom/linear/fade/none

		          // Transition speed
		          transitionSpeed: 'default', // default/fast/slow

		          // Transition style for full page slide backgrounds
		          backgroundTransition: 'default', // default/none/slide/concave/convex/zoom

		          // Number of slides away from the current that are visible
		          viewDistance: 3,

		          // Parallax background image
		          parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

		          // Parallax background size
		          parallaxBackgroundSize: '' // CSS syntax, e.g. "2100px 900px"


		      });

				 

			}
		};

	});



angular.module('reveal.directives',[])
	.directive('revealControl',function(){
		return {
			restrict : 'AE',
			scope : {
				mycontrol : '=' // = means it goes both ways, 2 way data binding
			},
			controller : function($scope){ // uses dependency injection
				 

			},
			link : function(scope,elem,attrs){ // for dom manipulation, events

				elem.on('click',function(){
					// alert(attrs.mycontrol);
					var direction = eval(attrs.mycontrol);
					console.log(direction);
					Reveal[direction]();
				})
			}
		};

	});