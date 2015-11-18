/**
 * Created by Narasingh on 10/3/2015.
 */
(function(){
    'use strict';

    function MovBaseController($state){

        var self = this;

        function init(){

            self.tabs = [
                {title : 'Featured Movies', state : 'home'},
                {title : 'Now Playing', state : 'nowplaying'},
                {title : 'Coming Soon', state : 'upcoming'},
                {title : 'Top Rated', state: 'latest'}
            ];

            self.tvTabs = [
                {title : 'Top Rated', state : 'tvtoprated'},
                {title : 'Popular', state : 'tvpopular'},
                {title : 'On the Air', state : 'ontheair'},
                {title : 'Airring Today', state : 'airing'}
            ];

        }
        self.stateChange = function(){
            console.log($state.is('home'));
        };
        init();
    }

    MovBaseController.$inject = ['$state'];
    angular.module('mov.common').controller('movBaseController', MovBaseController);

}());
