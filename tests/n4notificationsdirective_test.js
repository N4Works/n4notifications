'use strict';

describe('n4Notifications.directives', function () {
  var $scope, $compile, $templateCache, element,
    successTemplate, alertTemplate, informationTemplate;

  beforeEach(module('n4Notifications.directives'));

  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $scope = _$rootScope_.$new();
    $compile = _$compile_;
  }));

  describe('Creation', function () {
    it('Should be able to create directive by element', function () {
      var element = angular.element('<n4-notifications></n4-notifications>');
      $compile(element)($scope);
      $scope.$apply();

      expect(element).toBeDefined();
      expect(element[0].tagName).toBe('DIV');
    });
  });

  describe('Functionality', function () {
    var element, service;

    beforeEach(inject(function (n4NotificationsService) {
      service = n4NotificationsService;

      element = angular.element('<n4-notifications></n4-notifications>');
      $compile(element)($scope);
      $scope.$apply();

      expect(element).toBeDefined();
      expect(element[0].tagName).toBe('DIV');
    }));

    it('Should be able to add a success notification', function () {
      service.notifySuccess('Success', 'Ok', 'Undo', null);

      $scope.$apply();

      expect(element.find('.notification.success').get(0)).toBeDefined();
    });

    it('Should be able to add an alert notification', function () {
      service.notifyAlert('Alert', 'Ok', 'Cancel', null);

      $scope.$apply();

      expect(element.find('.notification.alert').get(0)).toBeDefined();
    });

    it('Should be able to add an information notification', function () {
      service.notifyInformation('Information', 'Ok', null);

      $scope.$apply();

      expect(element.find('.notification.information').get(0)).toBeDefined();
    });
  });
});
