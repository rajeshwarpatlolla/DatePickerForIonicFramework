angular.module('starter')

  .config(function (ionicDatePikerProvider) {
    var datePickerObj = {
      titleLabel: 'Title',
      todayLabel: 'Today',
      closeLabel: 'Close',
      setLabel: 'Set',
      setButtonType: 'button-assertive',
      todayButtonType: 'button-assertive',
      closeButtonType: 'button-assertive',
      mondayFirst: false,
      inputDate: new Date(),
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      showTodayButton: 'true',
      modalHeaderColor: 'bar-positive',
      modalFooterColor: 'bar-positive',
      dateFormat: 'dd-MMM-yyyy',
      closeOnSelect: false
    };

    ionicDatePikerProvider.configDatePicker(datePickerObj);
  });
