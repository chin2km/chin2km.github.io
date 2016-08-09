(function () {
    "use strict";

    angular.module('InfyGlasswall.Credits', [
        "InfyGlasswall.Credits.controllers"
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/Credits', {
            controller: 'CreditsController',
            controllerAs: 'creditsVM',
            templateUrl: 'ng_app/components/Credits/Credits.html?v=11.000',
            //resolve: {}
        });
    }

})();