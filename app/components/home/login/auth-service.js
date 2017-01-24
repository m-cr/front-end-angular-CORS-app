'use strict';

app.factory('AuthService', function($http, $window, $rootScope, $state){
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
      if (response.data.token) {
        $window.localStorage.token = response.data.token;
        $rootScope.$broadcast('loggedIn');
        $state.go('productList')
      } 
      else console.log('failure: ' + response.data)
    });
  };

  return AuthService;

});
