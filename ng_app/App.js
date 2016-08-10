/// <reference path="components/About/About.html" />
var chin2km = angular.module("chin2km", [
                'ngRoute',
                'chin2km.About',
            ])
            .config(['$routeProvider','$compileProvider', '$locationProvider',
                  function ($routeProvider, $compileProvider, $locationProvider) {
                      $routeProvider
                        .otherwise({
                            redirectTo: '/About'
                        });
                      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|sip|tel):/);
                  }]);

chin2km.run(function ($route, $rootScope, $location, AppService) {

    //AppService.LoadTimer(8000,"I'm undefined (for now!)")

});