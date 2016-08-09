/// <reference path="components/About/About.html" />
var InfyGlasswall = angular.module("InfyGlasswall", [
                'ngRoute',
                'ui.select',
                'ui.sortable',
                'ui.bootstrap',
                'InfyGlasswall.About',
                'InfyGlasswall.Admin',
                'InfyGlasswall.Credits',
                'InfyGlasswall.Dashboard',
                'InfyGlasswall.Forum',
                'InfyGlasswall.Personalize',
            ])
            .config(['$routeProvider','$compileProvider', '$locationProvider',
                  function ($routeProvider, $compileProvider, $locationProvider) {
                      $routeProvider
                        .otherwise({
                            redirectTo: '/About'
                        });
                      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|sip|tel):/);
                  }]);

InfyGlasswall.run(function ($route,$rootScope, $location, AppService) {

    //Authenticate User in background
    AppService.AuthenticateUser(false);
    AppService.IncrementWebsiteHitCount();


    //$location.url('/About');



    $route.reload();

    function getUserMemberships(ID) {

        AppService.ShowLoader();

        var Data = {
            userid: ID
        }

        $.ajax({
               type: "POST",
               async: true,
               url: "MyService.asmx/getUserMemberships",
               data: JSON.stringify(Data),
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               success: function (a) {
                   var data = a.d;

                   $rootScope.$apply(function () {

                       var str = "I'm member of :\n\n"
                       for (var i = 0; i < data.length; i++) {
                           str += data[i] + "  |  ";
                       }
                       alert(str);
                   });
                   AppService.HideLoader();
               },
               error: function (r) {
                   alert('Something happened! Please feel free to report to the developer:' + r.responseText);
                   AppService.HideLoader();
                   $location.url("/Credits");
               }
        });

    }

})



