angular.module('starter.controllers', [])

  .controller('DatePickerCtrl', function ($scope, $ionicPopup) {
    $scope.currentDate = new Date();
    $scope.pastDate = new Date(1521199764000);
    $scope.title = 'Custom Title';
    $scope.augMonth = new Date(1440052709000);

    $scope.disabledDates = [
      new Date(1437719836326),
      new Date(2015,7,10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000) //UNIX format
    ];

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
