/**
 * Created by Narasingh on 11/15/2015.
 */
(function(){
    'use strict';

    function TvshowsApi($http, CONFIG, movCommonApi){

        var baseUrl = CONFIG.baseUrl;
        var self = this;
        var data = {};

        self.getTvInfo = function(data){
            return $http.get(baseUrl + 'tv/{id}', { params : data });
        };
        self.getTvStatusInfo = function(data){
            return $http.get(baseUrl + 'tv/{id}/account_states', { params : data });
        };
        self.getTvAlternateTitle = function(data){
            return $http.get(baseUrl + 'tv/{id}/alternative_titles', { params : data });
        };
        self.getTvShowChanges = function(data){
            return $http.get(baseUrl + 'tv/{id}/changes', { params : data });
        };
        self.getTvContentRating = function(data){
            return $http.get(baseUrl + 'tv/{id}/content_ratings', { params : data });
        };
        self.getTvCredits = function(data){
            return $http.get(baseUrl + 'tv/{id}/credits', { params : data });
        };
        self.getTvExternalIds = function(data){
            return $http.get(baseUrl + 'tv/{id}/external_ids', { params : data });
        };
        self.getTvImages = function(data){
            return $http.get(baseUrl + 'tv/{id}/images', { params : data });
        };
        self.getTvKeywords = function(data){
            return $http.get(baseUrl + 'tv/{id}/keywords', { params : data });
        };
        self.getTvRatings = function(params){
            return $http.post(baseUrl + 'tv/{id}/rating', params);
        };
        self.deleteTvRatings = function(params){
            return $http.delete(baseUrl + 'tv/{id}/rating', params);
        };
        self.getSimilarMoviesById = function(data){
            return $http.get(baseUrl + 'tv/{id}/similar', { params : data });
        };
        self.getTranslations = function(data){
            return $http.get(baseUrl + 'tv/{id}/translations', {params : data });
        };
        self.getVideos = function(data){
            return $http.get(baseUrl + 'tv/{id}/videos', { params : data });
        };
        self.getLatestTvShows = function(data){
            return $http.get(baseUrl + 'tv/latest', { params : data });
        };
        self.getTvShowsOnAir = function(data){
            return $http.get(baseUrl + 'tv/on_the_air', { params : data });
        };
        self.getAiringToday = function(data){
            return $http.get(baseUrl + 'tv/airing_today', { params : data });
        };
        self.getTopRatedTvShows = function(data){
            return $http.get(baseUrl + 'tv/top_rated', { params : data });
        };
        self.getPopularTvShows = function(data){
            return $http.get(baseUrl + 'tv/popular', { params : data });
        };

    }
    TvshowsApi.$inject = ['$http', 'CONFIG'];
    angular.module('mov.tvshows', []).service('TvshowsApi', TvshowsApi);
}());
