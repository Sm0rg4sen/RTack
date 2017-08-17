!function(){"use strict";angular.module("app").controller("adminCtrl",["user","userPage","searchUser","$ocLazyLoad","$injector",function(e,r,s,a,t){function n(e){r.query({take:e,page:i+1},function(e){e.length>0?u.displayLoadMore=!0:u.displayLoadMore=!1},function(e){u.errorMsg=e.statusText})}var u=this;u.users=[],u.take=25;var i=1,o=!0;u.hasSearch=!1,u.errorMsg="",u.btnText="Ladda fler",u.disableDuringLoad=!0,u.firstUsers=function(e){i=1,u.disableDuringLoad=!0,u.btnText="Laddar...",r.query({take:e,page:i},function(e){angular.copy(e,u.users),u.disableDuringLoad=!1,u.btnText="Ladda fler"},function(e){console.log(e),u.errorMsg=e.statusText}),n(e)},u.firstUsers(u.take),u.loadMoreUsers=function(e){u.hasSearch?(u.firstUsers(e),u.hasSearch=!1):(u.isRefreshed||u.refreshUserList(),i+=1,u.disableDuringLoad=!0,u.btnText="Laddar...",r.query({take:e,page:i},function(e){for(var r=0;r<e.length;r++)u.users.push(e[r]),u.btnText="Ladda fler",u.disableDuringLoad=!1},function(e){u.errorMsg=e.statusText}),n(e))};var d;u.selectUser=function(e){for(var r=0;r<u.users.length;r++)u.users[r].Id==e&&(u.selUser=u.users[r],d=JSON.parse(JSON.stringify(u.selUser)))},u.cancleUserEdit=function(e){for(var r=0;r<u.users.length;r++)u.users[r].Id==e&&(u.users[r]=d);u.selUser=""},u.saveUserEdit=function(r){e.update({id:r},u.selUser,function(e){o=!1,u.disableDuringLoad=!1},function(e){u.errorMsg=e.statusText}),u.selUser=""},u.deleteUser=function(r){confirm("Vill du verkligen ta bort personen från Databasen?")&&e.delete({id:r},function(e){for(var s,a=0;a<u.users.length;a++)u.users[a].Id==r&&(s=a);u.users.splice(s,1)},function(e){u.errorMsg=e.statusText})},u.refreshUserList=function(){o=!0,u.disableDuringLoad=!0,u.btnText="Ladda fler",u.hasSearch=!1,u.users=[];for(var e=1;e<i+1;e++)u.btnText="Laddar...",r.query({take:u.take,page:e},function(e){for(var r=0;r<e.length;r++)u.users.push(e[r]),u.btnText="Ladda fler",u.disableDuringLoad=!1;u.users.sort(function(e,r){return e.DistrictNumber-r.DistrictNumber})},function(e){u.errorMsg=e.statusText})},u.searchUser=function(e){u.displayLoadMore=!1,u.disableDuringLoad=!0,u.hasSearch=!0,u.users=[],u.btnText="Laddar...",s.stringSearch.query({query:e},function(e){angular.copy(e,u.users),u.disableDuringLoad=!1},function(e){u.errorMsg=e.statusText})},u.searchDistrict=function(e){u.displayLoadMore=!1,u.disableDuringLoad=!0,u.hasSearch=!0,u.users=[],u.btnText="Laddar...",s.districtSearch.query({query:e},function(e){angular.copy(e,u.users),u.disableDuringLoad=!1},function(e){u.errorMsg=e.statusText})}}])}();