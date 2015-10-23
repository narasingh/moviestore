(function(){
    'use strict';
    /**
     * Initialize our application routes
     */
    angular.module('movapp',
        ['ngStorage', 'ngAnimate', 'angularSpinner', 'toastr', 'mov.api', 'mov.common', 'mov.account', 'mov.movies','mov.featured', 'mov.search', 'mov.list',
            'dc.endlessScroll', 'ui.router','angularUtils.directives.dirPagination', 'mov.authenticate'])
        .config(['toastrConfig','$stateProvider' , '$urlRouterProvider', function (toastrConfig, $stateProvider, $urlRouterProvider) {

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
                    templateUrl : 'views/authentication/user-login.html',
                    controller : 'UserLoginController as userCtrl'
                });

                //toastr config
                angular.extend(toastrConfig, {
                    autoDismiss: false,
                    containerId: 'mov-message-container',
                    maxOpened: 0,
                    newestOnTop: true,
                    positionClass: 'toast-top-center',
                    preventDuplicates: false,
                    preventOpenDuplicates: false,
                    target: '.message',
                    iconClasses : {
                        error: 'alert alert-danger',
                        info: 'alert alert-info',
                        success: 'alert alert-success',
                        warning: 'alert alert-warning'
                    },
                    toastClass : 'global-message'
                });

        }])
        .constant('CONFIG', {
            'baseUrl' : 'http://api.themoviedb.org/3/',
            'key' : '6fbb0ef60b41be2618fdba45a982f5af'
        })
        .run(['movCommonApi','Logger', '$rootScope', '$state', function(movCommonApi, Logger, $rootScope){
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

            $rootScope.$on('mov-error.handler', function(event, rejection){

                //handle errors
                var status = ~~rejection.status;
                var objStatus = {
                    401 : Logger.error,
                    200 : Logger.success
                };

                if(objStatus.hasOwnProperty(status)){
                    objStatus[status].call(this, rejection.data.status_message, rejection.data,  'Error');
                }

            });

        }]);
}());
