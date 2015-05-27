angular.module('slideWebcastV3App').directive('aspect',function(){
	return {
		restrict : 'A',
		link : function(scope,elem,attrs){
			elem.keepRatio({ ratio: 4/3, calculate: 'width' });
		}
	}
})