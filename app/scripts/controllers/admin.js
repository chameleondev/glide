'use strict';

/**
 * @ngdoc function
 * @name slideWebcastV3App.controller:AdminCtrl
 * @description
 * # AboutCtrl
 * Controller of the slideWebcastV3App
 */
angular.module('slideWebcastV3App')
  .controller('AdminCtrl', function ($scope,$state,$firebase) {

  

    var sync = $firebase(Auth.controlRef());

    // download the data into a local array
    $scope.controls = sync.$asArray();

  	$state.transitionTo('admin-webcast.controls');
    

  	$('.nav-tabs li').on('click',function(){

  		$('.nav-tabs li').removeClass('active');

  		$(this).addClass('active');

  	});


  	

  });