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
