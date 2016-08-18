(function () {
    "use strict";
    angular.module('chin2km.about.controllers', [])
            .controller('aboutController', aboutController);

    aboutController.$inject = ['$rootScope', '$scope', '$route', '$location','$timeout', '$interval', 'AppService'];

    function aboutController($rootScope, $scope, $route, $location,$timeout, $interval, AppService) {
        var _this = this;
        _this.notifications = [];
        _this.AppService=AppService;
        $timeout(function () {
            _this.notifications.push({ message: "Please feel free to report the bugs to the developer. Help us improve your experience!", status: "success" });
        }, 8000);

        (function() {            
            AppService.LoadTimer(3000);
        })();

    }

})();