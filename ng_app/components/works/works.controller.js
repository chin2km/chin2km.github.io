(function () {
    "use strict";
    angular.module('chin2km.works.controllers', [])
            .controller('worksController', worksController);

    worksController.$inject = ['$rootScope', '$scope', '$route', '$location', '$timeout', '$interval', 'AppService','$http', '$q'];

    function worksController($rootScope, $scope, $route, $location, $timeout, $interval, AppService,$http, $q) {
        var _this = this;
        _this.AppService=AppService;

        (function() {            
            AppService.LoadTimer(1500);
        })();



        AppService.fetchData().then(function (data) {
            _this.allWorks = data;
        }, function error(e) {
        });

        _this.goToDetails = function(name) {
            $location.url('/works/' + name)
        }
    }

})();