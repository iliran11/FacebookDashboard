'use strict';



var globalscope;
angular.module('facebookLir.likesCounter', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/facebook', {
      templateUrl: 'facebook/facebook.html',
      controller: 'likeCounter'
    });
  }])

  .controller('likeCounter', ['$scope', '$http','$getPosts',function ($scope, $http, $getPosts) {


    $scope.login = function () {
      $getPosts();
      FB.login(function (response) {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          $scope.getPosts();
          FB.api('/me', function (response) {
            console.log('Good to see you, ' + response.name + '.');
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      });
    }

    $scope.getPosts = function () {
      FB.api("/me/posts", {
        fields: 'message,likes,type,story,attachments{media}'
      }, function (response) {
        //printing only objects with media
        // console.log(response.data[0]);
        
        // response.data.forEach(function (element,index) {
        //     if (index===9 | index===8) {
        //       console.log(element);
        //     }
        //   if (element.attachments.data) {
        //     // console.log (element.attachments.data[0].media.image.src)
        //     console.log("there is a media!");
        //   }
        //     else {
        //       debugger;
        //       console.log ("no image!")
        //     }
      
        // })
          response.data.forEach(function (element) {
            if (element.Attachments) {
              console.log (element.Attachments);
            }
          });
        //printing only objects with media
        $scope.analyzeResponse(response.data);
        if (response.paging) {
          $scope.getNextPage(response.paging.next);
        }
      });
    };

    $scope.getNextPage = function (pageUrl) {
      $http({
        method: 'GET',
        url: pageUrl
      }).then(function successCallback(response2) {
        $scope.analyzeResponse(response2.data.data);
        if (response2.data.paging) {
          $scope.getNextPage(response2.data.paging.next);
        }
        else {
          /*
          here the loop is over 100%
          */
          $scope.finalresult = $scope.sortresult(); 
        }
      }, function errorCallback(response) {
        console.log("error")
      });

    }
    
    $scope.postsAnalyzed = [];
    $scope.analyzeResponse = function (response) {
      response.forEach (function (element,inext) {
        var tempObject= {};
        if (element.message) {
          tempObject.message = element.message;     
        }
        else {
          tempObject.message = "* No Text  *";
        }
        tempObject.id = element.id;
        if (element.likes) {
        tempObject.likesCount = element.likes.data.length;
        }
        else {
          tempObject.likesCount=0;
        }
$scope.postsAnalyzed.push(tempObject);

$scope.sortresult = function () {
  return $scope.postsAnalyzed.sort (function (a,b) {
  if (a.likesCount>b.likesCount) {
    return -1;
  }
  else {
    return 1;
  }
})
}
        
      })
    }
        $scope.login();
  }]);