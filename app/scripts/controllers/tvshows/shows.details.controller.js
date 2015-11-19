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

        TvshowsApi.getTvInfo({ extraParams : extraParams }).then(function(response){
            $scope.tvshow = response.data;
            $scope.tvshow.rating = 0;
        });

    }

    ShowDetailsController.$inject = ['$scope', '$stateParams', 'movCommonApi', 'TvshowsApi'];
    angular.module('mov.tvshows').controller('ShowDetailsController', ShowDetailsController);
}());
