
//directive for the menu to slide down on click
angular.module('slideWebcastV3App').directive('sideBar',function($rootScope){
	return {
		restrict : 'A',
		link : function(scope,elem,attrs){
			elem.on('click',function(){

				elem.parent().toggleClass('cbp-spmenu-open');

				attrs.push ==='yes' ? $('body').toggleClass('cbp-spmenu-push-toleft') : false;

				$rootScope.$broadcast('refreshIscroll');

			})
		}
	}
});


//directive for the iscroll
angular.module('slideWebcastV3App').directive('iscroll',function($timeout,$rootScope){
	return {
		restrict : 'A',
		link : function(scope,elem,attrs){

			$timeout(function(){
				var myScroll = new IScroll('.iscroll-wrapper',{
					mouseWheel: true,
    				scrollbars: true
				});

				// create event on the rootscope
				$rootScope.$on('refreshIscroll', function () {
					$timeout(function(){
						myScroll.refresh({
							mouseWheel: true,
		    				scrollbars: true
						});
					},200)
		             
		             console.log('refreshed!');
		        })
			},200)

			
			
		}
	}
});


// directive for the refernces so that they are added to the references tab
angular.module('slideWebcastV3App').directive('reference',function($rootScope,$timeout){
	return {
		restrict : 'E',
		scope : {}, //  isolate the scope
		replace : true,
		template :
			"<li>" +
			"	<span class='pull-left icon' ng-click='addDownload()'></span>" +
			"	<span>{{ref}}</span>" +
			"</li>",
		link : function(scope,elem,attrs){

			// attribute ref is applied to the scope
			scope.ref = attrs.ref;

			scope.addDownload = function(){

				elem.find('.icon').addClass('active');
				scope.$parent.$parent.downloads.push(scope.ref);

				$timeout(function(){
					elem.find('.icon').removeClass('active')
				},1000)	

			}
			
		}
	}
});


// prevent click from happenning twice on the feedback slide
angular.module('slideWebcastV3App').directive('feedbackLabel',function(){
	return {
		restrict : 'A',
		link : function(scope,elem,attrs){

			elem.on('click',function(e){
				 
				 e.preventDefault(); 

				elem.parent().parent().find('label').removeClass('active');

				elem.addClass('active');
			})

		}
	}
});
