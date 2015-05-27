'use strict';

/**
 * @ngdoc function
 * @name slideWebcastV3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slideWebcastV3App
 */
angular.module('slideWebcastV3App')
  .controller('MainCtrl', function ($scope,$state,$rootScope,simpleLogin) {

  	window.scope = $scope;

  	$scope.hello = 'hello';

  	$scope.authClient = simpleLogin;



  	$rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
	      console.log(user.email+ " logged in");
	      scope.user = user.email;
          console.log(user.email === 'development@chameleon-uk.com');

	      user.email === 'development@chameleon-uk.com' ? $state.go('admin') : $state.go('user');
	    });

	    $rootScope.$on("$firebaseSimpleLogin:logout", function(e, user) {
	      console.log("logged out!");
          $state.go('login');
	      scope.user = null;
	    });

  });
