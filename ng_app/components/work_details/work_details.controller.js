(function () {
    "use strict";
    angular.module('chin2km.work_details.controllers', [])
            .controller('work_detailsController', work_detailsController);

    work_detailsController.$inject = ['$rootScope', '$scope', '$route','$routeParams', '$location','$timeout', '$interval', 'AppService'];

    function work_detailsController($rootScope, $scope, $route,$routeParams, $location,$timeout, $interval, AppService) {
        var _this = this;
        _this.AppService=AppService;

        (function() {            
            AppService.LoadTimer(1500);
        })();

        
        AppService.fetchData().then(function (data) {
            try {
                _this.activeWork = data.filter(function (d) {
                    return d.name == $routeParams.name;
                })[0];

                _this.arrr = [];
                for (var i = 0; i < 10; i++) {
                    _this.arrr.push({ index: i + 1 });
                }

            } catch (e) {
                $location.url('/works');
            }

        }, function error(e) {
            $location.url('/works');
        });



    }

})();