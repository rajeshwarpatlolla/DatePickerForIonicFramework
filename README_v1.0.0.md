[![bitHound Score](https://www.bithound.io/github/rajeshwarpatlolla/ionic-datepicker/badges/score.svg)](https://www.bithound.io/github/rajeshwarpatlolla/ionic-datepicker)

##Introduction:

This is an `ionic-datepicker` bower component, which can be used in any Ionic framework's application. No additional plugins required for this component.

[View Demo](http://rajeshwarpatlolla.github.io/DatePickerForIonicFramework/demo/ "Demo")

##Prerequisites.

* node.js
* npm
* bower
* gulp

##How to use:

1) In your project repository install the ionic-datepicker using bower

`bower install ionic-datepicker --save`

This will install the latest version released.

2) Give the path of  `ionic-datepicker.bundle.min.js` in your `index.html` file.

````html
<!-- path to ionic/angularjs -->
<script src="lib/ionic-datepicker/dist/ionic-datepicker.bundle.min.js"></script>
````

3) In your application module inject the dependency `ionic-datepicker`, in order to work with the ionic time picker
````javascript
angular.module('mainModuleName', ['ionic', 'ionic-datepicker']){
//
}
````

4) You can configure this date picker at the application level in the config method using the `ionicDatePicker` provider.
Your config method may look like this if you wish to setup the configuration. But this is not mandatory step.

````javascript
.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1)
      to: new Date(2018, 8, 1)
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [6],
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
````
 In the above code i am not configuring all the properties, but you can configure as many as you can.
 
The properties you can configure are as follows.

**a) inputDate**(Optional) : This is the date object we can pass to the component. You can give any date object to this property. Default value is `new Date()`.

**b) setLabel**(Optional) : The label for `Set` button. Default value is `Set`

**c) todayLabel**(Optional) : The label for `Today` button. Default value is `Today`

**d) closeLabel**(Optional) : The label for `Close` button. Default value is `Close`

**e) mondayFirst**(Optional) : Set `true` if you wish to show monday as the first day. Default value is `false`, which will show Sunday as the first day of the week.

**f) weeksList**(Optional) : This is an array with a list of all week days. You can use this if you want to show months in some other language or format or if you wish to use the modal instead of the popup for this component, you can define the `weekDaysList` array in your controller as shown below.
````javascript
  ["Sun", "Mon", "Tue", "Wed", "thu", "Fri", "Sat"];
````
 The default values are
````javascript
  ["S", "M", "T", "W", "T", "F", "S"];
````

**g) monthsList**(Optional) : This is an array with a list of all months. You can use this if you want to show months in some other language or format. You can create an array like below.
````javascript
  ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
````
 The default values are
````javascript
  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
````

**h) disabledDates**(Optional) : If you have a list of dates to disable, you can create an array like below. Default value is an empty array.
````javascript
  var disabledDates = [
      new Date(1437719836326),
      new Date(),
      new Date(2016, 7, 10), //Months are 0-based, this is August, 10th.
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000) //UNIX format
  ];
````

**i) templateType**(Optional) : This is string type which takes two values i.e. `modal` or `popup`. Default value is `modal`. If you wish to open in a popup, you can specify the value as `popup` or else you can ignore it.

**j) from**(Optional) : This is a date object, from which you wish to enable the dates. You can use this property to disable **previous dates** by specifying `from: new Date()`. By default all the dates are enabled. Please note that months are 0 based.

**k) to**(Optional) : This is a date object, to which you wish to enable the dates. You can use this property to disable **future dates** by specifying `to: new Date()`. By default all the dates are enabled. Please note that months are 0 based.

**l) dateFormat**(Optional) : This is date format used in template. Defaults to `dd-MM-yyyy`. For how to format date, see: http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15

**m) closeOnSelect**(Optional) : Boolean to indicate wheteher datepicker will be closed after date selection. If set to `true`, "Set" button will be hidden. Defaults to `false`.

**n) disableWeekdays**(Optional) : Accespts array of numbers starting from 0(Sunday) to 6(Saturday). If you specify any values for this array, then it will disable that week day in the whole calendar. For example if you pass [0,6], then all the Sundays and Saturdays will be disabled.

5) Inject `ionicDatePicker` in the controller, where you wish to use this component. Then using the below method you can call the datepicker.
````javascript
ionicDatePicker.openDatePicker(ipObj1);
````
The object you are passing to the above method could be as shown below.

````javascript
var ipObj1 = {
        callback: function (val) {  //Mandatory
          console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        },
        disabledDates: [
          new Date(2016, 2, 16),
          new Date(2015, 3, 16),
          new Date(2015, 4, 16),
          new Date(2015, 5, 16),
          new Date('Wednesday, August 12, 2015'),
          new Date("08-16-2016"),
          new Date(1439676000000)
        ],
        from: new Date(2012, 1, 1),
        to: new Date(2016, 10, 30),
        inputDate: new Date(),
        mondayFirst: true,
        disableWeekdays: [0],
        closeOnSelect: false,
        templateType: 'popup'
      };
````
    
Apart from the config method, if you again set any of the properties, they will be overriden. So please cross check with the config method you have set, while setting the variables at the config method as well as in the controller.
    
In all the above steps the only mandatory thing is the callback where you will receive the selected date value.
    
    
##Screen Shots:

Once you are successfully done with the above steps, you should be able to see the below screen shots.
I have used two buttons here.

The first screen shot shows only the buttons before clicking on them.
Once you click on the button you should see the second screen shot.

<img src="https://lh3.googleusercontent.com/IeNOa_UmMpRhWCP4Hl2Cc4ZO1YuwNAd4vmKBYzsX2FY=w434-h678-no" width="300" height="450" />
<img src="https://lh3.googleusercontent.com/IGjqpsiPj1_92DTiW2oJcSvBTdp93PGOYEk4VzQiABg=w442-h678-no" width="300" height="450" />


##CSS Classes:

<img src="https://lh3.googleusercontent.com/tX9IyFN9w3GigHnltCJCdSj1Df5OjDDqxPXmNr7oAdQ=w423-h634-no" width="300" height="450" />

#### 1) ionic_datepicker_modal_content
#### 2) selected_date_full
#### 3) left_arrow
#### 4) drop_down
#### 5) month_dropdown
#### 6) year_dropdown
#### 7) right_arrow
#### 8) date_col
#### 9) date_selected
#### 10) calendar_grid


    
    
    
##Versions:

### 1) v0.1.0
The whole date picker functionality has been implemented, and can be installed with  `bower install ionic-datepicker --save`

### 2) v0.1.1
Bug Fix. This is the latest version of `ionic-datepicker` component.

### 3) v0.1.2
Bug Fix. If we don't pass the date to the time picker it will pick the todays date by default.

### 4) v0.1.3
[Bug Fix](http://forum.ionicframework.com/t/ionic-datepicker-bower-component-for-ionic-framework-applications/21516/14)

### 5) v0.2.0
Disabling previous dates functionality added.

### 6) v0.3.0
a) User can select the years and months using the dropdown.

b) A callback function is added.

### 7) v0.4.0

**Features**

a) Disabling future dates functionality added. You may use it for selecting DOB.

b) Customised title text for datepicker modal's added.

**BugFixes**

[Bug#22](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/22),
[Bug#26](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/26),
[Bug#29](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/29)

### 8) v0.5.0

a) Feature for disabling particular dates has been added.

b) CSS classes added for customisation.

### 9) v0.6.0

a) Date selection color issue fixed.

b) Added feature to show Monday as the first day of the week.

### 10) v0.7.0

**Features**

a) `From` and `to` dates functionality added.

b) Code re-structuring.

c) Updated node modules.

**BugFixes**

[Bug#58](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/58),
[Bug#56](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/56),
[Bug#54](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/54),
[Bug#42](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/42),
[Bug#37](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/37),
[Bug#28](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/28)

### 11) v0.8.0

**Feature**

You can use either a popup or a modal for this `ionic-datepicker`.

**BugFix**

[Bug#59](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/59)

### 12) v0.9.0

**Feature**

You can give your custom week names.

**BugFix**

[Bug#63](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/63)

### 13) v1.0.0

**Features**

a) You can configure the ionic datepicker from the config method.

b) You can invoke the datepicker from the controller.


**BugFixes**

[Bug#101](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/101),
[Bug#112](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/112),
[Bug#114](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/114),
[Bug#116](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/116),
[Bug#117](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/117),
[Bug#119](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/119),
[Bug#120](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/120),
[Bug#128](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/128),
[Bug#133](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/133),
[Bug#140](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/140),
[Bug#145](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/145),
[Bug#146](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/146),
[Bug#151](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/151),
[Bug#154](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/154),
[Bug#161](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/161),
[Bug#163](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/163),
[Bug#166](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/166),
[Bug#168](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/168),
[Bug#171](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/171)


##License:
[MIT](https://github.com/rajeshwarpatlolla/ionic-datepicker/blob/master/LICENSE.MD "MIT")

##Contact:
Gmail : rajeshwar.patlolla@gmail.com

Github : https://github.com/rajeshwarpatlolla

Twitter : https://twitter.com/rajeshwar_9032

Facebook : https://www.facebook.com/rajeshwarpatlolla

Paypal : rajeshwar.patlolla@gmail.com

Comment or Rate it : http://market.ionic.io/plugins/ionicdatepicker