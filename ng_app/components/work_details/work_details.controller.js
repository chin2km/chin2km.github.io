(function () {
    "use strict";
    angular.module('chin2km.work_details.controllers', [])
            .controller('work_detailsController', work_detailsController);

    work_detailsController.$inject = ['$routeParams', '$location', 'AppService'];

    function work_detailsController($routeParams, $location, AppService) {
        var _this = this;
        _this.AppService=AppService;

        (function() {            
            AppService.LoadTimer(1500);
        })();

        window.scrollTo(0,0);       
        AppService.fetchData().then(function (data) {
            try {
                _this.activeWork = data.find(function (d) {
                    return d.name == $routeParams.name;
                });

                _this.arrr = [];
                for (var i = 0; i < 10; i++) {
                    _this.arrr.push({ index: i + 1 });
                }
            } catch (e) {
                $location.url('/works');
            }

        }, function error() {
            $location.url('/works');
        });
    }
})();