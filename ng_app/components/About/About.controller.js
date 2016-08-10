(function () {
    "use strict";
    angular.module('chin2km.About.controllers', [])
            .controller('AboutController', AboutController);

    AboutController.$inject = ['$rootScope', '$scope', '$route', '$location','$timeout', '$interval', 'AppService'];

    function AboutController($rootScope, $scope, $route, $location,$timeout, $interval, AppService) {
        var _this = this;
        _this.notifications = [];

        $timeout(function myfunction() {
            _this.notifications.push({ message: "Please feel free to report the bugs to the developer. Help us improve your experience!", status: "success" });
        }, 8000);

        (function SetActiveTab() {            
            AppService.LoadTimer(5000);
        })();

    }

})();