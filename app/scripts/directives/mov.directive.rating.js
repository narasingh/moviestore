/**
 * Created by Narasingh on 10/13/2015.
 */
(function(){
    'use strict';
    function movRating(movMoviesApi, movCommonApi){
        return {
            restrict : 'E',
            require : ['ngModel'],
            scope : {
                ratingValue: '=ngModel',
                max: '=?', // optional (default is 5)
                readonly: '=?',
                movId : '@movId'
            },
            link : function(scope){

                if (scope.max === undefined) {
                    scope.max = 5;
                }
                function updateStars(isCreate) {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue && scope.ratingValue
                        });
                    }
                    //update rating
                    if(isCreate){
                        var data = {
                            extraParams : [{
                                key : 'id',
                                value : scope.movId
                            }],
                            value : scope.ratingValue
                        };
                        movMoviesApi.setMovieRating(data).then(function(response){
                            console.log(response);
                        });
                    }

                }
                scope.toggle = function(index) {
                    if (scope.readonly === undefined || scope.readonly === false){
                        scope.ratingValue = index + 1;
                        updateStars(true);
                    }
                };
                scope.$watch('ratingValue', function(newval){

                    if(newval || newval===0){
                        updateStars();
                    }

                });

            },
            templateUrl : 'views/mov.ratings.html'

        };
    }
    movRating.$inject = ['movMoviesApi', 'movCommonApi'];
    angular.module('mov.common').directive('movRating', movRating);
}());

