/**
 * Created by Narasingh on 10/17/2015.
 */
(function(){
    'use strict';

    function movUiTab(){

        return {
            restrict : 'EA',
            scope : {
                list : '=list',
                isShow : '@'
            },
            templateUrl : 'views/mov.tab.directive.html'
        };

    }

    angular.module('mov.common').directive('movUiTab', [movUiTab]);
}());
