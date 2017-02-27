angular.module('mainController', ['authServices','userServices'])
    .controller('mainCtrl', function (Auth, $timeout, $location,$rootScope,myService) {
        var app = this;

        app.loadme = false;

        $rootScope.$on('$routeChangeStart', function () {
            if (Auth.isLoggedIn()) {
                app.isLoggedIn = true;
                /*console.log('Success: User is logged in');*/
                Auth.getUser().then(function (data) {
                  /*  console.log(data);
                    console.log(data.data.username);*/
                    app.username = data.data.username;
                    app.email = data.data.email;
                    app.loadme = true;
                    app.confirmMsg = myService.get();
                })

            } else {
                /*console.log('Failure: User is NOT logged in');*/
                app.isLoggedIn = false;
                app.username = "";
                app.loadme = true;
            }
        });


        this.doLogin = function (loginData) {
            app.loading = true;
            app.errorMsg = false;

            Auth.login(app.loginData).then(function (data) {
                if (data.data.success) {
                    app.loading = false;
                    //Create Success Message
                    /*console.log(data);*/
                    app.successMsg = data.data.message + '...Redirecting';
                    //Redirect to about page
                    $timeout(function () {
                        $location.path('/');
                        app.successMsg = null;
                        app.loginData = {};
                    }, 2000);

                } else {
                    app.loading = false;
                    //Create an error message
                    app.errorMsg = data.data.message;
                }
            });
        };
        this.logout = function () {
            Auth.logout();
            $location.path('/logout');
            $timeout(function () {
                $location.path('/');
            }, 2000)

        };
        

    })

/*.controller('outCtrl', function ($timeout,$location) {
    $timeout(function () {
        $location.path('/');
    }, 2000)
})*/


