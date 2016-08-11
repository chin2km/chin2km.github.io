/* global angular */

(function () {
    "use strict";

    angular.module('chin2km')
            .directive('glasswallToastNotifications', glasswallToastNotifications)
})();

function glasswallToastNotifications() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div class="notificationsList">\n\
                        <div ng-repeat="toast in toastNotifications" ng-class="toast.status" ng-mouseenter="toast.focused=true" ng-mouseleave="notifyDismiss(toast)">\n\
                            <span class="noti-text">{{toast.message}}</span>\n\
                            <span class="btnContainer my-relative" ng-click="notifyDismiss(toast)">\n\
                                <span class="my-close"></span>\n\
                            </span>\n\
                            <div style="clear:both"></div>\n\
                        </div>\n\
                    </div>',
        scope: {
            "notifications": "=notifications"
        },
        controller: ['$scope', '$timeout', function ($scope, $timeout) {
            $scope.notifyDismiss = notifyDismiss;
            $scope.toastNotifications = [];

            $scope.$watch('notifications', function (newArray, oldArray) {
                for (var i = 0; i < newArray.length; i++) {
                    var noti = newArray[i];
                    if (oldArray.indexOf(noti) == -1) {
                        PushNotification(noti);
                        newArray.splice(newArray.indexOf(noti), 1);
                    }
                }
            },true);


            function notifyDismiss(noti) {
                if ($scope.toastNotifications.indexOf(noti) != -1) {
                    noti.status = noti.status.split(" ")[0];
                    (function (noti) {
                        $timeout(function () {
                            $scope.toastNotifications.splice($scope.toastNotifications.indexOf(noti), 1)
                        }, 400);

                    })(noti);
                }
            }

            function PushNotification(notiObj) {
                notiObj.focused = false;

                $scope.toastNotifications.push(notiObj);
                (function (notiObj) {
                    $timeout(function () {
                        notiObj.status = notiObj.status + " show";

                        $timeout(function () {
                            if (notiObj.focused == false) {
                                $scope.notifyDismiss(notiObj);
                            }
                        }, 10000)

                    }, 10);
                })(notiObj);
            }

        }]
    }

}
