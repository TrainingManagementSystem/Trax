var app = angular.module('traxApp');
app.service('timeOfDay', function(){


	this.testing = "testing service";
	
	this.currenthour = moment().format('HH');

	this.findTime = function(hour) {

	if (hour < 12) {
		return "Morning";
	} else if (hour >= 12 && hour < 18) {
		return "Afternoon";
	} else {
		return "Evening";
	}

};

});
