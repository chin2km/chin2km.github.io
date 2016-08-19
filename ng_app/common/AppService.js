var AppService = angular.module('chin2km')
.factory('AppService', function ($rootScope, $http, $location, $timeout) {


    return {
        ShowLoader: function (message) {

            (function() {
                setTimeout(function () {
                    $rootScope.$apply(function () {
                        $rootScope.loaderVisibility = true;
                        $rootScope.loaderText = message;
                    })
                }, 0);
            })();                          
        },
        HideLoader: function () {
            (function () {
                setTimeout(function () {
                    $rootScope.$apply(function () {
                        $rootScope.loaderVisibility = false;
                    })
                }, 0);
            })();
            setTimeout(SetRippleEffectHandle, 0);

        },
        LoadTimer: function (time, message) {

            (function () {
                setTimeout(function () {
                    $rootScope.$apply(function () {
                        $rootScope.loaderVisibility = false;
                        $rootScope.loaderText = message;
                    })
                }, 0);
            })();

            (function () {
                setTimeout(function () {
                    $rootScope.$apply(function () {
                        $rootScope.loaderVisibility = true;
                        $rootScope.loaderText = message;
                    })
                }, 0);
            })();

            (function () {
                setTimeout(function () {
                    $rootScope.$apply(function () {
                        $rootScope.loaderVisibility = false;
                        $rootScope.loaderText = message;
                    })
                }, time);
            })();
        },
        fetchData: function (callback) {
            return $timeout(function () {
                return $http.get("ng_app/common/catalog.htm").then(function (response) {
                    return response.data;
                });
            }, 30);
        }

    };
})
