'use strict';

var currentButtonColor = null;
var currentButtonWord = null;
var currentStripColor = null;
var numBatteries = null;

var CASE_RESULT = {
    FALSE: 0,
    TRUE: 1,
    NOT_ENOUGH_INFO: 2
};

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

angular.module('myApp.theButton', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/theButton', {
            templateUrl: 'theButton/theButton.html',
            controller: 'TheButtonController'
        });
    }])

    .controller('TheButtonController', ['$scope', '$route', function TheButtonController($scope, $route) {
        $scope.reloadRoute = function() {
            $route.reload();
            IS_CAR = null;
            IS_FRK = null;

            currentButtonColor = null;
            currentButtonWord = null;
            currentStripColor = null;
            numBatteries = null;

            HOLD_BUTTON_SITUATION = false;
            IMMEDIATE_SITUATION = false
        };

        $("#blueButton").click(function () {
            hideAllColorChecks();
            $("#blueCheck").removeClass("hidden");
            currentButtonColor = BUTTON_COLOR.BLUE;
            updatePage();
        });

        $("#yellowButton").click(function () {
            hideAllColorChecks();
            $("#yellowCheck").removeClass("hidden");
            currentButtonColor = BUTTON_COLOR.YELLOW;
            updatePage();
        });

        $("#redButton").click(function () {
            hideAllColorChecks();
            $("#redCheck").removeClass("hidden");
            currentButtonColor = BUTTON_COLOR.RED;
            updatePage();
        });

        $("#whiteButton").click(function () {
            hideAllColorChecks();
            $("#whiteCheck").removeClass("hidden");
            currentButtonColor = BUTTON_COLOR.WHITE;
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
    }]);

var hideAllColorChecks = function () {
    $("#blueCheck").addClass("hidden");
    $("#yellowCheck").addClass("hidden");
    $("#redCheck").addClass("hidden");
    $("#whiteCheck").addClass("hidden");
};

var hideAllWordChecks = function () {
    $("#abortCheck").addClass("hidden");
    $("#detonateCheck").addClass("hidden");
    $("#holdCheck").addClass("hidden");
};

var hideAllStripChecks = function () {
    $("#blueStripCheck").addClass("hidden");
    $("#yellowStripCheck").addClass("hidden");
    $("#otherStripCheck").addClass("hidden");
};

var hideAllBatChecks = function () {
    $("#oneBatCheck").addClass("hidden");
    $("#zeroBatCheck").addClass("hidden");
    $("#moreBatCheck").addClass("hidden");
    $("#twoBatCheck").addClass("hidden");
};

var updatePage = function () {
    HOLD_BUTTON_SITUATION = false;
    IMMEDIATE_SITUATION = false;
    $("#holdPanel").addClass("hidden");
    $("#immediateDiffuseAlert").addClass("hidden");
    $("#moreInfoAlert").addClass("hidden");

    if (isCase1() == CASE_RESULT.TRUE) {
        HOLD_BUTTON_SITUATION = true;
    } else if (isCase2() == CASE_RESULT.TRUE) {
        IMMEDIATE_SITUATION = true;
    } else if (isCase3() == CASE_RESULT.TRUE) {
        HOLD_BUTTON_SITUATION = true;
    } else if (isCase4() == CASE_RESULT.TRUE) {
        IMMEDIATE_SITUATION = true;
    } else if (isCase5() == CASE_RESULT.TRUE) {
        HOLD_BUTTON_SITUATION = true;
    } else if (isCase6() == CASE_RESULT.TRUE) {
        IMMEDIATE_SITUATION = true;
    } else if (isCase7() == CASE_RESULT.TRUE) {
        HOLD_BUTTON_SITUATION = true;
    }

    if(!IMMEDIATE_SITUATION && !HOLD_BUTTON_SITUATION) {
        $("#moreInfoAlert").removeClass("hidden");
    } else if (IMMEDIATE_SITUATION) {
        $("#immediateDiffuseAlert").removeClass("hidden");
    } else if (HOLD_BUTTON_SITUATION) {
        $("#holdPanel").removeClass("hidden");
    }

    if(currentStripColor == STRIP_COLOR.BLUE) {
        $("#release1").addClass("hidden");
        $("#release4").removeClass("hidden");
        $("#release5").addClass("hidden");
    } else if (currentStripColor == STRIP_COLOR.YELLOW) {
        $("#release1").addClass("hidden");
        $("#release4").addClass("hidden");
        $("#release5").removeClass("hidden");
    } else if (currentStripColor == STRIP_COLOR.OTHER) {
        $("#release1").removeClass("hidden");
        $("#release4").addClass("hidden");
        $("#release5").addClass("hidden");
    }
};

var isCase1 = function () {
    if (currentButtonColor == BUTTON_COLOR.BLUE && currentButtonWord == BUTTON_WORD.ABORT) {
        return CASE_RESULT.TRUE;
    } else if (currentButtonColor != null && currentButtonColor != BUTTON_COLOR.BLUE) {
        return CASE_RESULT.FALSE;
    } else if (currentButtonWord != null && currentButtonWord != BUTTON_WORD.ABORT) {
        return CASE_RESULT.FALSE;
    } else {
        return CASE_RESULT.NOT_ENOUGH_INFO;
    }
};

var isCase2 = function () {
    if ((numBatteries == BATTERY_COUNT.TWO || numBatteries == BATTERY_COUNT.MORE) && currentButtonWord == BUTTON_WORD.DETONATE) {
        return CASE_RESULT.TRUE;
    } else if (numBatteries != null && !(numBatteries == BATTERY_COUNT.TWO || numBatteries == BATTERY_COUNT.MORE)) {
        return CASE_RESULT.FALSE;
    } else if (currentButtonWord != null && currentButtonWord != BUTTON_WORD.DETONATE) {
        return CASE_RESULT.FALSE;
    } else {
        return CASE_RESULT.NOT_ENOUGH_INFO;
    }
};

var isCase3 = function () {
    if (currentButtonColor == BUTTON_COLOR.WHITE && IS_CAR == true) {
        return CASE_RESULT.TRUE;
    } else if (currentButtonColor != null && currentButtonColor != BUTTON_COLOR.WHITE) {
        return CASE_RESULT.FALSE;
    } else if (IS_CAR != null && IS_CAR == false) {
        return CASE_RESULT.FALSE;
    } else {
        return CASE_RESULT.NOT_ENOUGH_INFO;
    }
};

var isCase4 = function () {
    if (numBatteries == BATTERY_COUNT.MORE && IS_FRK == true) {
        return CASE_RESULT.TRUE;
    } else if (numBatteries != null && !(numBatteries != BATTERY_COUNT.MORE)) {
        return CASE_RESULT.FALSE;
    } else if (IS_FRK != null && IS_FRK == false) {
        return CASE_RESULT.FALSE;
    } else {
        return CASE_RESULT.NOT_ENOUGH_INFO;
    }
};

var isCase5 = function () {
    if (currentButtonColor == BUTTON_COLOR.YELLOW) {
        return CASE_RESULT.TRUE;
    } else if (currentButtonColor != null && currentButtonColor != BUTTON_COLOR.YELLOW) {
        return CASE_RESULT.FALSE;
    } else {
        return CASE_RESULT.NOT_ENOUGH_INFO;
    }
};

var isCase6 = function () {
    if (currentButtonColor == BUTTON_COLOR.RED && currentButtonWord == BUTTON_WORD.HOLD) {
        return CASE_RESULT.TRUE;
    } else if (currentButtonColor != null && currentButtonColor != BUTTON_COLOR.RED) {
        return CASE_RESULT.FALSE;
    } else if (currentButtonWord != null && currentButtonWord != BUTTON_WORD.HOLD) {
        return CASE_RESULT.FALSE;
    } else {
        return CASE_RESULT.NOT_ENOUGH_INFO;
    }
};

var isCase7 = function () {
    if (isCase1() == CASE_RESULT.FALSE &&
        isCase2() == CASE_RESULT.FALSE &&
        isCase3() == CASE_RESULT.FALSE &&
        isCase4() == CASE_RESULT.FALSE &&
        isCase5() == CASE_RESULT.FALSE &&
        isCase6() == CASE_RESULT.FALSE) {
        return CASE_RESULT.TRUE;
    } else {
        return CASE_RESULT.NOT_ENOUGH_INFO;
    }
};