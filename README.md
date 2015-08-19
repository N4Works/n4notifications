# n4Notifications
[![Build Status](https://secure.travis-ci.org/N4Works/n4notifications.png?branch=master)](https://travis-ci.org/N4Works/n4notifications)
[![Coverage Status](https://coveralls.io/repos/N4Works/n4notifications/badge.svg?branch=master&service=github)](https://coveralls.io/r/N4Works/n4notifications/?branch=master)

## about

  A simple module to notifies user with messages.

## how to install

```
bower install n4-notifications-directive --save
```

## how to use

Add the directive element in your HTML body

```
<n4-notifications></n4-notifications>
```

Remember to inject the dependency in your module.

```
angular.module('yourModule', ['n4Notifications']);
```

In your controller, you just need to use a service.

```
angular.module('sample', ['ngAnimate','n4Notifications'])
    .controller('rootController', function (n4NotificationsService) {
      this.notify = function () {
        n4NotificationsService.notifyInformation('Test', 'Ok');
        n4NotificationsService.notifyAlert('Test', 'Ok');
        n4NotificationsService.notifySuccess('Test', 'Ok', 'Undo', function (selector) {
          console.log(selector + ' -> callback');
        }).then(function (selector) {
            console.log(selector + ' -> promise');
          });
      }
    });
```

- notifySuccess: first parameter is the message, second is the text for primary button, third, text for secondary button, callback method, where the argument is the text of the chosen button.
- notifyAlert: first parameter is the message, second is the text for primary button, third, text for secondary button, callback method, where the argument is the text of the chosen button.
- notifyInformation: first parameter is the message, second is the text for the button, and third is the callback method.
- Every method returns a promise, so, you don't have to use the callback method.
- Messages with one option, would be visible just for 15 seconds.

##LICENSE

MIT
