var wire = function (number) {
    var wireObject = {};

    wireObject.number = number;
    wireObject.color = null;
    wireObject.destination = null;
    wireObject.cut = null;
    wireObject.colorPosition = 0;

    return wireObject;
}

angular.module('myApp.wireSequences', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/wireSequences', {
            templateUrl: 'wireSequences/wireSequences.html',
            controller: 'WireSequencesController'
        });
    }])

    .controller('WireSequencesController', ['$scope', '$route', function WireSequencesController($scope, $route) {
        $scope.reloadRoute = function () {
            $route.reload();
        };

        $scope.numRedWires = 0;
        $scope.numBlueWires = 0;
        $scope.numBlackWires = 0;

        $scope.wires = [
            new wire(1),
            new wire(2),
            new wire(3),
            new wire(4),
            new wire(5),
            new wire(6),
            new wire(7),
            new wire(8),
            new wire(9),
            new wire(10),
            new wire(11),
            new wire(12)
        ];

        $scope.updateResults = function () {
            $scope.numRedWires = 0;
            $scope.numBlueWires = 0;
            $scope.numBlackWires = 0;

            $scope.wires.forEach(function (wire) {
                if (wire.color == "Red") {
                    $scope.numRedWires++;
                    wire.colorPosition = $scope.numRedWires;
                } else if (wire.color == "Black") {
                    $scope.numBlackWires++;
                    wire.colorPosition = $scope.numBlackWires;
                } else if (wire.color == "Blue") {
                    $scope.numBlueWires++;
                    wire.colorPosition = $scope.numBlueWires;
                }

                $scope.updateWireCut(wire);
            });
        };

        $scope.updateWireCut = function(wire) {
            if(!wire.color || !wire.destination){
                return;
            }

            var positionString = wire.colorPosition + wire.destination;
            wire.cut = cutTable[wire.color].indexOf(positionString) > -1;
            wire.processed = true;
            console.log(wire.number, wire.color, wire.destination, positionString, wire.cut);
        };

        $scope.showPosition = function (previousWireNumber) {
            if(previousWireNumber == 0){
                return true;
            }

            var previousWire = $scope.wires[previousWireNumber - 1];

            if (previousWire.color == "None") {
                return true;
            }

            if (previousWire.color != null && previousWire.destination != null) {
                return true;
            }

            return false;
        }
    }]);

var cutTable = {
    Black: ['1A', '1B', '1C', '2A', '2C', '3B', '4A', '4C', '5B', '6B', '6C', '7A', '7B', '8C', '9C'],
    Blue: ['1B', '2A', '2C', '3B', '4A', '5B', '6B', '6C', '7C', '8A', '8C', '9A'],
    Red: ['1C', '2B', '3A', '4A', '4C', '5B', '6A', '6C', '7A', '7B', '7C', '8A', '8B', '9B']
};

