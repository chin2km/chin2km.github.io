(function () {
    "use strict";
    angular.module('chin2km.about.controllers', [])
            .controller('aboutController', aboutController);

    aboutController.$inject = ['AppService'];

    function aboutController(AppService) {
        window.scrollTo(0,0);       

        (function() {            
            AppService.LoadTimer(1500);
        })();
    }
})();