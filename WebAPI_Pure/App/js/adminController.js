﻿(function () {
    "use strict";

    angular.module("app")
    // Admin controller for displaying admin specific tasks.
    .controller("adminCtrl", function (user, userPage, currentUser, searchUser) {
        var vm = this;

        vm.users = [];
        vm.take = 25;
        var page = 1;
        var isRefreshed = true;
        vm.hasSearch = false;
        vm.errorMsg = "";
        vm.btnText = "Ladda fler";
        vm.disableDuringLoad = true;

        // Method for checking if there are more users left in DB. If not we hide load more btn.
        function checkForMoreUsers(take) {
            userPage.query({ take: take, page: page + 1 }, function (data) {
                if (data.length > 0) {
                    vm.displayLoadMore = true;
                } else {
                    vm.displayLoadMore = false;
                };
            }, function (error) {
                vm.errorMsg = error.statusText;
            });
        };

        // Runs when starting to load the first users from DB.
        vm.firstUsers = function (take) {
            page = 1;
            vm.disableDuringLoad = true;
            vm.btnText = "Laddar...";
            userPage.query({ take: take, page: page }, function (data) {
                angular.copy(data, vm.users);
                vm.disableDuringLoad = false;
                vm.btnText = "Ladda fler";
            }, function (error) {
                console.log(error);
                vm.errorMsg = error.statusText;
            });
            checkForMoreUsers(take);
        };
        vm.firstUsers(vm.take);

        // Load more users with rules for search, refreshed and such. Call the DB for the next users and push them too the array.
        // Also calls DB once too check if there are more users left after we grabbed ours.
        vm.loadMoreUsers = function (take) {
            if (vm.hasSearch) {
                vm.firstUsers(take);
                vm.hasSearch = false;
            } else {
                if (!vm.isRefreshed) {
                    vm.refreshUserList();
                }

                page += 1;
                vm.disableDuringLoad = true;
                vm.btnText = "Laddar...";
                userPage.query({ take: take, page: page }, function (data) {
                    // Make sure all queries get pushed in to the array.
                    for (var i = 0; i < data.length; i++) {
                        vm.users.push(data[i]);
                        vm.btnText = "Ladda fler";
                        vm.disableDuringLoad = false;
                    };
                }, function (error) {
                    vm.errorMsg = error.statusText;
                });
                checkForMoreUsers(take);
            };
        };

        // Select a user.
        vm.selectUser = function (id) {
            for (var i = 0; i < vm.users.length; i++) {
                if (vm.users[i].Id == id) {
                    vm.selUser = vm.users[i];
                };
            };
        };

        // Cancle operation, Not working correctly yet.
        vm.cancleUserEdit = function () {
            vm.selUser = "";
        };

        // Save user changes to the DB.
        vm.saveUserEdit = function (id) {
            //vm.disableDuringLoad = true;
            //vm.btnText = "Laddar...";
            user.update({ id: id }, vm.selUser, function (data) {
                isRefreshed = false;
                //vm.btnText = "Uppdatera & Ladda fler";
                vm.disableDuringLoad = false;
            }, function (error) {
                vm.errorMsg = error.statusText;
            });
            vm.selUser = "";
        };

        // Remove user from DB.
        vm.deleteUser = function (id) {
            if (confirm('Vill du verkligen ta bort personen från Databasen?')) {
                user.delete({ id: id }, function (data) {
                    var index;
                    for (var i = 0; i < vm.users.length; i++) {
                        if (vm.users[i].Id == id) {
                            index = i;
                        };
                    };
                    vm.users.splice(index, 1);
                }, function (error) {
                    vm.errorMsg = error.statusText;
                });
            };
        };

        // Refresh user list by looping all pages and push the users to the array.
        vm.refreshUserList = function () {
            isRefreshed = true;
            vm.disableDuringLoad = true;
            vm.btnText = "Ladda fler";
            vm.hasSearch = false;
            vm.users = [];
            for (var i = 1; i < page + 1; i++) {
                vm.btnText = "Laddar...";
                userPage.query({ take: vm.take, page: i }, function (data) {
                    for (var i = 0; i < data.length; i++) {
                        vm.users.push(data[i]);
                        vm.btnText = "Ladda fler";
                        vm.disableDuringLoad = false;
                    };
                    // Make sure the list is sortet correct.
                    vm.users.sort(function (a, b) { return a.DistrictNumber - b.DistrictNumber; });
                }, function (error) {
                    vm.errorMsg = error.statusText;
                });
            };
        };

        // Search base on a string for name, county mm.
        vm.searchUser = function (query) {
            vm.displayLoadMore = false;
            vm.disableDuringLoad = true;
            vm.hasSearch = true;
            vm.users = [];
            vm.btnText = "Laddar...";
            searchUser.stringSearch.query({ query: query }, function (data) {
                angular.copy(data, vm.users);
                vm.disableDuringLoad = false;
            }, function (error) {
                vm.errorMsg = error.statusText;
            });
        };

        // Search based on district using a range.
        vm.searchDistrict = function (query) {
            vm.displayLoadMore = false;
            vm.disableDuringLoad = true;
            vm.hasSearch = true;
            vm.users = [];
            vm.btnText = "Laddar...";
            searchUser.districtSearch.query({ query: query }, function (data) {
                angular.copy(data, vm.users);
                vm.disableDuringLoad = false;
            }, function (error) {
                vm.errorMsg = error.statusText;
            });
        };

    })
    .controller("adminCreateCtrl", function (adminCreate) {
        var vm = this;

        vm.activeCat = true;
        vm.formDataCat = {
            ID: 0,
            Active: vm.activeCat
        };

        // Save cats form function.
        vm.saveFormCat = function () {
            //console.log(vm.formDataCat);

            // Save cat form to DB
            adminCreate.cats.create(vm.formDataCat, function (data) {
                console.log(data);

                // Get cats from DB as relode. Give us all cats in drop down.
                adminCreate.cats.get(function (data) {
                    //console.log(data);
                    angular.copy(data, vm.cats);
                    //console.log(vm.cats);
                });

                // Zero out cat form.
                vm.formDataCat = {
                    ID: 0,
                    Active: vm.activeCat
                };
            });
        };

        // Load the cats from DB to display in drop down.
        vm.cats = [];
        adminCreate.cats.get(function (data) {
            //console.log(data);
            angular.copy(data, vm.cats);
            //console.log(vm.cats);
        });

        vm.activeFlyer = true;
        // drop down start ID and model.
        vm.selectedCat = {
            ID: 1
        };

        vm.formDataFlyer = {
            ID: 0,
            Active: vm.activeFlyer
        };

        // Save flyer form function.
        vm.saveFormFlyer = function () {
            vm.formDataFlyer.CategoryID = vm.selectedCat.ID;
            //console.log(vm.formDataFlyer);
            //console.log(vm.selectedCat);

            // Save flyer form to DB.
            adminCreate.flyers.create(vm.formDataFlyer, function (data) {
                //console.log(data);

                // Zero out flyer form.
                vm.formDataFlyer = {
                    ID: 0,
                    Active: vm.activeFlyer
                };
            });
        };

        vm.flyers = [];
        adminCreate.flyers.get(function (data) {
            console.log(data);
            console.log(data[0].Range.Max);
            angular.copy(data, vm.flyers);
        });
        console.log(vm.flyers);

        vm.displayCats = false;
        vm.displayFlyers = false;
        vm.editMode = false;

        vm.catClick = function () {
            vm.displayCats = true;
            vm.displayFlyers = false;
        };
        vm.flyerClick = function () {
            vm.displayCats = false;
            vm.displayFlyers = true;
        };

        var copy;
        vm.editCats = function (id) {
            vm.editMode = true;
            for (var i = 0; i < vm.cats.length; i++) {
                if (vm.cats[i].ID == id) {
                    vm.selCat = vm.cats[i];
                    copy = JSON.parse(JSON.stringify(vm.selCat));
                };
            };
        };
        
        vm.editFlyer = function (id) {
            vm.editMode = true;
            for (var i = 0; i < vm.flyers.length; i++) {
                if (vm.flyers[i].ID == id) {
                    vm.selFlyer = vm.flyers[i];
                    copy = JSON.parse(JSON.stringify(vm.selFlyer));
                };
            };
        };

        vm.saveCatEdits = function (id) {
            adminCreate.cats.update({ id: id }, vm.selCat, function (data) {
                vm.editMode = false;
            });
            vm.selCat = "";
        };
        vm.saveFlyerEdits = function (id) {
            //vm.formDataFlyer.CategoryID = vm.selectedCat.ID;
            vm.selFlyer.CategoryID = vm.selectedCat.ID;
            adminCreate.flyers.update({ id: id }, vm.selFlyer, function (data) {
                console.log(data);
                vm.editMode = false;
            });
            vm.selFlyer = "";
        };
        
        vm.cancleCat = function () {
            for (var i = 0; i < vm.cats.length; i++) {
                if (vm.cats[i].ID == id) {
                    vm.cats[i] = copy;
                };
            };
            vm.selCat = "";
        };
        vm.cancleFlyer = function (id) {
            for (var i = 0; i < vm.flyers.length; i++) {
                if (vm.flyers[i].ID == id) {
                    console.log(vm.flyers[i]);
                    console.log(copy);
                    vm.flyers[i] = copy;
                };
            };
            vm.selFlyer = "";
        };

        vm.deleteCat = function (id) {
            if (confirm('Vill du verkligen ta bort kategorin från Databasen?')) {
                adminCreate.cats.delete({ id: id }, function (data) {
                    var index;
                    for (var i = 0; i < vm.cats.length; i++) {
                        if (vm.cats[i].Id == id) {
                            index = i;
                        };
                    };
                    vm.cats.splice(index, 1);
                });
            };
        };
        vm.deleteFlyer = function (id) {
            if (confirm('Vill du verkligen ta bort reklambladet från Databasen?')) {
                adminCreate.flyers.delete({ id: id }, function (data) {
                    var index;
                    for (var i = 0; i < vm.flyers.length; i++) {
                        if (vm.flyers[i].Id == id) {
                            index = i;
                        };
                    };
                    vm.flyers.splice(index, 1);
                });
            };
        };
    });

})();