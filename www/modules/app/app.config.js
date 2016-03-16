angular.module('starter')

  .config(function (ionicDatePickerProvider) {

    var datePickerObj = {
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      inputDate: new Date(),
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      showTodayButton: true,
      dateFormat: 'dd MMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [6],
      from: new Date(2015, 8, 1)
    };

    ionicDatePickerProvider.configDatePicker(datePickerObj);

  });
