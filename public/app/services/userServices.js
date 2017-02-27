angular.module('userServices', [])
    .factory('User', function ($http) {
        userFactory = {};

        //User.create(regData)
        userFactory.create = function (regData) {
            return $http.post('/api/users', regData);
        };
        userFactory.getPermission = function () {
            return $http.get('/api/permission');
        };
        return userFactory;

    })

    .factory('UserRev', function ($http,$location) {
        userRevFactor = {};

        //UserRev.create(revData)
        userRevFactor.create = function (revData) {
            return $http.post('/api/booking', revData)
        };

        userRevFactor.getAllOrders = function () {
            return $http.get('/api/allorders');
        }
        //UserRev.get(revData )

        userRevFactor.cancelOrder = function (code) {
            //console.log(code);
            return $http.delete('api/cancelorder/'+code);

        }

        userRevFactor.createOrder = function(){
            $location.path('/reservation');
        }

        userRevFactor.editOrder = function(code){
            return $http.get('api/editorder/' +code);
        }

        userRevFactor.updateorder = function(updatedata){
            return $http.put('api/updateorder/',updatedata );
        }

        userRevFactor.searchorder = function(code){
            return $http.get('api/searchorder/' +code);
        }

        return userRevFactor;
    })



    .factory('myService', function () {
        var savedData = {}

        function set(data) {
            savedData = data;
        }

        function get() {
            return savedData;
        }

        return {
            set: set,
            get: get
        }

    })



