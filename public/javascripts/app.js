var expressFoundationNG = angular.module('expressFoundationNG', ['mm.foundation']);

expressFoundationNG.controller('accordionController', function ($scope) {
  $(document).foundation();
});

expressFoundationNG.controller("MyController", function ($sce, $scope, $http) {
    $http({method: 'GET', url: 'http://localhost:3000/api/posts?'}).
    success(function(data) {
      $scope.posts = data.items;
      $scope.posts = $sce.trustAsHtml($scope.posts);
    }).
    error(function(data, status, headers, config) {
      alert("bad");
    });
});