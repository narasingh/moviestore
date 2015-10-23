/**
 * Created by Narasingh on 10/18/2015.
 */
(function(){
    'use strict';

    angular.module('mov.list',[]).factory('MovList', ['movCommonApi', 'MovSearch', function(movCommonApi, MovSearch){


        function MovList(){
            var self = angular.extend(this, movCommonApi, MovSearch);
            self.sessionId = self.getSessionId();
        }

        MovList.prototype = {

            getList : function(params){
                return this.searchList(params);
            },
            getListById : function(params){

            },
            addListItem : function(params){

            },
            removeListItem : function(params){

            },
            clearListItems : function(params){

            }
        };

        return MovList;

    }]);
}());
