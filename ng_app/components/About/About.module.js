(function () {
    "use strict";

    angular.module('chin2km.About', [
        "chin2km.About.controllers",
        "chin2km.About.services",
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