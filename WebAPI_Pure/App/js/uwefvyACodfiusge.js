!function(){"use strict";angular.module("app").controller("adminCtrl",["printMsg","user","userPage","currentUser","searchUser",function(e,t,r,a,s){function n(e){r.query({take:e,page:l+1},function(e){e.length>0?i.displayLoadMore=!0:i.displayLoadMore=!1},function(e){i.errorMsg=e.statusText})}var i=this;i.printDisplayMsg=[],e.get(function(e){e.length>0&&(angular.copy(e,i.printDisplayMsg),$("#msg").val(i.printDisplayMsg[0].Bulletin))}),i.saveMsg=function(){var t=$("#msg").val();i.printDisplayMsg.length>0?e.save({id:i.printDisplayMsg[0].ID},JSON.stringify(t),function(e){}):e.saveFirst(JSON.stringify(t),function(e){})},i.users=[],i.take=25;var l=1,o=!0;i.hasSearch=!1,i.errorMsg="",i.btnText="Ladda fler",i.disableDuringLoad=!0,i.firstUsers=function(e){l=1,i.disableDuringLoad=!0,i.btnText="Laddar...",r.query({take:e,page:l},function(e){angular.copy(e,i.users),i.disableDuringLoad=!1,i.btnText="Ladda fler"},function(e){i.errorMsg=e.statusText}),n(e)},i.firstUsers(i.take),i.loadMoreUsers=function(e){i.hasSearch?(i.firstUsers(e),i.hasSearch=!1):(i.isRefreshed||i.refreshUserList(),l+=1,i.disableDuringLoad=!0,i.btnText="Laddar...",r.query({take:e,page:l},function(e){for(var t=0;t<e.length;t++)i.users.push(e[t]),i.btnText="Ladda fler",i.disableDuringLoad=!1},function(e){i.errorMsg=e.statusText}),n(e))};var c;i.selectUser=function(e){for(var t=0;t<i.users.length;t++)i.users[t].Id==e&&(i.selUser=i.users[t],c=JSON.parse(JSON.stringify(i.selUser)))},i.cancleUserEdit=function(e){for(var t=0;t<i.users.length;t++)i.users[t].Id==e&&(i.users[t]=c);i.selUser=""},i.saveUserEdit=function(e){t.update({id:e},i.selUser,function(e){o=!1,i.disableDuringLoad=!1},function(e){i.errorMsg=e.statusText}),i.selUser=""},i.deleteUser=function(e){confirm("Vill du verkligen ta bort personen från Databasen?")&&t.delete({id:e},function(t){for(var r,a=0;a<i.users.length;a++)i.users[a].Id==e&&(r=a);i.users.splice(r,1)},function(e){i.errorMsg=e.statusText})},i.refreshUserList=function(){o=!0,i.disableDuringLoad=!0,i.btnText="Ladda fler",i.hasSearch=!1,i.users=[];for(var e=1;e<l+1;e++)i.btnText="Laddar...",r.query({take:i.take,page:e},function(e){for(var t=0;t<e.length;t++)i.users.push(e[t]),i.btnText="Ladda fler",i.disableDuringLoad=!1;i.users.sort(function(e,t){return e.DistrictNumber-t.DistrictNumber})},function(e){i.errorMsg=e.statusText})},i.searchUser=function(e){i.displayLoadMore=!1,i.disableDuringLoad=!0,i.hasSearch=!0,i.users=[],i.btnText="Laddar...",s.stringSearch.query({query:e},function(e){angular.copy(e,i.users),i.disableDuringLoad=!1},function(e){i.errorMsg=e.statusText})},i.searchDistrict=function(e){i.displayLoadMore=!1,i.disableDuringLoad=!0,i.hasSearch=!0,i.users=[],i.btnText="Laddar...",s.districtSearch.query({query:e},function(e){angular.copy(e,i.users),i.disableDuringLoad=!1},function(e){i.errorMsg=e.statusText})}}]).controller("adminCreateCtrl",["adminCreate",function(e){var t=this;t.activeCat=!0,t.formDataCat={ID:0,Active:t.activeCat},t.saveFormCat=function(){e.cats.create(t.formDataCat,function(r){e.cats.get(function(e){angular.copy(e,t.cats)}),t.formDataCat={ID:0,Active:t.activeCat}})},t.cats=[],e.cats.get(function(e){angular.copy(e,t.cats)}),t.activeFlyer=!0,t.selectedCat={ID:1},t.formDataFlyer={ID:0,Active:t.activeFlyer},t.saveFormFlyer=function(){t.formDataFlyer.CategoryID=t.selectedCat.ID,e.flyers.create(t.formDataFlyer,function(r){t.formDataFlyer={ID:0,Active:t.activeFlyer},e.flyers.get(function(e){e.length>0&&angular.copy(e,t.flyers)})})},t.flyers=[],e.flyers.get(function(e){e.length>0&&angular.copy(e,t.flyers)}),t.displayCats=!1,t.displayFlyers=!1,t.editMode=!1;var r=!1;t.catClick=function(){t.displayCats=!0,t.displayFlyers=!1},t.flyerClick=function(){t.displayCats=!1,t.displayFlyers=!0,r&&(e.flyers.get(function(e){e.length>0&&angular.copy(e,t.flyers)}),r=!1)};var a;t.editCats=function(e){t.editMode=!0;for(var r=0;r<t.cats.length;r++)t.cats[r].ID==e&&(t.selCat=t.cats[r],a=JSON.parse(JSON.stringify(t.selCat)))},t.editFlyer=function(e){t.editMode=!0;for(var r=0;r<t.flyers.length;r++)t.flyers[r].ID==e&&(t.selFlyer=t.flyers[r],a=JSON.parse(JSON.stringify(t.selFlyer)),t.selectedCat.ID=t.selFlyer.Category.ID)},t.saveCatEdits=function(a){e.cats.update({id:a},t.selCat,function(e){t.editMode=!1,r=!0}),t.selCat=""},t.saveFlyerEdits=function(r){t.selFlyer.CategoryID=t.selectedCat.ID,e.flyers.update({id:r},t.selFlyer,function(r){t.editMode=!1,e.flyers.get(function(e){e.length>0&&angular.copy(e,t.flyers)})}),t.selFlyer=""},t.cancleCat=function(){for(var e=0;e<t.cats.length;e++)t.cats[e].ID==id&&(t.cats[e]=a);t.selCat=""},t.cancleFlyer=function(e){for(var r=0;r<t.flyers.length;r++)t.flyers[r].ID==e&&(t.flyers[r]=a);t.selFlyer=""},t.deleteCat=function(r){confirm("Vill du verkligen ta bort kategorin från Databasen? Detta kommer också ta bort alla reklamblad för kategorin!")&&e.cats.delete({id:r},function(a){t.cats.splice(r,1),e.flyers.get(function(e){angular.copy(e,t.flyers)}),e.cats.get(function(e){angular.copy(e,t.cats)})})},t.deleteFlyer=function(r){confirm("Vill du verkligen ta bort reklambladet från Databasen?")&&e.flyers.delete({id:r},function(a){t.flyers.splice(r,1),e.flyers.get(function(e){angular.copy(e,t.flyers)})})}}])}();