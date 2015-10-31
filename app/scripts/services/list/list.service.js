/**
 * Created by Narasingh on 10/18/2015.
 */
(function(){
    'use strict';

    angular.module('mov.list',[]).factory('MovList', ['movCommonApi', '$http', 'CONFIG', function(movCommonApi, $http, CONFIG){


        function MovList(){
            var self = angular.extend(this, movCommonApi);
            self.sessionId = self.getSessionId();
            self.baseUrl = CONFIG.baseUrl;
        }

        MovList.prototype = {

            getList : function(data){
                return $http.get(this.baseUrl + 'account/id/lists?session_id=' + this.sessionId, { params : data });
            },
            getListById : function(params){
                return $http.post(this.baseUrl + 'list/{id}', params);
            },
            deleteListById : function(data){
                return $http.delete(this.baseUrl + 'list/{id}', { params : data });
            },
            createNewList : function(params){
                return $http.post(this.baseUrl + 'list?session_id=' + this.sessionId, params);
            },
            itemIsAdded : function(params){
                return $http.post(this.baseUrl + 'list/{id}/item_status', params);
            },
            addListItem : function(params){
                return $http.post(this.baseUrl + 'list/{id}/add_item?session_id=' + this.sessionId, params);
            },
            removeListItem : function(params){
                return $http.post(this.baseUrl + 'list/{id}/remove_item', params);
            },
            clearListItems : function(params){
                return $http.post(this.baseUrl + 'list/{id}/clear', params);
            }
        };

        return MovList;

    }]);
}());
