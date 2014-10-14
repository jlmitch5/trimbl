var expressFoundationNG = angular.module('expressFoundationNG', ['mm.foundation']);

expressFoundationNG.controller('accordionController', function ($scope) {
  $(document).foundation();
});

expressFoundationNG.controller("MyController", function ($scope, $http) {
	$http.get('http://evening-headland-8819.heroku.com/api/posts').
	success(function(data, status, headers, config) {
		$scope.posts = data;
	}).
	error(function(data, status, headers, config) {
		alert(headers);
	});
});