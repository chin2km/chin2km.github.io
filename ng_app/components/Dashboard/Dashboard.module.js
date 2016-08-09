(function () {
    "use strict";

    angular.module('InfyGlasswall.Dashboard', [
        "InfyGlasswall.Dashboard.controllers",
        "InfyGlasswall.Dashboard.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/Dashboard', {
            controller: 'DashboardController',
            controllerAs: 'dashboardVM',
            templateUrl: 'ng_app/components/Dashboard/Dashboard.html?v=11.000',
            //resolve: {}
        });
    }

})();