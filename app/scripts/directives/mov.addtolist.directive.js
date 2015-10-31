/**
 * Created by Narasingh on 10/29/2015.
 */
(function(){
    'use strict';
    function addToList(MovList, movCommonApi){

        return {
            restrict : 'E',
            scope : {
                movId : '@movId'
            },
            link : function(scope, element, attr){

               var movObj = new MovList();
               var sessionId = movCommonApi.getSessionId();

               var addToFavorite = function(events){
                    //add movie to list
                    var params = {
                            media_id : scope.movId,
                            extraParams : [{
                                key : 'id',
                                value : '' //to do
                            }]
                        };

                    movObj.addListItem(params).then(function(response){
                        console.log(response);
                    });

                    events.preventDefault();
               };

               element.find('.fa-heart').bind('click', addToFavorite)

            },
            templateUrl : 'views/list/mov.addtolist.directive.html'
        };

    }
    addToList.$inject = ['MovList', 'movCommonApi'];
    angular.module('mov.common').directive('addToList', addToList);
}());
