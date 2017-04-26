(function() {
    function registerCtrl() {
        var vm = this;
        vm.pageTitle = "Register";
        vm.user = {};
        // vm.genders =[{name:"Male",value:"M"}]
        vm.registerUser = function() {
            console.log(vm.user);
        };
        vm.countries = [{ name: "India", code: "IN" },
            { name: "United States", code: "USA" }
        ];
    }
    angular.module("register")
        .controller("registerCtrl", [registerCtrl]);
})();