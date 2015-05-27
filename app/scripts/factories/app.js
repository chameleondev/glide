'use strict'



angular.module('slideWebcastV3App').factory("simpleLogin", ["$firebaseSimpleLogin","$rootScope","$state", function($firebaseSimpleLogin,$rootScope,$state) {
  var ref = new Firebase("https://chameleon-webcast.firebaseio.com");

  $rootScope.$on("$firebaseSimpleLogin:logout", function(e, user) {
    console.log("logged out!");
    $state.go('login');
  });

  $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
    console.log(user.email+ " logged in");
    $state.go('webcast.views');
    // user.email === 'development@chameleon-uk.com' ? $state.go('admin.controls') : $state.go('user.messages');
  });

  return $firebaseSimpleLogin(ref);
}]);


angular.module('slideWebcastV3App').factory("dragDrop", ["$firebase",function($firebase) {

      return function(selection) {
        // create a reference to the dragDrop selection
        var ref = new Firebase("https://chameleon-webcast.firebaseio.com").child('dragDrop').child(selection);
        // return it as a synchronized object
        return $firebase(ref).$asObject();
      }
}]);

angular.module('slideWebcastV3App').factory("controls", ["$firebase","simpleLogin",function($firebase,simpleLogin) {
  var ref = new Firebase("https://chameleon-webcast.firebaseio.com/controls"),
      sync = $firebase(ref);
      
      ref.on('value',function(snapshot){

        console.log(snapshot.val());

        // if (navCount) {
            // console.log(simpleLogin);
            // var direction = snapshot.val();


            // if (simpleLogin.user.email !== 'development@chameleon-uk.com' && direction) {

            //    Reveal[direction]() 

            // }

            // if (!simpleLogin.user && direction) {
            //   Reveal[direction]();
            //   console.log('should change!');
            // }

            if (!simpleLogin.user) {
              Reveal.slide(snapshot.val().h,snapshot.val().v);
              console.log('should change now!');
            };

        // }


      });
      
  return sync;
}]);


angular.module('slideWebcastV3App').filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});


// var data = {
//   dragDrop : [
//     [1,2,3],
//     [2,3,4],
//     [3,4,5]
//   ],

// }