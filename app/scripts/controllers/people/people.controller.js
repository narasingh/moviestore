/**
 * Created by Narasingh on 11/1/2015.
 */
(function(){
    'use strict';

    function PeopleController(movPeople, movCommonApi){

        var self = this;
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
                self.imageInfo = movCommonApi.getImageInfo();
                self.people = response.data.results;
            });
        };
        self.pageChanged(1);

    }

    PeopleController.$inject = ['movPeople', 'movCommonApi'];
    angular.module('mov.people').controller('PeopleController', PeopleController);
}());
