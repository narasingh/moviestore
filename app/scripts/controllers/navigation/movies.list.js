/**
 * Created by Narasingh on 10/18/2015.
 */
(function(){
    'use strict';

    function MovListController(movMoviesApi, movCommonApi){
        var self = this;

        self.pageChanged = function(newPage){

            var params = {
                page : newPage || 1
            };
            self.imageInfo = movCommonApi.getImageInfo();
            movMoviesApi.getTopRatedMovies(params).then(function(response) {
                var data = response.data;
                self.pagination = {
                    per_page: 20,
                    current_page: newPage,
                    total_pages: data.total_pages,
                    total_results: data.total_results
                };
                self.movies = response.data.results;
            });
        };
        self.pageChanged();

    }

    MovListController.$inject = ['movMoviesApi', 'movCommonApi'];
    angular.module('mov.common').controller('MovListController', MovListController);
}());
