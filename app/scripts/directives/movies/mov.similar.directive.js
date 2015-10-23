(function(){
    'use strict';

    function movSimilarMovies(movMoviesApi){
        return {
             restrict : 'EA',
             scope : {
                 id : '@id',
                 noOfRecords : '@noOfRecords',
                 imageUrl : '@imageUrl',
                 type : '@type'
             },
             link : function(scope, element, attr){

                 var getSimilarMovies = function(response){
                        scope.similarMovies = response.data.results;
                     };
                 var getTopRatedMovies = function(response){
                     //random movies
                     scope.similarMovies = response.data.hasOwnProperty('results') && response.data.results.sort(function(a, b){
                             return Math.random() - 0.5;
                     });
                 };

                 if(scope.type ==='toprated'){
                     movMoviesApi.getTopRatedMovies().then(getTopRatedMovies);
                 }


                 scope.$watch('id', function(newval, oldval){

                    if(newval){
                        var data = {
                            page: 1,
                            extraParams: [{
                                key: 'id',
                                value: scope.id
                            }]
                        };

                        movMoviesApi.getSimilarMovies(data).then(getSimilarMovies);
                    }

                 });

             },
             templateUrl : 'views/movies/mov.similar.movies.html'
        };
    }

    movSimilarMovies.$inject = ['movMoviesApi'];
    angular.module('mov.common').directive('movSimilarMovies', movSimilarMovies);
}());
