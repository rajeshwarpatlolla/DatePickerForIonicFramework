angular.module('starter.controllers', [])

  .controller('DatePickerCtrl', function ($scope, $ionicPopup) {

    var disabledDates = [
      new Date(1437719836326),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000), //UNIX format
      new Date(),
      new Date(2015, 10, 8)
    ];
    var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    $scope.datepickerObject = {};
    $scope.datepickerObject.inputDate = new Date();

    $scope.datepickerObjectModal = {
      todayLabel: 'Today', //Optional
      closeLabel: 'Close', //Optional
      setLabel: 'Set', //Optional
      setButtonType: 'button-assertive', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      templateType: 'modal', //Optional
      inputDate: $scope.datepickerObject.inputDate, //Optional
      mondayFirst: true, //Optional
      disabledDates: disabledDates, //Optional
      monthList: monthList, //Optional
      from: new Date(2015, 9, 31), //Optional
      to: new Date(2015, 10, 21), //Optional
      callback: function (val) { //Optional
        datePickerCallbackModal(val);
      }
    };
    $scope.datepickerObjectPopup = {
      titleLabel: 'Ionic-Datepicker', //Optional
      todayLabel: 'Today', //Optional
      closeLabel: 'Close', //Optional
      setLabel: 'Set', //Optional
      errorMsgLabel: 'Please select time.', //Optional
      setButtonType: 'button-assertive', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      templateType: 'popup', //Optional
      inputDate: $scope.datepickerObject.inputDate, //Optional
      mondayFirst: false, //Optional
      disabledDates: disabledDates, //Optional
      monthList: monthList, //Optional
      from: new Date(2015, 9, 1), //Optional
      callback: function (val) { //Optional
        datePickerCallbackPopup(val);
      }
    };

    var datePickerCallbackModal = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        $scope.datepickerObjectModal.inputDate = val;
        console.log('Selected date is : ', val)
      }
    };

    var datePickerCallbackPopup = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        $scope.datepickerObjectPopup.inputDate = val;
        console.log('Selected date is : ', val)
      }
    };

  })

  .controller('ContactCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
