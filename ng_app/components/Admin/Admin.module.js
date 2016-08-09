(function () {
    "use strict";

    angular.module('InfyGlasswall.Admin', [
        "InfyGlasswall.Admin.controllers",
        "InfyGlasswall.Admin.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/Admin', {
            controller: 'AdminController',
            controllerAs: 'adminVM',
            templateUrl: 'ng_app/components/Admin/Admin.html?v=11.000',
            //resolve: {}
        });
    }

})();