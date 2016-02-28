angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, ionicDatePiker) {

    $scope.selectedDate1;
    $scope.selectedDate2;

    $scope.openDatePickerOne = function (val) {
      var ipObj1 = {
        callback: function (val) {  //Mandatory
          console.log('Return value from the datepicker is : ' + val, new Date(val));
          $scope.selectedDate1 = new Date(val);
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
        to: new Date(2016, 8, 25),
        inputDate: new Date(),
        mondayFirst: true,
        disableWeekdays: [0],
        closeOnSelect: true
      };
      ionicDatePiker.openDatePicker(ipObj1);
    };

    $scope.openDatePickerTwo = function (val) {
      var ipObj2 = {
        callback: function (val) {  //Mandatory
          console.log('Return value from the datepicker is : ' + val, new Date(val));
          $scope.selectedDate2 = new Date(val);
        },
        inputDate: $scope.selectedDate1,
        mondayFirst: false,
        disableWeekdays: [2]
      };
      ionicDatePiker.openDatePicker(ipObj2);
    }
  })

  .controller('ChatsCtrl', function ($scope) {

  })

  .controller('AccountCtrl', function ($scope) {

  });
