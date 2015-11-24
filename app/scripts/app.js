(function(){
    'use strict';
    /**
     * Initialize our application routes
     */
    angular.module('movapp',
            ['ngStorage',
            'ngAnimate',
            'angularSpinner',
            'toastr',
            'mov.api',
            'mov.common',
            'mov.account',
            'mov.movies',
            'mov.featured',
            'mov.search',
            'mov.list',
            'dc.endlessScroll',
            'ui.router',
            'angularUtils.directives.dirPagination',
            'mov.authenticate',
            'mov.people',
            'mov.tvshows'])
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
                })
                .state('people', {
                    url : '/popular.person',
                    templateUrl : 'views/people/popular-people.html',
                    controller : 'PeopleController as peopleCtrl'
                })
                .state('person', {
                    url : '/popular.person/:id',
                    templateUrl : 'views/people/person-info.html',
                    controller : 'PeopleController as peopleCtrl'
                })
                .state('account', {
                    url : '/user.account',
                    templateUrl : 'views/authentication/user-account.html',
                    controller : 'ListController as listCtrl',
                    resolve : {
                        auth : ['$q', 'Auth', function($q, Auth){
                             if(!Auth.isLoggedIn()){
                                 var errorObject = { code: 'NOT_AUTHENTICATED' };
                                 return $q.reject(errorObject);
                             }
                        }]
                    }
                })
                .state('watchlistmovies', {
                    url : '/user.watchlist/:type',
                    templateUrl : 'views/authentication/user-account.html',
                    controller : 'ListController as listCtrl',
                    resolve : {
                        auth : ['$q', 'Auth', function($q, Auth){
                            if(!Auth.isLoggedIn()){
                                var errorObject = { code: 'NOT_AUTHENTICATED' };
                                return $q.reject(errorObject);
                            }
                        }]
                    }
                })
                .state('favoritemovies', {
                    url : '/user.favorite/:type',
                    templateUrl : 'views/authentication/user-account.html',
                    controller : 'ListController as listCtrl',
                    resolve : {
                        auth : ['$q', 'Auth', function($q, Auth){
                            if(!Auth.isLoggedIn()){
                                var errorObject = { code: 'NOT_AUTHENTICATED' };
                                return $q.reject(errorObject);
                            }
                        }]
                    }
                })
                .state('showlist', {
                    url : '/user.account/:page',
                    templateUrl : 'views/authentication/user-account.html',
                    controller : 'ListController as listCtrl',
                    resolve : {
                        auth : ['$q', 'Auth', function($q, Auth){
                            if(!Auth.isLoggedIn()){
                                var errorObject = { code: 'NOT_AUTHENTICATED' };
                                return $q.reject(errorObject);
                            }
                        }]
                    }
                })
                .state('createlist', {
                    url : '/create.list',
                    templateUrl : 'views/authentication/user-account.html',
                    controller : 'ListController as listCtrl',
                    resolve : {
                        auth : ['$q', 'Auth', function($q, Auth){
                            if(!Auth.isLoggedIn()){
                                var errorObject = { code: 'NOT_AUTHENTICATED' };
                                return $q.reject(errorObject);
                            }
                        }]
                    }
                })
                .state('logout',{
                    url : '/user.logout',
                    resolve : {
                        auth : ['$q', 'Auth', function($q, Auth){
                            if(Auth.logout()){
                                var errorObject = { code: 'NOT_AUTHENTICATED' };
                                return $q.reject(errorObject);
                            }
                        }]
                    }
                })
                .state('tvtoprated', {
                    url : '/tvtoprated',
                    templateUrl : 'views/tvshows/top-rated.html',
                    controller : 'TopratedTvShowsController as tvShowsTopratedCtrl'
                })
                .state('tvpopular', {
                    url : '/tvpopular',
                    templateUrl : 'views/tvshows/popular.html',
                    controller : 'PopularTvController as popularTvCtrl'
                })
                .state('ontheair', {
                    url : '/ontheair',
                    templateUrl : 'views/tvshows/onair.html',
                    controller : 'OntheairController as onairCtrl'
                })
                .state('airing', {
                    url : '/airing',
                    templateUrl : 'views/tvshows/onair.html',
                    controller : 'AiringController as onairCtrl'
                })
                .state('showdetails',{
                    url : '/showdetails/:id',
                    templateUrl : 'views/tvshows/details.html',
                    controller : 'ShowDetailsController'
                });

                //toastr config
                angular.extend(toastrConfig, {
                    autoDismiss: true,
                    containerId: 'toast-container',
                    maxOpened: 0,
                    newestOnTop: true,
                    positionClass: 'toast-top-right',
                    preventDuplicates: false,
                    preventOpenDuplicates: false,
                    target: 'body'
                    /*iconClasses : {
                        error: 'alert alert-danger',
                        info: 'alert alert-info',
                        success: 'alert alert-success',
                        warning: 'alert alert-warning'
                    },
                    toastClass : 'global-message'
                    */
                });

        }])
        .constant('CONFIG', {
            'baseUrl' : 'http://api.themoviedb.org/3/',
            'key' : '6fbb0ef60b41be2618fdba45a982f5af'
        })
        .run(['movCommonApi','Logger', '$rootScope', '$state', function(movCommonApi, Logger, $rootScope, $state){
            //make onload calls
            movCommonApi.setConfiguration();
            movCommonApi.setSessionId();

            //handle state change
            $rootScope.$on('$stateChangeStart', function(event, toState){
                //check user is logged in
               $rootScope.currentState = function(state){
                   return (typeof state === 'object' && state.indexOf(toState.name) > -1) || (toState.name === state);
               };
            });

            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){

                if(error.code === 'NOT_AUTHENTICATED'){
                    $state.go('login');
                }

            });

            $rootScope.$on('mov-success.handler', function(event, response){

                //handle errors
                var status = response.status;

                if([200,201].indexOf(status)  > -1){
                    Logger.success(response.data.success_message, response.data,  'Success');
                }

            });

            $rootScope.$on('mov-error.handler', function(event, rejection){

                //handle errors
                var status = rejection.status;

                if([401,403,500,501].indexOf(status) > -1){
                   Logger.error(rejection.data.status_message, rejection.data,  'Error');
                }

            });

        }]);
}());
