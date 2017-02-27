/**
 * Created by Owner on 2017/2/3.
 */
var app = angular.module('appRoutes', ['ngRoute'])

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/pages/home.html'
        })

            .when('/about', {
                templateUrl: 'app/views/pages/about.html'
            })
            .when('/register', {
                templateUrl: 'app/views/pages/users/register.html',
                controller: 'regCtrl',
                controllerAs: 'register',
                authenticated: false
            })
            .when('/login', {
                templateUrl: 'app/views/pages/users/login.html',
                authenticated: false
            })
            .when('/logout', {
                templateUrl: 'app/views/pages/users/logout.html',
               /* controller:'outCtrl',*/
                authenticated: true
            })
            .when('/profile', {
                templateUrl: 'app/views/pages/users/profile.html',
                authenticated: true
            })
            .when('/reservation', {
                templateUrl: 'app/views/pages/users/reservation.html',
                controller: 'revCtrl',
                controllerAs: 'rev',
                authenticated: true
            })

            .when('/confirmation', {
                templateUrl: 'app/views/pages/users/confirmation.html',
                controller: 'revCtrl',
                controllerAs: 'rev',
                authenticated: true
            })

            .when('/management', {
                templateUrl: 'app/views/management/management.html',
                controller: 'managementCtrl',

                authenticated: true,
                permission: ['admin', 'moderator']
            })
            .when('/cancelorder', {
                templateUrl: 'app/views/pages/users/cancelorder.html',
                authenticated: true,
                permission: ['admin', 'moderator']
            })

            .when('/editorder/:code', {
                templateUrl: 'app/views/pages/users/edit.html',
                authenticated: true,
                controller: 'editCtrl',
                permission: ['admin', 'moderator']
            })

            .when('/search',{
                templateUrl: 'app/views/pages/users/search.html',
                permission:['admin', 'moderator', 'user']
            })

            .when('/singleorder/:code',{
                templateUrl:'app/views/pages/users/singleorder.html',
                controller:'singleCtrl'
            })
            .when('/menu',{
                templateUrl:'app/views/pages/users/menu.html',
                controller:'menu'
            })

            .when('/contact',{
                templateUrl: 'app/views/pages/users/contact.html'
            })

            .when('/vlog',{
                templateUrl: 'app/views/pages/users/vlog.html'
            })
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

app.run(['$rootScope', 'Auth', '$location', 'User', function ($rootScope, Auth, $location, User) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.$$route !== undefined) {
            if (next.$$route.authenticated == true) {
                if (!Auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/');
                } else if (next.$$route.permission) {
                    User.getPermission().then(function (data) {
                        if (next.$$route.permission[0] !== data.data.permission) {
                            if (next.$$route.permission[1] !== data.data.permission) {
                                event.preventDefault();
                                $location.path('/');
                            }
                        }
                    });
                }
            } else if (next.$$route.authenticated == false) {
                //console.log('should not be authenticated~!');
                if (Auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/profile');
                }
            }
        }


    })
}])
