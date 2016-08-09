var AppService = angular.module('InfyGlasswall')
.factory('AppService', function ($rootScope, $location) {

    function SetRippleEffectHandle(selector) {

        $('.ripple').each(function () {

            if (window.RippledControls.indexOf(this) == -1) {

                $(this).on('click', function (event) {
                    event.preventDefault();

                    var $div = $('<div/>');
                    var btnOffset = $(this).offset();
                    var xPos = event.pageX - btnOffset.left;
                    var yPos = event.pageY - btnOffset.top;

                    $(this).css({ 'position': 'relative', 'overflow': 'hidden' });

                    $div.addClass('ripple-effect');
                    var $ripple = $(".ripple-effect");

                    $ripple.css("height", $(this).height());
                    $ripple.css("width", $(this).height());
                    $div
                    .css({
                        top: yPos - ($ripple.height() / 2),
                        left: xPos - ($ripple.width() / 2),
                        background: $(this).data("ripple-color")
                    })
                    .appendTo($(this));

                    setTimeout(function () {
                        $div.remove();
                    }, 1500);
                    
                });

                window.RippledControls.push(this);

            }            

        });

        
    }


    return {
        AuthenticateUser: function (asynccco) {

            $.ajax
               ({
                   type: "POST",
                   async: asynccco,
                   url: "MyService.asmx/AuthenticateUser",
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   success: function (a) {
                       var data = a.d;

                       $rootScope.$apply(function () {

                           if (data != null) {

                               var User = data.User;

                               $rootScope.CurrentUser = User;
                               $rootScope.IsSuperAdmin = (User.UnitID == null && User.PUID == null && User.DUID == null);
                               $rootScope.IsUnitLevelAdmin = (User.UnitID != null && User.PUID == null && User.DUID == null);
                               $rootScope.IsPULevelAdmin = (User.UnitID != null && User.PUID != null && User.DUID == null);
                               $rootScope.IsUser = (User.UnitID != null && User.PUID != null && User.DUID != null);
                               $rootScope.TotalHitCount = data.TotalHitCount;
                           }
                           else {

                               $rootScope.IsSuperAdmin = false;
                               $rootScope.IsUnitLevelAdmin = false;
                               $rootScope.IsPULevelAdmin = false;
                               $rootScope.IsUser = false;


                               var ConfirmFlag = confirm("Access denied.\nDo you wish to contact the Site Admin?");
                               if (ConfirmFlag) {
                                   location.href = "mailto:" + "chintu_k@infosys.com" + '?cc=' + "Vaishnavi_S05@infosys.com" + '&subject=' + "HR Diary User Profile request" + '&body=' + "Add User  Unit=Fill here? PU=Fill here? DU=Fill here?";

                               } else {
                                   window.location = ("http://webapps");
                                   (function () {
                                       setInterval(function () {
                                           window.location = ("http://webapps");
                                       }, 500);
                                   })();
                               }

                           }
                       });

                   },
                   error: function (r) {
                       alert('Something happened! Please feel free to report to the developer');
                       $location.url("/Credits");

                       var ConfirmFlag = confirm("Access denied.\nDo you wish to contact the Site Admin?");
                       if (ConfirmFlag) {
                           location.href = "mailto:" + "chintu_k@infosys.com" + '?cc=' + "Vaishnavi_S05@infosys.com" + '&subject=' + "HR Diary User Profile request" + '&body=' + "Add User  Unit=Fill here? PU=Fill here? DU=Fill here?";

                       } else {
                           window.location = ("http://webapps");
                           (function () {
                               setInterval(function () {
                                   window.location = ("http://webapps");
                               }, 500);
                           })();
                       }

                   }
               });

        },
        IncrementWebsiteHitCount: function () {

            $.ajax
               ({
                   type: "POST",
                   async: true,
                   url: "MyService.asmx/IncrementWebsiteHitCount",
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   success: function (a) {
                       //alert("success");
                   },
                   error: function (r) {
                       //alert("fail");
                   }
               });

        },
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
