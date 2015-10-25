/**
 * Created by Narasingh on 10/23/2015.
 */
(function(){
    'use strict';
    function movButton(){
        return {
            restrict : 'E',
            require : ['^form'],
            scope : {
                btnName : '@btnName',
                btnId : '@btnId',
                btnValue : '@btnValue',
                btnAction : '&btnAction',
                form : '@form',
                btnClass : '@btnClass'
            },
            link : function(scope, element, attrs, frmCtrl){

                scope.formIsValid = function(){
                    return frmCtrl[0].$valid;
                };
                scope.triggerAction = function(){
                    if(scope.formIsValid()) {
                        scope.btnAction();
                    }
                };
            },
            templateUrl : 'views/mov.button.directive.html'
        };
    }

    angular.module('mov.common').directive('movButton', movButton);
}());
