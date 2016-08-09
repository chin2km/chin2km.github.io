(function () {
    "use strict";

    angular.module('InfyGlasswall.Forum', [
        "InfyGlasswall.Forum.controllers",
        "InfyGlasswall.Forum.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/Forum', {
            controller: 'ForumController',
            controllerAs: 'forumVM',
            templateUrl: 'ng_app/components/Forum/Forum.html?v=11.000',
            //resolve: {}
        });
    }

})();