﻿(function () {
    "use strict";

    angular.module("services", ["ngResource"])
    .constant("appSettings", {
        serverPath: "http://localhost:52609/"
    });

})();
