/**
 * Created by Narasingh on 10/25/2015.
 */
(function(){
    'use strict';

    function ListController($scope, MovList, $state, Auth){

        var self = this;
        var listObj = new MovList();
        var pages = {
            'account' : 'views/authentication/favorite.html',
            'watchlist' : 'views/authentication/watchlist.html',
            'createlist' : 'views/authentication/create-list.html'
        };
        var listObj = new MovList();
        var onSuccess = function(response){

                self.list = response.data;

            },
            loadList = function(){
                var data = {
                    page : 1
                };
                listObj.getList(data).then(onSuccess);
            };
        var info = Auth.getInfoSessioin();

        self.list = {};
        self.tabs = [
            {title : 'My Favorite', state : 'account'},
            {title : 'My Watchlist', state : 'watchlist'},
            {title : 'Add new', state : 'createlist'}
        ];

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

        loadList();
    }
    ListController.$inject = ['$scope','MovList', '$state', 'Auth'];
    angular.module('mov.list').controller('ListController', ListController);
}());
