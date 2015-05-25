var json_thing = [];
var videoIndex = -1;
var autonext = true;
var specific_video = location.hash.substr(9);


var volDelay;

function shuffle(o){
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}
console.log(window.search)
app.controller('MainController', ['$scope', 'videodata', function ($scope, videodata) {

	if (autonext) document.getElementById('autonext').className = "fa fa-toggle-on quadbutton ko"
	else document.getElementById('autonext').className = "fa fa-toggle-off quadbutton ko";
	
	$scope.showMenu = false;
	
			videodata.success(function (data) {
			if (data) {
				json_thing = shuffle(data);	
				$scope.nextVideo();
				$scope.count = json_thing.length;
			}
			else $scope.error = true;
		});
	
	$scope.nextVideo = function (isReal) {
		if (!autonext && !isReal) {
			document.getElementById('video').currentTime = 0;
			return
		}
		
		videoIndex++;
		
		if (videoIndex >= json_thing.length) {
			json_thing = shuffle(json_thing);
			videoIndex = 0;
		}
		
		if (specific_video == "") {
			$scope.videoInfo = json_thing[videoIndex];
			document.title = json_thing[videoIndex].title + ' from ' + json_thing[videoIndex].source;
		} else {
			for (i in json_thing) {
				if (json_thing[i].file == specific_video) {
					$scope.videoInfo.title = json_thing[i].title;
					$scope.videoInfo.source = json_thing[i].source;
					$scope.videoInfo.file = json_thing[i].file;
					specific_video = "";
				}
			}
		}
	}
	
	if (specific_video) {
		$scope.videoInfo = {file:specific_video};
	}
	
	$scope.playPause = function () {
		var video = document.getElementById('video');
		var control = document.getElementById('pause-button');
		if (video.paused) {
			control.className = "fa fa-pause quadbutton ko";
			video.play()
		}
		else {
			video.pause();
			control.className = "fa fa-play quadbutton ko";
		}
	}
	
	$scope.skip = function (time) {
		var video = document.getElementById('video');
		video.currentTime += time;
	}
	$scope.toggleAutoNext = function () {
		var control = document.getElementById('autonext');
		if (autonext) {
			autonext = false;
			control.className = "fa fa-toggle-off quadbutton ko"
		}
		else {
			autonext = true;
			control.className = "fa fa-toggle-on quadbutton ko"
		}
	}
	
	$scope.tooltip = function (text) {
		var tooltip = document.getElementById('tooltip');
		if (text) {
			tooltip.innerHTML = text;
			tooltip.className = "is-visible";
		} else {
			tooltip.innerHTML = "";
			tooltip.className = "is-hidden";
		}
	}
	
}]);

document.onkeydown = function ( event ) {
	switch (event.keyCode) {
		case 33:
		case 38:
			clearTimeout(volDelay);
			
			var vol = Math.min(document.getElementById('video').volume + 0.05, 1);
			document.getElementById('video').volume = vol;
			
			var volume = document.getElementById('volume');
			volume.innerHTML = Math.round((vol / 100 * 10000))  + '%';
			volume.style.display = 'block';
			
			volDelay = setTimeout(function () {
				volume.style.display = 'none';
			}, 1000);
		break;
		case 34:
		case 40:
			clearTimeout(volDelay);
			
			var vol = Math.max(document.getElementById('video').volume - 0.05, 0);
			document.getElementById('video').volume = vol;
			
			var volume = document.getElementById('volume');
			volume.innerHTML = Math.round((vol / 100 * 10000))  + '%';
			volume.style.display = 'block';
			
			volDelay = setTimeout(function () {
				volume.style.display = 'none';
			}, 1000);
		break;
		
		case 13:
		case 32:
			document.getElementById('pause-button').click();
		break;
		
		case 37:
		case 65:
			document.getElementById('backward-button').click();
		break;
		
		case 39:
		case 68:
			document.getElementById('forward-button').click();
		break;
		
		case 78:
			document.getElementById('new-button').click();
		break;
		
		case 80:
			videoIndex = Math.max(videoIndex - 2, -1);
			document.getElementById('new-button').click();
		break;
	}
}