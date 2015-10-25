/**
 * Created by Narasingh on 10/24/2015.
 */
(function(){
    'use strict';

    function userInfo(Auth){

        return {
             restrict : 'EA',
             scope : {

             },
             link : function(scope, element, attrs){
                 scope.userInfo = {};

                 function triggerUserInfo(){
                     scope.isLoggedIn = Auth.isLoggedIn();
                     scope.isLoggedIn &&  Auth.getUserInfo().then(function(response){
                         scope.userInfo = {
                             avatar : response.avatar.gravatar + '.jpg?s=32 1x',
                             name : response.username,
                             avatarUrl : 'https://secure.gravatar.com/avatar/'
                         };
                     });

                 }

                 scope.$on('user.authencated', function(){
                     triggerUserInfo();
                 });

                 scope.$on('user.logout', function(){
                     scope.isLoggedIn = false;
                 });

                 triggerUserInfo();
             },
             templateUrl : 'views/authentication/userinfo.direcitve.html'
        };

    }

    userInfo.$inject = ['Auth'];
    angular.module('mov.account').directive('userInfo', userInfo);
}());
