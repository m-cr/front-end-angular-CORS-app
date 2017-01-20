'use strict';

app.component('login', {
	templateUrl: '/components/home/login/login-component.html',
	controller: ['AuthService', function(AuthService){
		this.sendLogIn = AuthService.sendLogIn;
	}]
});
