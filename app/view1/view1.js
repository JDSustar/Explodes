'use strict';

var currentButtonColor = null;
var currentButtonWord = null;

var BUTTON_COLOR = {
    BLUE: 1,
    YELLOW: 2,
    RED: 3,
    WHITE: 4
};

var BUTTON_WORD = {
    ABORT: 1,
    DETONATE: 2,
    HOLD: 3
};

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', [function () {
        $("#blueButton").click(function () {
            hideAllChecks();
            $("#blueCheck").removeClass("hidden");
            currentButtonColor = BUTTON_COLOR.BLUE;
            updatePage();
        });

        $("#yellowButton").click(function () {
            hideAllChecks();
            $("#yellowCheck").removeClass("hidden");
            currentButtonColor = BUTTON_COLOR.YELLOW;
            updatePage();
        });

        $("#redButton").click(function () {
            hideAllChecks();
            $("#redCheck").removeClass("hidden");
            currentButtonColor = BUTTON_COLOR.RED;
            updatePage();
        });

        $("#whiteButton").click(function () {
            hideAllChecks();
            $("#whiteCheck").removeClass("hidden");
            currentButtonColor = BUTTON_COLOR.WHITE;
            updatePage();
        });
    }]);

var hideAllChecks = function() {
    $("#blueCheck").addClass("hidden");
    $("#yellowCheck").addClass("hidden");
    $("#redCheck").addClass("hidden");
    $("#whiteCheck").addClass("hidden");
};

var updatePage = function() {
    if(currentButtonColor == BUTTON_COLOR.BLUE || currentButtonColor == BUTTON_COLOR.RED) {
        $("#wordPanel").removeClass("hidden");
    } else {
        $("#wordPanel").addClass("hidden");
    }
};