angular.module('myApp').controller('HomeCtrl',
        ['$scope', '$rootScope', '$q', '$state', '$ionicLoading', '$ionicPopup', '$ionicSlideBoxDelegate', '$timeout', 'ProductService', 'CartService', 'AuthService',
function ($scope, $rootScope, $q, $state, $ionicLoading, $ionicPopup, $ionicSlideBoxDelegate, $timeout, ProductService, CartService, AuthService) {

    var instance = this;

    instance.show_featured = false;
    instance.addedToCart = false;

    $scope.$on('$ionicView.enter', function (e) {

        $ionicLoading.show();

        ProductService.featured().then(
            function (data) {

                instance.show_featured = true;
                instance.featured = data;

                $ionicSlideBoxDelegate.update();
                $ionicLoading.hide();
            },
            function (data) {

                $ionicLoading.hide();
                var popup = $ionicPopup.confirm({
                    title: 'uh oh!',
                    template: 'Error fetching featured products:<br/>' + data + '<br/>Try Again?',
                    cancelText: 'No',
                    okText: 'Yes'
                });
                popup.then(function (res) {
                    if (res) {
                        $state.reload();
                    }
                });
            });
    });

    function addToCart(product, $event) {

        $event.stopPropagation();
        CartService.add(product);

        instance.addedToCart = true;
        $timeout(function () {
            instance.addedToCart = false;
        }, 700);
    }
    instance.addToCart = addToCart;

    function isAuthenticated() {
        return AuthService.isAuthenticated();
    }
    instance.isAuthenticated = isAuthenticated;
}]);