(function () {
    angular.module('InfyGlasswall.Admin.services', [])
           .factory('AdminService', AdminService);

    AdminService.$inject = ["$timeout"];

    function AdminService($timeout) {
        var AdminService = {
        };

        return AdminService;
    }
})();