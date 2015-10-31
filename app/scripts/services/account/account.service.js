/**
 * Created by Narasingh on 10/3/2015.
 */
(function(){
    'use strict';
    /*handle all account related api calls*/
    function movAccountApi($http, CONFIG, movCommonApi){

        var baseUrl = CONFIG.baseUrl;
        var self = angular.extend(this, movCommonApi);

        var sessionId = self.getSessionId();

            self.getAccountInfo = function(){
                return $http.get(baseUrl + 'account', { params : {session_id : self.getSessionId() } });
            };
            self.getFavoriteMovies = function(data){

                var data = angular.extend(data, {session_id : sessionId });
                return $http.get(baseUrl + 'account/id/favorite/movies', { params : data });
            };
            self.getFavoriteTvShows = function(data){
                var data = angular.extend(data, {session_id : sessionId });
                return $http.get(baseUrl + 'account/id/favorite/tv', { params : data });
            };
            self.addToFavorite = function(params){
                return $http.post(baseUrl + 'account/{id}/favorite?session_id=' + sessionId , params);
            };
            self.getRatedTvShows = function(data){
                var data = angular.extend(data, {session_id : sessionId });
                return $http.post(baseUrl + 'account/id/rated/tv', { params : data });
            };
            self.getRatedTvEpisodes = function(data){
                var data = angular.extend(data, {session_id : sessionId });
                return $http.post(baseUrl + 'account/id/rated/tv/episodes', { params : data });
            };
            self.getWatchListMovies = function(data){
                var data = angular.extend(data, {session_id : sessionId });
                return $http.post(baseUrl + 'account/id/watchlist/movies', { params : data });
            };
            self.getWatchListTv = function(data){
                var data = angular.extend(data, {session_id : sessionId });
                return $http.post(baseUrl + 'account/id/watchlist/tv', { params : data });
            };
            self.getRatedMovies = function(data){
                var data = angular.extend(data, {session_id : sessionId });
                return $http.post(baseUrl + 'account/id/rated/movies', { params : data });
            };
            self.addToWatchList = function(params){
                return $http.post(baseUrl + 'account/{id}/watchlist?session_id=' + sessionId, params);
            };
    }

    movAccountApi.$inject = ['$http', 'CONFIG', 'movCommonApi'];
    angular.module('mov.account',[]).service('movAccountApi', movAccountApi);
}());
