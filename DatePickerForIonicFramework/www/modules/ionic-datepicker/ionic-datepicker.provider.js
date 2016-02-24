angular.module('ionic-datepicker.providers', [])

  .provider('ionicDatePiker', function () {

    this.initDatePicker = function () {
      console.log('initDatePicker');
    };

    this.$get = function ($rootScope, $ionicPopup) {

      var provider = {};
      var $scope = $rootScope.$new();

      provider.openDatePicker = function () {
        console.log('openDatePicker');
        $scope.date = new Date();

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          templateUrl: 'modules/ionic-datepicker/ionic-datepicker-popup.html',
          title: 'Enter Wi-Fi Password',
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
