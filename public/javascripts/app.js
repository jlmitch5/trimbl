var expressFoundationNG = angular.module('expressFoundationNG', ['mm.foundation']);

expressFoundationNG.controller('accordionController', function ($scope) {
  $(document).foundation();
});

expressFoundationNG.controller("MyController", function ($sce, $scope, $http) {
    $http.get('http://trimbl.co/api/posts').
	    success(function(data) {
	      $scope.posts = data;
	      console.log($scope.posts);
	    }).
	    error(function(data, status, headers, config) {
	      alert("bad");
	    });
});