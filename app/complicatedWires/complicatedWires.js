'use strict';

// Check to see if the last digit of the serial number is even
function isLastDigitEven(serial)
{
    return ['0', '2', '4', '6', '8'].indexOf(serial[serial.length - 1]) > -1;
}

var Wire = function(myName)
{
    this.name = myName;
    this.reset();
};
Wire.prototype.reset = function()
{
    this.red = false;
    this.white = false;
    this.blue = false;
    this.led = false;
    this.star = false;
    this.cut = false;
};

angular.module('myApp.complicatedWires', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/complicatedWires', {
            templateUrl: 'complicatedWires/complicatedWires.html',
            controller: 'ComplicatedWireController'
        });
    }])

    .controller('ComplicatedWireController', ['$scope', '$route', function ($scope, $route) {
        $scope.reloadRoute = function () {
            $route.reload();
        };

        $scope.instructions = "Red background means cut the wire!";
        $scope.serial = "";
        $scope.batteries = "0";
        $scope.parallelPort = false;
        $scope.wires = [
            new Wire("1"),
            new Wire("2"),
            new Wire("3"),
            new Wire("4"),
            new Wire("5"),
            new Wire("6")
        ];
        $scope.updateResults = function () {
            console.log("Updating Results!");
            var serialCheck = isLastDigitEven($scope.serial);
            var twoOrMoreBatteries = $scope.batteries === "2" || $scope.batteries === "3+";
            var hasParallelPort = $scope.parallelPort === true;
            // Venn Diagram magic
            for (var i = 0; i < $scope.wires.length; i++)
            {
                var wire = $scope.wires[i];
                if (!wire.red && ((!wire.blue && !wire.star && !wire.led) || (!wire.blue && wire.star && !wire.led) || (wire.blue && !wire.star && wire.led)))
                {
                    wire.cut = true;
                    continue;
                }
                if (((wire.red || wire.blue) && (!wire.star && !wire.led)) || (wire.red && wire.blue && !wire.star && wire.led))
                {
                    wire.cut = serialCheck;
                    continue;
                }
                if (wire.blue && ((!(wire.red && wire.star) && wire.led) || (!wire.blue && wire.star && !wire.led) || (wire.blue && !wire.star && wire.led)))
                {
                    wire.cut = hasParallelPort;
                    continue;
                }
                if ((!wire.blue && wire.led) && ((wire.red && !wire.star) || (wire.red && wire.star) || (!wire.red && wire.star)))
                {
                    wire.cut = twoOrMoreBatteries;
                    continue;
                }
                wire.cut = false;
            }
        };
        $scope.updateResults();
    }]);