'use strict';

var currentButtonColor = null;
var currentButtonWord = null;
var currentStripColor = null;
var numBatteries = null;

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

var STRIP_COLOR = {
    BLUE: 1,
    YELLOW: 2,
    OTHER: 3
};

var BATTERY_COUNT = {
    ONE: 1,
    ZERO: 0,
    TWO: 2,
    MORE: 3
};

var IS_FRK = null;
var IS_CAR = null;

var HOLD_BUTTON_SITUATION = false;
var IMMEDIATE_SITUATION = false;

angular.module('myApp.view1', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', function ($scope) {
        $scope.currentButtonColor = null;
        
        $("#blueButton").click(function () {
            hideAllColorChecks();
            $("#blueCheck").removeClass("hidden");
            currentButtonColor = BUTTON_COLOR.BLUE;
            $scope.currentButtonColor = BUTTON_COLOR.BLUE;
            updatePage();
        });

        $("#yellowButton").click(function () {
            hideAllColorChecks();
            $("#yellowCheck").removeClass("hidden");
            $scope.currentButtonColor = currentButtonColor = BUTTON_COLOR.YELLOW;
            updatePage();
        });

        $("#redButton").click(function () {
            hideAllColorChecks();
            $("#redCheck").removeClass("hidden");
            $scope.currentButtonColor = currentButtonColor = BUTTON_COLOR.RED;
            updatePage();
        });

        $("#whiteButton").click(function () {
            hideAllColorChecks();
            $("#whiteCheck").removeClass("hidden");
            $scope.currentButtonColor = currentButtonColor = BUTTON_COLOR.WHITE;
            updatePage();
        });

        $("#abortButton").click(function () {
            hideAllWordChecks();
            $("#abortCheck").removeClass("hidden");
            currentButtonWord = BUTTON_WORD.ABORT;
            updatePage();
        });

        $("#detonateButton").click(function () {
            hideAllWordChecks();
            $("#detonateCheck").removeClass("hidden");
            currentButtonWord = BUTTON_WORD.DETONATE;
            updatePage();
        });

        $("#holdButton").click(function () {
            hideAllWordChecks();
            $("#holdCheck").removeClass("hidden");
            currentButtonWord = BUTTON_WORD.HOLD;
            updatePage();
        });

        $("#blueStripButton").click(function () {
            hideAllStripChecks();
            $("#blueStripCheck").removeClass("hidden");
            currentStripColor = STRIP_COLOR.BLUE;
            updatePage();
        });

        $("#yellowStripButton").click(function () {
            hideAllStripChecks();
            $("#yellowStripCheck").removeClass("hidden");
            currentStripColor = STRIP_COLOR.YELLOW;
            updatePage();
        });

        $("#otherStripButton").click(function () {
            hideAllStripChecks();
            $("#otherStripCheck").removeClass("hidden");
            currentStripColor = STRIP_COLOR.OTHER;
            updatePage();
        });

        $("#oneBatButton").click(function () {
            hideAllBatChecks();
            $("#oneBatCheck").removeClass("hidden");
            numBatteries = BATTERY_COUNT.ONE;
            updatePage();
        });

        $("#twoBatButton").click(function () {
            hideAllBatChecks();
            $("#twoBatCheck").removeClass("hidden");
            numBatteries = BATTERY_COUNT.TWO;
            updatePage();
        });

        $("#zeroBatButton").click(function () {
            hideAllBatChecks();
            $("#zeroBatCheck").removeClass("hidden");
            numBatteries = BATTERY_COUNT.ONE;
            updatePage();
        });

        $("#moreBatButton").click(function () {
            hideAllBatChecks();
            $("#moreBatCheck").removeClass("hidden");
            numBatteries = BATTERY_COUNT.MORE;
            updatePage();
        });

        $("#frkYesButton").click(function () {
            $("#frkYesCheck").removeClass("hidden");
            $("#frkNoCheck").addClass("hidden");
            IS_FRK = true;
            updatePage();
        });

        $("#frkNoButton").click(function () {
            $("#frkNoCheck").removeClass("hidden");
            $("#frkYesCheck").addClass("hidden");
            IS_FRK = false;
            updatePage();
        });

        $("#carYesButton").click(function () {
            $("#carYesCheck").removeClass("hidden");
            $("#carNoCheck").addClass("hidden");
            IS_CAR = true;
            updatePage();
        });

        $("#carNoButton").click(function () {
            $("#carNoCheck").removeClass("hidden");
            $("#carYesCheck").addClass("hidden");
            IS_CAR = false;
            updatePage();
        });
    });

var hideAllColorChecks = function() {
    $("#blueCheck").addClass("hidden");
    $("#yellowCheck").addClass("hidden");
    $("#redCheck").addClass("hidden");
    $("#whiteCheck").addClass("hidden");
};

var hideAllWordChecks = function() {
    $("#abortCheck").addClass("hidden");
    $("#detonateCheck").addClass("hidden");
    $("#holdCheck").addClass("hidden");
};

var hideAllStripChecks = function() {
    $("#blueStripCheck").addClass("hidden");
    $("#yellowStripCheck").addClass("hidden");
    $("#otherStripCheck").addClass("hidden");
};

var hideAllBatChecks = function() {
    $("#oneBatCheck").addClass("hidden");
    $("#zeroBatCheck").addClass("hidden");
    $("#moreBatCheck").addClass("hidden");
    $("#twoBatCheck").addClass("hidden");
};

var updatePage = function() {
    HOLD_BUTTON_SITUATION = false;
    IMMEDIATE_SITUATION = false;

    if(currentButtonColor == BUTTON_COLOR.YELLOW) {
        HOLD_BUTTON_SITUATION = true;
    } else if (currentButtonColor == BUTTON_COLOR.BLUE && currentButtonWord == BUTTON_WORD.ABORT) {
        HOLD_BUTTON_SITUATION = true;
    } else if ((numBatteries == BATTERY_COUNT.TWO || numBatteries == BATTERY_COUNT.MORE) && currentButtonWord == BUTTON_WORD.DETONATE) {
        IMMEDIATE_SITUATION = true;
    } else if (numBatteries == BATTERY_COUNT.MORE && IS_FRK == true) {
        IMMEDIATE_SITUATION = true;
    } else if (currentButtonColor == BUTTON_COLOR.RED && currentButtonWord == BUTTON_WORD.HOLD) {
        IMMEDIATE_SITUATION = true;
    } else if (currentButtonColor != null && currentButtonWord != null) {
        HOLD_BUTTON_SITUATION = true;
    }
    
    
};

var case1 = function() {
    if(currentButtonColor == BUTTON_COLOR.BLUE && currentButtonWord == BUTTON_WORD.ABORT){
        return true;
    } else if(currentButtonColor != null && currentButtonColor != BUTTON_COLOR.BLUE) {
        return false;
    }
}