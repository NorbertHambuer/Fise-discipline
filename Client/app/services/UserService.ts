/// <reference path="../config/config.ts" />


module app {
    export class UserService {
        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $location: ng.ILocationService) {
            this.identity = new Identity();
        }

        identity: Identity;

        login(username: string, password: string): ng.IPromise<any> {
            const defered = this.$q.defer();
            this.$http.post('/login', {username: username, password: password})
                .then(data => {
                    this.saveToken((<any>data.data).token);
                    this.identity.isAuthenticated = true;
                    defered.resolve();
                }, err => {
                    console.log(err);
                    defered.reject(err);
                });

            return defered.promise;
        }

        logout() {
            this.deleteToken();
            this.identity.isAuthenticated = false;
            this.$location.path('/home');
        }

        register(username: string, password: string, fName: string, lName: string, email: string): ng.IPromise<any> {
            const defered = this.$q.defer();
            this.$http.post('/register', { username: username, password: password, fName: fName, lName: lName, email: email })
                .then(data => {
                    defered.resolve(data);
                }, err => {
                    defered.reject(err)
                });

            return defered.promise;
        }

        saveToken(token: string) {
            localStorage.setItem('token', token);
        }

        deleteToken() {
            localStorage.removeItem('token');
        }
    }

    class Identity {
        constructor() {
            this.isAuthenticated = false;
        }

        isAuthenticated: boolean;
    }

    angular.module(moduleName).service('user', <any>UserService);
}