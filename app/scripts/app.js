'use strict';

/**
 * @ngdoc overview
 * @name slideWebcastV3App
 * @description
 * # slideWebcastV3App
 *
 * Main module of the application.
 */
angular
  .module('slideWebcastV3App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'firebase'
  ])

  
  .config(function ($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    $stateProvider


      //login state
      .state('login', {
        url : '/login',
        templateUrl: 'views/login.html',
        resolve: {
          // controller will not be loaded until $getCurrentUser resolves
          // simpleLogin refers to our $firebaseSimpleLogin wrapper in the example above
          "currentUser": ["simpleLogin","$state",function(simpleLogin,$state) {
            // console.log(simpleLogin);
            // $getCurrentUser returns a promise so the resolve waits for it to complete
            return simpleLogin.$getCurrentUser().then(function(user){
              if (user) {
            
                // user.email === 'development@chameleon-uk.com' ? $state.go('admin.controls') : $state.go('user.messages');
              }
              return user;
            });
          }]
        },
        controller : function($scope,simpleLogin,currentUser,$rootScope,$state){

          window.state = $state;

          $scope.authClient = simpleLogin;
          console.log(simpleLogin);
          

          $scope.login = function(user,pass){

            simpleLogin.$login('password',{email:user,password:pass,rememberMe: false})
              .then(
              function(user){
                console.log("Logged in as: ", user.uid);
              },
              function(error){
                console.error("Login failed: ", error);
              })
          };

        }
      })

      //webcast state
      .state('webcast', {
        url : '/webcast-test',
        abstract : true,
        // template : '<ui-view/>',
        resolve: {
          // controller will not be loaded until $getCurrentUser resolves
          // simpleLogin refers to our $firebaseSimpleLogin wrapper in the example above
          "currentUser": ["simpleLogin","$state",function(simpleLogin,$state) {
            // console.log(simpleLogin);
            // $getCurrentUser returns a promise so the resolve waits for it to complete
            return simpleLogin.$getCurrentUser().then(function(user){

              // !user ? $state.go('login') : false;

              return user;
            });
          }]
        },
        views : {
          '' : {
            templateUrl : 'views/reveal-view.html',
            controller : function($scope,simpleLogin,currentUser,$firebase,$rootScope,controls){

              window.scope = $scope;

              $rootScope.$broadcast('refreshIscroll');

              // if we are using login for guest and admin
              // if (currentUser.email === 'development@chameleon-uk.com') {
              //   // $scope.panels = ['controls','messages'];
              //   $scope.state = 'admin'
              // } else{
              //   // $scope.panels = ['messages','downloads'];
              //   $scope.state = 'user'
              // };

              if (currentUser) {
                // $scope.panels = ['controls','messages'];
                $scope.state = 'admin'
              } else{
                // $scope.panels = ['messages','downloads'];
                $scope.state = 'user'
              };

              $scope.authClient = simpleLogin;

              // currentUser.username = 'dillon';
 
              // console.log(currentUser);

              $scope.submit = function(val){
                console.log(val);
              };


              var ref = new Firebase("https://chameleon-webcast.firebaseio.com/messages");
              var sync = $firebase(ref);
              // create a synchronized array for use in our HTML code
              $scope.messages = sync.$asArray();

                $scope.addMessage = function(user,question) {
                  $scope.messages.$add({user: user,question: question,answer : null});
                  $('.question-field').val('');
                  console.log('sent');
                  $('#myModal').modal('hide');
                  $rootScope.$broadcast('refreshIscroll');
                }


                $scope.downloads = [];

                $scope.removeDownload = function(index){
                  $scope.downloads.splice(index,1)
                };

                

                Reveal.addEventListener( 'slidechanged', function( event ) {
                    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
                    console.log('slide changed!');
                    console.log(event.indexh, event.indexv);

                    controls.$transaction(function(current_val){

                      current_val = {
                        h : event.indexh,
                        v : event.indexv
                      };

                    return current_val;

                    }).then(function(snapshot) {

                      if (snapshot === null) {
                        // Handle aborted transaction.
                        console.log('aborted')
                      } else {
                        // Do something.
                        console.log('new val : ',snapshot.val());
                      }
                    }, function(error) {
                      console.log("Error:", error);
                    });

                } );

            }
          }
        }
      })


    .state('webcast.views',{
       url: '',
       views : {
        'slideOne':{
          templateUrl : 'views/slides/slideOne.html'
        },
        'slideTwo':{
          templateUrl : 'views/slides/slideTwo.html',
          controller : function($scope){
            


          }
        },
        'slideThree':{
          templateUrl : 'views/slides/slideThree.html'
        },
        'slideFour':{
          templateUrl : 'views/slides/slideFour.html'
        },
        'slideFive':{
          templateUrl : 'views/slides/slideFive.html'
        }
       }   
    });




  });


// {
//   ivc :[1,0,0,0];
//   sphs :[0,1,0,0];
//   plc :[0,0,1,0];
//   ud :[0,0,0,1];
// }

// switch