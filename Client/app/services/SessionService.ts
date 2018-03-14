/// <reference path="../config/config.ts" />

module app {
    export class SessionService {
        constructor() {
            this.userIsAuthenticated = false;
        }

        userIsAuthenticated;

        setUserAuthenticated(value) {
            this.userIsAuthenticated = value;
        }

        getUserAuthenticated() {
            return this.userIsAuthenticated;
        }
    }

    angular.module(moduleName).service('SessionService', <any>SessionService);
}