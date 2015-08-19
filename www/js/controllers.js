angular.module('starter.controllers', [])

  .controller('DatePickerCtrl', function ($scope, $ionicPopup) {

    var disabledDates = [
      new Date(1437719836326),
      new Date(),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000) //UNIX format
    ];
    var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    $scope.datepickerObject = {
      titleLabel: 'Title',
      todayLabel: 'Today',
      closeLabel: 'Close',
      setLabel: 'Set',
      errorMsgLabel : 'Please select time.',
      setButtonType : 'button-assertive',
      inputDate: new Date(),
      mondayFirst: true,
      disabledDates:disabledDates,
      monthList:monthList,
      to: new Date(),
      callback: function (val) {
        datePickerCallback(val);
      }
    };

    var datePickerCallback = function (val) {
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
