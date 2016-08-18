(function () {
    "use strict";
    angular.module('chin2km.works.controllers', [])
            .controller('worksController', worksController);

    worksController.$inject = ['$rootScope', '$scope', '$route', '$location','$timeout', '$interval', 'AppService'];

    function worksController($rootScope, $scope, $route, $location,$timeout, $interval, AppService) {
        var _this = this;
        _this.notifications = [];
        _this.AppService=AppService;
        $timeout(function () {
            _this.notifications.push({ message: "Please feel free to report the bugs to the developer. Help us improve your experience!", status: "success" });
        }, 8000);

        (function() {            
            AppService.LoadTimer(3000);
        })();


        _this.allWorks = [
            {
                name: "Adidas Designers Portal", description: "Web Design,Responsive Design, Development"
            },
            {
                name: "Boeing Workflow System", description: "Web Design,Responsive Design, Development"
            },
            {
                name: "Jettravels", description: "Web Design, Development"
            },
            {
                name: "Transparent Academy", description: "Web Design, Development"
            },
            {
                name: "Moneybase", description: "Web Design, Development"
            },
            {
                name: "Fantasy League", description: "Web Design,Responsive Design, Online Game"
            },
            {
                name: "Glasswall", description: "Web Design,Responsive Design, Development"
            },
            {
                name: "Infusion", description: "Web Design, Development"
            },
            {
                name: "Leadersboard", description: "Web Design, Development"
            },
            {
                name: "Adidas Assets Syncer", description: "Cross-platfrom App Development"
            },
            {
                name: "Solution Studio", description: "Desktop Development(Windows), Responsive"
            },
            {
                name: "Groups", description: "Desktop Development(Windows), Chat App"
            },
            {
                name: "Chin2km Portfolio", description: "Web Design,Mobile Responsive Design"
            }
        ]


    }

})();