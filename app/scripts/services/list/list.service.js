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

            getList : function(params){
                //return this.searchList(params);
            },
            getListById : function(params){
                $http.post(this.baseUrl + 'list/{id}', { data : params });
            },
            deleteListById : function(params){
                $http.delete(this.baseUrl + 'list/{id}', { data : params });
            },
            createNewList : function(params){
                $http.post(this.baseUrl + 'list/', { data : params });
            },
            itemIsAdded : function(params){
                $http.post(this.baseUrl + 'list/{id}/item_status', { data : params });
            },
            addListItem : function(params){
                $http.post(this.baseUrl + 'list/{id}/add_item', { data : params });
            },
            removeListItem : function(params){
                $http.post(this.baseUrl + 'list/{id}/remove_item', { data : params });
            },
            clearListItems : function(params){
                $http.post(this.baseUrl + 'list/{id}/clear', { data : params });
            }
        };

        return MovList;

    }]);
}());
