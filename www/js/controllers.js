angular.module('starter.controllers', [])

  .controller('DatePickerCtrl', function ($scope, $ionicPopup) {
    $scope.currentDate = new Date();
    $scope.pastDate = new Date(1521199764000);
    $scope.title = 'Custom Title';

    $scope.datePickerCallback = function (val) {
      console.log('ionic-datepicker callback');

      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        console.log('Selected date is : ', val)
      }

    };

  })

  .controller('ContactCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
