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
        $scope.warningInstructions = false;
        $scope.updateResults = function () {
            var serialUnknown = $scope.serial === "";
            var serialCheck = isLastDigitEven($scope.serial);
            var batteriesUnknown = $scope.batteries === "Unknown";
            var twoOrMoreBatteries = $scope.batteries === "2" || $scope.batteries === "3+";
            var parallelUnknown = $scope.parallelPort === null;
            var instructionsChanged = false;
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
                    //console.log("Rule 1 Success");
                    continue;
                }
                if (((wire.red || wire.blue) && (!wire.star && !wire.led)) || (wire.red && wire.blue && !wire.star && wire.led))
                {
                    if (serialUnknown)
                    {
                        // Unknown
                        $scope.instructions = "Please enter at least the last digit of the serial number!";
                        instructionsChanged = true;
                        wire.valid = false;
                        continue;
                    }
                    wire.cut = serialCheck;
                    //console.log("Rule 2 - Serial Dependent");
                    continue;
                }
                if (wire.blue && ((!(wire.red && wire.star) && wire.led) || (!wire.blue && wire.star && !wire.led) || (wire.blue && !wire.star && wire.led)))
                {
                    if (parallelUnknown)
                    {
                        // Unknown
                        $scope.instructions = "Does the bomb have a parallel port?";
                        instructionsChanged = true;
                        wire.valid = false;
                        continue;
                    }
                    wire.cut = hasParallelPort;
                    //console.log("Rule 3 - Parallel Dependent");
                    continue;
                }
                if ((!wire.blue && wire.led) && ((wire.red && !wire.star) || (wire.red && wire.star) || (!wire.red && wire.star)))
                {
                    if (batteriesUnknown)
                    {
                        // Unknown
                        $scope.instructions = "Please enter the number of batteries!";
                        instructionsChanged = true;
                        wire.valid = false;
                        continue;
                    }
                    wire.cut = twoOrMoreBatteries;
                    //console.log("Rule 4 - Battery dependent");
                    continue;
                }
                wire.cut = false;
            }
            if (!instructionsChanged)
            {
                $scope.warningInstructions = false;
                $scope.instructions = "Red = Cut, Green = Don't Cut";
            }
            else
            {
                $scope.warningInstructions = true;
            }
        };
        $scope.updateResults();
    }]);