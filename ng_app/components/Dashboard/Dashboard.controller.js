(function () {
    "use strict";
    angular.module('InfyGlasswall.Dashboard.controllers', [])
            .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$rootScope', '$scope', '$route', '$location', '$timeout', '$interval', 'AppService'];

    function DashboardController($rootScope, $scope, $route, $location, $timeout, $interval, AppService) {
        var _this = this;
        _this.notifications = [];
        $timeout(function myfunction() {
            _this.notifications.push({ message: "Please feel free to report the bugs to the developer. Help us improve your experience!", status: "success" });
        }, 3000);



        (function SetActiveTab() {
            AppService.LoadTimer(750);
        })();

        $scope.Location = [["Mysore", 20], ["Pune", 20], ["Banglore", 20], ["Manglore", 20]];

        $scope.sessionDetails;


        //function LoadAllUnitsPUsDUs() {
        //    $.ajax({
        //        type: "POST",
        //      //  async: true,
        //        url: "MyService.asmx/LoadAllUnitsPUsDUs",
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: function (a) {

        //            var array = a.d;
        //            $scope.AllUnitsPUsDUs = array;
        //            //  getInitialData();
        //            AppService.LoadTimer(1000);
        //        },
        //        error: function (r) {
        //            alert('Something happened! Please feel free to report to the developer:' + r.responseText);
        //            AppService.HideLoader();
        //            $location.url("/Credits");
        //        }
        //    });
        //}

        //LoadAllUnitsPUsDUs();

        //  GetAllUnitData();

        var MonthWiseReport;
        function getUnitWiseData() {
            $.ajax({
                type: "POST",
              //  async: false,
                url: "MyService.asmx/getUnitForumDetails",
                //  url: "MyService.asmx/getMyMeetings",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    MonthWiseReport = response.d;
                    StructureData();
                    PopulateDataMonthlyorQuarterly("Monthly");
                },
                error: function (msg) {
                    alert("failsed" + msg.responseText);
                }
            });

        }

        getUnitWiseData();
        var StructuredDataArray = {};

        function StructureData() {
            for (var iSD = 0; iSD < MonthWiseReport.length; iSD++) {
                var tempObj = {};
                var ThisMonth = MonthWiseReport[iSD];
                if (!StructuredDataArray.hasOwnProperty(MonthWiseReport[iSD].MonthName)) {
                    StructuredDataArray[ThisMonth.MonthName] = {};
                }

                StructuredDataArray[ThisMonth.MonthName] = (UniqueUnitListforMonth(ThisMonth.LstUnits));
                var totalUnitStrength = 0;
                var ParticipationNumber = 0;
                for (var thiskey in StructuredDataArray[ThisMonth.MonthName]) {

                    totalUnitStrength = StructuredDataArray[ThisMonth.MonthName][thiskey].UnitStrength + totalUnitStrength;
                    ParticipationNumber = StructuredDataArray[ThisMonth.MonthName][thiskey].ParticipationNumber + ParticipationNumber;

                }


                StructuredDataArray[ThisMonth.MonthName]['totalUnitStrength'] = totalUnitStrength;
                StructuredDataArray[ThisMonth.MonthName]['ParticipationNumber'] = ParticipationNumber;
            }

        }

       

        function UniqueUnitListforMonth(LstUnits) {
            var tempUnitObj = {};
            var tempUnitObjArr = [];

            for (var iLU = 0; iLU < LstUnits.length; iLU++) {
                var ThisUnit = LstUnits[iLU];
                if (!tempUnitObj.hasOwnProperty(LstUnits[iLU].UnitName)) {
                    tempUnitObj[LstUnits[iLU].UnitName] = [];
                    //var PUList = UniquePUListforUnit(ThisUnit.LstPUs);
                    //   tempUnitObj[LstUnits[iLU].UnitName] =PUList ;
                }
                var PUList = UniquePUListforUnit(ThisUnit.LstPUs);
                //   UnitStrengthCount = UnitStrengthCount + PUList['PUStrength'];

                tempUnitObj[LstUnits[iLU].UnitName].push(PUList);
                //  tempUnitObj['UnitStrength'] = UnitStrengthCount;
            }

            for (var unit in tempUnitObj) {
                var UnitStrengthCount = 0;
                var participationCount = 0;
                for (var i = 0; i < tempUnitObj[unit].length - 1; i++) {
                    if (tempUnitObj[unit][i].PUName == tempUnitObj[unit][i + 1].PUName) {
                        delete tempUnitObj[unit][i];
                    }
                }
                for (var pu in tempUnitObj[unit]) {
                    UnitStrengthCount = UnitStrengthCount + tempUnitObj[unit][pu].PUStrength;
                    participationCount = participationCount + tempUnitObj[unit][pu].ParticipationNumber;
                }
                tempUnitObj[unit]['UnitStrength'] = UnitStrengthCount;
                tempUnitObj[unit]['ParticipationNumber'] = participationCount
            }

            return tempUnitObj;

        }


        function UniquePUListforUnit(LstPUs) {
            var tempPUObj = {};

            for (var iLPU = 0; iLPU < LstPUs.length; iLPU++) {
                if (!tempPUObj.hasOwnProperty(LstPUs[iLPU].PUName)) {
                    tempPUObj[LstPUs[iLPU].PUName] = {};
                    tempPUObj['PUName'] = LstPUs[iLPU].PUName;
                    tempPUObj["PUStrength"] = LstPUs[iLPU].PUStrength;
                    tempPUObj["ParticipationNumber"] = LstPUs[iLPU].ParticipationNumber;
                }



            }
            return tempPUObj;
        }

        $scope.QuartDrilldownseries = [];

        $scope.$watch('MonthlyorQuaterly', function (value) {
            //   PopulateDataMonthlyorQuarterly(value);

        });

        var MonthDict = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        function PopulateDataMonthlyorQuarterly(value) {

            if (value == "Monthly") {
                // $scope.monthquarter = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                $scope.QuartDrilldown = [];
                for (var key in StructuredDataArray) {
                    if (Object.keys(StructuredDataArray[key]).length <= 2) {
                        continue;
                    }

                    var ThisObj = {};
                    ThisObj.name = key;
                    ThisObj.y = Math.round((StructuredDataArray[key]['ParticipationNumber'] / StructuredDataArray[key]['totalUnitStrength']) * 100);//randomInt(50, 90);//MonthTotalAttndCountPC();   //randomInt(50, 90);  // TODO pass this value from database

                    ThisObj.drilldown = key;
                    $scope.QuartDrilldown.push(ThisObj)

                    //function MonthTotalAttndCountPC() {
                    //    var tempCount = 0;
                    //    var AllUCount = 0;
                    //    for (var AllUCount in StructuredDataArray[key]) {
                    //        if (AllUCount == 'UnitCount') {
                    //            continue;
                    //        }
                    //        AllUCount = AllUCount + StructuredDataArray[key][AllUCount].UnitStrength;
                    //    }
                    //    for (var UCount in StructuredDataArray[key]['UnitCount']) {
                    //        tempCount = tempCount + StructuredDataArray[key]['UnitCount'][UCount]
                    //    }
                    //    return (tempCount / AllUCount) * 100;
                    //}

                }

                //$scope.QuartDrilldown = [{ name: "January", y: 56.33, drilldown: "January" }, { name: "February", y: 56.33, drilldown: "February" }, { name: "March", y: 56.33, drilldown: "March" },
                //            { name: "April", y: 56.33, drilldown: "April" }, { name: "May", y: 56.33, drilldown: "May" }, { name: "June", y: 56.33, drilldown: "June" }, { name: "July", y: 56.33, drilldown: "July" },
                //            { name: "August", y: 56.33, drilldown: "August" }, { name: "September", y: 56.33, drilldown: "September" }, { name: "October", y: 56.33, drilldown: "October" }, { name: "November", y: 56.33, drilldown: "November" }, { name: "December", y: 56.33, drilldown: "December" }];
            } else {
                //$scope.monthquarter = ["Q1(Apr-Jun)", "Q2(Jul-Sept)", "Q3(Oct-Dec)", "Q4(Jan-Mar)"];
                $scope.QuartDrilldown = [{ name: "Quarter1", y: 56.33, drilldown: "Quarter1" }, { name: "Quarter2", y: 56.33, drilldown: "Quarter2" }, { name: "Quarter3", y: 56.33, drilldown: "Quarter3" },
                     { name: "Quarter4", y: 56.33, drilldown: "Quarter4" }];
            }


            for (var i = 0; i < $scope.QuartDrilldown.length; i++) {
                $scope.QuartDrilldownseriesData = {};
                //  $scope.QuartDrilldownseriesData.name = $scope.QuartDrilldown[i].name;
                $scope.QuartDrilldownseriesData.colorByPoint = true;
                $scope.QuartDrilldownseriesData.id = $scope.QuartDrilldown[i].drilldown;
                var ThisMonth = $scope.QuartDrilldown[i].drilldown;
                var MonthWiseData = GetMonthUnitData(ThisMonth);

                $scope.QuartDrilldownseriesData.data = MonthWiseData; //$scope.UnitSeriesData;

                $scope.QuartDrilldownseries.push($scope.QuartDrilldownseriesData);


            }

            for (var iPU in $scope.QuartDrilldownseries) {
                if ($scope.QuartDrilldownseries[iPU].hasOwnProperty('data')) {
                    var Data = $scope.QuartDrilldownseries[iPU];


                    var UObje = {};
                    UObje.name = "Unit",
                    UObje.colorByPoint = true;
                    UObje.id = Data.id;
                    UObje.data = [];

                    for (var iUs in Data.data) {

                        if (iUs == 'totalUnitStrength' || iUs == 'ParticipationNumber') {
                            continue;
                        }

                        var tempUnit = {};
                        tempUnit.name = iUs;
                        tempUnit.y = Math.round((Data.data[iUs].ParticipationNumber / Data.data[iUs].UnitStrength) * 100);//50;//(Data.data[iUs].UnitStrength / 500) * 100;
                        tempUnit.drilldown = iUs + Data.id;;//Data.data.LstUnits[iUs].UnitName + iUs;  //TODO remove appended iUs bacause there should be always unique sorted data
                        tempUnit.lstPUs = Data.data[iUs];
                        if (UObje.data.indexOf(tempUnit) == -1) {
                            UObje.data.push(tempUnit);
                        }




                        $scope.QuartDrilldownseries.push(UObje);

                        var PUObje = {};
                        PUObje.name = "PU",
                        PUObje.colorByPoint = true;
                        PUObje.id = tempUnit.drilldown;
                        PUObje.data = [];
                        for (var PU in Data.data[iUs]) {
                            // PUObje.id = tempUnit.drilldown;
                            if (PU == 'UnitStrength' || PU == 'ParticipationNumber') {
                                continue;
                            }
                            var temmObj = {};
                            temmObj.name = Data.data[iUs][PU].PUName;
                            temmObj.y = Math.round((Data.data[iUs][PU].ParticipationNumber / Data.data[iUs][PU].PUStrength) * 100);
                            temmObj.drilldown = PU;   //Data.data.LstUnits[iUs].LstPUs[PU].PUName + PU;
                            //temmObj.lstDUs = Data[iPUs].lstPUs[PU].lstDUs
                            PUObje.data.push(temmObj);

                        }
                        $scope.QuartDrilldownseries.push(PUObje);


                        //for (var iDU = 0; iDU < PUObje.data.length; iDU++) {
                        //    var tempDUObje = {};
                        //    tempDUObje.id = PUObje.data[iDU].drilldown;
                        //    tempDUObje.data = [];
                        //    for (var iDu = 0; iDu < PUObje.data[iDU].lstDUs.length; iDu++) {

                        //        var DUObj = {};
                        //        DUObj.name = PUObje.data[iDU].lstDUs[iDu].DUName;
                        //        DUObj.y = 50;
                        //        tempDUObje.data.push(DUObj);
                        //    }
                        //    $scope.QuartDrilldownseries.push(tempDUObje);
                        //}
                    }
                }

            }
            SessionReportGraph();

        }

       

        function SessionReportGraph() {
            $('#sessionReportGraph').highcharts({
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            if (MonthDict.indexOf(e.point.name) != -1) {
                                $scope.currentSelectedUnit = "";
                            } else {
                                $scope.currentSelectedUnit = e.point.name;
                            }
                            //e.seriesOptions.id;

                        },
                        drillup: function (e) {
                            $scope.currentSelectedUnit = "";
                            //if (e.seriesOptions.id != undefined) {
                            //    $scope.currentSelectedUnit = e.seriesOptions.id;
                            //} else {
                            //    $scope.currentSelectedUnit = "";
                            //}

                            //if (MonthDict.indexOf($scope.currentSelectedUnit) != -1) {
                            //    $scope.currentSelectedUnit = "";
                            //}

                        }

                    }
                },
                title: {
                    text: 'Session Reports Graph'
                },
                subtitle: {
                    text: 'Click the columns to view session Reports</a>.'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Unit Strength'
                    },
                    tickPositions: [0, 25, 50, 75, 100],
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        //dataLabels: {
                        //    enabled: true,
                        //    format: '{point.y:100f}%'
                        //}

                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:100f}%</b> of total<br/>'
                },

                series: [{
                    name: "Month",
                    colorByPoint: true,
                    data: $scope.QuartDrilldown,
                }],
                drilldown: {
                    series: $scope.QuartDrilldownseries,
                }
            });
        }

        function GetMonthUnitData(Month) {
            for (var iMonth in StructuredDataArray) {
                if (iMonth == Month) {
                    return StructuredDataArray[iMonth];
                }

            }

        }

        function randomInt(min, max) {
            return Math.floor(Math.random() * (max - (min + 1)) + (min + 1));
        }

        $scope.DashBoardData;
        $scope.DashBoardTableData = function () {
            $.ajax({
                type: "POST",
               // async: true,
                url: "MyService.asmx/getDashBoardForumDetails",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (a) {
                    $scope.DashBoardData = a.d;
                },
                error: function (r) {
                    alert('Something happened! Please feel free to report to the developer:' + r.responseText);

                }
            });

        }

        $scope.DashBoardTableData();




    }

})();

