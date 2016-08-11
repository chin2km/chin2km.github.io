var AppService = angular.module('chin2km')
.factory('AppService', function ($rootScope, $location) {


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
        ResetRipples: function (selector) {
            SetRippleEffectHandle(selector);
        }

    };
});
