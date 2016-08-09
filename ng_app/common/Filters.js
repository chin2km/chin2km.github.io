var Filters = angular.module("InfyGlasswall")    
    .filter("JsonDateParser", function () {
        return function(value) {

            if (value == undefined) {
                return;
            }

            var date = new Date(parseInt(value.substr(6)));

            return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        }

    });