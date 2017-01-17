angular.module('facebookLir.likesCounter')
    .factory('getPosts', function ($http) {
            return {
                getPosts: function (callback) {
                    var posts = {};
                    FB.api("/me/posts", {
                        fields: 'message,likes,type,story,attachments{media}'
                    }, function (response) {
                        debugger;
                        if (response.paging) {
                            $http({
                                method: 'GET',
                                url: response.paging.next
                            }).then(function successCallback(response2) {
                                $scope.analyzeResponse(response2.data.data);
                                if (response2.data.paging) {
                                    $scope.getNextPage(response2.data.paging.next);
                                } else {
                                    /*
                                    here the loop is over 100%
                                    */
                                    $scope.finalresult = $scope.sortresult();
                                }
                            }, function errorCallback(response) {
                                console.log("error")
                            });
                        }
                    });
                },
                analyzeResponse: function(response) {
                    response.forEach(function (element, inext) {
                                var tempObject = {};
                                if (element.message) {
                                    tempObject.message = element.message;
                                } else {
                                    tempObject.message = "* No Text  *";
                                }
                                tempObject.id = element.id;
                                if (element.likes) {
                                    tempObject.likesCount = element.likes.data.length;
                                } else {
                                    tempObject.likesCount = 0;
                                }
                                $scope.postsAnalyzed.push(tempObject);
                            })
                        },
                        sortresult: function () {
                            return $scope.postsAnalyzed.sort(function (a, b) {
                                if (a.likesCount > b.likesCount) {
                                    return -1;
                                } else {
                                    return 1;
                                }
                            })
                        }
                }


        });