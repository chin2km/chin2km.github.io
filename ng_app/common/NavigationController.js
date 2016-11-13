var NavigationController = angular.module("chin2km")
.controller('NavigationController', NavigationController);

NavigationController.$inject = ['$scope', '$location', 'chin2kmThemes'];

function NavigationController( $scope, $location, chin2kmThemes) {

    $scope.chin2kmThemes = chin2kmThemes;

    $scope.navigateTo = function (view) {
        window.scrollTo(0, 0);
        $location.url('/' + view)
    }

    $scope.openHamburger = function () {
        document.getElementById("tray").style.display = "block";
    }

    $scope.setTheme = function (theme) {
        $scope.chin2kmThemes.activeTheme = theme;
        window.localStorage.setItem("chin2km_theme", theme);
    }

    //Setting active tab Style
    switch ($location.$$path) {
        case '/works':
            $scope.worksClass = "active";
            $scope.meClass = "";
            break;

        case '/me':
            $scope.worksClass = "";
            $scope.meClass = "active";
            break;
        default:
            $scope.worksClass = "active";
            $scope.meClass = "";
            break;
    }

}