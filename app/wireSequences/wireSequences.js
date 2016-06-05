angular.module('myApp.wireSequences', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/theButton', {
            templateUrl: 'wireSequences/wireSequences.html',
            controller: 'WireSequencesController'
        });
    }])

    .controller('WireSequencesController', ['$scope', '$route', function WireSequencesController($scope, $route) {
        $scope.reloadRoute = function () {
            $route.reload();
        };
    }]);

