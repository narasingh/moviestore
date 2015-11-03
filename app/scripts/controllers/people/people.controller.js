/**
 * Created by Narasingh on 11/1/2015.
 */
(function(){
    'use strict';

    function PeopleController(movPeople, movCommonApi, $state){

        var self = this;
        var currentState = $state.current.name;

        self.pageChanged = function(newPage){

            var params = {
                page : newPage || 1
            }
            movPeople.getPopularPeople(params).then(function(response) {
                var data = response.data;
                self.pagination = {
                    per_page: 20,
                    current_page: newPage,
                    total_pages: data.total_pages,
                    total_results: data.total_results
                };
                self.people = response.data.results;
            });
        };
        self.personInfo = function(){
            var pid = $state.params.id;
            var data = {
                 extraParams : [{
                     key : 'id',
                     value : pid
                 }]
            };
            movPeople.getPersonDetails(data).then(function(response){
                 self.person = response.data;
            });
        };

        var state = {
            people : self.pageChanged,
            person : self.personInfo
        };
        self.imageInfo = movCommonApi.getImageInfo();
        currentState && state[currentState].call(this);
    }

    PeopleController.$inject = ['movPeople', 'movCommonApi', '$state'];
    angular.module('mov.people').controller('PeopleController', PeopleController);
}());
