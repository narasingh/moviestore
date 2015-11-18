/**
 * Created by Narasingh on 11/18/2015.
 */
(function(){
    'use strict';

    function PopularTvController($scope, movCommonApi, TvshowsApi){

        var self = this;
        self.pageChanged = function(newPage){

            var params = {
                page : newPage || 1
            }
            TvshowsApi.getPopularTvShows().then(function(response) {
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

    PopularTvController.$inject = ['$scope', 'movCommonApi', 'TvshowsApi'];
    angular.module('mov.tvshows').controller('PopularTvController', PopularTvController);
}());
