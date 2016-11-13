var chin2km = angular.module("chin2km", [
                'ngRoute',
                'chin2km.works',
                'chin2km.work_details',
                'chin2km.about',
            ])
            .config(['$routeProvider','$compileProvider', '$locationProvider',
                  function ($routeProvider) {
                      $routeProvider
                        .otherwise({
                            redirectTo: '/works'
                        });
                  }]);



chin2km.run(function () {

});