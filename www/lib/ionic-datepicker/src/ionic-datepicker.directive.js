//By Rajeshwar Patlolla - rajeshwar.patlolla@gmail.com
//https://github.com/rajeshwarpatlolla

(function () {
  'use strict';

  angular.module('ionic-datepicker')
    .directive('ionicDatepicker', IonicDatepicker);

  IonicDatepicker.$inject = ['$ionicPopup', '$ionicModal', 'IonicDatepickerService'];

  function IonicDatepicker($ionicPopup, $ionicModal, IonicDatepickerService) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        inputObj: "=inputObj"
      },
      link: function (scope, element, attrs) {

        scope.currentMonth = '';
        scope.currentYear = '';
        scope.disabledDates = [];
        scope.buttons = [];

        var datePickerPopup;
        var openDatePickerModal;
        var closeDatePickerModal;
        var ipDate;

        var inputObject = {
          titleLabel: scope.inputObj.titleLabel || 'Select Date',
          closeLabel: scope.inputObj.closeLabel || 'Close',
          todayLabel: scope.inputObj.todayLabel || 'Today',
          setLabel: scope.inputObj.setLabel || 'Set',
          setButtonType: scope.inputObj.setButtonType || 'button-stable',
          todayButtonType: scope.inputObj.todayButtonType || 'button-stable',
          closeButtonType: scope.inputObj.closeButtonType || 'button-stable',
          templateType: scope.inputObj.templateType || 'popup',
          modalHeaderColor: scope.inputObj.modalHeaderColor || 'bar-stable',
          modalFooterColor: scope.inputObj.modalFooterColor || 'bar-stable',
          mondayFirst: scope.inputObj.mondayFirst || false,
          disabledDates: scope.inputObj.disabledDates || [],
          showTodayButton: scope.inputObj.showTodayButton || true,
          dateFormat: scope.inputObj.dateFormat || 'dd-MMM-yyyy',
          closeOnSelect: scope.inputObj.closeOnSelect || false
        };

        angular.extend(scope.inputObj, inputObject);

        //Setting the months list. This is useful, if the component needs to use some other language.
        scope.monthsList = [];
        scope.weekNames = [];
        scope.yearsList = [];

        if (scope.inputObj.monthList && scope.inputObj.monthList.length === 12) {
          scope.monthsList = scope.inputObj.monthList;
        } else {
          scope.monthsList = IonicDatepickerService.monthsList;
        }
        if (scope.inputObj.weekDaysList && scope.inputObj.weekDaysList.length === 7) {
          scope.weekNames = scope.inputObj.weekDaysList;
        } else {
          scope.weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        }
        scope.yearsList = IonicDatepickerService.getYearsList(scope.inputObj.from, scope.inputObj.to);

        scope.enableDatesFrom = {epoch: 0, isSet: false};
        scope.enableDatesTo = {epoch: 0, isSet: false};

        //Setting the input date for the date picker
        if (scope.inputObj.inputDate) {
          ipDate = setZeros(scope.inputObj.inputDate);
        } else {
          ipDate = setZeros(new Date());
        }
        scope.selectedDateFull = ipDate;

        //Setting the disabled dates list.
        if (scope.inputObj.disabledDates && !scope.inputObj.disabledDates.length === 0) {
          angular.forEach(scope.inputObj.disabledDates, function (val, key) {
            val = setZeros(val);
            scope.disabledDates.push(val.getTime());
          });
        }

        var currentDate = setZeros(angular.copy(ipDate));
        scope.selctedDateString = currentDate.toString();
        scope.today = {};

        if (scope.inputObj.mondayFirst) {
          scope.weekNames.push(scope.weekNames.shift());
        }

        var tempToday = setZeros(new Date());

        scope.today = {
          dateObj: tempToday,
          date: tempToday.getDate(),
          month: tempToday.getMonth(),
          year: tempToday.getFullYear(),
          day: tempToday.getDay(),
          dateString: tempToday.toString(),
          epochLocal: tempToday.getTime(),
          epochUTC: (tempToday.getTime() + (tempToday.getTimezoneOffset() * 60 * 1000))
        };

        scope.buttons.push({
          text: scope.inputObj.closeLabel,
          type: scope.inputObj.closeButtonType,
          onTap: function () {
            scope.inputObj.callback(undefined);
          }
        });

        if (scope.inputObj.showTodayButton == true) {
          scope.buttons.push({
            text: scope.inputObj.todayLabel,
            type: scope.inputObj.todayButtonType,
            onTap: function (e) {
              todaySelected();
            }
          });
        }

        scope.buttons.push({
          text: scope.inputObj.setLabel,
          type: scope.inputObj.setButtonType,
          onTap: function () {
            dateSelected();
          }
        });

        //Setting the from and to dates - Function used to enable/disable the past/future dates
        var handleNextPrevButtons = function () {
          scope.prevMonthDisable = false;
          scope.nextMonthDisable = false;

          if (scope.inputObj.from) {
            scope.enableDatesFrom.isSet = true;
            scope.enableDatesFrom.epoch = scope.inputObj.from.getTime();
            if (scope.enableDatesFrom.epoch >= scope.currentMonthFirstDayEpoch) {
              scope.prevMonthDisable = true;
            }
          }

          if (scope.inputObj.to) {
            scope.enableDatesTo.isSet = true;
            scope.enableDatesTo.epoch = scope.inputObj.to.getTime();

            if (scope.enableDatesTo.epoch <= scope.currentMonthLastDayEpoch) {
              scope.nextMonthDisable = true;
            }
          }
        };

        function setZeros(ipDate) {
          ipDate.setHours(0);
          ipDate.setMinutes(0);
          ipDate.setSeconds(0);
          ipDate.setMilliseconds(0);
          return ipDate;
        }

        function makeDateObj(ipDateObj) {
          return {
            dateObj: ipDateObj,
            date: ipDateObj.getDate(),
            month: ipDateObj.getMonth(),
            year: ipDateObj.getFullYear(),
            day: ipDateObj.getDay(),
            dateString: ipDateObj.toString(),
            epochLocal: ipDateObj.getTime(),
            epochUTC: (ipDateObj.getTime() + (ipDateObj.getTimezoneOffset() * 60 * 1000))
          }
        }

        var isDateDisabled = function (date) {
          return ((scope.disabledDates.indexOf(date.getTime()) > -1) || (scope.enableDatesFrom.isSet && scope.enableDatesFrom.epoch > date.getTime()) || (scope.enableDatesTo.isSet && scope.enableDatesTo.epoch < date.getTime()));
        };

        var refreshDaysList = function (currentIpDate) {
          currentIpDate = angular.copy(setZeros(currentIpDate));
          scope.selctedDateString = (new Date(currentIpDate)).toString();

          var firstDay = new Date(currentIpDate.getFullYear(), currentIpDate.getMonth(), 1).getDate();
          var lastDay = new Date(currentIpDate.getFullYear(), currentIpDate.getMonth() + 1, 0).getDate();

          scope.currentMonthFirstDayEpoch = new Date(currentIpDate.getFullYear(), currentIpDate.getMonth(), firstDay).getTime();
          scope.currentMonthLastDayEpoch = new Date(currentIpDate.getFullYear(), currentIpDate.getMonth(), lastDay).getTime();
          handleNextPrevButtons();
          scope.dayList = [];

          for (var i = firstDay; i <= lastDay; i++) {
            var tempDate = new Date(currentIpDate.getFullYear(), currentIpDate.getMonth(), i);
            var dateDisabled = isDateDisabled(tempDate);
            var dateObj = makeDateObj(tempDate);
            dateObj.dateDisabled = dateDisabled;

            scope.dayList.push(dateObj);
            /*if (tempDate.getDate() == currentIpDate.getDate()) {
             scope.dateClicked(scope.dayList[scope.dayList.length - 1]);
             }*/
          }

          //To set Monday as the first day of the week.
          var firstDayMonday = scope.dayList[0].day - scope.inputObj.mondayFirst;
          firstDayMonday = (firstDayMonday < 0) ? 6 : firstDayMonday;

          for (var j = 0; j < firstDayMonday; j++) {
            scope.dayList.unshift({});
          }

          scope.rows = [0, 7, 14, 21, 28, 35];
          scope.cols = [0, 1, 2, 3, 4, 5, 6];

          scope.currentMonth = scope.monthsList[currentIpDate.getMonth()];
          scope.currentYear = currentIpDate.getFullYear();
          scope.currentMonthSelected = scope.currentMonth;
          scope.currentYearSelected = scope.currentYear;

          scope.numColumns = 7;
          //scope.rows.length = 6;
          //scope.cols.length = scope.numColumns;
          console.log(scope.dayList);
        };

        scope.monthChanged = function (month) {
          var monthNumber = scope.monthsList.indexOf(month);
          currentDate.setMonth(monthNumber);
          refreshDaysList(currentDate);
        };

        scope.yearChanged = function (year) {
          currentDate.setFullYear(year);
          refreshDaysList(currentDate);
        };

        scope.prevMonth = function () {
          if (currentDate.getMonth() === 1) {
            currentDate.setFullYear(currentDate.getFullYear());
          }
          currentDate.setMonth(currentDate.getMonth() - 1);

          scope.currentMonth = scope.monthsList[currentDate.getMonth()];
          scope.currentYear = currentDate.getFullYear();

          refreshDaysList(currentDate);
        };

        scope.nextMonth = function () {
          if (currentDate.getMonth() === 11) {
            currentDate.setFullYear(currentDate.getFullYear());
          }
          currentDate.setDate(1);
          currentDate.setMonth(currentDate.getMonth() + 1);
          scope.currentMonth = scope.monthsList[currentDate.getMonth()];
          scope.currentYear = currentDate.getFullYear();
          refreshDaysList(currentDate);
        };

        scope.dateSelection = {
          selected: true,
          selectedDate: '',
          submitted: false
        };
        scope.dateSelection.selectedDate = ipDate;

        scope.dateClicked = function (date) {
          if (!date || Object.keys(date).length === 0) return;
          scope.selctedDateString = date.dateString;
          scope.selctedDateStringCopy = angular.copy(scope.selctedDateString);
          scope.dateSelection.selected = true;
          scope.dateSelection.selectedDate = new Date(date.dateString);
          scope.selectedDateFull = scope.dateSelection.selectedDate;
        };

        var selectedInputDateObject = makeDateObj(ipDate);
        scope.dateClicked(selectedInputDateObject);

        //Called when the user clicks on any date.
        function dateSelected() {
          scope.dateSelection.submitted = true;
          if (scope.dateSelection.selected === true) {
            var outSideToFrom = false;
            if (scope.inputObj.from && scope.inputObj.from > scope.dateSelection.selectedDate) {
              outSideToFrom = true;
            }
            if (scope.inputObj.to && scope.inputObj.to < scope.dateSelection.selectedDate) {
              outSideToFrom = true;
            }
            if (outSideToFrom == true) {
              scope.inputObj.callback(undefined);
            } else {
              scope.inputObj.callback(scope.dateSelection.selectedDate);
            }
          }
          scope.selectedDateFull = scope.dateSelection.selectedDate;
          IonicDatepickerService.setLastSelectedDate(scope.selectedDateFull);
        }

        //Called when the user clicks on the 'Today' button
        function todaySelected() {
          var today = new Date();
          today = setZeros(today);

          var todayObj = makeDateObj(today);

          scope.selctedDateString = todayObj.dateString;
          scope.selctedDateStringCopy = angular.copy(scope.selctedDateString);
          scope.dateSelection.selected = true;
          scope.dateSelection.selectedDate = new Date(todayObj.dateString);
          scope.selectedDateFull = new Date();
          dateSelected();
        }

        //Called when the user clicks on the 'Close' button of the modal
        scope.closeIonicDatePickerModal = function () {
          scope.inputObj.callback(undefined);
          closeDatePickerModal();
        };

        //Called when the user clicks on the 'Today' button of the modal
        scope.setIonicDatePickerTodayDate = function () {
          todaySelected();
          closeDatePickerModal();
        };
        //Called when the user clicks on the Set' button of the modal
        scope.setIonicDatePickerDate = function () {
          dateSelected();
          closeDatePickerModal();
        };

        if (scope.inputObj.templateType.toLowerCase() === 'modal') {
          $ionicModal.fromTemplateUrl('lib/ionic-datepicker/src/ionic-datepicker-modal.html', {
            scope: scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            scope.modal = modal;
          });
          openDatePickerModal = function () {
            scope.modal.show();
          };
          closeDatePickerModal = function () {
            scope.modal.hide();
          };
        }

        function resetDateOnOpen() {
          if (IonicDatepickerService.getLastSelectedDate()) {
            scope.selectedDateFull = IonicDatepickerService.getLastSelectedDate();
            scope.selctedDateStringCopy = IonicDatepickerService.getLastSelectedDate().toString();
          } else {
            scope.selectedDateFull = ipDate;
            scope.selctedDateStringCopy = ipDate.toString;
          }
        }

        //Called when the user clicks on the button to invoke the 'ionic-datepicker'
        element.on("click", function () {
          //This code is added to set passed date from datepickerObject
          if (scope.inputObj.inputDate) {
            refreshDaysList(scope.inputObj.inputDate);
          } else if (scope.dateSelection.selectedDate) {
            refreshDaysList(scope.dateSelection.selectedDate);
          } else if (ipDate) {
            refreshDaysList(angular.copy(ipDate));
          } else {
            refreshDaysList(new Date());
          }
          if (scope.inputObj.templateType.toLowerCase() === 'modal') {
            //resetDateOnOpen();
            openDatePickerModal();
          } else {
            //resetDateOnOpen();
            //Getting the reference for the 'ionic-datepicker' popup.
            datePickerPopup = $ionicPopup.show({
              templateUrl: 'lib/ionic-datepicker/src/ionic-datepicker-popup.html',
              title: scope.inputObj.titleLabel,
              subTitle: '',
              cssClass: 'datepicker_body',
              scope: scope,
              buttons: scope.buttons
            });
          }
        });
      }
    };
  }

})();