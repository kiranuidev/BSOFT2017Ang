(function() {
    function registerCtrl(utilitySvc) {
        var vm = this;
        vm.pageTitle = "Register";
        vm.user = {};
        vm.registerUser = function() {
            vm.isSubmitted = true;
            console.log(vm.user);
        };
        vm.countries = utilitySvc.getCountries();
        vm.patterns = utilitySvc.validationPatterns;
    }
    angular.module("register")
        .controller("registerCtrl", ["utilityService", registerCtrl]);
})();