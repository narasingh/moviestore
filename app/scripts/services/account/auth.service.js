/**
 * Created by Narasingh on 10/24/2015.
 */
(function(){
    'use strict';

    function Auth(movCommonApi, $q, $sessionStorage, movAccountApi){

        var self = angular.extend(this, movCommonApi, movAccountApi);
        var defer = $q.defer();

        function isLoggedIn(){

            return ($sessionStorage.$default() && $sessionStorage.$default().session_id && true) || false;

        }
        function login(params){

            self.generateAuthToken()
            .then(function(response){
                params.request_token = response.request_token;
                return self.getAuthTokenWithLogin(params);
            })
            .then(function(response){
                if(response === 200 || response.status === 200){
                    return self.generateNewSession();
                }else{
                    defer.reject(response);
                }
                return defer.promise;
            })
            .then(function(response){
               defer.resolve(response);
            })
            .catch(function(error){
               defer.reject(error);
            });

            return defer.promise;
        }
        function logout(){
            $sessionStorage.$reset();
            return true;
        }
        function createAccount(){

        }
        function getUserInfo(){

            if(isLoggedIn()){

               if(!getInfoSessioin()){
                   return self.getAccountInfo().then(storeInfoSessioin);
               }else{
                   defer.resolve(getInfoSessioin());
               }
            }else{
                defer.reject({ error :  true });
            }
            return defer.promise;
        }
        function storeInfoSessioin(response){

            $sessionStorage.$default({
                userDetails : JSON.stringify(response.data)
            });
            return response.data;
        }
        function getInfoSessioin(){
            var userDetails = $sessionStorage.$default().userDetails;
            return userDetails &&  JSON.parse(userDetails) || null;
        }

        return {
            login : login,
            logout : logout,
            createAccount : createAccount,
            isLoggedIn : isLoggedIn,
            getUserInfo : getUserInfo,
            getInfoSessioin : getInfoSessioin,
            storeInfoSessioin : storeInfoSessioin
        };

    }
    Auth.$inject = ['movCommonApi', '$q', '$sessionStorage', 'movAccountApi'];
    angular.module('mov.account').factory('Auth', Auth);
}());
