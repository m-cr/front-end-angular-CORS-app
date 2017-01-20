'use strict';

app.component('login', {
	templateUrl: '/login-component.html',
	controller: ['AuthService', function(AuthService){
		this.sendLogIn = AuthService.sendLogIn;
	}]
});
