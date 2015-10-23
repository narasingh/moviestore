/**
 * Created by Narasingh on 10/23/2015.
 */
(function(){
    'use strict';
    function UserLoginController(movCommonApi, $location){

       var self = this;

       self.userLogin = function(data){

          //call authenticate service onload
          movCommonApi.generateAuthToken().then(function(response){

              data.request_token = response.request_token;

              movCommonApi.getAuthTokenWithLogin(data).then(function(response){

                  //check status success and redirect to account
                  if(response.status === 200){
                     $location.path('#home');
                  }
              });

          });

       };

    }

    UserLoginController.$inject = ['movCommonApi', '$location'];
    angular.module('mov.authenticate',[]).controller('UserLoginController', UserLoginController);
}());
