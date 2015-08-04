"use strict";

;
(function (ng) {
  ng
    .module('n4Notifications.directives', ['n4Notifications.models', 'n4Notifications.services'])
    .directive('n4Notifications', [
      'n4NotificationsService',
      function (service) {
        return {
          restrict: 'E',
          replace: true,
          scope: {},
          template: [
            '<div class="notifications">',
            '  <div class="notification" ng-class="notification.type" ng-repeat="notification in service.notifications">',
            '    <div class="text" data-ng-bind="notification.message"></div>',
            '    <div class="actions">',
            '      <a class="secondary" href="" data-ng-if="notification.secondaryButtonText" data-ng-bind="notification.secondaryButtonText" data-ng-click="notification.callback(notification.secondaryButtonText)"></a>',
            '      <a class="primary" href="" data-ng-bind="notification.primaryButtonText" data-ng-click="notification.callback(notification.primaryButtonText)"></a>',
            '    </div>',
            '</div>',
            '</div>'
          ].join(''),
          link: function (scope) {
            scope.service = service;
          }
        };
      }]);
}(angular))
