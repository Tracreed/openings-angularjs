app.directive('toolTip', function() {
	return {
		restrict: 'E',
		scope: {
			text: '='
		},
		templateUrl: 'js/directives/tooltip.html'
		};
});