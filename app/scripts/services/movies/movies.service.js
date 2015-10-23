/**
 * Created by Narasingh on 10/4/2015.
 */
(function(){
    'use strict';
    function movMoviesApi($http, CONFIG){
        var self = this;
        var data,
            baseUrl = CONFIG.baseUrl;

        self.getMovieDetail = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/{id}', { params : data });
        };
        self.getMovieList = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/{id}/lists', { params : data });
        };
        self.getAccountStates = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/{id}/account_states', { params : {session_id : sessionId } });
        };
        self.getAccountTitles = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/{id}/alternative_titles', { params : {session_id : sessionId } });
        };
        self.getAccountCredits = function(){
            return $http.get(baseUrl + 'movie/{id}/credits');
        };
        self.getMovieImages = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/{id}/images', { params : data });
        };
        self.getMovieByKeywords = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/{id}/keywords', { params : data });
        };
        self.getMovieRelease = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/{id}/releases', { params : data });
        };
        self.getMovieVideo = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/{id}/videos', { params : data });
        };
        self.getMovieTranslation = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/{id}/translations', { params : data });
        };
        self.getSimilarMovies = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/{id}/similar', { params : data });
        };
        self.getMovieReviews = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/{id}/reviews', { params : data });
        };
        self.getMovieChanges = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/{id}/changes', { params : data });
        };
        self.setMovieRating = function(params){
            var params = params || {};
            return $http.post(baseUrl + 'movie/{id}/rating', { data : params });
        };
        self.deleteMovieRating = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/{id}/rating', { params : data });
        };
        self.getNowPlaying = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/now_playing', { params : data });
        };
        self.geLatestMovies = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/latest', { params : data });
        };
        self.getPopularMovies = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/popular', { params : data });
        };
        self.getTopRatedMovies = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/top_rated', { params : data });
        };
        self.getUpComingMovies = function(data){
            data = data || {};
            return $http.get(baseUrl + 'movie/upcoming', { params : data });
        };
    }

    movMoviesApi.$inject = ['$http', 'CONFIG'];
    angular.module('mov.movies', []).service('movMoviesApi', movMoviesApi );
}());
