/**
 * Created by Narasingh on 10/21/2015.
 */
(function(){
    'use strict';
    function language(movCommonApi){

        var languages = movCommonApi.languageList();

        return function(input){

            var langObj = movCommonApi.getValueByKey(languages, input);

            return langObj.name;
        };

    }
    angular.$inject= ['movCommonApi'];
    angular.module('mov.common').filter('language', language);
}());
