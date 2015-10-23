/**
 * Created by Narasingh on 10/18/2015.
 */
(function(){
    'use strict';

    function MovSearch($http, CONFIG){

       var self = this;
       var data,
           baseUrl = CONFIG.baseUrl;

        self.searchCompany = function(data){
           data = data || {};
            return $http.get(baseUrl + 'search/company', { params : data });
        };
        self.searchCollection = function(data){
            data = data || {};
            return $http.get(baseUrl + 'search/collection', { params : data });
        };
        self.searchKeyword = function(data){
            data = data || {};
            return $http.get(baseUrl + 'search/keyword', { params : data });
        };
        self.searchList = function(data){
            data = data || {};
            return $http.get(baseUrl + 'search/list', { params : data });
        };
        self.searchMultiList = function(data){
            data = data || {};
            return $http.get(baseUrl + 'search/multi', { params : data });
        };
        self.searchPerson = function(data){
            data = data || {};
            return $http.get(baseUrl + 'search/person', { params : data });
        };
        self.searchTvShows = function(data){
            data = data || {};
            return $http.get(baseUrl + 'search/tv', { params : data });
        };

    }
    MovSearch.$inject = ['$http', 'CONFIG'];
    angular.module('mov.search',[]).service('MovSearch', MovSearch)
}());
