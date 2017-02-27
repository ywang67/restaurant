/**
 * Created by Owner on 2017/2/7.
 */
angular.module('managementController', ['userServices'])

.controller('managementCtrl', function (UserRev,$scope,$location,$timeout) {
/*

    var app = this;
    this.getOrders = function(ordData){
        UserRev.getAllOrders(app.ordData).then(function (data) {
            $scope.allOrders = data.data.allorders;
            //console.log(data.data);
        });
    };
*/

/*    UserRev.createOrder().then(function () {

    });*/

    UserRev.getAllOrders().then(function (data) {
        $scope.allOrders = data.data.allorders;
        $scope.message = data.data.message;
        //console.log(data.data);
    });



    $scope.cancelOrder = function (code) {
       UserRev.cancelOrder(code).then(function (data) {
            console.log(data.data);
            $location.path('/cancelorder');
            $timeout(function(){
                $location.path('/management')
            },2000);

        })
    };

})
    .controller('editCtrl', function (UserRev,$scope,$location,$timeout,$routeParams) {
            var app = this;

            app.loading = false;
        $scope.code = $routeParams.code;
        UserRev.editOrder($scope.code).then(function(data){
            /*console.log(data.data);*/

            app.loading = true;
            app.successMsg = data.data.message + '...Redirecting';
            $scope.order = data.data.order;
            $scope.order.date = new Date(data.data.order.date);
            $scope.order.time= new Date(data.data.order.time);

        });
        $scope.update = function(updatedata) {
            UserRev.updateorder(updatedata).then(function (data) {
                if(data.data.success) {
                    $location.path('/management');
                    app.loading = false;
                }
            })
        }

    })

    .controller('singleCtrl', function($scope,UserRev,$location,$timeout, $routeParams){
        $scope.code= $routeParams.code;
       UserRev.searchorder($scope.code).then(function(data){
           console.log(data.data);
           $scope.order = data.data.order;
           $scope.message = data.data.message;
           $scope.order.date = new Date(data.data.order.date);
           $scope.order.time = new Date(data.data.order.time);
       });
    })
