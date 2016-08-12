var chin2km = angular.module("chin2km", [
                'ngRoute',
                'chin2km.works',
            ])
            .config(['$routeProvider','$compileProvider', '$locationProvider',
                  function ($routeProvider, $compileProvider, $locationProvider) {
                      $routeProvider
                        .otherwise({
                            redirectTo: '/works'
                        });
                  }]);



chin2km.run(function ($route, $rootScope, $location, AppService) {

});