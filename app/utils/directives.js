(function() {
    function bsBrandName() {
        return {
            // templateUrl:"give the path of the html"
            template: '<a class="navbar-brand" href="#">Birla Soft CG</a>',
            restrict: 'A'
        };
    }

    function alphabetsOnly() {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                console.log(scope);
                console.log(element);
                console.log(attrs);
                element.bind('keypress', function(evt) {
                    console.log(evt.key);
                    var regex = new RegExp(/^[A-z]+$/);
                    if (!regex.test(evt.key)) {
                        evt.preventDefault();
                    }

                });
            }
        }
    }

    function numbersOnly() {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                var hasLength = attrs["length"];
                element.bind('keypress', function(evt) {
                    console.log(evt.key);

                    var regex = new RegExp(/^[0-9]+$/);
                    if (regex.test(evt.key)) {
                        if (hasLength && parseInt(hasLength) && this.value.length > hasLength) {
                            evt.preventDefault();
                        }
                    } else {
                        evt.preventDefault();
                    }

                });
            }
        }
    }

    function hybrid() {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                var hasLength = attrs["length"];
                var pattern = attrs["pattern"]
                element.bind('keypress', function(evt) {
                    console.log(evt.key);

                    var regex = new RegExp(pattern);
                    if (regex.test(evt.key)) {
                        if (hasLength && parseInt(hasLength) && this.value.length > hasLength) {
                            evt.preventDefault();
                        }
                    } else {
                        evt.preventDefault();
                    }

                });
            }
        }
    }

    function bsDatePicker() {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                var config = {};
                if (attrs["maxDate"]) {
                    config.maxDate = attrs["maxDate"];
                }
                if (attrs["minDate"]) {
                    config.minDate = attrs["minDate"];
                }
                element.datepicker(config);
            }
        }
    }

    function bsNavBar() {
        return {
            templateUrl: 'app/utils/sidenav.tpl.html',
            scope: {
                sideNavItems: "=",
                heading: "@",
                loadPage: "&"
            },
            controller: function($scope) {
                console.log($scope);
            },
            link: function(scope, element, attrs) {
                console.log(scope);
                scope.sideNavItems.push("FromDir");
                scope.heading = scope.heading + " Extra";
            }
        }
    }

    function bsTryMe() {
        return {
            template: '<h1>I am good </h1><div ng-transclude></div>',
            transclude: true
        }
    }
    //building validation directive
    function bsCheckUser() {
        return {
            require: "ngModel",
            link: function(scope, element, attrs, ctrl) {
                ctrl.$formatters.unshift(checkUser);
                ctrl.$parsers.unshift(checkUser);
                var users = ["kiran", "Ravi", "john"]

                function checkUser(data) {
                    console.log(data);
                    var isUserExists = false;
                    angular.forEach(users, function(item) {
                        if (!isUserExists) {
                            isUserExists = item == data;
                        }
                    });
                    ctrl.$setValidity("checkuser", !isUserExists);

                }

            }
        }
    }


    angular.module('utils')
        .directive('bsBrandName', [bsBrandName])
        .directive("alphabetsOnly", [alphabetsOnly])
        .directive("numbersOnly", [numbersOnly])
        .directive("hybrid", [hybrid])
        .directive("bsDatePicker", [bsDatePicker])
        .directive("bsNavBar", [bsNavBar])
        .directive("bsTryMe", [bsTryMe])
        .directive("bsCheckUser", [bsCheckUser])
})();