/**
 * Created by Narasingh on 10/4/2015.
 */
(function(){
    'use strict';

    function MovFeaturedController($scope, movMoviesApi, movCommonApi){


        var popularMovies = function(response){
            var data  = response.data;
            $scope.upcomingDates = data.dates;
            $scope.page = data.page;
            //$scope.upcomingMovies = data.results;

            // Parse pagination data from the response header
            $scope.pagination = {
                current_page : data.page,
                total_pages : data.total_pages
            };

            // Create an array if not already created
            $scope.upcomingMovies = $scope.upcomingMovies || [];

            // Append new items (or prepend if loading previous pages)
            $scope.upcomingMovies.push.apply($scope.upcomingMovies, data.results);

            $scope.loading = false;
        },
        load = function(page) {
            var params     = { page: page },
                isTerminal = $scope.pagination &&
                    $scope.pagination.current_page >= $scope.pagination.total_pages &&
                    $scope.pagination.current_page <= 1,
                totalRecords = $scope.pagination && $scope.pagination.total_pages || undefined;

            // Determine if there is a need to load a new page
            if ( (!isTerminal && page <= totalRecords) || !totalRecords) {
                // Flag loading as started
                $scope.loading = true;


                // Make API request
                movMoviesApi.getPopularMovies(params).then(popularMovies);
            }
        };

        // Register event handler
        $scope.$on('endlessScroll:next', function() {
            // Determine which page to load
            var page = $scope.pagination ? $scope.pagination.current_page + 1 : 1;

            // Load page
            load(page);
        });

        // Load initial page
        load(1);
        $scope.imageInfo = movCommonApi.getImageInfo();

    }

    MovFeaturedController.$inject = ['$scope', 'movMoviesApi', 'movCommonApi'];
    angular.module('mov.featured',['dc.endlessScroll']).controller('movFeaturedController', MovFeaturedController);
}());
