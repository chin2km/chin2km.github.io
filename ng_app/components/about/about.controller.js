(function () {
    "use strict";
    angular.module('chin2km.about.controllers', [])
            .controller('aboutController', aboutController);

    aboutController.$inject = ['$rootScope', '$scope', '$route', '$location','$timeout', '$interval', 'AppService'];

    function aboutController($rootScope, $scope, $route, $location,$timeout, $interval, AppService) {
        var _this = this;
        _this.notifications = [];
        _this.AppService=AppService;

        window.scrollTo(0,0);       

        (function() {            
            AppService.LoadTimer(1500);
        })();

    }

})();