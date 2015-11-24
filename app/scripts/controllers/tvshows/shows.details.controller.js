/**
 * Created by Narasingh on 11/19/2015.
 */
(function(){
    'use strict';

    function ShowDetailsController($scope, $stateParams, movCommonApi, TvshowsApi){

        var extraParams = [{
             key : 'id',
             value : $stateParams.id
        }];

        $scope.imageInfo = movCommonApi.getImageInfo();
        $scope.slides = [];
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;

        TvshowsApi.getTvInfo({ extraParams : extraParams, append_to_response : 'images' }).then(function(response){
            $scope.tvshow = response.data;
            $scope.tvshow.rating = 0;
            var images = $scope.tvshow.images.backdrops;

            angular.forEach(images, function(img){
                $scope.slides.push({
                   image : $scope.imageInfo.base_url + $scope.imageInfo.still_sizes[1] + img.file_path
                });
            });
        });
    }

    ShowDetailsController.$inject = ['$scope', '$stateParams', 'movCommonApi', 'TvshowsApi'];
    angular.module('mov.tvshows').controller('ShowDetailsController', ShowDetailsController);
}());
