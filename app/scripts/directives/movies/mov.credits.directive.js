/**
 * Created by Narasingh on 10/12/2015.
 */
(function(){
    function movCreditsActors(){
        'use strict';

        return {
          restrict : 'EA',
          scope : {
              credits : '=credits'
          },
          link : function(scope, elements, attrs){

          },
          templateUrl : 'views/movies/movie-actors.html'
        };

    }

    angular.module('mov.common').directive('movCreditsActors', movCreditsActors);
}());
