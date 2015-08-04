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
          notify: function (type, message, primaryButtonText, secondaryButtonText, callback) {
            var self = this,
              timeout,
              deferred = $q.defer(),
              notification = new N4NotificationModel({
                type: type,
                message: message,
                primaryButtonText: primaryButtonText,
                secondaryButtonText: secondaryButtonText,
                callback: function (selected) {
                  $timeout.cancel(timeout);

                  self.notifications.splice(self.notifications.indexOf(this), 1);

                  selected = selected || this.primaryButtonText;

                  deferred.resolve(selected);

                  if (!!callback) {
                    callback(selected);
                  }
                }
              });

            if (!secondaryButtonText) {
              timeout = $timeout(function () {
                notification.callback(primaryButtonText);
              }, 15000);
            }

            this.notifications.unshift(notification);

            return deferred.promise;
          },
          notifySuccess: function (message, primaryButtonText, secondaryButtonText, callback) {
            return this.notify('success', message, primaryButtonText, secondaryButtonText, callback);
          },
          notifyInformation: function (message, primaryButtonText, callback) {
            return this.notify('information', message, primaryButtonText, null, callback);
          },
          notifyAlert: function (message, primaryButtonText, secondaryButtonText, callback) {
            return this.notify('alert', message, primaryButtonText, secondaryButtonText, callback);
          }
        };

        return new N4NotificationsService();
      }]);
}(angular))
