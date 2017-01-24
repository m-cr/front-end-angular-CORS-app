'use strict';

app.component('login', {
	templateUrl: '/components/login/login-component.html',
	controller: ['AuthService', function(AuthService){
		this.sendLogIn = AuthService.sendLogIn;
	}]
});
