(function () {
    angular.module('InfyGlasswall.Dashboard.services', [])
           .factory('DashboardService', DashboardService);

    DashboardService.$inject = ["$timeout"];

    function DashboardService($timeout) {
        var DashboardService = {
        };

        return DashboardService;
    }
})();