/**
 * Created by Narasingh on 10/2/2015.
 */
(function(){
    'use strict';

    function movApi($q, $rootScope, CONFIG){

        var wrapKey = function(config){
            var url = config.url;
            return url + ( (url.indexOf('?') > -1) ? '&api_key=' + CONFIG.key : '?api_key=' + CONFIG.key );
        },
        httpProxy  = function(config){
            //replace dynamic data in url {}
            var url = config.url,
                extraParams = config.params && config.params.extraParams || config.data.extraParams;

            angular.forEach(extraParams, function(data){
                url = url.replace('{'+data.key+'}', data.value);
            });
            if(config.params) {
                delete config.params.extraParams;
            }if(config.data){
                delete config.data.extraParams;
            }
            return url;
        };

        return {
            request : function(config){

                var matchUrl = config.url.indexOf(CONFIG.baseUrl) > -1;

                if(matchUrl) {
                    config.url = wrapKey(config);
                }
                //replace {} with extra params to do: need to refactor this
                if(typeof config.params !=='undefined' && config.params.hasOwnProperty('extraParams') && matchUrl){
                    config.url = httpProxy(config);
                }if(config.method === 'POST' && config.data.hasOwnProperty('extraParams') && matchUrl){
                    config.url = httpProxy(config);
                }

                if(matchUrl){
                    $rootScope.$broadcast('us-spinner:spin', 'spinner-1');
                }

                return config;
            },
            requestError : function(rejection){
                $rootScope.$broadcast('us-spinner:stop', 'spinner-1');
                return $q.reject(rejection);
            },
            response : function(response){
                $rootScope.$broadcast('us-spinner:stop', 'spinner-1');
                if(response.data && response.data.status_code){
                    $rootScope.$broadcast('mov-success.handler', response);
                }
                return $q.resolve(response);
            },
            responseError : function(rejection){
                $rootScope.$broadcast('us-spinner:stop', 'spinner-1');
                $rootScope.$broadcast('mov-error.handler', rejection);

                return $q.reject(rejection);
            }
        };

    }

    function httpProvider($httpProvider){

        $httpProvider.interceptors.push('movApi');

    }

    movApi.$inject = ['$q', '$rootScope', 'CONFIG'];
    httpProvider.$inject = ['$httpProvider'];

    angular.module('mov.api', []).factory('movApi', movApi )
        .config(['$httpProvider', httpProvider]);
}());
