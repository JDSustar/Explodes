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
    this.valid = false;
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

        $scope.instructions = "Red:Cut Green:Don't Cut";
        $scope.serial = "";
        $scope.batteries = "Unknown";
        $scope.parallelPort = null;
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
            var serialUnknown = $scope.serial !== "";
            var serialCheck = isLastDigitEven($scope.serial);
            var batteriesUnknown = $scope.batteries === "Unknown";
            var twoOrMoreBatteries = $scope.batteries === "2" || $scope.batteries === "3+";
            var parallelUnknown = $scope.parallelPort === null;
            if (parallelUnknown) {
                console.log("Parallel port unknown");
            }
            var hasParallelPort = $scope.parallelPort === true;
            // Venn Diagram magic
            for (var i = 0; i < $scope.wires.length; i++)
            {
                var wire = $scope.wires[i];
                if (wire.red || wire.white || wire.blue)
                {
                    wire.valid = true;
                }
                else
                {
                    wire.valid = false;
                    continue;
                }
                if (!wire.red && ((!wire.blue && !wire.star && !wire.led) || (!wire.blue && wire.star && !wire.led) || (wire.blue && !wire.star && wire.led)))
                {
                    wire.cut = true;
                    continue;
                }
                if (((wire.red || wire.blue) && (!wire.star && !wire.led)) || (wire.red && wire.blue && !wire.star && wire.led))
                {
                    if (serialUnknown)
                    {
                        // Unknown
                        wire.valid = false;
                        continue;
                    }
                    wire.cut = serialCheck;
                    continue;
                }
                if (wire.blue && ((!(wire.red && wire.star) && wire.led) || (!wire.blue && wire.star && !wire.led) || (wire.blue && !wire.star && wire.led)))
                {
                    if (parallelUnknown)
                    {
                        // Unknown
                        $scope.instructions = "Does the bomb have a parallel port?";
                        wire.valid = false;
                        continue;
                    }
                    wire.cut = hasParallelPort;
                    continue;
                }
                if ((!wire.blue && wire.led) && ((wire.red && !wire.star) || (wire.red && wire.star) || (!wire.red && wire.star)))
                {
                    if (batteriesUnknown)
                    {
                        // Unknown
                        $scope.instructions = "Please enter the number of batteries!";
                        wire.valid = false;
                        continue;
                    }
                    wire.cut = twoOrMoreBatteries;
                    continue;
                }
                wire.cut = false;
            }

        };
        $scope.updateResults();
    }]);