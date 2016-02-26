angular.module('starter')

  .config(function (ionicDatePikerProvider) {
    var datePickerObj = {
      setLabel: 'Set2',
      todayLabel: 'Today2',
      closeLabel: 'Close2',
      mondayFirst: false,
      inputDate: new Date(),
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      showTodayButton: 'true',
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: []
    };

    ionicDatePikerProvider.configDatePicker(datePickerObj);
  });
