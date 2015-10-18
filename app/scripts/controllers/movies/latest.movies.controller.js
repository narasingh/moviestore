/**
 * Created by Narasingh on 10/16/2015.
 */
(function(){
    'use strict';

    function MovLatestMoviesController($scope, movMoviesApi, movCommonApi){

        var self = this;
        self.pageChanged = function(newPage){

            var params = {
                 page : newPage || 1
            }
            movMoviesApi.getNowPlaying(params).then(function(response) {
                var data = response.data;
                self.pagination = {
                    per_page: 20,
                    current_page: newPage,
                    total_pages: data.total_pages,
                    total_results: data.total_results
                };
                self.movies = response.data.results;
                $scope.imageInfo = movCommonApi.getImageInfo();
            });
        };
        self.pageChanged();

    }

    MovLatestMoviesController.$inject = ['$scope', 'movMoviesApi', 'movCommonApi'];
    angular.module('mov.featured').controller('MovLatestMoviesController', MovLatestMoviesController);
}());
