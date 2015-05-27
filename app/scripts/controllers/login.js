'use strict';

/**
 * @ngdoc function
 * @name slideWebcastV3App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the slideWebcastV3App
 */
angular.module('slideWebcastV3App')
  .controller('LoginCtrl', function ($scope,$state,$firebase,simpleLogin) {


    $scope.authClient = simpleLogin;

    console.log(simpleLogin);
  	

  });