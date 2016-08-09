(function () {
    "use strict";
    angular.module('InfyGlasswall.Forum.controllers', [])
            .controller('ForumController', ForumController)
            .directive('appFilereader', function ($q) {
                var slice = Array.prototype.slice;

                return {
                    restrict: 'A',
                    require: '?ngModel',
                    link: function (scope, element, attrs, ngModel) {
                        if (!ngModel) return;

                        ngModel.$render = function () { };

                        element.bind('change', function (e) {
                            var element = e.target;

                            $q.all(slice.call(element.files, 0).map(readFile))
                                .then(function (values) {
                                    if (element.multiple) ngModel.$setViewValue(values);
                                    else ngModel.$setViewValue(values.length ? values[0] : null);
                                });

                            function readFile(file) {
                                var deferred = $q.defer();
                                //deferred.fileName = file.name;

                                //deferred.filetype = file.type;

                                //deferred.selected = true;

                                var reader = new FileReader();


                                reader.onload = function (e) {
                                    deferred.resolve(e.target.result);
                                };
                                reader.onerror = function (e) {
                                    deferred.reject(e);
                                };
                                reader.readAsDataURL(file);

                                return deferred.promise;
                            }

                        }); //change

                    } //link
                }; //return
            })


    ForumController.$inject = ['$rootScope', '$scope', '$route', '$location', '$timeout', '$interval', '$window', 'AppService'];

    function ForumController($rootScope, $scope, $route, $location, $timeout, $interval, $window, AppService) {
        var _this = this;

        window.scrollTo(0, 0);
        _this.currentPage = 0;
        _this.notifications = [];
        _this.currentPage = 0;
        _this.pageOffset = 0;
        _this.pageLimit = 20;
        _this.meetingsCount = 0;
        $scope.MyMeetings = [];
        _this.loadMore = loadMore;
        _this.PopUpWordCloud = PopUpWordCloud;

        _this.selectAllDU = selectAllDU;
        _this.selectAllLocations = selectAllLocations;

        (function SetActiveTab() {
            AppService.ShowLoader();
            LoadAllUnitsPUsDUs();


            $scope.ForumTypeQuery = "";
            $scope.LocationQuery = "";
            $scope.AnchorQuery = "";
            $scope.CreatedbyQuery = "";
            $scope.UnitPUDUQuery = "";
            $scope.CalendarObj = {}
        })();


        var PushNotification = function (message,status) {
            $timeout(function myfunction() {
                _this.notifications.push({ message: message, status: status||'success' });
            }, 0);
        }

        function getInitialData() {

            //Generate LocationNames in the scope
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/getLocationsDetails",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {
                    $scope.$apply(function () {
                        $scope.LocationDetails = a.d;
                    });
                },
                error: function (r) {

                    PushNotification('Something happened! Please feel free to report to the developer:' + r.responseText, "fail" );

                    $location.url("/Credits");
                }
            });


            //Geneate all ForumTypes in the the scope for global use
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/getForumTypeDetails",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {
                    $scope.$apply(function () {
                        $scope.ForumTypeDetails = a.d;
                    });
                },
                error: function (r) {
                    PushNotification('Something happened! Please feel free to report to the developer:' + r.responseText, "fail");
                    $location.url("/Credits");
                }
            });

            //Geneate all MOM in the the scope for global use
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/getUnitDetails",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {
                    $scope.$apply(function () {
                        $scope.AllUnit = a.d[0];
                        $scope.AllPU = a.d[1];
                        $scope.AllDU = a.d[2];
                        $scope.MOMTypeDetails = a.d[3];
                    });
                },
                error: function (r) {
                    PushNotification('Something happened! Please feel free to report to the developer:' + r.responseText,"fail");
                    $location.url("/Credits");
                }
            });

            //Get all meeting and its MOMs
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/getMyMeetings",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ MeetingID: 0, Offset:0, Limit: _this.pageLimit }),
                success: function (a) {
                    var array = a.d;
                    _this.meetingsCount = array.count;
                    $scope.$apply(function () {
                        for (var k = 0; k < array.data.length; k++) {
                            var meetingData = array.data[k];
                            
                            var datee = new Date(parseInt(meetingData.UpdatedDate.substr(6)));
                            meetingData.UpdatedDate = (datee.getMonth() + 1) + '/' + datee.getDate() + '/' + datee.getFullYear();



                            meetingData.AllUnitsPUsDUs = [];

                            if ($rootScope.IsSuperAdmin) {

                                var adminUnit = {
                                    lstPUs: [
                                        {
                                            lstDUs: [],
                                            PUID: null,
                                            UnitID: null,
                                            PUName: 'Select PU'
                                        }
                                    ],
                                    UnitID: null,
                                    UnitName: 'Select Unit'
                                }
                                meetingData.AllUnitsPUsDUs.push(adminUnit);
                            }
                            for (var i = 0; i < $scope.AllUnitsPUsDUs.length; i++) {
                                var clonedUnit = clone($scope.AllUnitsPUsDUs[i]);
                                if (!$rootScope.IsUnitLevelAdmin && !$rootScope.IsPULevelAdmin) {
                                    clonedUnit.lstPUs.unshift({
                                        lstDUs: [],
                                        PUID: null,
                                        UnitID: clonedUnit.UnitID,
                                        PUName: 'Select PU'
                                    });
                                }

                                for (var j = 0; j < clonedUnit.lstPUs.length; j++) {
                                    var thisPU = clonedUnit.lstPUs[j];
                                    if (!$rootScope.IsPULevelAdmin) {
                                    }
                                }

                                meetingData.AllUnitsPUsDUs.push(clonedUnit);
                            }

                            $scope.setResultPUsForMeeting(meetingData);
                            $scope.setResultDUsForMeeting(meetingData);
                        }

                        for (var z = 0; z < array.data.length; z++) {
                            $scope.MyMeetings.push(array.data[z])
                        }

                        

                        AppService.HideLoader();
                    });

                    $("#MeetingTable input[class*='datepicker']").datepicker({
                        onSelect: function (dateText) {
                        }
                    });


                },
                error: function (r) {
                    PushNotification('Something happened! Please feel free to report to the developer:' + r.responseText,"fail");
                    AppService.HideLoader();
                    $location.url("/Credits");
                }
            });

        }


        $scope.DeleteThisMeeting = function (MyMeeting) {

            var data = { meetingId: MyMeeting.MeetingID }

            if (MyMeeting.MeetingID == 0) {
                if ($scope.MyMeetings.indexOf(MyMeeting) > -1) {
                    $scope.MyMeetings.splice($scope.MyMeetings.indexOf(MyMeeting), 1);
                    PushNotification("Cancelled Meeting creation");
                }
                return;
            }

            if (confirm("Are you sure to delete this froum and all its MOMs?")) {
                $.ajax({
                    type: "POST",
                    async: true,
                    url: "MyService.asmx/DeleteThisMeeting",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                    dataType: "json",
                    success: function (message) {

                        $scope.$apply(function () {
                            if ($scope.MyMeetings.indexOf(MyMeeting) > -1) {
                                $scope.MyMeetings.splice($scope.MyMeetings.indexOf(MyMeeting), 1);
                            }
                        })
                        PushNotification("Successfully deleted meeting!");
                        AppService.LoadTimer(1000);
                    },
                    error: function (r) {
                        MyMeeting.Clazz = 'danger';
                        PushNotification(JSON.parse(r.responseText).Message,"fail");
                        AppService.HideLoader();
                    }

                });
            }



        };

        $scope.AddNewDetails = function () {
            AppService.ShowLoader();

            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/getNewMeetingObj",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {
                    var newObj = a.d;
                    newObj.EventAnchor = newObj.EmailID;
                    var datee = new Date(parseInt(newObj.UpdatedDate.substr(6)));
                    newObj.UpdatedDate = (datee.getMonth() + 1) + '/' + datee.getDate() + '/' + datee.getFullYear();

                    $scope.$apply(function () {
                        var meetingData = newObj;
                        if ($rootScope.IsSuperAdmin) {
                            meetingData.UnitID = null;
                            meetingData.PUID = null;
                            meetingData.DUID = null;
                        }
                        else if ($rootScope.IsUnitLevelAdmin) {
                            meetingData.UnitID = $rootScope.CurrentUser.UnitID;
                            meetingData.PUID = null;
                            meetingData.DUID = null;
                        }
                        else if ($rootScope.IsPULevelAdmin) {
                            meetingData.UnitID = $rootScope.CurrentUser.UnitID;
                            meetingData.PUID = $rootScope.CurrentUser.PUID;
                            meetingData.DUID = null;
                        }
                        else {
                            meetingData.UnitID = $rootScope.CurrentUser.UnitID;
                            meetingData.PUID = $rootScope.CurrentUser.PUID;
                            meetingData.DUID = $rootScope.CurrentUser.DUID;
                        }


                        meetingData.AllUnitsPUsDUs = [];

                        if ($rootScope.IsSuperAdmin) {

                            var adminUnit = {
                                lstPUs: [
                                    {
                                        lstDUs: [],
                                        PUID: null,
                                        UnitID: null,
                                        PUName: 'Select PU'
                                    }
                                ],
                                UnitID: null,
                                UnitName: 'Select Unit'
                            }
                            meetingData.AllUnitsPUsDUs.push(adminUnit);
                        }
                        for (var i = 0; i < $scope.AllUnitsPUsDUs.length; i++) {
                            var clonedUnit = clone($scope.AllUnitsPUsDUs[i]);
                            if (!$rootScope.IsUnitLevelAdmin && !$rootScope.IsPULevelAdmin) {
                                clonedUnit.lstPUs.unshift({
                                    lstDUs: [],
                                    PUID: null,
                                    UnitID: clonedUnit.UnitID,
                                    PUName: 'Select PU'
                                });
                            }

                            for (var j = 0; j < clonedUnit.lstPUs.length; j++) {
                                var thisPU = clonedUnit.lstPUs[j];
                                if (!$rootScope.IsPULevelAdmin) {
                                }
                            }

                            meetingData.AllUnitsPUsDUs.push(clonedUnit);
                        }

                        $scope.setResultPUsForMeeting(meetingData);
                        if ($rootScope.IsUnitLevelAdmin) {
                            if (meetingData.ResultedPUsNew[0] == undefined) {
                                PushNotification("There are no PUs under the Unit in which you are Admin.\nThus you cant add any Meeting for now!\nAdd PU first to add an User in that PU!","fail");
                                meetingDataVisibility = false;
                            } else {
                                meetingData.PUID = meetingData.ResultedPUsNew[0].PUID;
                            }
                        }

                        $scope.setResultDUsForMeeting(meetingData);
                        if ($rootScope.IsPULevelAdmin) {
                            if (meetingData.ResultedDUsNew[0] == undefined) {
                                PushNotification("There are no DUs under the PU in which you are Admin.\nThus you cant add any Meeting for now!\nAdd DU first to add an User in that DU!","fail");
                                meetingDataVisibility = false;
                            } else {
                                meetingData.DUID = meetingData.ResultedDUsNew[0].DUID;
                            }
                        }

                        meetingData.InEditMode = true;
                        meetingData.Clazz = 'success'
                        $scope.MyMeetings.unshift(meetingData);
                    });
                    AppService.HideLoader();


                    $("#MeetingTable input[class*='datepicker']").datepicker({
                        onSelect: function (dateText) {
                        }
                    });
                },
                error: function (r) {
                    PushNotification('Something happened! Please feel free to report to the developer:' + r.responseText,"fail");
                    AppService.HideLoader();
                    $location.url("/Credits");
                }
            });

        }

        $scope.SaveThisMeeting = function (MyMeeting) {

            AppService.ShowLoader();

            var data = { Meeting: MyMeeting }

            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/SaveThisMeeting",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                dataType: "json",
                success: function (a) {
                    var newMeetingOBJ = a.d.data[0];
                    $scope.$apply(function () {
                        MyMeeting.MeetingID = newMeetingOBJ.MeetingID
                        MyMeeting.lstMOM = newMeetingOBJ.lstMOM;
                        MyMeeting.InEditMode = !MyMeeting.InEditMode;
                        MyMeeting.Clazz = 'active';
                        MyMeeting = angular.extend(MyMeeting, newMeetingOBJ);

                        var datee = new Date(parseInt(MyMeeting.UpdatedDate.substr(6)));
                        MyMeeting.UpdatedDate = (datee.getMonth() + 1) + '/' + datee.getDate() + '/' + datee.getFullYear();

                    });
                    AppService.HideLoader();
                    PushNotification("Successfully saved meeting!")
                },
                error: function (r) {
                    MyMeeting.Clazz = 'danger';
                    PushNotification(JSON.parse(r.responseText).Message, "fail")
                    AppService.HideLoader();
                }

            });

        }


        $scope.SaveAll = function () {

            for (var i = 0; i < $scope.MyMeetings.length; i++) {

                var meet = $scope.MyMeetings[i];

                if (meet.InEditMode == true) {

                    (function Clojure(meet) {
                        var data = { Meeting: meet }

                        $.ajax({
                            type: "POST",
                            async: true,
                            url: "MyService.asmx/SaveThisMeeting",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(data),
                            dataType: "json",
                            success: function (a) {
                                var newMeetingOBJ = a.d.data[0];
                                $scope.$apply(function () {
                                    meet.MeetingID = newMeetingOBJ.MeetingID
                                    meet.lstMOM = newMeetingOBJ.lstMOM;
                                    meet.InEditMode = !meet.InEditMode;
                                    meet.Clazz = 'active';
                                    meet = angular.extend(meet, newMeetingOBJ);

                                    var datee = new Date(parseInt(meet.UpdatedDate.substr(6)));
                                    meet.UpdatedDate = (datee.getMonth() + 1) + '/' + datee.getDate() + '/' + datee.getFullYear();

                                });
                                AppService.LoadTimer(300);
                            },
                            error: function (r) {
                                meet.Clazz = 'danger';
                                PushNotification(JSON.parse(r.responseText).Message, "fail")
                                AppService.HideLoader();
                            }

                        });
                    })(meet);

                }

            }

        }

        $scope.DeleteAll = function () {

            var res = confirm("Are you sure you want to Delete all In-Edit meetings and all its MOMs?");

            if (res == false) {
                return;
            }


            for (var i = $scope.MyMeetings.length - 1; i >= 0 ; i--) {

                var meet = $scope.MyMeetings[i];


                (function Clojure(meet) {

                    if (meet.MeetingID == 0) {
                        if ($scope.MyMeetings.indexOf(meet) > -1) {
                            $scope.MyMeetings.splice($scope.MyMeetings.indexOf(meet), 1);
                        }
                        return;
                    }

                    if (meet.InEditMode == true) {
                        var data = { meetingId: meet.MeetingID }



                        $.ajax({
                            type: "POST",
                            async: true,
                            url: "MyService.asmx/DeleteThisMeeting",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(data),
                            dataType: "json",
                            success: function (message) {

                                $scope.$apply(function () {
                                    if ($scope.MyMeetings.indexOf(meet) > -1) {
                                        $scope.MyMeetings.splice($scope.MyMeetings.indexOf(meet), 1);
                                    }
                                })

                                AppService.LoadTimer(300);
                            },
                            error: function (r) {
                                meet.Clazz = 'danger';
                                PushNotification(JSON.parse(r.responseText).Message,"fail");
                                AppService.HideLoader();
                            }

                        });
                    }




                })(meet);



            }

        }

        $scope.AddMOMtoThisMeeting = function (Meeting) {

            var NewMOM = {
                MOMID: 0,
                MOMTypeName: "",
                MeetingID: Meeting.MeetingID,
                Comment: '',
                Status: 'Open',
                AnchorResponsible: $rootScope.CurrentUser.EmailID,
                CreatedDate: new Date(),
                UpdatedDate: new Date(),
                MOMTypeID: 0,
                Deleted: false,
            }

            Meeting.lstMOM.unshift(NewMOM);
        }

        function LoadAllUnitsPUsDUs() {
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/LoadAllUnitsPUsDUs",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {

                    var array = a.d;
                    $scope.AllUnitsPUsDUs = array;
                    $timeout(function () {
                        getInitialData();
                    },100)

                },
                error: function (r) {
                    PushNotification('Something happened! Please feel free to report to the developer:' + r.responseText,"fail");
                    $location.url("/Credits");
                }
            });
        }


        function loadMore(currentPage) {
            _this.pageOffset = _this.pageLimit * currentPage;
            if (_this.meetingsCount > _this.pageOffset) { //()
                //Get all meeting and its MOMs
                AppService.ShowLoader("Loading more..");
                $.ajax({
                    type: "POST",
                    async: true,
                    url: "MyService.asmx/getMyMeetings",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify({ MeetingID: 0, Offset: _this.pageOffset, Limit: _this.pageLimit }),
                    success: function (a) {
                        var array = a.d;
                        _this.meetingsCount = array.count;
                        $scope.$apply(function () {
                            for (var k = 0; k < array.data.length; k++) {
                                var meetingData = array.data[k];

                                var datee = new Date(parseInt(meetingData.UpdatedDate.substr(6)));
                                meetingData.UpdatedDate = (datee.getMonth() + 1) + '/' + datee.getDate() + '/' + datee.getFullYear();

                                meetingData.AllUnitsPUsDUs = [];

                                if ($rootScope.IsSuperAdmin) {

                                    var adminUnit = {
                                        lstPUs: [
                                            {
                                                lstDUs: [],
                                                PUID: null,
                                                UnitID: null,
                                                PUName: 'Select PU'
                                            }
                                        ],
                                        UnitID: null,
                                        UnitName: 'Select Unit'
                                    }
                                    meetingData.AllUnitsPUsDUs.push(adminUnit);
                                }
                                for (var i = 0; i < $scope.AllUnitsPUsDUs.length; i++) {
                                    var clonedUnit = clone($scope.AllUnitsPUsDUs[i]);
                                    if (!$rootScope.IsUnitLevelAdmin && !$rootScope.IsPULevelAdmin) {
                                        clonedUnit.lstPUs.unshift({
                                            lstDUs: [],
                                            PUID: null,
                                            UnitID: clonedUnit.UnitID,
                                            PUName: 'Select PU'
                                        });
                                    }

                                    for (var j = 0; j < clonedUnit.lstPUs.length; j++) {
                                        var thisPU = clonedUnit.lstPUs[j];
                                        if (!$rootScope.IsPULevelAdmin) {
                                        }
                                    }

                                    meetingData.AllUnitsPUsDUs.push(clonedUnit);
                                }

                                $scope.setResultPUsForMeeting(meetingData);
                                $scope.setResultDUsForMeeting(meetingData);
                            }


                            for (var z = 0; z < array.data.length; z++) {
                                $scope.MyMeetings.push(array.data[z])
                            }

                            AppService.HideLoader();
                        });

                        //$("#MeetingTable input[class*='datepicker']").datepicker({
                        //    onSelect: function (dateText) {
                        //    }
                        //});


                    },
                    error: function (r) {
                        PushNotification('Something happened! Please feel free to report to the developer:' + r.responseText,"fail");
                        AppService.HideLoader();
                        $location.url("/Credits");
                    }
                });

            } else {
                _this.moreDataAvailable = false;
            }
        }


        $scope.getMyMeetingsMOM = function (MyMeeting, calltoPopup) {
            AppService.ShowLoader();

            var data = { forrum: MyMeeting }
            var defer = false;
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/getMyMeetingsMOM",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                dataType: "json",
                success: function (a) {
                    var lstMOM = a.d;
                    MyMeeting.lstMOM = lstMOM;
                    if (calltoPopup == true) {
                        PopUpWordCloud(MyMeeting);
                    } else {
                        $scope.$apply(function () {
                        MyMeeting.lstMOM = lstMOM;
                        MyMeeting.InEditMode = !MyMeeting.InEditMode;
                        MyMeeting.Clazz = 'success'
                        });
                    }
                 
                    AppService.HideLoader();
                },
                error: function (r) {

                    AppService.HideLoader();
                }

            });

        }


        $scope.setResultPUsForMeeting = function (Meeting) {
            for (var i = 0; i < Meeting.AllUnitsPUsDUs.length; i++) {

                var thisunit = Meeting.AllUnitsPUsDUs[i];
                if (thisunit.UnitID == Meeting.UnitID) {
                    Meeting.ResultedPUsNew = thisunit.lstPUs;
                    break;
                }
            }
        }

        $scope.setResultDUsForMeeting = function (Meeting) {
            for (var i = 0; i < Meeting.ResultedPUsNew.length; i++) {

                var thisPU = Meeting.ResultedPUsNew[i];
                if (thisPU.PUID == Meeting.PUID) {
                    Meeting.ResultedDUsNew = thisPU.lstDUs;
                    break;
                }
            }
        }


        function selectAllDU(MyMeeting) {
            for (var i = 0; i <MyMeeting.ResultedDUsNew.length; i++) {
                var du = MyMeeting.ResultedDUsNew[i];
                if (MyMeeting.DUs.indexOf(du.DUID)==-1) {
                    MyMeeting.DUs.push(du.DUID);
                }
            }
        }

        function selectAllLocations(MyMeeting) {
            for (var i = 0; i < $scope.LocationDetails.length; i++) {
                var l = $scope.LocationDetails[i];
                if (MyMeeting.LocationIDs.indexOf(l.LocationID) == -1) {
                    MyMeeting.LocationIDs.push(l.LocationID);
                }
            }
        }

        //Searches:
        $scope.$watch('ForumTypeQuery', function () {
            MySmartSearch();
        });

        $scope.$watch('LocationQuery', function () {
            MySmartSearch();
        });

        $scope.$watch('AnchorQuery', function () {
            MySmartSearch();
        });

        $scope.$watch('CreatedbyQuery', function () {
            MySmartSearch();
        });
        $scope.$watch('UnitPUDUQuery', function () {
            MySmartSearch();
        });



        function MySmartSearch() {
            if (!$scope.MyMeetings) {
                return;
            }

            var MatchedForumIds = [];

            for (var i = 0; i < $scope.ForumTypeDetails.length; i++) {
                var forr = $scope.ForumTypeDetails[i];
                if (forr.ForumTypeName.toLowerCase().indexOf($scope.ForumTypeQuery.toLowerCase()) > -1) {
                    if (MatchedForumIds.indexOf(forr.ForumTypeID) == -1) {
                        MatchedForumIds.push(forr.ForumTypeID)
                    }
                }
            }

            var MatchedLocationIds = [];

            for (var i = 0; i < $scope.LocationDetails.length; i++) {
                var forr = $scope.LocationDetails[i];
                if (forr.LocationName.toLowerCase().indexOf($scope.LocationQuery.toLowerCase()) > -1) {
                    if (MatchedLocationIds.indexOf(forr.LocationID) == -1) {
                        MatchedLocationIds.push(forr.LocationID)
                    }
                }
            }

            var MatchedUnitIds = [];

            for (var i = 0; i < $scope.AllUnitsPUsDUs.length; i++) {
                var forr = $scope.AllUnitsPUsDUs[i];
                if (forr.UnitName.toLowerCase().indexOf($scope.UnitPUDUQuery.toLowerCase()) > -1) {
                    if (MatchedUnitIds.indexOf(forr.UnitID) == -1) {
                        MatchedUnitIds.push(forr.UnitID)
                    }
                }
            }

            var MatchedPUIds = [];

            for (var i = 0; i < $scope.AllUnitsPUsDUs.length; i++) {
                var forr = $scope.AllUnitsPUsDUs[i];
                for (var j = 0; j < forr.lstPUs.length; j++) {
                    var pu = forr.lstPUs[j];
                    if (pu.PUName.toLowerCase().indexOf($scope.UnitPUDUQuery.toLowerCase()) > -1) {
                        if (MatchedPUIds.indexOf(pu.PUID) == -1) {
                            MatchedPUIds.push(pu.PUID)
                        }
                    }
                }

            }

            var MatchedDUIds = [];

            for (var i = 0; i < $scope.AllUnitsPUsDUs.length; i++) {
                var forr = $scope.AllUnitsPUsDUs[i];
                for (var j = 0; j < forr.lstPUs.length; j++) {
                    var pu = forr.lstPUs[j];

                    for (var k = 0; k < pu.lstDUs.length; k++) {
                        var du = pu.lstDUs[k];
                        if (du.DUName.toLowerCase().indexOf($scope.UnitPUDUQuery.toLowerCase()) > -1) {
                            if (MatchedDUIds.indexOf(du.DUID) == -1) {
                                MatchedDUIds.push(du.DUID)
                            }
                        }
                    }
                }

            }

            //Filtering
            for (var i = 0; i < $scope.MyMeetings.length; i++) {
                var meeting = $scope.MyMeetings[i];
                if ((MatchedForumIds.indexOf(meeting.SelectedForumTypeID) > -1)
                    &&
                    (MatchedLocationIds.indexOf(meeting.LocationID) > -1)
                    &&
                    ((MatchedUnitIds.indexOf(meeting.UnitID) > -1)
                    ||
                    (MatchedPUIds.indexOf(meeting.PUID) > -1)
                    ||
                    (MatchedDUIds.indexOf(meeting.DUID) > -1))
                    &&
                    ((meeting.EventAnchor.toLowerCase().indexOf($scope.AnchorQuery.toLowerCase()) > -1))
                    &&
                    ((meeting.EmailID.toLowerCase().indexOf($scope.CreatedbyQuery.toLowerCase()) > -1))
                    ) {
                    meeting.IsVisible = true;
                }
                else {
                    meeting.IsVisible = false;
                }
            }


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


        $scope.AutofillMeetingData = function (element) {

            var MeetingDatas = $scope.MyMeetings;

            var data = MeetingDatas[0][element]

            for (i = 1; i < MeetingDatas.length; i++) {
                var MeetingData = MeetingDatas[i]
                if (MeetingData.MeetingID == 0) {
                    if (element == 'UnitID' || element == 'PUID' || element == 'DUID') {
                        MeetingData[element] = data;
                        $scope.setResultPUsForMeeting(MeetingData);
                        $scope.setResultDUsForMeeting(MeetingData);
                    }
                    else {
                        MeetingData[element] = data;
                    }

                }

            }
        };

        $scope.AutofillMOMData = function (Meeting, element) {

            var MOMDatas = Meeting.lstMOM;

            var data = MOMDatas[0][element]

            for (i = 1; i < MOMDatas.length; i++) {
                var MOMData = MOMDatas[i]
                //if (MOMData.MOMID == 0) {
                {
                    MOMData[element] = data;
                }
                //}

            }
        };


        $scope.DownloadTemplate = function () {
            AppService.ShowLoader();
            var data = {
                // ForumDetails: $scope.MyMeetings,
                MOMTypes: $scope.MOMTypeDetails
            }

            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/DownloadTemplate",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(data),
                success: function (a) {
                    window.location.href = 'Template/ForumTemplate.xlsx';

                    AppService.HideLoader();
                },
                error: function (r) {
                    PushNotification('Something happened! Please feel free to report to the developer:' + r.responseText,"fail");
                    AppService.HideLoader();
                    $location.url("/Credits");
                }
            });

        };

        $scope.DownloadAllMeetings = function () {
            AppService.ShowLoader();
            $.ajax({
                type: "POST",
                async: true,
                url: "MyService.asmx/DownloadAllMeetings",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {
                    window.location.href = 'Template/AllMeetings.xlsx';

                    AppService.HideLoader();
                },
                error: function (r) {
                    PushNotification('Something happened! Please feel free to report to the developer:' + r.responseText, "fail");
                    AppService.HideLoader();
                    $location.url("/Credits");
                }
            });

        };


        



        $scope.UploadMOMdialog = function () {

            $('#divUploadMOM').modal();
        }
        $scope.OpendivAddCalendar = function (MeetingObj) {


            $scope.CalendarObj.title = '',
            $scope.CalendarObj.Date = MeetingObj.UpdatedDate;//new Date(MeetingObj.UpdatedDate); //MeetingObj.UpdatedDate,
            $scope.CalendarObj.StartTime = '',
            $scope.CalendarObj.EndTime = '',
            $scope.CalendarObj.Location = (function () {
                for (var i = 0; i < $scope.LocationDetails.length; i++) {
                    var loc = $scope.LocationDetails[i];
                    if (loc.LocationID == MeetingObj.LocationID) {
                        return loc.LocationName;
                    }
                }
                return "";
            })()

            $('#divAddCalendar').modal();

            //$("#CalenderDate").datepicker({
            //    dateFormat: "yy-mm-dd",
            //    onSelect: function (dateText) {
            //        //Do Nothing here
            //    },

            //});

        }


        $scope.ImportMOM = function () {


            AppService.ShowLoader();

            setTimeout(function myfunction() {

                function readExcel(result, importName, csosdata) {
                    //var data = result.toString().replace("data:text/xlsx;base64,", "")
                    var data = result.toString().replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", "");
                    var obj = window.xlsx(data);
                    var obj = jQuery.parseJSON(JSON.stringify(obj));
                    return obj
                };

                var ExcelFileData = readExcel($scope.UploadDocumentEXCEL);

                var rowCount = ((ExcelFileData.worksheets[0].data)).length;

                var MeetingHeadersArr = ["Forum ID", "Forum Type", "Created By", "Date", "Unit", "PU", "DU", "Location", "Employee Participation", "Event anchor", "Remarks", "Account", "Project", "PM_Mail ID", "DM_Mail ID", "MOM ID", "MOM Type", "Anchor Responsible", "Comments", "Status", "MOM ID", "MOM Type", "Anchor Responsible", "Comments", "Status", "MOM ID", "MOM Type", "Anchor Responsible", "Comments", "Status", "MOM ID", "MOM Type", "Anchor Responsible", "Comments", "Status", "MOM ID", "MOM Type", "Anchor Responsible", "Comments", "Status", "MOM ID", "MOM Type", "Anchor Responsible", "Comments", "Status", "MOM ID", "MOM Type", "Anchor Responsible", "Comments", "Status", "MOM ID", "MOM Type", "Anchor Responsible", "Comments", "Status", "ODC Connect", "MFGADM-AUTO5", "CISSEC"];
                var MOMHeadersArr = ["MOM ID", "MOM Type", "Anchor Responsible", "Comments", "Status"];

                if (MeetingHeadersArr == ExcelFileData.worksheets[0].data[0]) {

                }
                else {

                }
                var boolValidate = false;

                var forumDetails = [];

                function arraysAreIdentical(arr1, arr2) {
                    if (arr1.length !== arr2.length) return false;
                    for (var i = 0, len = arr1.length; i < len; i++) {
                        if (arr1[i] !== arr2[i]) {
                            return false;
                        }
                    }
                    return true;
                }

                var isRowMeetingHeader = false;
                var isNextRowMeeting = false;
                var isRowMOMHeader = false;
                var isNextRowMOM = false;

                var MyMeetings = [];

                var validateion = true;
                var errorRow = 0;


                for (var g = 0; g < ExcelFileData.worksheets[0].data.length; g++) {
                    var rowData = ExcelFileData.worksheets[0].data[g];

                    if (rowData == null) {

                        continue;
                    }

                    var RowValues = rowData.map(function (a) { if (a && a.value) { return a.value } else { "" } });

                    if (arraysAreIdentical(RowValues, MeetingHeadersArr) == true) {
                        isNextRowMeeting = true;
                        continue;
                    }

                    //Checking If its a Header Row

                    if (isNextRowMeeting == true) {

                        var forumTYpes = $scope.ForumTypeDetails;

                        var selectedForumId = 0;
                        var selectedUnitId = 0;
                        var selectedPUId = 0;
                        var selectedDUId = 0;
                        var selectedLoacatioId = 0;

                        if (RowValues[1] == null || RowValues[1] == "" || RowValues[2] == null || RowValues[2] == "" || RowValues[3] == null || RowValues[3] == "" || RowValues[4] == null || RowValues[4] == "" || RowValues[5] == null || RowValues[5] == "" || RowValues[6] == null || RowValues[6] == "" || RowValues[7] == null || RowValues[7] == "" || RowValues[8] == null || RowValues[8] == "" || RowValues[9] == null || RowValues[9] == "") {
                            break;
                        }


                        for (i = 0; i < forumTYpes.length - 1; i++) {
                            if ((forumTYpes[i].ForumTypeName).toLowerCase() == RowValues[1].toLowerCase()) {
                                selectedForumId = forumTYpes[i].ForumTypeID;
                                break;
                            }

                        }

                        for (var i = 0; i < $scope.AllUnit.length; i++) {

                            var thisunit = RowValues[4];
                            if (thisunit.toLowerCase() == (($scope.AllUnit)[i].UnitName).toLowerCase()) {
                                selectedUnitId = ($scope.AllUnit)[i].UnitID;
                                break;
                            }

                        }

                        for (var i = 0; i < $scope.AllPU.length; i++) {

                            var thisunit = RowValues[5];
                            if (thisunit.toLowerCase() == (($scope.AllPU)[i].PUName).toLowerCase()) {
                                selectedPUId = ($scope.AllPU)[i].PUID;
                                break;
                            }

                        }

                        for (var i = 0; i < $scope.AllDU.length; i++) {

                            var thisunit = RowValues[6];
                            if (thisunit == (($scope.AllDU)[i].DUName)) {
                                selectedDUId = ($scope.AllDU)[i].DUID;
                                break;
                            }

                        }


                        for (var i = 0; i < $scope.LocationDetails.length; i++) {

                            var thisunit = RowValues[7];
                            if (thisunit.toLowerCase() == (($scope.LocationDetails[i]).LocationName).toLowerCase()) {
                                selectedLoacatioId = ($scope.LocationDetails[i]).LocationID;
                                break;
                            }

                        }

                        if (selectedDUId == 0 || selectedUnitId == 0 || selectedPUId == 0 || selectedLoacatioId == 0) {
                            validateion = false;
                            errorRow = g;
                            break;
                        }


                        var data = RowValues[3].split("/");
                        // using ISO 8601 Date String
                        if (data.length > 1) {
                            if (isNaN(Date.parse(data[2] + "-" + data[1] + "-" + data[0]))) {
                                validateion = false;
                                errorRow = g;
                                break;
                            }
                        }
                        else if (RowValues[3].split("-").length == 1) {
                            validateion = false;
                            errorRow = g;
                            break;
                        }


                        if (isNaN(RowValues[8])) {
                            validateion = false;
                            errorRow = g;
                            break;
                        }
                        if (RowValues[9].indexOf(' ') > -1 || RowValues[9].indexOf(',') > -1) {
                            validateion = false;
                            errorRow = g;
                            break;
                        }
                        //else if (!(RowValues[9].indexOf('_') > -1 || RowValues[9].indexOf('.') > -1))
                        //{
                        //    validateion = false;
                        //    errorRow = g;
                        //    break;
                        //}

                        var lstMOMs = [];

                        for (var t = 1; t <= 8; t++) {
                            var MomTypename = RowValues[14 + (t - 1) * 5 + 2];
                            var anchorErsponsble = RowValues[14 + (t - 1) * 5 + 3];
                            var comment = RowValues[14 + (t - 1) * 5 + 4];
                            var status = RowValues[14 + (t - 1) * 5 + 5];


                            if (MomTypename != null && MomTypename != "" && anchorErsponsble != null && anchorErsponsble != "" && status != null && status != "") {

                                if (anchorErsponsble.indexOf(' ') > -1 || RowValues[9].indexOf(',') > -1) {
                                    validateion = false;
                                    errorRow = g;
                                    break;

                                }
                                var selectedMOMtypeID = 0;

                                for (var i = 0; i < $scope.MOMTypeDetails.length; i++) {



                                    var thisunit = MomTypename;
                                    if (thisunit == ($scope.MOMTypeDetails[i]).MOMTypeName) {
                                        selectedMOMtypeID = ($scope.MOMTypeDetails[i]).MOMTypeID;
                                        break;
                                    }

                                }

                                var momObj = {
                                    MOMTypeName: MomTypename,
                                    MOMTypeID: selectedMOMtypeID,
                                    AnchorResponsible: anchorErsponsble,
                                    Status: status,
                                    Comment: comment,
                                    MeetingID: 0
                                }

                                lstMOMs.push(momObj);


                            }
                            else {
                                break;
                            }
                        }



                        if (validateion) {
                            var dateval = RowValues[3];

                            if (dateval.split("/").length > 1) {
                                var createdDatesplit = RowValues[3].split("/");
                                var parsedate = createdDatesplit[1] + "/" + createdDatesplit[0] + "/" + createdDatesplit[2];
                            }
                            else if (dateval.split("-").length > 1) {
                                var createdDatesplit = dateval.split("-");
                                var cretedDate = createdDatesplit[1] + "/" + (parseInt(createdDatesplit[2].substring(0, 2))).toString() + "/" + createdDatesplit[0];
                                var parsedate = new Date(createdDatesplit[0], (parseInt(createdDatesplit[1])-1).toString(), (parseInt(createdDatesplit[2].substring(0, 2))).toString());
                                parsedate.setDate(parsedate.getDate() + 1);
                            }

                            var meetingObj = {
                                MeetingID: 0,
                                SelectedForumTypeID: selectedForumId,
                                EmailID: RowValues[2],
                                UpdatedDate: parsedate,
                                UnitID: selectedUnitId,
                                DUs: [selectedDUId],
                                PUID: selectedPUId,
                                LocationID: selectedLoacatioId,
                                LocationIDs: [selectedLoacatioId],
                                ParticipationNumber: RowValues[8],
                                EventAnchor: RowValues[9],
                                Comments: RowValues[10],
                                lstMOM: lstMOMs,
                                Account: RowValues[11],
                                Project : RowValues[12],
                                PM_EmailID: RowValues[13],
                                DM_EmailID: RowValues[14]
                               
                            }

                            MyMeetings.push(meetingObj);

                        }
                        else {

                             errorRow = errorRow + 1;
                            //PushNotification("Error in uploading. Kindly check row number " + errorRow + ". All meeting till this row has been uploaded successfully!!");
                             alert("Error in uploading. Kindly check row number " + errorRow + ". All meeting till this row has been uploaded successfully!!");
                            break;
                        }

                        //  MyMeetings.length = 0;

                        isNextRowMeeting == true

                        continue;
                    }

                }

                if (validateion) {
                    if (MyMeetings.length > 0) {
                        $.ajax({

                            type: "POST",
                            url: 'MyService.asmx/ImportMOM',
                            async: false,
                            data: JSON.stringify({ 'data': MyMeetings }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                AppService.HideLoader();
                                $route.reload();

                                //PushNotification("Upload Success!\nRefresh the page to see updated meetings!");
                                alert("Upload Success!\nRefresh the page to see updated meetings!");
                            },
                            error: function (err) {
                                // PushNotification("Upload Success!\nRefresh the page to see updated meetings!");
                                alert("Upload Success!\nRefresh the page to see updated meetings!");
                                // toastr.error('Error', 'Failed to upload image<span class=\"errorText\"><br/>There was a fatal error. Please contact support.</span>');
                                AppService.HideLoader();
                            }
                        });
                    }


                }
                else {
                    errorRow = errorRow + 1;
                    //PushNotification("Error in uploading. Kindly check row number " + errorRow + ".","fail");
                    alert("Error in uploading. Kindly check row number " + errorRow + ".");
                }

                AppService.HideLoader();
                $('#divUploadMOM').modal('hide')



            }, 1000)


        }


        function ValidateEmailID(Mymeeting) {
            $.each(JSON.parse(Mymeeting), function (idx, obj) {
                console.log(obj.uwi);

            });
        }

        $('#myModal').on('shown.bs.modal', function () {



        })

        function PopUpWordCloud(MyMeeting) {
            $('#myModal').modal();
            var fill = d3.scale.category20();
            var CloudData = [];
                CloudData.push(MyMeeting.Comments);
                if (MyMeeting.lstMOM != null) {
                    for (var i = 0; i < MyMeeting.lstMOM.length; i++) {
                        CloudData.push(MyMeeting.lstMOM[i].Comment);
                    }
                }

                var stringCloudData = CloudData.join(" ").split(" ");
                var finalCloudData = stringCloudData.filter(function (i) { return i != "," });
                d3.layout.cloud().size([300, 300])
                    .words(finalCloudData.map(function (d) {
                        return { text: d, size: Math.random() * 50 };
                    }))
                    .rotate(function () { return ~~(Math.random() * 2) * 90; })
                    .font("Impact")
                    .fontSize(function (d) { return d.size; })
                    .on("end", draw)
                    .start();

                function draw(words) {
                    var myNode = document.getElementById("commentCloud");
                    while (myNode.firstChild) {
                        myNode.removeChild(myNode.firstChild);
                    }
                    d3.select("#commentCloud").append("svg")
                        .attr("width", 300)
                        .attr("height", 300)
                      .append("g")
                        .attr("transform", "translate(150,150)")
                      .selectAll("text")
                        .data(words)
                      .enter().append("text")
                        .style("font-size", function (d) { return d.size + "px"; })
                        .style("font-family", "Impact")
                        .style("fill", function (d, i) { return fill(i); })
                        .attr("text-anchor", "middle")
                        .attr("transform", function (d) {
                            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                        })
                        .text(function (d) { return d.text; });
                }
    
        };

        $scope.alert = function (text) {
            alert(text);
        }



        $scope.CalendarFileDownload = function (CalendarObj) {

            var file_name = CalendarObj.title + ".ics";
            //var startTime = CalendarObj.StartTime.split(':').join('') + '00';
            //var endTime = CalendarObj.EndTime.split(':').join('') + '00';
            var startTime =  ("0" + (CalendarObj.StartTime.getHours())).slice(-2) + ("0" + (CalendarObj.StartTime.getMinutes())).slice(-2) + '00';
            var endTime = ("0" + (CalendarObj.EndTime.getHours())).slice(-2) + ("0" + (CalendarObj.EndTime.getMinutes())).slice(-2) + '00';
            var date = CalendarObj.Date.split('-').join('');
           
            var EmailID = $rootScope.CurrentUser.EmailID + "@infosys.com";
            var icsMSG = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Our Company//NONSGML v1.0//EN\nBEGIN:VEVENT\n" +
                "UID:" + EmailID + "\n" +
                "DTSTAMP:20120315T170000Z \n" +
                "ATTENDEE;CN=My Self ;RSVP=TRUE:MAILTO:" + EmailID + "\n" +
                "ORGANIZER;CN=Me:MAILTO::" + EmailID + "\n" +
             "DTSTART;TZID='Europe Time':" + date + "T" + startTime + " \n" +
            "DTEND;TZID='Europe Time':" + date + "T" + endTime + " \n" +
                "LOCATION:" + CalendarObj.Location + "\n" +
                "SUMMARY:" + CalendarObj.title + "\n" +
                "END:VEVENT\nEND:VCALENDAR";

            
            var icsMSGTest = "" +
            "BEGIN:VCALENDAR \n" +
            "PRODID:-//Microsoft Corporation//Outlook 10.0 MIMEDIR//EN \n" +
            "VERSION:2.0 \n" +
            "METHOD:REQUEST \n" +
            "BEGIN:VTIMEZONE \n" +
            "TZID:Europe Time \n" +
            "BEGIN:STANDARD \n" +
            "DTSTART:20141001T030000 \n" +
            "RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=-1SU;BYMONTH=10 \n" +
            "TZOFFSETFROM:+0200 \n" +
            "TZOFFSETTO:+0100 \n" +
            "TZNAME:Standard Time \n" +
            "END:STANDARD \n" +
            "BEGIN:DAYLIGHT \n" +
            "DTSTART:20140301T020000 \n" +
            "RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=-1SU;BYMONTH=3 \n" +
            "TZOFFSETFROM:+0100 \n" +
            "TZOFFSETTO:+0200 \n" +
            "TZNAME:Daylight Savings Time \n" +
            "END:DAYLIGHT \n" +
            "END:VTIMEZONE \n" +
            "BEGIN:VEVENT \n" +
            "CLASS:PUBLIC \n" +
            "DESCRIPTION:\n" +
            "ATTENDEE;CN='" + $rootScope.CurrentUser.EmailID + "'; \n" +
            "ROLE=REQ-PARTICIPANT;RSVP=TRUE:MAILTO:" + EmailID + " \n" +
            "DTSTAMP:20160408T100000Z \n" +
            "UID:" + EmailID + " \n" +
            "PRIORITY:5 \n" +
            "DTSTART;TZID='Europe Time':20160301T120000 \n" +
            "DTEND;TZID='Europe Time':20160301T123000 \n" +
            "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TU,WE,FR;UNTIL=20161216T123000Z \n" +
            "SEQUENCE:1460033420 \n" +
            "SUMMARY:" + CalendarObj.title + " \n" +
            "TRANSP:OPAQUE \n" +
            "ORGANIZER;CN='" + $rootScope.CurrentUser.EmailID + "':MAILTO:" + EmailID + " \n" +
            "LOCATION:" + CalendarObj.Location + " \n" +
            "BEGIN:VALARM \n" +
            "TRIGGER:-PT15M \n" +
            "ACTION:DISPLAY \n" +
            "DESCRIPTION:Reminder \n" +
            "END:VALARM \n" +
            "END:VEVENT \n" +
            "END:VCALENDAR \n"

            var data = "data:text/calendar;charset=utf8," + escape(icsMSG)


            var data = dataURLToBlob(data);
            var blob = new Blob([data], {
                //type: "text/xml;charset=utf-8;"
                type: "text/calendar;charset=utf8"
            });

            //For IE
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(blob, file_name);
            }
            else {
                //FileSaver- For Non-IE Browsers//
                // saveAs(blob, file_name);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                //blob = new Blob([json], { type: "octet/stream" }),
                var url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = file_name;
                a.click();
                window.URL.revokeObjectURL(url);
            }


            function dataURLToBlob(dataURL) {
                var BASE64_MARKER = ';base64,';
                if (dataURL.indexOf(BASE64_MARKER) == -1) {
                    var parts = dataURL.split(',');
                    var contentType = parts[0].split(':')[1];
                    var raw = decodeURIComponent(parts[1]);

                    return new Blob([raw], { type: contentType });
                }

                var parts = dataURL.split(BASE64_MARKER);
                var contentType = parts[0].split(':')[1];
                var raw = window.atob(parts[1]);
                var rawLength = raw.length;

                var uInt8Array = new Uint8Array(rawLength);

                for (var i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }

                return new Blob([uInt8Array], { type: contentType });
            }

        }


        $scope.tableToExcel = (function (tableID) {
            var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
            return function (tableID, name, filename) {


                if (!tableID.nodeType) tableID = document.getElementById(tableID)
                var ctx = { worksheet: name || 'Worksheet', table: tableID.innerHTML }

                document.getElementById("dlink").href = uri + base64(format(template, ctx));
                document.getElementById("dlink").download = filename;

                AppService.ShowLoader();

                document.getElementById("dlink").click();
                AppService.HideLoader();

            }
        })()

    }

})();

