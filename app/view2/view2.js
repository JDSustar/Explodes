'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl',  [function () {
        var view2 = this;
        view2.wires = [
            { name:"1", color: "None" },
            { name:"2", color: "None" },
            { name:"3", color: "None" },
            { name:"4", color: "None" },
            { name:"5", color: "None" },
            { name:"6", color: "None" }
        ];
    }]);