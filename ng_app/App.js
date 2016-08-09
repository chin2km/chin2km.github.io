/// <reference path="components/About/About.html" />
var chin2km = angular.module("chin2km", [
                'ngRoute',
                'chin2km.Me',
            ])
            .config(['$routeProvider','$compileProvider', '$locationProvider',
                  function ($routeProvider, $compileProvider, $locationProvider) {
                      $routeProvider
                        .otherwise({
                            redirectTo: '/Me'
                        });
                  }]);

chin2km.run(function ($route,$rootScope, $location, AppService) {

    //AppService.LoadTimer(8000,"I'm undefined (for now!)")

})



