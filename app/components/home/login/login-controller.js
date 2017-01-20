'use strict';

console.log('log in ctrl');

app.controller('LogInCtrl', function(AuthService){
	this.sendLogin = AuthService.sendLogIn;
});