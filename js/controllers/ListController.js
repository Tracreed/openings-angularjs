app.controller('ListController', ['$scope', 'videodata', function ($scope, videodata) {
	videodata.success(function (data) {
		var resorted_array = {};
		for (var i in data) {
			var source = data[i].source;
			var title = data[i].title
			var file = data[i].file;
			//console.log(data[i].source);
			if (!resorted_array[source]) { 
				resorted_array[source] = {}; 
			}
			resorted_array[source][title] = file; 
			//console.log(resorted_array);
		}
		$scope.videos = resorted_array;
	})
}]);