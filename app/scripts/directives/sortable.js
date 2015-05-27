
//sortable directive 
angular.module('slideWebcastV3App').directive('sortable',function(dragDrop,$timeout){
	return {
		restrict : 'A',
		link : function(scope,elem,attrs){

			window.myscope = scope;

			$( "#sortable1, #sortable2" ).sortable({
		      connectWith: ".sort_me",
		      stop : function(){

		      	$('#sortable2 li').length === 4 ? scope.sortingComplete = true : false;

		      	scope.$apply();
		      }
		    });

		    scope.submitSelection = function(){
		    	// on submission of the form  disabled the sortable
              	$( '#sortable2' ).sortable( "disable" );
              	//set the submitted value to true so that we can disable the submit b utton
              	scope.submitted = true;

              	// capture the order of the sortable
              	var firstChoice = $('#sortable2 li:eq(0)').attr('id'),
					secondChoice = $('#sortable2 li:eq(1)').attr('id'),
					thirdChoice = $('#sortable2 li:eq(2)').attr('id'),
					fourthChoice = $('#sortable2 li:eq(3)').attr('id');

				// use dragDrop factory to select the correct object from firebase, then bind it to an object in the scope
				dragDrop(firstChoice).$bindTo(scope,firstChoice).then(function(){
					// we then increment the array position for whichever came first when the promise is returned from the scope binding
					scope[firstChoice][0]++;
				});

				dragDrop(secondChoice).$bindTo(scope,secondChoice).then(function(){
					// we then increment the array position for whichever came second 
					scope[secondChoice][1]++;
				});

				dragDrop(thirdChoice).$bindTo(scope,thirdChoice).then(function(){
					// we then increment the array position for whichever came third 
					scope[thirdChoice][2]++;
				});

				dragDrop(fourthChoice).$bindTo(scope,fourthChoice).then(function(){
					// we then increment the array position for whichever came fourth 
					scope[fourthChoice][3]++;
				});


				$timeout(function(){
					console.log(scope.SPH);

					angular.forEach(scope.SPH,function(val,key){
						console.log(val)
					})

					

				},2000)

				


				// console.log(scope.secondChoice);

				

              }  

		}
	}
});



angular.module('slideWebcastV3App').directive('doneSorting',function(webcastData,simpleLogin){
	return {
		restrict : 'A',
		link : function(scope,elem,attrs){

			console.log(simpleLogin.user.uid);
			console.log(webcastData);

			// elem.on('click',function(){
			// 	var  = $('#sortable2 li:eq(0)').attr('id'),
			// 		secondfirstChoiceChoice = $('#sortable2 li:eq(1)').attr('id'),
			// 		thirdChoice = $('#sortable2 li:eq(2)').attr('id'),
			// 		fourthChoice = $('#sortable2 li:eq(3)').attr('id');


			// 	var arr = [firstChoice,secondChoice,thirdChoice,fourthChoice];

			// 	webcastData.$add(arr);
				
			// 	console.log(webcastData);

			// 	$( "#sortable1, #sortable2" ).sortable( "disable" );

			// })

		}
	}
});

angular.module('slideWebcastV3App').directive('modal',function(){
	return {
		restrict : 'A',
		link : function(scope,elem,attrs){

		function adjustModalMaxHeightAndPosition(){
		  $('.modal').each(function(){
		    if($(this).hasClass('in') === false){
		      $(this).show();
		    }
		    var contentHeight = $(window).height() - 60;
		    var headerHeight = $(this).find('.modal-header').outerHeight() || 2;
		    var footerHeight = $(this).find('.modal-footer').outerHeight() || 2;

		    $(this).find('.modal-dialog').addClass('modal-dialog-center').css({
		      
		      'margin-top': function () {
		        var mH = $(this).outerHeight(); 
		        var wH = $(window).height();
		        return (mH < wH ) ? -( mH * 0.6): -( wH * 0.5) + 12;
		      },
		      'margin-left': function () {
		        return -($(this).outerWidth() / 2);
		      }
		    });
		    if($(this).hasClass('in') === false){
		      $(this).hide();
		    }
		  });
		}
		
		if ($(window).height() >= 320){
		  $(window).resize(adjustModalMaxHeightAndPosition).trigger("resize");
		}


		}
	}
});


angular.module('slideWebcastV3App').directive('webcastNav',function(controls,simpleLogin,$timeout){
	return {
		restrict : 'C',
		link : function(scope,elem,attrs){


			elem.on('click',function(e){

				// console.log(e.target);
				
				// controls.$set(false);

				// var id = elem.attr('id');

				// controls.$set(id)
				// 		.then(function(){
				// 			console.log('saved');
				// 			console.log(scope);

				// 			!simpleLogin ? Reveal[id]() : false;
							
				// 		});

				// controls.$transaction(function(current_val){

				// })

				
					console.log(Reveal.getIndices());
				
				
				

			})
		}
	}
});
