angular.module('starter.controllers', [])

  .controller('DatePickerCtrl', function ($scope, $ionicPopup) {
    $scope.currentDate = new Date();
    $scope.pastDate = new Date(1521199764000);
  })

  .controller('ContactCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
