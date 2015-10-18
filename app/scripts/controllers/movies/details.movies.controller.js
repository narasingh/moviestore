/**
 * Created by Narasingh on 10/6/2015.
 */
(function(){
    'use strict';
    function MovDetailsController($scope, $stateParams, movMoviesApi, movCommonApi){

        var extraParams = [{
            key : 'id',
            value : $stateParams.id
        }];
        var data = {
                extraParams : extraParams,
                append_to_response : 'credits'
            },
            ratingData = {
                session_id : movCommonApi.getSessionId(),
                guest_session_id : '',
                extraParams : extraParams
            },
            moviesDtail = function(response){
                $scope.movies = response.data;
                $scope.movies.description = $scope.movies.overview;
                $scope.movies.age_restriction = !$scope.movies.adult && 13 || 17;
                $scope.movies.rating = 0;
            };
        $scope.movies = {};

        movMoviesApi.getMovieDetail(data).then(moviesDtail);
        /*movMoviesApi.getMovieRating(ratingData).then(function(response){
           $scope.movies.rating = response.value;
        });
        */
        $scope.imageInfo = movCommonApi.getImageInfo();

    }

    MovDetailsController.$inject = ['$scope', '$stateParams', 'movMoviesApi', 'movCommonApi'];
    angular.module('mov.featured').controller('movDetailsController', MovDetailsController);
}());
