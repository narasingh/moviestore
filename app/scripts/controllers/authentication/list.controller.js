/**
 * Created by Narasingh on 10/25/2015.
 */
(function(){
    'use strict';

    function ListController($scope, MovList, $state, Auth, movAccountApi, movCommonApi){

        var self = this;
        var listObj = new MovList();
        var pages = {
            'account' : 'views/authentication/favorite.html',
            'watchlist' : 'views/authentication/watchlist.html',
            'createlist' : 'views/authentication/create-list.html',
            'watchlistmovies' : 'views/authentication/movies-watchlist.html',
            'favoritemovies' : 'views/authentication/movies-watchlist.html'
        };
        var listObj = new MovList();
        var info = Auth.getInfoSessioin();

            self.pageChanged = function(newPage){

                var view = $state.current.name;
                var params = {
                    page : newPage || 1,
                    extraParams : [{
                        key : 'id',
                        value : info.id
                    }]
                };

                if(view === 'watchlistmovies'){

                    self.title = 'Watchlist';
                    movAccountApi.getWatchListMovies(params).then(function(response){
                        var data = response.data;
                        self.pagination = {
                            per_page: 20,
                            current_page: newPage,
                            total_pages: data.total_pages,
                            total_results: data.total_results
                        };
                        self.movies = response.data.results;
                        $scope.imageInfo = movCommonApi.getImageInfo();
                    });

                }if(view === 'watchlisttv'){

                    Auth.getWatchListTv();

                }if(view === 'favoritemovies'){

                    self.title = 'Favorite';
                    movAccountApi.getFavoriteMovies(params).then(function(response){
                        var data = response.data;
                        self.pagination = {
                            per_page: 20,
                            current_page: newPage,
                            total_pages: data.total_pages,
                            total_results: data.total_results
                        };
                        self.movies = response.data.results;
                        $scope.imageInfo = movCommonApi.getImageInfo();
                    });

                }if(view === 'favoritetv'){
                    Auth.getFavoriteTvShows();
                }

             };

        self.list = {};
        /*
        self.tabs = [
            {title : 'My Favorite', state : 'account'},
            {title : 'My Watchlist', state : 'watchlist'},
            {title : 'Add new', state : 'createlist'}
        ];
        */

        self.userInfo = {
            avatar : info.avatar.gravatar + '.jpg?s=251 1x',
            name : info.username,
            avatarUrl : 'https://secure.gravatar.com/avatar/'
        };
        self.page = pages[$state.current.name];
        self.languages = listObj.languageList();
        self.data = {
            language : self.languages[0]
        };
        self.createNew = function(list){
            var data = list.data;
                data.language = data.language.code;
            listObj.createNewList(data).then(onSuccess);
        };
        self.delete = function(){

        };
        self.pageChanged(1);
    }
    ListController.$inject = ['$scope','MovList', '$state', 'Auth', 'movAccountApi', 'movCommonApi'];
    angular.module('mov.list').controller('ListController', ListController);
}());
