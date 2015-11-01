/**
 * Created by Narasingh on 10/29/2015.
 */
(function(){
    'use strict';
    function addToList(movAccountApi, movCommonApi, Auth){

        return {
            restrict : 'E',
            scope : {
                type : '@type',
                mediaType : '@mediaType',
                mediaId : '@mediaId'
            },
            link : function(scope, element, attr){

               var sessionId = movCommonApi.getSessionId();
               var userDetails = Auth.getInfoSessioin();
               var extra =  [{
                    key : 'id',
                    value : Auth.isLoggedIn() && userDetails.id || null
                }];

               scope.addToFavorite = function(isFavorite){
                    //add movie to list
                    var params = {
                            media_id : scope.mediaId,
                            media_type : scope.mediaType,
                            favorite : isFavorite,
                            extraParams : extra
                        };

                    movAccountApi.addToFavorite(params).then(function(response){
                        if(response.data.status_code === 12){
                            //remove from favorite
                            //scope.addToFavorite(false);
                            scope.addToFavorite(false);
                        }
                    });
               };
               scope.addToWatchList = function(isAddedWatch){
                   //add movie to list
                   var params = {
                       media_id : scope.mediaId,
                       media_type : scope.mediaType,
                       watchlist : isAddedWatch,
                       extraParams : extra
                   };

                   movAccountApi.addToWatchList(params).then(function(response){
                       if(response.data.status_code === 12){
                           scope.addToWatchList(false);
                       }
                   });
               };
               var types = {
                    list : 'views/list/mov.addtolist.directive.html',
                    detail : 'views/authentication/mov.addtowatch.directive.html'
               };
               scope.html = scope.type && types[scope.type] || types['list'];

            },
            template : '<ng-include src="html"></ng-include>'
        };

    }
    addToList.$inject = ['movAccountApi', 'movCommonApi', 'Auth'];
    angular.module('mov.common').directive('addToList', addToList);
}());
