/**
 * Created by Narasingh on 10/3/2015.
 */
(function(){
    'use strict';

    function movCommonApi($http, CONFIG, $sessionStorage, $localStorage, $rootScope){

        var baseUrl = CONFIG.baseUrl;
        var commonObj = {

            setConfiguration : function(){
                //avoid api call every time on page load
                if(!$localStorage.imageInfo){
                    $http.get(baseUrl + 'configuration').then(this.setImageInfo);
                }
            },
            setSessionId : function(){
                //call only if session id is not in session storage
                if(!this.getSessionId()) {
                  return  $http.get(baseUrl + 'authentication/guest_session/new').then(this.setToken);
                }
            },
            getSessionId : function(){
               return $sessionStorage.$default().guest_session_id || null;
            },
            generateNewSession : function(){
                //generate new session
                var data = this.getToken();
                return $http.get(baseUrl + '/authentication/session/new', { params : data });
            },
            generateGuestSession : function(){
                //generate new session
                return $http.get(baseUrl + '/authentication/guest_session/new');
            },
            generateAuthToken : function(){

                var self = this,
                    tokenObj = self.getToken(),
                    exp = tokenObj.expires_at,
                    match = exp && exp.match(/^(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\:(\d+)$/) || [],
                    expireTime = match.length && new Date(match[1], match[2] - 1, match[3], match[4], match[5], match[6]),
                    now = Date.now()/1000;

                if(tokenObj.request_token && ((expireTime - now) < (60)) || !tokenObj.request_token){
                    $http.get(baseUrl + 'authentication/token/new', {}).then(self.setToken);
                }else{
                    return true;
                }

            },
            getAuthTokenWithLogin : function(data){
                return $http.get(baseUrl + 'authentication/token/validate_with_login', { params : data });
            },
            getToken : function(){
              var tokenObj = $sessionStorage.$default();

                return {
                    request_token : tokenObj.request_token || null,
                    expires_at : tokenObj.expires_at && tokenObj.expires_at.replace(' UTC','') || null
                };

            },
            setToken : function(response){

                if(typeof response ==='object'){
                    $sessionStorage.$default(response.data);
                }
            },
            setImageInfo : function(response){

                $rootScope.$storage = $localStorage.$default({
                    imageInfo: JSON.stringify(response.data)
                });
            },
            getImageInfo : function(){

                //http://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg
                var imageInfo = $localStorage.imageInfo && JSON.parse($localStorage.imageInfo) || {};
                return imageInfo.images;
            }

        };

        return commonObj;
    }

    movCommonApi.$inject = ['$http', 'CONFIG', '$sessionStorage', '$localStorage', '$rootScope'];
    angular.module('mov.common',[]).factory('movCommonApi', movCommonApi);
}());
