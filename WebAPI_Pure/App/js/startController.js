﻿(function () {
    "use strict";

    angular.module("app")
    .controller("startCtrl", function (user) {
        var vm = this;

        vm.show = true;
        vm.phaseOneHide = true;

        vm.formData = {};

        vm.submitForm = function () {

            user.save(vm.formData);

            vm.formData = {};
        };

    })
    .controller("adminLoginCtrl", function (userAccount) {
        var vm = this;
        
        vm.show = false;
        vm.phaseOneHide = false;

        //Logging in code.
        vm.isLoggedIn = function () {
            return currentUser.getProfile().isLoggedIn;
        };
        vm.message = '';
        vm.userData = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        vm.login = function () {
            vm.userData.grant_type = "password";
            vm.userData.userName = vm.userData.email;
            

            userAccount.loginUser(vm.userData, function (data) {
                //console.log(data);
                vm.message = "";
                vm.password = "";
                currentUser.setProfile(vm.userData.userName, data.access_token);
                //console.log(currentUser.getProfile());
            },
            function (response) {
                vm.password = "";
                vm.message = "ERROR";
            });
        };

    })
    .controller("adminDisplayCtrl", function (user) {
        var vm = this;

        vm.users = [];

        vm.getList = function () {
            user.query(function (data) {
                angular.copy(data, vm.users);
            });
        };

        vm.show = true;
        vm.hide = true;
        vm.currentEdit = '';
        var editData = {
            Id: '',
            Name: '',
            Address: '',
            PostalCode: '',
            County: '',
            Email: '',
            DistrictNumber: '',
            DeliveryOrderNumber: ''
        };
        vm.clickTest = function (getId) {
            if (vm.currentEdit == getId) {
                vm.currentEdit = '';
            } else {
                vm.currentEdit = getId;
            }
            vm.show = false;
            vm.hide = false;
        };

        vm.saveEdits = function (getId) {

            console.log(vm.users);
            var editUser = {};
            for (var i = 0; i < vm.users.length; i++) {
                if (vm.users[i].Id == getId ) {
                    editUser = vm.users[i];
                    break;
                };
            };
            console.log(editUser);
            user.update({ id: getId }, editUser);
            vm.currentEdit = '';
            //vm.getList();
        };

    });

})();

//vm.users.splice(vm.user.length - 1, 0, vm.user);