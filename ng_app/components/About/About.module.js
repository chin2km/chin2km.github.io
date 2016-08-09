(function () {
    "use strict";

    angular.module('InfyGlasswall.About', [
        "InfyGlasswall.About.controllers",
        "InfyGlasswall.About.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/About', {
            controller: 'AboutController',
            controllerAs: 'aboutVM',
            templateUrl: 'ng_app/components/About/About.html?v=11.000',
            //resolve: {}
        });
    }

})();