(function () {
    "use strict";
    angular.module('InfyGlasswall.Admin.controllers', [])
            .controller('AdminController', AdminController);

    AdminController.$inject = ['$rootScope', '$scope', '$route', '$location', '$timeout', '$interval', 'AppService'];

    function AdminController($rootScope, $scope, $route, $location, $timeout, $interval, AppService) {
        var _this = this;
        _this.notifications = [];
        $timeout(function myfunction() {
            _this.notifications.push({ message: "Please feel free to report the bugs to the developer. Help us improve your experience!", status: "success" });
        }, 3000);

        if ($rootScope.IsSuperAdmin || $rootScope.IsUnitLevelAdmin || $rootScope.IsPULevelAdmin || $rootScope.IsUser) {
            LoadAllUnitsPUsDUs();
            LoadSuperAdmins();
            LoadForumTypes();
            LoadMOMTypes();
            LoadLocations();
        } else {
            alert("Access Denied!");
            window.location = ("http://webapps");
        }

        var CounterLoaded = 0;

        function LoadAllUnitsPUsDUs() {
            AppService.ShowLoader();
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/LoadAllUnitsPUsDUs",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {
                    var data = a.d;

                    $scope.$apply(function () {
                        $scope.AllUnitsPUsDUs = data;
                        LoadAllUsers();
                    });
                    AppService.HideLoader();
                },
                error: function (r) {
                    alert(JSON.parse(r.responseText).Message);
                    AppService.HideLoader();
                }
            });
        }

        function LoadLocations() {
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/LoadLocations",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {
                    var data = a.d;

                    $scope.$apply(function () {
                        $scope.AllLocations = data;
                    });
                    //AppService.HideLoader();
                },
                error: function (r) {
                    alert(JSON.parse(r.responseText).Message);
                    //AppService.HideLoader();
                }
            });
        }

        function LoadForumTypes() {
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/LoadForumTypes",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {
                    var data = a.d;

                    $scope.$apply(function () {
                        $scope.AllForumTypes = data;
                    });
                    //AppService.HideLoader();
                },
                error: function (r) {
                    alert(JSON.parse(r.responseText).Message);
                    //AppService.HideLoader();
                }
            });
        }

        function LoadMOMTypes() {
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/LoadMOMTypes",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {
                    var data = a.d;

                    $scope.$apply(function () {
                        $scope.AllMOMTypes = data;
                    });
                    //AppService.HideLoader();
                },
                error: function (r) {
                    alert(JSON.parse(r.responseText).Message);
                    //AppService.HideLoader();
                }
            });
        }

        function LoadSuperAdmins() {
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/LoadSuperAdmins",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {
                    var data = a.d;

                    $scope.$apply(function () {
                        $scope.SuperAdmins = data;
                    });
                    AppService.HideLoader();
                },
                error: function (r) {
                    alert(JSON.parse(r.responseText).Message);
                    AppService.HideLoader();
                }
            });
        }

        function LoadAllUsers() {
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/LoadAllUsers",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {
                    var data = a.d;

                    $scope.$apply(function () {

                        for (var k = 0; k < data.length; k++) {
                            var userData = data[k];

                            userData.cb_AllUnitsPUsDUs = [];

                            if ($rootScope.IsSuperAdmin) {

                                var adminUnit = {
                                    lstPUs: [
                                        {
                                            lstDUs: [
                                                {
                                                    DUID: null,
                                                    PUID: null,
                                                    DUName: 'All(Related-DUs)'
                                                }
                                            ],
                                            PUID: null,
                                            UnitID: null,
                                            PUName: 'All(Related-PUs)'
                                        }
                                    ],
                                    UnitID: null,
                                    UnitName: 'All(Unit-Admin)'
                                }
                                userData.cb_AllUnitsPUsDUs.push(adminUnit);
                            }
                            for (var i = 0; i < $scope.AllUnitsPUsDUs.length; i++) {
                                var clonedUnit = clone($scope.AllUnitsPUsDUs[i]);
                                if (!$rootScope.IsUnitLevelAdmin && !$rootScope.IsPULevelAdmin) {
                                    clonedUnit.lstPUs.unshift({
                                        lstDUs: [],
                                        PUID: null,
                                        UnitID: clonedUnit.UnitID,
                                        PUName: 'All(Related-PUs)'
                                    });
                                }

                                for (var j = 0; j < clonedUnit.lstPUs.length; j++) {
                                    var thisPU = clonedUnit.lstPUs[j];
                                    if (!$rootScope.IsPULevelAdmin) {
                                        thisPU.lstDUs.unshift({ DUID: null, PUID: thisPU.PUID, DUName: 'All(Related-DUs)' });
                                    }
                                }

                                userData.cb_AllUnitsPUsDUs.push(clonedUnit);
                            }

                            $scope.setResultPUsForUser(userData);
                            $scope.setResultDUsForUser(userData);
                        }

                        $scope.AllUsers = data;
                    });
                    AppService.HideLoader();
                },
                error: function (r) {
                    alert(JSON.parse(r.responseText).Message); AppService.HideLoader();
                }
            });
        }


        function CheckEverythingLoaded() {
            CounterLoaded += 1;

            if (CounterLoaded == 3) {
                AppService.HideLoader();

                BarChartForAirplanes();

                CounterLoaded = 0;
            }

        }


        $scope.ShowAddNewItemOfType = function (Type, Unit, PU) {

            switch (Type) {

                case "User":
                    $scope.NewUserVisibility = true;
                    $scope.NewUser = {
                        EmailID: "",
                        AddedBy: "",
                        Admin: null,
                        SuperAdmin: null
                    }

                    if ($rootScope.IsSuperAdmin) {
                        $scope.NewUser.UnitID = null;
                        $scope.NewUser.PUID = null;
                        $scope.NewUser.DUID = null;
                    }
                    else if ($rootScope.IsUnitLevelAdmin) {
                        $scope.NewUser.UnitID = $rootScope.CurrentUser.UnitID;
                        $scope.NewUser.PUID = null;
                        $scope.NewUser.DUID = null;
                    }
                    else if ($rootScope.IsPULevelAdmin) {
                        $scope.NewUser.UnitID = $rootScope.CurrentUser.UnitID;
                        $scope.NewUser.PUID = $rootScope.CurrentUser.PUID;
                        $scope.NewUser.DUID = null;
                    }
                    else {
                        $scope.NewUser.UnitID = $rootScope.CurrentUser.UnitID;
                        $scope.NewUser.PUID = $rootScope.CurrentUser.PUID;
                        $scope.NewUser.DUID = $rootScope.CurrentUser.DUID;
                    }


                    $scope.NewUser.cb_AllUnitsPUsDUs = [];

                    if ($rootScope.IsSuperAdmin) {

                        var adminUnit = {
                            lstPUs: [
                                {
                                    lstDUs: [
                                        {
                                            DUID: null,
                                            PUID: null,
                                            DUName: 'All(Related-DUs)'
                                        }
                                    ],
                                    PUID: null,
                                    UnitID: null,
                                    PUName: 'All(Related-PUs)'
                                }
                            ],
                            UnitID: null,
                            UnitName: 'All(Unit-Admin)'
                        }
                        $scope.NewUser.cb_AllUnitsPUsDUs.push(adminUnit);
                    }
                    for (var i = 0; i < $scope.AllUnitsPUsDUs.length; i++) {
                        var clonedUnit = clone($scope.AllUnitsPUsDUs[i]);
                        if (!$rootScope.IsUnitLevelAdmin && !$rootScope.IsPULevelAdmin) {
                            clonedUnit.lstPUs.unshift({
                                lstDUs: [],
                                PUID: null,
                                UnitID: clonedUnit.UnitID,
                                PUName: 'All(Related-PUs)'
                            });
                        }

                        for (var j = 0; j < clonedUnit.lstPUs.length; j++) {
                            var thisPU = clonedUnit.lstPUs[j];
                            if (!$rootScope.IsPULevelAdmin) {
                                thisPU.lstDUs.unshift({ DUID: null, PUID: thisPU.PUID, DUName: 'All(Related-DUs)' });
                            }
                        }

                        $scope.NewUser.cb_AllUnitsPUsDUs.push(clonedUnit);
                    }

                    $scope.setResultPUsForUser($scope.NewUser);
                    if ($rootScope.IsUnitLevelAdmin) {
                        if ($scope.NewUser.ResultedPUsNew[0] == undefined) {
                            alert("There are no PUs under the Unit in which you are Admin.\nThus you cant add any user for now!\nAdd PU first to add an User in that PU!");
                            $scope.NewUserVisibility = false;
                        } else {
                            $scope.NewUser.PUID = $scope.NewUser.ResultedPUsNew[0].PUID;
                        }
                    }

                    $scope.setResultDUsForUser($scope.NewUser);
                    if ($rootScope.IsPULevelAdmin) {
                        if ($scope.NewUser.ResultedDUsNew[0] == undefined) {
                            alert("There are no DUs under the PU in which you are Admin.\nThus you cant add any user for now!\nAdd DU first to add an User in that DU!");
                            $scope.NewUserVisibility = false;
                        } else {
                            $scope.NewUser.DUID = $scope.NewUser.ResultedDUsNew[0].DUID;
                        }
                    }

                    break;

                case "Unit":
                    $scope.NewUnitVisibility = true;
                    $scope.NewUnit = {
                        UnitID: 0,
                        UnitName: ''
                    }

                    break;
                case "PU":
                    Unit.NewPUVisibility = true;
                    $scope.NewPU = {
                        PUID: 0,
                        PUName: '',
                        //PUStrength: 0,
                        UnitID: Unit.UnitID
                    }

                    break;
                case "DU":
                    PU.NewDUVisibility = true;
                    $scope.NewDU = {
                        DUID: 0,
                        DUName: '',
                        PUID: PU.PUID
                    }

                    break;
                case "Location":
                    $scope.NewLocationVisibility = true;
                    $scope.NewLocation = {
                        LocationID: 0,
                        LocationName: ''
                    }

                    break;
                case "ForumType":
                    $scope.NewForumTypeVisibility = true;
                    $scope.NewForumType = {
                        ForumTypeID: 0,
                        ForumTypeName: ''
                    }

                    break;
                case "MOMType":
                    $scope.NewMOMTypeVisibility = true;
                    $scope.NewMOMType = {
                        MOMTypeID: 0,
                        MOMTypeName: ''
                    }

                    break;

                default:

            }

        }

        $scope.setResultPUsForUser = function (user) {

            for (var i = 0; i < user.cb_AllUnitsPUsDUs.length; i++) {

                var thisunit = user.cb_AllUnitsPUsDUs[i];
                if (thisunit.UnitID == user.UnitID) {
                    user.ResultedPUsNew = thisunit.lstPUs;
                    break;
                }
            }
        }

        $scope.setResultDUsForUser = function (user) {

            for (var i = 0; i < user.ResultedPUsNew.length; i++) {

                var thisPU = user.ResultedPUsNew[i];
                if (thisPU.PUID == user.PUID) {
                    user.ResultedDUsNew = thisPU.lstDUs;
                    break;
                }
            }
        }

        $scope.SaveItemOftype = function (Type, Item) {
            AppService.ShowLoader();

            var Data = {
                Type: Type,
                Data: Item
            }

            if (Type == "User") {

                var user = {
                    userid: Item.EmailID
                }
                $.ajax({
                    type: "POST",
                    async: true,
                    url: "MyService.asmx/getUserMemberships",
                    data: JSON.stringify(user),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (a) {

                        $.ajax({
                            type: "POST",
                            async: true,
                            url: "MyService.asmx/SaveThisItem",
                            data: JSON.stringify(Data),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (a) {
                                var data = a.d;

                                LoadAllUnitsPUsDUs();

                                AppService.HideLoader();
                            },
                            error: function (r) {
                                alert(JSON.parse(r.responseText).Message); AppService.HideLoader();
                            }
                        });

                    },
                    error: function (r) {
                        alert('Invalid UserID!!!\nExamples:\nIncorrect: abcd_efg@Infosys.com\nIncorrect: abcd_efg@Gmail.com\n\nCorrect: abcd_efg');
                        AppService.HideLoader();
                    }
                });
            }
                //Others
            else {
                $.ajax({
                    type: "POST",
                    async: true,
                    url: "MyService.asmx/SaveThisItem",
                    data: JSON.stringify(Data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (a) {
                        var newID = a.d;

                        $scope.$apply(function () {
                            switch (Type) {
                                case "DU":

                                    for (var i = 0; i < $scope.AllUnitsPUsDUs.length; i++) {
                                        var U = $scope.AllUnitsPUsDUs[i];

                                        for (var j = 0; j < U.lstPUs.length; j++) {
                                            var PU = U.lstPUs[j];
                                            if (Item.PUID == PU.PUID) {

                                                if (PU.lstDUs.indexOf(Item) == -1) {
                                                    Item.DUID = newID;
                                                    PU.lstDUs.push(Item);
                                                }
                                            }
                                        }
                                    }

                                    break;
                                case "PU":
                                    for (var i = 0; i < $scope.AllUnitsPUsDUs.length; i++) {
                                        var U = $scope.AllUnitsPUsDUs[i];

                                        if (Item.UnitID == U.UnitID) {
                                            if (U.lstPUs.indexOf(Item) == -1) {

                                                Item.PUID = newID;
                                                U.lstPUs.push(Item);
                                                break;
                                            }
                                        }
                                    }
                                    break;
                                case "Unit":

                                    if ($scope.AllUnitsPUsDUs.indexOf(Item) == -1) {

                                        Item.UnitID = newID;
                                        $scope.AllUnitsPUsDUs.push(Item);
                                    }

                                    break;
                                case "Location":
                                    for (var i = 0; i < $scope.AllLocations.length; i++) {
                                        var Loc = $scope.AllLocations[i];
                                        if ($scope.AllLocations.indexOf(Item) == -1) {
                                            Item.LocationID = newID;
                                            $scope.AllLocations.push(Item);
                                            break;
                                        }
                                    }
                                    break;
                                case "ForumType":
                                    for (var i = 0; i < $scope.AllForumTypes.length; i++) {
                                        var Loc = $scope.AllForumTypes[i];
                                        if ($scope.AllForumTypes.indexOf(Item) == -1) {
                                            Item.ForumTypeID = newID;
                                            $scope.AllForumTypes.push(Item);
                                            break;
                                        }
                                    }
                                    break;
                                case "MOMType":
                                    for (var i = 0; i < $scope.AllMOMTypes.length; i++) {
                                        var Loc = $scope.AllMOMTypes[i];
                                        if ($scope.AllMOMTypes.indexOf(Item) == -1) {
                                            Item.MOMTypeID = newID;
                                            $scope.AllMOMTypes.push(Item);
                                            break;
                                        }
                                    }
                                    break;
                                default:

                            }

                        })
                        //LoadAllUnitsPUsDUs();

                        AppService.HideLoader();
                    },
                    error: function (r) {
                        LoadAllUnitsPUsDUs();
                        alert(JSON.parse(r.responseText).Message);
                        AppService.HideLoader();
                    }
                });
            }





        }

        $scope.DeleteItemOftype = function (Type, ID) {

            var resultedDeletions = "";

            switch (Type) {

                case "Unit":
                    resultedDeletions = "all the PUs,DUs,Admins and Member HRs in it! \n The Meetings/Forums added by them will be deleted too!"
                    break;
                case "PU":
                    resultedDeletions = "all the DUs,Admins and Member HRs in it! \n The Meetings/Forums added by them will be deleted too!"
                    break;
                case "DU":
                    resultedDeletions = "all the Member HRs from users list! \n The Meetings/Forums added by them will be deleted too!"
                    break;
                case "Location":

                    break;
                case "ForumType":

                    break;
                case "MOMType":

                    break;
                case "User":
                    resultedDeletions = "all the Meetings added by him/her!"
                    break;

                default:

            }

            var ConfirmFlag = confirm("Deleting this " + Type + " will result in deletion of " + resultedDeletions + " \n Do you wish to continue?");
            if (!ConfirmFlag) {
                return;
            }

            var Data = {
                Type: Type,
                ID: ID
            }

            AppService.ShowLoader();
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/DeleteItemOftype",
                data: JSON.stringify(Data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {
                    var data = a.d;

                    switch (Type) {
                        case "DU":

                            for (var i = 0; i < $scope.AllUnitsPUsDUs.length; i++) {
                                var U = $scope.AllUnitsPUsDUs[i];

                                for (var j = 0; j < U.lstPUs.length; j++) {
                                    var PU = U.lstPUs[j];
                                    for (var q = 0; q < PU.lstDUs.length; q++) {
                                        var DU = PU.lstDUs[q];
                                        if (DU.DUID == ID) {
                                            PU.lstDUs.splice(PU.lstDUs.indexOf(DU), 1);
                                        }
                                    }
                                }
                            }

                            break;
                        case "PU":
                            for (var i = 0; i < $scope.AllUnitsPUsDUs.length; i++) {
                                var U = $scope.AllUnitsPUsDUs[i];

                                for (var j = 0; j < U.lstPUs.length; j++) {
                                    var PU = U.lstPUs[j];

                                    if (PU.PUID = ID) {
                                        U.lstPUs.splice(U.lstPUs.indexOf(PU), 1);
                                        break;
                                    }
                                }
                            }
                            break;
                        case "Unit":
                            for (var i = 0; i < $scope.AllUnitsPUsDUs.length; i++) {
                                var U = $scope.AllUnitsPUsDUs[i];
                                if (U.UnitID == ID) {
                                    $scope.AllUnitsPUsDUs.splice($scope.AllUnitsPUsDUs.indexOf(U), 1);
                                }
                            }

                            break;
                        case "Location":
                            for (var i = 0; i < $scope.AllLocations.length; i++) {
                                var Loc = $scope.AllLocations[i];
                                if (Loc.LocationID == ID) {
                                    $scope.AllLocations.splice($scope.AllLocations.indexOf(Loc), 1);
                                    break;
                                }
                            }
                            break;
                        case "ForumType":
                            for (var i = 0; i < $scope.AllForumTypes.length; i++) {
                                var Forum = $scope.AllForumTypes[i];
                                if (Forum.ForumTypeID == ID) {
                                    $scope.AllForumTypes.splice($scope.AllForumTypes.indexOf(Forum), 1);
                                    break;
                                }
                            }
                            break;
                        case "MOMType":
                            for (var i = 0; i < $scope.AllMOMTypes.length; i++) {
                                var MOM = $scope.AllMOMTypes[i];
                                if (MOM.MOMTypeID == ID) {
                                    $scope.AllMOMTypes.splice($scope.AllMOMTypes.indexOf(MOM), 1);
                                    break;
                                }
                            }
                            break;
                        default:

                    }

                    AppService.HideLoader();
                },
                error: function (r) {
                    alert(JSON.parse(r.responseText).Message); AppService.HideLoader();
                }
            });

        }

        $scope.DeleteUser = function (EmailID) {

            var ConfirmFlag = confirm("Deleting this user will result in deletion of all Meetings added by him/her!\n Do you wish to continue?");
            if (!ConfirmFlag) {
                return;
            }

            var Data = {
                EmailID: EmailID
            }

            AppService.ShowLoader();
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/DeleteUser",
                data: JSON.stringify(Data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {
                    var data = a.d;
                    LoadAdmins();
                    LoadAllUsers();
                    LoadSuperAdmins();
                    AppService.HideLoader();
                },
                error: function (r) {
                    alert(JSON.parse(r.responseText).Message); AppService.HideLoader();
                }
            });
        }



        function clone(obj) {
            if (obj == null || typeof (obj) != 'object')
                return obj;

            var temp = obj.constructor(); // changed

            if (typeof (temp) === "undefined") {
                temp = [];
            }

            for (var key in obj)
                temp[key] = clone(obj[key]);
            return temp;
        };


    }

})();



