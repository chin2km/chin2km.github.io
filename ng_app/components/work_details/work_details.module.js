(function () {
    "use strict";

    angular.module('chin2km.work_details', [
        "chin2km.work_details.controllers",
        "chin2km.work_details.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/works/:name', {
            controller: 'work_detailsController',
            controllerAs: 'work_detailsVM',
            templateUrl: 'ng_app/components/work_details/work_details.html',
            //resolve: {}
        });
    }

})();