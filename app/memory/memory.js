function stage (stageNumber) {
    this.stageNumber = stageNumber;
    this.firstButton = null;
    this.secondButton = null;
    this.thirdButton = null;
    this.fourthButton = null;
    this.buttonNumbers = null;
    this.buttonString = null;
    this.screenNumber = null;
    this.numberPressed = null;
    this.buttonPressed = null;
}

stage.prototype.parseButtonString = function() {
    this.firstButton = this.buttonString[0];
    this.secondButton = this.buttonString[1];
    this.thirdButton = this.buttonString[2];
    this.fourthButton = this.buttonString[3];
};

stage.prototype.update = function() {
    if(this.buttonNumbers) {
        this.buttonString = this.buttonNumbers.toString();
    } else {
        return;
    }

    if(this.buttonString.length != 4) {
        return;
    }

    if(!this.screenNumber) {
        return;
    }

    this.parseButtonString();

    this.buttonPressed = 3;
    this.numberPressed = 3;
};

angular.module('myApp.memory', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/memory', {
            templateUrl: 'memory/memory.html',
            controller: 'MemoryController'
        });
    }])

    .controller('MemoryController', ['$scope', '$route', function MemoryController($scope, $route) {
        $scope.reloadRoute = function () {
            $route.reload();
        };

        $scope.validScreenNumberRegex = "[1234]"

        $scope.stages = [
            new stage(1),
            new stage(2),
            new stage(3),
            new stage(4),
            new stage(5)
        ];

        stage.prototype.showPosition = function() {
            if(this.stageNumber == 1) {
                return true;
            }

            // get number pressed of previous stage (stage numbers are 1 indexed)
            return $scope.stages[(this.stageNumber - 1) - 1].numberPressed != null;
        };
    }]);
