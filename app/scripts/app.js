(function(){
    'use strict';
    /**
     * Initialize our application routes
     */
    angular.module('movapp',
        ['ngStorage', 'ngAnimate', 'angularSpinner', 'mov.api', 'mov.common', 'mov.account', 'mov.movies','mov.featured', 'mov.search', 'mov.list',
            'dc.endlessScroll', 'ui.router','angularUtils.directives.dirPagination'])
        .config(['$stateProvider' , '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state('home', {
                    url : '/home',
                    templateUrl: 'views/movies/featured-movies.html',
                    controller: 'movFeaturedController'
                })
                .state('movies', {
                    url : '/moviedetails/:id',
                    templateUrl: 'views/movies/movies-details.html',
                    controller: 'movDetailsController'
                })
                .state('nowplaying', {
                    url : '/nowplaying',
                    templateUrl: 'views/movies/movies-playing.html',
                    controller: 'MovLatestMoviesController as LatestMoviesCtrl'
                }).state('upcoming', {
                    url : '/upcoming',
                    templateUrl : 'views/movies/movies-upcoming.html',
                    controller : 'MovUpcomingController as movUpcomingCtrl'
                })
                .state('latest', {
                    url : '/latest.movies',
                    templateUrl : 'views/movies/movies-list.html',
                    controller : 'MovListController as movListCtrl'
                })
                .state('login', {
                    url : '/user.login',
                    templateUrl : 'views/authenticate/user-login.html',
                    controller : 'UserLoginController as userCtrl'
                });
        }])
        .constant('CONFIG', {
            'baseUrl' : 'http://api.themoviedb.org/3/',
            'key' : '6fbb0ef60b41be2618fdba45a982f5af'
        })
        .run(['movCommonApi','$rootScope', '$state', function(movCommonApi, $rootScope){
            //make onload calls
            movCommonApi.setConfiguration();
            movCommonApi.setSessionId();

            //handle state change
            $rootScope.$on('$stateChangeStart', function(event, toState){
                //check that user is logged in
               $rootScope.currentState = function(state){
                   return (typeof state === 'object' && state.indexOf(toState.name) > -1) || (toState.name === state);
               };
            });

        }]);

        //angular.module('mov.common', ['mov.search', 'mov.list']);

}());
