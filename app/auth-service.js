'use strict';

app.factory('AuthService', function($http, $window){
	var AuthService = {};

	AuthService.sendLogIn = function(credentials){
		return $http({
			method: 'POST',
			url: 'http://localhost:3005/api/authenticate',
			data: {
				email: credentials.email,
				password: credentials.password
			}
		})
		.then(function(response){
			var token = response.data.token ? response.data.token : null;
			if (token) {
				$window.localStorage.token = token;
				console.log($window.localStorage);
			} else console.log(response.data)
		});
	};

	return AuthService;

});
