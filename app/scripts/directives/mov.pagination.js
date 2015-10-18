/**
 * Created by Narasingh on 10/4/2015.
 */
(function(){
    'use strict';

    function movEndLessPagination(){

        return {
            restrict : 'EA',
            scope : {},
            link : function(){
                //console.log(true);
            },
            templateUrl : 'views/pagination/endless-pagination.html'
        };

    }

    //movEndLessPagination.$inject = ['dc.endlessScroll'];
    angular.module('mov.common').directive('movEndLessPagination', [movEndLessPagination]);
}());
