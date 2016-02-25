angular.module('ionic-datepicker.providers', [])

  .provider('ionicDatePiker', function () {

    var config = {
      titleLabel: 'Select Date',
      todayLabel: 'Today',
      closeLabel: 'Close',
      setLabel: 'Set',
      setButtonType: 'button-assertive',
      todayButtonType: 'button-assertive',
      closeButtonType: 'button-assertive',
      inputDate: new Date(),
      mondayFirst: true,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      showTodayButton: 'true',
      closeOnSelect: false
    };

    this.configDatePicker = function (inputObj) {
      angular.extend(config, inputObj);
    };

    this.$get = function ($rootScope, $ionicPopup, IonicDatepickerService) {

      var provider = {};
      var $scope = $rootScope.$new();
      $scope.today = new Date();

      //Reset the hours, minutes, seconds and milli seconds
      provider.resetHMSM = function (currentDate) {
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        return currentDate;
      };

      $scope.today = provider.resetHMSM($scope.today).getTime();

      $scope.prevMonth = function () {
        console.log('prevMonth');
        if ($scope.currentDate.getMonth() === 1) {
          $scope.currentDate.setFullYear($scope.currentDate.getFullYear());
        }
        $scope.currentDate.setMonth($scope.currentDate.getMonth() - 1);

        $scope.currentMonth = $scope.mainObj.monthsList[$scope.currentDate.getMonth()];
        $scope.currentYear = $scope.currentDate.getFullYear();

        provider.refreshDateList($scope.currentDate);
      };

      $scope.nextMonth = function () {
        if ($scope.currentDate.getMonth() === 11) {
          $scope.currentDate.setFullYear($scope.currentDate.getFullYear());
        }
        $scope.currentDate.setDate(1);
        $scope.currentDate.setMonth($scope.currentDate.getMonth() + 1);
        $scope.currentMonth = $scope.mainObj.monthsList[$scope.currentDate.getMonth()];
        $scope.currentYear = $scope.currentDate.getFullYear();
        provider.refreshDateList($scope.currentDate);
      };

      $scope.dateSelected = function (selectedDate) {
        console.log(selectedDate);
        if (!selectedDate || Object.keys(selectedDate).length === 0) return;
        $scope.selctedDateEpoch = selectedDate.epoch;
      };

      //Refresh the list of the dates of a month
      provider.refreshDateList = function (currentDate) {
        currentDate = provider.resetHMSM(currentDate);
        $scope.currentDate = angular.copy(currentDate);

        var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
        var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        $scope.monthsList = [];
        if ($scope.mainObj.monthsList && $scope.mainObj.monthsList.length === 12) {
          $scope.monthsList = $scope.mainObj.monthsList;
        } else {
          $scope.monthsList = IonicDatepickerService.monthsList;
        }
        if ($scope.mainObj.weeksList && $scope.mainObj.weeksList.length === 7) {
          $scope.weeksList = $scope.mainObj.weeksList;
        } else {
          $scope.weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
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
        console.log($scope.dayList);

        if ($scope.mainObj.mondayFirst === true) {
          var lastWeekDay = $scope.mainObj.weeksList.shift();
          $scope.mainObj.weeksList.push(lastWeekDay);
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
      };

      provider.openDatePicker = function (ipObj) {
        $scope.mainObj = {};
        angular.extend($scope.mainObj, config, ipObj);
        console.log('openDatePicker', $scope.mainObj);

        $scope.date = new Date();
        $scope.selctedDateEpoch = $scope.mainObj.inputDate;
        provider.refreshDateList($scope.mainObj.inputDate);

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          templateUrl: 'modules/ionic-datepicker/ionic-datepicker-popup.html',
          title: $scope.mainObj.titleLabel,
          //subTitle: 'Please use normal things',
          scope: $scope,
          cssClass: 'ionic_datepicker',
          buttons: [
            {
              text: 'Set',
              onTap: function (e) {

              }
            },
            {
              text: 'Today',
              onTap: function (e) {

              }
            },
            {
              text: 'Close',
              onTap: function (e) {

              }
            }
          ]
        });

        myPopup.then(function (res) {
          console.log('Tapped!', res);
        });

      };

      return provider;

    };

  });
