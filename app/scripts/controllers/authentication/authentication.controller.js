/**
 * Created by Narasingh on 10/23/2015.
 */
(function(){
    'use strict';
    function UserLoginController(Auth, $location, $rootScope){

       var self = this;

       self.userLogin = function(data){

           Auth.login(data).then(function(response){
               if(response.status  && response.status === 200){
                 $rootScope.$broadcast('user.authencated', response);
                 $location.path('#home');
               }
           }).catch(function(error){
               console.log(error);
           });

       };

       $rootScope.$broadcast('user.logout');

    }

    UserLoginController.$inject = ['Auth', '$location', '$rootScope'];
    angular.module('mov.authenticate',[]).controller('UserLoginController', UserLoginController);
}());
