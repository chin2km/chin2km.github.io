(function () {
    "use strict";
    angular.module('chin2km.works.controllers', [])
            .controller('worksController', worksController);

    worksController.$inject = ['$location', 'AppService'];

    function worksController($location, AppService) {
        var _this = this;
        _this.AppService=AppService;

        (function() {            
            AppService.LoadTimer(1500);
        })();

        window.scrollTo(0,0);       

        AppService.fetchData().then(function (data) {
            _this.allWorks = data;
        }, function error(e) {
        });

        _this.goToDetails = function(name) {
            $location.url('/works/' + name)
        }
    }

})();