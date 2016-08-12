(function () {
    angular.module('chin2km.works.services',[])
           .factory('worksService', worksService);

    worksService.$inject = ["$timeout"];

    function worksService($timeout) {
        var worksService = {
        };

        return worksService;
    }
})();