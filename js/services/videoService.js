app.factory('videodata', ['$http', function ($http) {
	return $http.get('/api/list.php')
		.success(function (data) {
			return data;
		})
		.error(function (err) {
			return null;
		});
}]);