/**
 * Created by Narasingh on 11/1/2015.
 */
(function(){
    'use strict';

    function movPeople(CONFIG, $http){

        var self = this;
        var data,
            baseUrl = CONFIG.baseUrl;


        self.getPersonDetails = function(data){
            data = data || {};
            return $http.get(baseUrl + 'person/{id}', { params : data });
        };
        self.getMovieCreditById = function(data){
            data = data || {};
            return $http.get(baseUrl + 'person/{id}/movie_credits', { params : data });
        };
        self.getTvCreditById = function(data){
            data = data || {};
            return $http.get(baseUrl + 'person/{id}/tv_credits', { params : data });
        };
        self.getCombinedCredits = function(data){
            data = data || {};
            return $http.get(baseUrl + 'person/{id}/combined_credits', { params : data });
        };
        self.getExternalIds = function(data){
            data = data || {};
            return $http.get(baseUrl + 'person/{id}/external_ids', { params : data });
        };
        self.getImagesById = function(data){
            data = data || {};
            return $http.get(baseUrl + 'person/{id}/images', { params : data });
        };
        self.getTaggedImages = function(data){
            data = data || {};
            return $http.get(baseUrl + 'person/{id}/tagged_images', { params : data });
        };
        self.getChangesById = function(){
            data = data || {};
            return $http.get(baseUrl + 'person/{id}/changes', { params : data });
        };
        self.getPopularPeople = function(data){
            data = data || {};
            return $http.get(baseUrl + 'person/popular', { params : data });
        };
        self.getLatestPerson = function(data){
            data = data || {};
            return $http.get(baseUrl + 'person/latest', { params : data });
        };

    }
    movPeople.$inject = ['CONFIG', '$http'];
    angular.module('mov.people', []).service('movPeople', movPeople);
}());
