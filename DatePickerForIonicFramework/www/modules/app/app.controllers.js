angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, ionicDatePiker) {

    $scope.openDatePicker = function () {
      var ipObj = {
        callback: function (val) {  //Mandatory
          console.log('Return value from the datepicker is : ' + val, new Date(val));
        },
        disabledDates: [
          new Date(1437719836326),
          new Date(),
          new Date(2015, 7, 10),
          new Date('Wednesday, August 12, 2015'),
          new Date("08-14-2015"),
          new Date(1439676000000)
        ],
        from: new Date(2012, 8, 2),
        to: new Date(2018, 8, 25),
        inputDate: new Date()
      };
      ionicDatePiker.openDatePicker(ipObj);
    };

  })

  .controller('ChatsCtrl', function ($scope) {

  })

  .controller('AccountCtrl', function ($scope) {

  });
