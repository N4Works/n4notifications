"use strict";

;
(function (ng) {
  ng
    .module('n4Notifications.models', [])
    .factory('N4NotificationModel', function () {
      var N4NotificationModel = function (notification) {
        this.message = null;
        this.primaryButtonText = null;
        this.secondaryButtonText = null;
        this.callback = null;

        angular.extend(this, notification);
      };

      return N4NotificationModel;
    });
}(angular))

"use strict";

;
(function (ng) {
  ng
    .module('n4Notifications', [
      'n4Notifications.directives',
      'n4Notifications.models',
      'n4Notifications.services'
    ])
}(angular))

"use strict";

;
(function (ng) {
  ng
    .module('n4Notifications.directives', ['n4Notifications.models', 'n4Notifications.services'])
    .run([
      '$templateCache',
      function ($templateCache) {
        $templateCache.put('success.html', [
          '<div class="notification success">',
          '  <div class="text" data-ng-bind="notification.message">',
          '  </div>',
          '  <div class="actions">',
          '    <a class="secondary" href="" data-ng-if="notification.secondaryButtonText" data-ng-bind="notification.secondaryButtonText" data-ng-click="notification.callback(notification.secondaryButtonText)"></a>',
          '    <a class="primary" href="" data-ng-bind="notification.primaryButtonText" data-ng-click="notification.callback(notification.primaryButtonText)"></a>',
          '  </div>',
          '</div>'
        ].join(''));

        $templateCache.put('alert.html', [
          '<div class="notification alert">',
          '  <div class="text" data-ng-bind="notification.message"></div>',
          '  <div class="actions">',
          '    <a class="secondary" href="" data-ng-if="notification.secondaryButtonText" data-ng-bind="notification.secondaryButtonText" data-ng-click="notification.callback(notification.secondaryButtonText)"></a>',
          '    <a class="primary" href="" data-ng-bind="notification.primaryButtonText" data-ng-click="notification.callback(notification.primaryButtonText)"></a>',
          '  </div>',
          '</div>'
        ].join(''));

        $templateCache.put('information.html', [
          '<div class="notification information">',
          '  <div class="text" data-ng-bind="notification.message">',
          '  </div>',
          '  <div class="actions">',
          '    <a class="primary" href="" data-ng-bind="notification.primaryButtonText" data-ng-click="notification.callback(notification.primaryButtonText)"></a>',
          '  </div>',
          '</div>'
        ].join(''));
      }
    ])
    .directive('n4Notification', [
      '$compile',
      '$templateCache',
      '$timeout',
      function ($compile, $templateCache) {
        return {
          restrict: 'E',
          replace: true,
          link: function (scope, element, attributes) {
            var $element = $compile($templateCache.get(attributes.template).trim())(scope);
            element.append($element);
          }
        };
      }])
    .directive('n4Notifications', [
      'n4NotificationsService',
      function (service) {
        return {
          restrict: 'E',
          replace: true,
          scope: {},
          template: [
            '<div class="notifications">',
            '  <n4-notification ng-attr-template="{{notification.template}}" data-ng-repeat="notification in service.notifications"></n4-notification>',
            '</div>'
          ].join(''),
          link: function (scope) {
            scope.service = service;
          }
        };
      }]);
}(angular))

"use strict";

;
(function (ng) {
  ng
    .module('n4Notifications.services', ['n4Notifications.models'])
    .service('n4NotificationsService', [
      'N4NotificationModel',
      '$q',
      '$timeout',
      function (N4NotificationModel, $q, $timeout) {
        var N4NotificationsService = function () {
          this.notifications = [];
        };

        N4NotificationsService.prototype = {
          notify: function (template, message, primaryButtonText, secondaryButtonText, callback) {
            var self = this,
              deferred = $q.defer(),
              notification = new N4NotificationModel({
                template: template,
                message: message,
                primaryButtonText: primaryButtonText,
                secondaryButtonText: secondaryButtonText,
                callback: function (selected) {
                  self.notifications.splice(self.notifications.indexOf(this), 1);

                  selected = selected || this.primaryButtonText;

                  if (!!callback) {
                    callback(selected);
                  }

                  deferred.resolve(selected);
                }
              });

            if (!secondaryButtonText) {
              $timeout(function () {
                notification.callback(primaryButtonText);
              }, 15000);
            }

            this.notifications.unshift(notification);

            return deferred.promise;
          },
          notifySuccess: function (message, primaryButtonText, secondaryButtonText, callback) {
            this.notify('success.html', message, primaryButtonText, secondaryButtonText, callback);
          },
          notifyInformation: function (message, primaryButtonText, callback) {
            this.notify('information.html', message, primaryButtonText, null, callback);
          },
          notifyAlert: function (message, primaryButtonText, secondaryButtonText, callback) {
            this.notify('alert.html', message, primaryButtonText, secondaryButtonText, callback);
          }
        };

        return new N4NotificationsService();
      }]);
}(angular))
