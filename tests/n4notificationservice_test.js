'use strict';

describe('n4Notifications.services', function () {
  var timeout, scope, service;

  beforeEach(module('n4Notifications.services'));

  beforeEach(inject(function ($timeout, $rootScope, n4NotificationsService) {
    timeout = $timeout;
    scope = $rootScope;
    service = n4NotificationsService;
  }));

  describe('Creation', function () {
    it('Should have the right props for the instance', function () {
      expect(angular.equals(service.notifications, [])).toBeTruthy();
    });
  });

  describe('Functionality', function () {
    it('Should be able to notify success', function () {
      expect(service.notifications.length).toBe(0);
      service.notifySuccess('message', 'primaryButton', 'secondaryButton', null);

      expect(service.notifications.length).toBe(1);
      var notification = service.notifications[0];
      expect(notification).toBeDefined();
      expect(notification.type).toBe('success');
      expect(notification.message).toBe('message');
      expect(notification.primaryButtonText).toBe('primaryButton');
      expect(notification.secondaryButtonText).toBe('secondaryButton');
      expect(notification.callback).toBeDefined();
    });

    it('Should be able to notify information', function () {
      expect(service.notifications.length).toBe(0);
      service.notifyInformation('message', 'primaryButton', null);

      expect(service.notifications.length).toBe(1);
      var notification = service.notifications[0];
      expect(notification).toBeDefined();
      expect(notification.type).toBe('information');
      expect(notification.message).toBe('message');
      expect(notification.primaryButtonText).toBe('primaryButton');
      expect(notification.secondaryButtonText).toBe(null);
      expect(notification.callback).toBeDefined();
    });

    it('Should be able to notify alert', function () {
      expect(service.notifications.length).toBe(0);
      service.notifyAlert('message', 'primaryButton', 'secondaryButton', null);

      expect(service.notifications.length).toBe(1);
      var notification = service.notifications[0];
      expect(notification).toBeDefined();
      expect(notification.type).toBe('alert');
      expect(notification.message).toBe('message');
      expect(notification.primaryButtonText).toBe('primaryButton');
      expect(notification.secondaryButtonText).toBe('secondaryButton');
      expect(notification.callback).toBeDefined();
    });

    it('Should be able to notify choosing manually the type', function () {
      expect(service.notifications.length).toBe(0);
      service.notify('success', 'message', 'primaryButton', 'secondaryButton', null);

      expect(service.notifications.length).toBe(1);
      var notification = service.notifications[0];
      expect(notification).toBeDefined();
      expect(notification.type).toBe('success');
      expect(notification.message).toBe('message');
      expect(notification.primaryButtonText).toBe('primaryButton');
      expect(notification.secondaryButtonText).toBe('secondaryButton');
      expect(notification.callback).toBeDefined();
    });

    it('Should be able to close a success notification calling the callback', function () {
      expect(service.notifications.length).toBe(0);
      service.notifySuccess('message', 'primaryButton', 'secondaryButton', null);

      expect(service.notifications.length).toBe(1);
      var notification = service.notifications[0];
      notification.callback();
      expect(service.notifications.length).toBe(0);
    });

    it('Should be able to close a information notification calling the callback', function () {
      expect(service.notifications.length).toBe(0);
      service.notifyInformation('message', 'primaryButton', null);

      expect(service.notifications.length).toBe(1);
      var notification = service.notifications[0];
      notification.callback();
      expect(service.notifications.length).toBe(0);
    });

    it('Should be able to close a alert notification calling the callback', function () {
      expect(service.notifications.length).toBe(0);
      service.notifyAlert('message', 'primaryButton', 'secondaryButton', null);

      expect(service.notifications.length).toBe(1);
      var notification = service.notifications[0];
      notification.callback();
      expect(service.notifications.length).toBe(0);
    });

    it('Should be able to close a notification', function () {
      expect(service.notifications.length).toBe(0);
      service.notify('success', 'message', 'primaryButton', 'secondaryButton', null);

      expect(service.notifications.length).toBe(1);
      var notification = service.notifications[0];
      notification.callback();
      expect(service.notifications.length).toBe(0);
    });

    it('Should be call the callback passed as parameter', function () {
      var callback = jasmine.createSpy(),
        notification;
      expect(service.notifications.length).toBe(0);
      service.notify('success', 'message', 'primaryButton', 'secondaryButton', callback);

      expect(service.notifications.length).toBe(1);
      notification = service.notifications[0];
      notification.callback();
      expect(service.notifications.length).toBe(0);
      expect(callback).toHaveBeenCalled();
    });

    it('Should return a promise when notify', function () {
      var callback = jasmine.createSpy(),
        notification;
      expect(service.notifications.length).toBe(0);
      var promise = service.notify('success', 'message', 'primaryButton', 'secondaryButton', callback);

      expect(promise).toBeDefined();
      expect(service.notifications.length).toBe(1);
      notification = service.notifications[0];
      notification.callback();
      expect(service.notifications.length).toBe(0);
      expect(callback).toHaveBeenCalled();
      promise.then(function (selected) {
        expect(selected).toEqual('primaryButton');
      });
      scope.$apply();
    });

    it('Should return a promise when notify information', function () {
      var callback = jasmine.createSpy(),
        notification;
      expect(service.notifications.length).toBe(0);
      var promise = service.notifyInformation('message', 'primaryButton', callback);

      expect(promise).toBeDefined();
      expect(service.notifications.length).toBe(1);
      notification = service.notifications[0];
      notification.callback();
      expect(service.notifications.length).toBe(0);
      expect(callback).toHaveBeenCalled();
      promise.then(function (selected) {
        expect(selected).toEqual('primaryButton');
      });
      scope.$apply();
    });

    it('Should return a promise when notify alert', function () {
      var callback = jasmine.createSpy(),
        notification;
      expect(service.notifications.length).toBe(0);
      var promise = service.notifyAlert('message', 'primaryButton', 'secondaryButton', callback);

      expect(promise).toBeDefined();
      expect(service.notifications.length).toBe(1);
      notification = service.notifications[0];
      notification.callback();
      expect(service.notifications.length).toBe(0);
      expect(callback).toHaveBeenCalled();
      promise.then(function (selected) {
        expect(selected).toEqual('primaryButton');
      });
      scope.$apply();
    });

    it('Should return a promise when notify success', function () {
      var callback = jasmine.createSpy(),
        notification;
      expect(service.notifications.length).toBe(0);
      var promise = service.notifySuccess('message', 'primaryButton', 'secondaryButton', callback);

      expect(promise).toBeDefined();
      expect(service.notifications.length).toBe(1);
      notification = service.notifications[0];
      notification.callback();
      expect(service.notifications.length).toBe(0);
      expect(callback).toHaveBeenCalled();
      promise.then(function (selected) {
        expect(selected).toEqual('primaryButton');
      });
      scope.$apply();
    });

    it('Should call callback on timeout when user has no option', function () {
      var callback = jasmine.createSpy();
      expect(service.notifications.length).toBe(0);
      var promise = service.notify('success', 'message', 'primaryButton', null, callback);

      expect(service.notifications.length).toBe(1);
      timeout.flush();
      expect(callback).toHaveBeenCalledWith('primaryButton');
      expect(service.notifications.length).toBe(0);
      promise.then(function (selected) {
        expect(selected).toEqual('primaryButton');
      });
      scope.$apply();
    });

    it('Should not create timeout when user has options', function () {
      var callback = jasmine.createSpy();
      expect(service.notifications.length).toBe(0);
      service.notify('success', 'message', 'primaryButton', 'secondaryButton', callback);

      expect(service.notifications.length).toBe(1);
      expect(timeout.flush).toThrow();
    });

    it('Should cancel timeout when callback is called', function () {
      var callback = jasmine.createSpy();
      expect(service.notifications.length).toBe(0);
      service.notify('success', 'message', 'primaryButton', 'secondaryButton', callback);

      expect(service.notifications.length).toBe(1);
      var notification = service.notifications[0];
      notification.callback();
      expect(timeout.flush).toThrow();
    });
  });
});
