angular.module('ionicDatePicker', [])

  .directive('ionicDatePicker', function ($ionicPopup) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        ipDate: '=idate'
      },
      link: function (scope, element, attrs) {

        var monthsList = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"];

        scope.currentDate = angular.copy(scope.ipDate);
        scope.weekNames = ['S','M','T','W','T','F','S'];

        var refreshDateList = function () {
          var firstDay = new Date(scope.currentDate.getFullYear(), scope.currentDate.getMonth(), 1).getDate();
          var lastDay = new Date(scope.currentDate.getFullYear(), scope.currentDate.getMonth() + 1, 0).getDate();

          scope.dayList = [];

          for (var i = firstDay; i <= lastDay; i++) {
            var tempDate = new Date(scope.currentDate.getFullYear(), scope.currentDate.getMonth(), i);
            scope.dayList.push({date: tempDate.getDate(), month: tempDate.getMonth(), year: tempDate.getFullYear(), day: tempDate.getDay(), dateString: tempDate.toString(), epochLocal: tempDate.getTime(), epochUTC: (tempDate.getTime() + (tempDate.getTimezoneOffset() * 60 * 1000)) });
          }

          var firstDay = scope.dayList[0].day;

          for(var j = 0 ; j < firstDay ; j ++){
            scope.dayList.unshift({});
          }

          scope.rows = [];
          scope.cols = [];

          scope.currentMonth = monthsList[ scope.currentDate.getMonth() ];
          scope.currentYear = scope.currentDate.getFullYear();

          scope.numColumns = 7;
          scope.rows.length = 6;
          scope.cols.length = scope.numColumns;

        };


        refreshDateList();


        scope.prevMonth = function () {
          scope.currentDate.setMonth(scope.currentDate.getMonth() - 1);

          if (scope.currentDate.getMonth() === 0) {
            scope.currentDate.setFullYear(scope.currentDate.getFullYear() - 1);
          }

          scope.currentMonth = monthsList[ scope.currentDate.getMonth() ];
          scope.currentYear = scope.currentDate.getFullYear();

          refreshDateList(scope.currentDate)
        };

        scope.nextMonth = function () {
          scope.currentDate.setMonth(scope.currentDate.getMonth() + 1);

          if (scope.currentDate.getMonth() === 12) {
            scope.currentDate.setFullYear(scope.currentDate.getFullYear() + 1);
          }

          scope.currentMonth = monthsList[ scope.currentDate.getMonth() ];
          scope.currentYear = scope.currentDate.getFullYear();

          refreshDateList(scope.currentDate)
        };

        scope.dateSelected = function(date){
          scope.currentDate = new Date(date.dateString);
          console.log(scope.currentDate);
        };

        element.on("click", function () {
          $ionicPopup.show({
            templateUrl: 'templates/date-picker.html',
            title: '<strong>Select Date</strong>',
            subTitle: '',
            scope: scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: 'Set',
                type: 'button-positive',
                onTap: function (e) {

                  scope.ipDate = angular.copy(scope.currentDate);

                }
              }
            ]
          })
        })
      }
    }
  });