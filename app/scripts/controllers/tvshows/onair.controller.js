/**
 * Created by Narasingh on 11/24/2015.
 */
(function(){
    'use strict';
    function OntheairController(TvshowsApi, movCommonApi, $scope){
        var self = this;
        self.pageChanged = function(newPage){

            var params = {
                page : newPage || 1
            }
            TvshowsApi.getTvShowsOnAir(params).then(function(response) {
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

    OntheairController.$inject = ['TvshowsApi', 'movCommonApi', '$scope'];
    angular.module('mov.tvshows').controller('OntheairController', OntheairController);
}());
