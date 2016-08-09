(function () {
    "use strict";

    angular.module('InfyGlasswall.Personalize', [
        "InfyGlasswall.Personalize.controllers"
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/Personalize', {
            controller: 'PersonalizeController',
            controllerAs: 'toolsVM',
            templateUrl: 'ng_app/components/Personalize/Personalize.html?v=11.000',
            //resolve: {}
        });
    }

})();