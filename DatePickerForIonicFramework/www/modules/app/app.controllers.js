angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, ionicDatePiker) {

    $scope.openDatePicker = function () {
      ionicDatePiker.openDatePicker(new Date());
    };

  })

  .controller('ChatsCtrl', function ($scope) {

  })

  .controller('AccountCtrl', function ($scope) {

  });
