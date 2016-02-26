angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, ionicDatePiker) {

    $scope.selectedDate;

    $scope.openDatePicker = function (val) {
      var ipObj;
      if (val == 1) {
        ipObj = {
          callback: function (val) {  //Mandatory
            console.log('Return value from the datepicker is : ' + val, new Date(val));
            $scope.selectedDate = new Date(val);
          },
          disabledDates: [
            new Date(1437719836326),
            new Date(2016, 1, 25),
            new Date(2015, 7, 10),
            new Date('Wednesday, August 12, 2015'),
            new Date("08-14-2015"),
            new Date(1439676000000),
            new Date(1456511400000)
          ],
          from: new Date(2012, 8, 2),
          to: new Date(2018, 8, 25),
          inputDate: new Date(),
          mondayFirst: true,
          disableWeekdays: [0, 6]
        };
      } else {
        ipObj = {
          callback: function (val) {  //Mandatory
            console.log('Return value from the datepicker is : ' + val, new Date(val));
          },
          inputDate: $scope.selectedDate,
          mondayFirst: true
        };
      }
      ionicDatePiker.openDatePicker(ipObj);
    };

  })

  .controller('ChatsCtrl', function ($scope) {

  })

  .controller('AccountCtrl', function ($scope) {

  });
