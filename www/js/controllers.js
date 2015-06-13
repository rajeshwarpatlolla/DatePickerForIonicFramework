angular.module('starter.controllers', [])

  .controller('DatePickerCtrl', function ($scope, $ionicPopup) {
    $scope.currentDate = new Date();
    $scope.pastDate = new Date(1521199764000);

    $scope.datePickerCallback = function (x) {
      console.log('in controller callback', x, typeof(x))
    };

  })

  .controller('ContactCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
