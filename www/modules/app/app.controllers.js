angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, ionicDatePicker) {

    $scope.selectedDate1;
    $scope.selectedDate2;

    $scope.openDatePickerOne = function (val) {
      var ipObj1 = {
        callback: function (val) {  //Mandatory
          console.log('Return value from the datepicker popup is : ' + val, new Date(val));
          $scope.selectedDate1 = new Date(val);
        },
        disabledDates: [
          new Date(2016, 2, 16),
          new Date(2015, 3, 16),
          new Date(2015, 4, 16),
          new Date(2015, 5, 16),
          new Date('Wednesday, August 12, 2015'),
          new Date("08-16-2016"),
          new Date(1439676000000)
        ],
        from: new Date(2012, 1, 1),
        to: new Date(2016, 10, 30),
        inputDate: new Date(),
        mondayFirst: true,
        disableWeekdays: [0],
        closeOnSelect: false,
        templateType: 'popup'
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };

    $scope.openDatePickerTwo = function (val) {
      var ipObj1 = {
        callback: function (val) {  //Mandatory
          console.log('Return value from the datepicker modal is : ' + val, new Date(val));
          $scope.selectedDate2 = new Date(val);
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
        closeOnSelect: false,
        templateType: 'modal'
      };
      ionicDatePicker.openDatePicker(ipObj1);
    }
  })

  .controller('ChatsCtrl', function ($scope) {

  })

  .controller('AccountCtrl', function ($scope) {

  });
