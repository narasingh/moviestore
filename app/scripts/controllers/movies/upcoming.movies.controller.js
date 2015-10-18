/**
 * Created by Narasingh on 10/17/2015.
 */
(function(){
    'use strict';
    function MovUpcomingController($scope, movMoviesApi, movCommonApi){

        var self = this;
        self.pageChanged = function(newPage){

            var params = {
                page : newPage || 1
            }
            movMoviesApi.getUpComingMovies(params).then(function(response) {
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

    MovUpcomingController.$inject = ['$scope','movMoviesApi', 'movCommonApi'];
    angular.module('mov.featured').controller('MovUpcomingController', MovUpcomingController);
}());
