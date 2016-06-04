'use strict';

var colorCounts =
{
    Blue: 0,
    Red: 0,
    White: 0,
    Yellow: 0,
    Black: 0,
    reset: function() {
        this.Blue = 0;
        this.Red = 0;
        this.White = 0;
        this.Yellow = 0;
        this.Black = 0;
    }
};

// Check to see if the last digit of the serial number is odd
function isLastDigitOdd(serial)
{
    if (['1', '3', '5', '7', '9'].indexOf(serial[serial.length-1]) > -1)
        {
            return true;
        }
    return false;
}

angular.module('myApp.view2', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', '$route', function ($scope, $route) {
        $scope.reloadRoute = function () {
            $route.reload();
        };
        $scope.instructions = "Provide more information";
        $scope.serial = "";
        $scope.wires = [
            {name: "1", color: "None"},
            {name: "2", color: "None"},
            {name: "3", color: "None"},
            {name: "4", color: "None"},
            {name: "5", color: "None"},
            {name: "6", color: "None"}
        ];
        $scope.updateResults = function () {
            colorCounts.reset();
            var wireCount = 0;
            for (var i = 0; i < $scope.wires.length; i++) {
                var wire = $scope.wires[i];
                colorCounts[wire.color] = colorCounts[wire.color] + 1;
                if (wire.color !== "None")
                {
                    wireCount++;
                }
            }
            console.log("There are " + wireCount + " wires");
            // Having all of the color counts figured out, we can now start evaluating
            if (wireCount === 3)
            {
                // If there are no red wires, cut the second wire.
                if (colorCounts.Red === 0)
                {
                    $scope.instructions = "Cut the second wire!";
                    return;
                }
                // Otherwise, if the last wire is white, cut the last wire.
                else if ($scope.wires[2].color === "White")
                {
                    $scope.instructions = "Cut the last wire!";
                    return;
                }
                // Otherwise, if there is more than one blue wire, cut the last blue wire.
                else if (colorCounts.Blue > 1)
                {
                    $scope.instructions = "Cut the last blue wire!";
                    return;
                }
                // Otherwise, cut the last wire.
                else
                {
                    $scope.instructions = "Cut the last wire!";
                    return;
                }
            }
            else if (wireCount === 4)
            {
                // If there is more than one red wire and the last digit of the serial number is odd, cut the last red wire.
                if (colorCounts.Red > 1) {
                    if ($scope.serial === "")
                    {
                        $scope.instructions = "Please enter the serial number";
                        return;
                    }
                    if (isLastDigitOdd($scope.serial)) {
                        $scope.instructions = "Cut the last RED wire!";
                        return;
                    }
                }
                // Otherwise, if the last wire is yellow and there are no red wires, cut the first wire.
                else if ($scope.wires[3].color === "Yellow" && colorCounts.Red === 0)
                {
                    $scope.instructions = "Cut the first wire!";
                    return;
                }
                // Otherwise, if there is exactly one blue wire, cut the first wire.
                else if (colorCounts.Blue === 1)
                {
                    $scope.instructions = "Cut the first wire!";
                    return;
                }
                // Otherwise, if there is more than one yellow wire, cut the last wire.
                else if (colorCounts.Yellow > 1)
                {
                    $scope.instructions = "Cut the last wire!";
                    return;
                }
                // Otherwise, cut the second wire.
                else
                {
                    $scope.instructions = "Cut the second wire!";
                    return;
                }
            }
            else if (wireCount === 5)
            {
                if ($scope.serial === "")
                {
                    $scope.instructions = "Please enter the serial number";
                    return;
                }
                // If the last wire is black and the last digit of the serial number is odd, cut the fourth wire.
                if ($scope.wires[4].color === "Black") {
                    if ($scope.serial === "")
                    {
                        $scope.instructions = "Please enter the serial number";
                        return;
                    }
                    if (isLastDigitOdd($scope.serial)) {
                        $scope.instructions = "Cut the fourth wire!";
                        return;
                    }
                }
                // Otherwise, if there is exactly one red wire and there is more than one yellow wire, cut the first wire.
                if (colorCounts.Red === 1 && colorCounts.Yellow > 1)
                {
                    $scope.instructions = "Cut the first wire!";
                    return;
                }
                // Otherwise, if there are no black wires, cut the second wire.
                if (colorCounts.Black === 0)
                {
                    $scope.instructions = "Cut the second wire!";
                    return;
                }
                // Otherwise, cut the first wire.
                else
                {
                    $scope.instructions = "Cut the first wire!";
                    return;
                }
            }
            else if (wireCount === 6)
            {
                // If there are no yellow wires and the last digit of the serial number is odd, cut the third wire.
                if (colorCounts.Yellow === 0)
                {
                    if ($scope.serial === "")
                    {
                        $scope.instructions = "Please enter the serial number";
                        return;
                    }
                    if (isLastDigitOdd($scope.serial))
                    {
                        $scope.instructions = "Cut the third wire!";
                        return;
                    }
                }
                // Otherwise, if there is exactly one yellow wire and there is more than one white wire, cut the fourth wire.
                else if (colorCounts.Yellow === 1 && colorCounts.White > 1)
                {
                    $scope.instructions = "Cut the fourth wire!";
                    return;
                }
                // Otherwise, if there are no red wires, cut the last wire.
                else if (colorCounts.Red === 0)
                {
                    $scope.instructions = "Cut the last wire!";
                    return;
                }
                // Otherwise, cut the fourth wire.
                else
                {
                    $scope.instructions = "Cut the fourth wire!";
                    return;
                }
            }
            console.log(colorCounts);
            $scope.instructions = "Provide more information";
        }
    }]);