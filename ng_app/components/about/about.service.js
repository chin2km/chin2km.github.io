(function () {
    angular.module('chin2km.about.services',[])
           .factory('aboutService', aboutService);

    aboutService.$inject = ["$timeout"];

    function aboutService($timeout) {
        var aboutService = {
        };

        return aboutService;
    }
})();