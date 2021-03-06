/**
 * Created by Narasingh on 11/15/2015.
 */
(function(){
   'use strict';

    function TopratedTvShowsController(TvshowsApi, movCommonApi, $scope){

        var self = this;
        self.pageChanged = function(newPage){

            var params = {
                page : newPage || 1
            }
            TvshowsApi.getTopRatedTvShows(params).then(function(response) {
                var data = response.data;
                self.pagination = {
                    per_page: 20,
                    current_page: newPage,
                    total_pages: data.total_pages,
                    total_results: data.total_results
                };
                self.tvshows = response.data.results;
                $scope.imageInfo = movCommonApi.getImageInfo();
            });
        };
        self.pageChanged();
    }

    TopratedTvShowsController.$inject = ['TvshowsApi', 'movCommonApi', '$scope'];
    angular.module('mov.tvshows').controller('TopratedTvShowsController', TopratedTvShowsController);
}());
