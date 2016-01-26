;
(function(ng) {
  "use strict";

  ng
    .module("n4Notifications.models", [])
    .factory("N4NotificationModel", function() {
      var N4NotificationModel = function(notification) {
        this.type = "information";
        this.message = null;
        this.primaryButtonText = null;
        this.secondaryButtonText = null;
        this.callback = null;

        angular.extend(this, notification);
      };

      return N4NotificationModel;
    });
}(angular));

;
(function(ng) {
  "use strict";

  ng
    .module("n4Notifications", [
      "n4Notifications.directives",
      "n4Notifications.models",
      "n4Notifications.services"
    ])
}(angular));

;
(function(ng) {
  "use strict";

  ng
    .module("n4Notifications.directives", ["n4Notifications.models", "n4Notifications.services"])
    .directive("n4Notifications", [
      "n4NotificationsService",
      function(service) {
        return {
          restrict: "E",
          replace: true,
          scope: {},
          template: [
            "<div class=\"notifications\">",
            "  <div class=\"notification\" ng-class=\"notification.type\" ng-repeat=\"notification in service.notifications\">",
            "    <div class=\"text\" data-ng-bind=\"notification.message\"></div>",
            "    <div class=\"actions\">",
            "      <a class=\"secondary\" href=\"\" data-ng-if=\"notification.secondaryButtonText\" data-ng-bind=\"notification.secondaryButtonText\" data-ng-click=\"notification.callback(notification.secondaryButtonText)\"></a>",
            "      <a class=\"primary\" href=\"\" data-ng-bind=\"notification.primaryButtonText\" data-ng-click=\"notification.callback(notification.primaryButtonText)\"></a>",
            "    </div>",
            "</div>",
            "</div>"
          ].join(""),
          link: function(scope) {
            scope.service = service;
          }
        };
      }
    ]);
}(angular));

;
(function(ng) {
  "use strict";

  ng
    .module("n4Notifications.services", ["n4Notifications.models"])
    .service("n4NotificationsService", [
      "N4NotificationModel",
      "$q",
      "$timeout",
      function(N4NotificationModel, $q, $timeout) {
        var N4NotificationsService = function() {
          this.notifications = [];
        };

        N4NotificationsService.prototype = {
          notify: function(type, message, primaryButtonText, secondaryButtonText, callback) {
            var self = this,
              timeout,
              deferred = $q.defer(),
              notification = new N4NotificationModel({
                type: type,
                message: message,
                primaryButtonText: primaryButtonText,
                secondaryButtonText: secondaryButtonText,
                callback: function(selected) {
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
              timeout = $timeout(function() {
                notification.callback(primaryButtonText);
              }, 15000);
            }

            this.notifications.unshift(notification);

            return deferred.promise;
          },
          notifySuccess: function(message, primaryButtonText, secondaryButtonText, callback) {
            return this.notify("success", message, primaryButtonText, secondaryButtonText, callback);
          },
          notifyInformation: function(message, primaryButtonText, callback) {
            return this.notify("information", message, primaryButtonText, null, callback);
          },
          notifyAlert: function(message, primaryButtonText, secondaryButtonText, callback) {
            return this.notify("alert", message, primaryButtonText, secondaryButtonText, callback);
          }
        };

        return new N4NotificationsService();
      }
    ]);
}(angular));
