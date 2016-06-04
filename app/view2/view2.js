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
        var view2 = this;
        view2.serial = "";
        view2.wires = [
            {name: "1", color: "None"},
            {name: "2", color: "None"},
            {name: "3", color: "None"},
            {name: "4", color: "None"},
            {name: "5", color: "None"},
            {name: "6", color: "None"}
        ];
        view2.updateResults = function () {
            colorCounts.reset();
            for (var wire in view2.wires) {
                colorCounts[wire.color] = colorCounts[wire.color] + 1;
            }
            console.log(colorCounts);
        }
    }]);