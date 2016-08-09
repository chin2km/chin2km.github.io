(function () {
    angular.module('chin2km.About.services',[])
           .factory('AboutService', AboutService);

    AboutService.$inject = ["$timeout"];

    function AboutService($timeout) {
        var AboutService = {
        };

        return AboutService;
    }
})();