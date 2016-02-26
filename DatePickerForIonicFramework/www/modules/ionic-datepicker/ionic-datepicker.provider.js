angular.module('ionic-datepicker.providers', [])

  .provider('ionicDatePiker', function () {

    var config = {
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),
      mondayFirst: true,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      showTodayButton: 'true',
      closeOnSelect: false,
      disableWeekdays: []
    };

    this.configDatePicker = function (inputObj) {
      angular.extend(config, inputObj);
    };

    this.$get = function ($rootScope, $ionicPopup, IonicDatepickerService) {

      var provider = {};
      var $scope = $rootScope.$new();
      $scope.today = new Date();

      $scope.disabledDates = [];

      //Reset the hours, minutes, seconds and milli seconds
      function resetHMSM(currentDate) {
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        return currentDate;
      }

      $scope.today = resetHMSM($scope.today).getTime();

      //Previous month
      $scope.prevMonth = function () {
        if ($scope.currentDate.getMonth() === 1) {
          $scope.currentDate.setFullYear($scope.currentDate.getFullYear());
        }
        $scope.currentDate.setMonth($scope.currentDate.getMonth() - 1);

        $scope.currentMonth = $scope.mainObj.monthsList[$scope.currentDate.getMonth()];
        $scope.currentYear = $scope.currentDate.getFullYear();

        refreshDateList($scope.currentDate);
      };

      //Next month
      $scope.nextMonth = function () {
        if ($scope.currentDate.getMonth() === 11) {
          $scope.currentDate.setFullYear($scope.currentDate.getFullYear());
        }
        $scope.currentDate.setDate(1);
        $scope.currentDate.setMonth($scope.currentDate.getMonth() + 1);
        $scope.currentMonth = $scope.mainObj.monthsList[$scope.currentDate.getMonth()];
        $scope.currentYear = $scope.currentDate.getFullYear();
        refreshDateList($scope.currentDate);
      };

      //Date selected
      $scope.dateSelected = function (selectedDate) {
        if (!selectedDate || Object.keys(selectedDate).length === 0) return;
        $scope.selctedDateEpoch = selectedDate.epoch;
      };

      //Setting the disabled dates list.
      function setDisabledDates(mainObj) {
        if (mainObj.disabledDates && mainObj.disabledDates.length === 0) {
          $scope.disabledDates = [];
        } else {
          angular.forEach(mainObj.disabledDates, function (val, key) {
            val = resetHMSM(new Date(val));
            $scope.disabledDates.push(val.getTime());
          });
        }
      }

      //Refresh the list of the dates of a month
      function refreshDateList(currentDate) {
        currentDate = resetHMSM(currentDate);
        $scope.currentDate = angular.copy(currentDate);

        var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
        var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        $scope.monthsList = [];
        if ($scope.mainObj.monthsList && $scope.mainObj.monthsList.length === 12) {
          $scope.monthsList = $scope.mainObj.monthsList;
        } else {
          $scope.monthsList = IonicDatepickerService.monthsList;
        }

        $scope.yearsList = IonicDatepickerService.getYearsList($scope.mainObj.from, $scope.mainObj.to);

        $scope.dayList = [];

        for (var i = firstDay; i <= lastDay; i++) {
          var tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
          $scope.dayList.push({
            date: tempDate.getDate(),
            month: tempDate.getMonth(),
            year: tempDate.getFullYear(),
            day: tempDate.getDay(),
            epoch: tempDate.getTime()
          });
        }

        //To set Monday as the first day of the week.
        var firstDayMonday = $scope.dayList[0].day - $scope.mainObj.mondayFirst;
        firstDayMonday = (firstDayMonday < 0) ? 6 : firstDayMonday;

        for (var j = 0; j < firstDayMonday; j++) {
          $scope.dayList.unshift({});
        }

        $scope.rows = [0, 7, 14, 21, 28, 35];
        $scope.cols = [0, 1, 2, 3, 4, 5, 6];

        $scope.currentMonth = $scope.mainObj.monthsList[currentDate.getMonth()];
        $scope.currentYear = currentDate.getFullYear();
        $scope.currentMonthSelected = $scope.currentMonth;
        $scope.currentYearSelected = $scope.currentYear;
        $scope.numColumns = 7;
      }

      //Month changed
      $scope.monthChanged = function (month) {
        var monthNumber = $scope.monthsList.indexOf(month);
        $scope.currentDate.setMonth(monthNumber);
        refreshDateList($scope.currentDate);
      };

      //Year changed
      $scope.yearChanged = function (year) {
        $scope.currentDate.setFullYear(year);
        refreshDateList($scope.currentDate);
      };

      function setInitialObj(ipObj) {
        var mainObj = {};
        angular.extend(mainObj, config, ipObj);
        $scope.mainObj = angular.copy(mainObj);

        $scope.selctedDateEpoch = resetHMSM($scope.mainObj.inputDate).getTime();

        if ($scope.mainObj.weeksList && $scope.mainObj.weeksList.length === 7) {
          $scope.weeksList = $scope.mainObj.weeksList;
        } else {
          $scope.weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        }
        if ($scope.mainObj.mondayFirst === true) {
          var lastWeekDay = $scope.mainObj.weeksList.shift();
          $scope.weeksList.push(lastWeekDay);
        }
        $scope.disableWeekdays = $scope.mainObj.disableWeekdays;

        refreshDateList($scope.mainObj.inputDate);
        setDisabledDates($scope.mainObj);
      }

      //Open datepicker popup
      provider.openDatePicker = function (ipObj) {
        var ipObj = angular.copy(ipObj);
        setInitialObj(ipObj);

        var myPopup = $ionicPopup.show({
          templateUrl: 'modules/ionic-datepicker/ionic-datepicker-popup.html',
          //title: $scope.mainObj.titleLabel,
          //subTitle: 'Please use normal things',
          scope: $scope,
          cssClass: 'ionic_datepicker',
          buttons: [
            {
              text: $scope.mainObj.setLabel,
              //type: $scope.mainObj.setButtonType,
              onTap: function (e) {
                $scope.mainObj.callback($scope.selctedDateEpoch);
              }
            },
            {
              text: $scope.mainObj.todayLabel,
              //type: $scope.mainObj.todayButtonType,
              onTap: function (e) {
                var today = new Date();
                refreshDateList(new Date());
                $scope.selctedDateEpoch = resetHMSM(today).getTime();
                e.preventDefault();
              }
            },
            {
              text: $scope.mainObj.closeLabel,
              //type: $scope.mainObj.closeButtonType,
              onTap: function (e) {
                $scope.mainObj.callback(undefined);
              }
            }
          ]
        });

        myPopup.then(function (res) {
          console.log('Closed', res);
        });
      };

      return provider;

    };

  });
