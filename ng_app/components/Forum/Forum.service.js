(function () {
    angular.module('InfyGlasswall.Forum.services', [])
           .factory('ForumService', ForumService);

    ForumService.$inject = ["$timeout"];

    function ForumService($timeout) {
        var ForumService = {
        };

        return ForumService;
    }
})();