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
    }]);
