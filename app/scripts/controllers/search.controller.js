/**
 * Created by Narasingh on 12/3/2015.
 */
(function(){
    'use strict';

    function SearchCtrl($scope, movCommonApi){

        $scope.search = function(data){

            movCommonApi.find({query : data.search}).then(function(response){
                console.log(response);
            });
        }
    }

    SearchCtrl.$inject = ['$scope', 'movCommonApi'];
    angular.module('mov.common').controller('SearchCtrl', SearchCtrl);
}());
