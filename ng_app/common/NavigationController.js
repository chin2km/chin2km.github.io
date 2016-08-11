var NavigationController = angular.module("chin2km")
.controller("NavigationController", function ($scope, $routeParams, $location, AppService) {


    $scope.navigateTo = function myfunction(view) {
        window.scrollTo(0, 0);
        $location.url('/' + view)
    }
    window.scrollTo(0, 0);
    //Setting active tab Style
    switch ($location.$$path) {
        case '/About':
            $scope.AboutClass = "active";
            $scope.AdminClass = "";
            $scope.CreditsClass = "";
            $scope.DashboardClass = "";
            $scope.ForumClass = "";
            $scope.ToolsClass = "";
            break;
        case '/Admin':
            $scope.AboutClass = "";
            $scope.AdminClass = "active";
            $scope.CreditsClass = "";
            $scope.DashboardClass = "";
            $scope.ForumClass = "";
            $scope.ToolsClass = "";
            break;
        case '/Credits':
            $scope.AboutClass = "";
            $scope.AdminClass = "";
            $scope.CreditsClass = "active";
            $scope.DashboardClass = "";
            $scope.ForumClass = "";
            $scope.ToolsClass = "";
            break;
        case '/Dashboard':
            $scope.AboutClass = "";
            $scope.AdminClass = "";
            $scope.CreditsClass = "";
            $scope.DashboardClass = "active";
            $scope.ForumClass = "";
            $scope.ToolsClass = "";
            break;
        case '/Forum':
            $scope.AboutClass = "";
            $scope.AdminClass = "";
            $scope.CreditsClass = "";
            $scope.DashboardClass = "";
            $scope.ForumClass = "active";
            $scope.ToolsClass = "";
            break;
        case '/Personalize':
            $scope.AboutClass = "";
            $scope.AdminClass = "";
            $scope.CreditsClass = "";
            $scope.DashboardClass = "";
            $scope.ForumClass = "";
            $scope.ToolsClass = "active";
            break;
        default:
            $scope.AboutClass = "active";
            $scope.AdminClass = "";
            $scope.CreditsClass = "";
            $scope.DashboardClass = "";
            $scope.ForumClass = "";
            $scope.ToolsClass = "";
            break;
    }

    AppService.ResetRipples();

})