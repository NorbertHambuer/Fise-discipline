/// <reference path="../config/config.ts" />


module app {
    export class AuthService {
        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $location: ng.ILocationService, private user: UserService) {
            this.setSession();
        }

        setSession() {
            const token = localStorage.getItem('token') || '';
            
            console.log(token);
            if (token.length) {
                this.user.identity.isAuthenticated = true;
            } else {
                console.log('nu ai token');
            }
        }
    }

    angular.module(moduleName).service('auth', <any>AuthService);
}