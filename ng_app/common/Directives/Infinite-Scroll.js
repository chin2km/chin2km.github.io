/* global angular */

(function () {
    "use strict";

    angular.module('chin2km')
            .directive('dpInfiniteScroll', dpInfiniteScroll)
})();

dpInfiniteScroll.$inject = ['$window'];

function dpInfiniteScroll($window) {
    return {
        scope: {
            "currentPage": "=currentPage",
            "loadMore": "&loadMore"
        },
        restrict: 'A',
        link: link
    };

    function link(scope, element, attrs, ctrl) {

        var loadMoreItems = function () {
            if (element[0].getBoundingClientRect().bottom-0.5 <= $window.innerHeight) {
                scope.currentPage = scope.currentPage + 1;
                scope.loadMore({
                    currentPage: scope.currentPage
                });
            }
        }

        angular.element($window).on("scroll", loadMoreItems);

        scope.$on('$destroy', function () {
            angular.element($window).off('scroll', loadMoreItems);
        });

    }
}

