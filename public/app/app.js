/**
 * Created by Owner on 2017/2/3.
 */
angular.module('userApp',['appRoutes','userControllers','userServices','ngAnimate','mainController','authServices','managementController'])

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
