/**
 * Created by Owner on 2017/2/3.
 */
angular.module('userControllers',['userServices'])

.controller('regCtrl', function($http,$location,$timeout,User){
    var app = this;
    this.regUser = function (regData) {
        app.loading = true;
        app.errorMsg = false;


        User.create(app.regData).then(function(data){
            if(data.data.success){
                app.loading = false;
                //Create Success Message
                app.successMsg = data.data.message;
                //Redirect to home page
                $timeout(function(){
                    $location.path('/');
                },2000);
            }else{
                app.loading = false;
                //Create an error message
                app.errorMsg = data.data.message;
            }
        })
    };
})

.controller('revCtrl', function($http,$location,$timeout, UserRev,myService){
    var app = this;
    app.revUser = function (revData) {

      /*console.log('testing new button!');*/
        app.loading = true;
        app.errorMsg = false;




        UserRev.create(app.revData).then(function(data){
            if(data.data.success){
                app.loading = false;
                console.log(data.data);


                // Create Success Message
                app.successMsg = data.data.message;
                app.confirmMsg = data.data;
                myService.set(app.confirmMsg);
                //Redirect to Confirm page
                $timeout(function () {
                    $location.path('/confirmation');
                },2000);
            }else{
                app.loading = false;
                //Create an error message
                app.errorMsg = data.data.message;
            }
        })
    };
})

.controller('menu',function ($scope) {
    $scope.dishes = [
        {name: 'Cras facilisis', price: '$ 19.99', img: '../../assets/images/page2_img1.jpg'},
        {name: 'Phasellus erat', price: '$ 21.99', img: '../../assets/images/page2_img2.jpg'},
        {name: 'Kneras facilisis', price: '$ 23.90', img: '../../assets/images/page2_img3.jpg'},
        {name: 'Destro fetolis', price: '$ 10.99', img: '../../assets/images/page2_img4.jpg'},
        {name: 'Destro fetolis', price: '$ 23.90', img: '../../assets/images/page3_img1.jpg'},
        {name: 'Destro fetolis', price: '$ 25.30', img: '../../assets/images/page3_img2.jpg'},
        {name: 'Destro fetolis', price: '$ 21.99', img: '../../assets/images/page3_img3.jpg'},
        {name: 'Destro fetolis', price: '$ 25.30', img: '../../assets/images/page3_img4.jpg'},
        {name: 'Destro fetolis', price: '$ 21.99', img: '../../assets/images/page3_img5.jpg'},
        {name: 'Destro fetolis', price: '$ 19.99', img: '../../assets/images/page3_img6.jpg'},
        {name: 'Destro fetolis', price: '$ 21.99', img: '../../assets/images/page4_img1.jpg'},
        {name: 'Destro fetolis', price: '$ 25.30', img: '../../assets/images/page4_img2.jpg'},
        {name: 'Destro fetolis', price: '$ 21.99', img: '../../assets/images/page4_img3.jpg'},
        {name: 'Destro fetolis', price: '$ 21.99', img: '../../assets/images/page5_img1.jpg'},
    ]
})