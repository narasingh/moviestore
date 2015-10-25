/**
 * Created by Narasingh on 10/25/2015.
 */
(function(){
    'use strict';

    function ListControllerI(MovList){

        var self = this;

        function init(){
            self.tabs = [
                {title : 'My List', state : 'home'},
                {title : 'My favorite', state : 'nowplaying'},
                {title : 'Add new', state : 'upcoming'}
            ];
        }

    }
    ListControllerI.$inject = ['MovList'];
    angular.module('mov.list').controller('ListController', ListController);
}());
