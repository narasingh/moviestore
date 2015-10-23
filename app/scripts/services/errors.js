/**
 * Created by Narasingh on 10/23/2015.
 */
(function(){
    'use strict';

    function Logger($log , toastr){

        function error(message, data, title){
            toastr.error(message, title);
            $log.log('Error: ' + message , data);
        }
        function success(message, data, title){
            toastr.success(message, title);
        }
        function warning(message, data, title){
            toastr.warning(message, title);
            $log.log('Warning: ' + message , data);
        }
        function info(message, data, title){
            toastr.info(message, title);
        }

        var service = {

            error : error,
            info : info,
            success : success,
            warning : warning,
            //log the error in console, avoid toastr
            log : $log.log

        };

        //return service
        return service;

    }

    Logger.$inject = ['$log','toastr'];
    angular.module('mov.common').factory('Logger', Logger);
}());
