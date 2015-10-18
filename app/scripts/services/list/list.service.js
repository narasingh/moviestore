/**
 * Created by Narasingh on 10/18/2015.
 */
(function(){
    'use strict';

    function MovList(movCommonApi){
        var self = angular.extend(this, movCommonApi);
            self.sessionId = self.getSessionId();
    }

    MovList.prototype = {

        getList : function(params){

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


    List.$inject = ['movCommonApi'];
    angular.module('mov.list').factory('MovList', MovList);
}());
