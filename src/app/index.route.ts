module powerbill {
  'use strict';

  export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/main/main.html',
          controller: 'MainController',
          controllerAs: 'main'
        }).state('devices', {
          url: '/devices',
          templateUrl: 'app/devices/devices.html',
          controller: 'DevicesController',
          controllerAs: 'devices'
        }).state('device', {
          url: '/device',
          templateUrl: 'app/devices/device.html',
          controller: 'DevicesController',
          controllerAs: 'devices'
        });

      $urlRouterProvider.otherwise('/');
    }

  }
}
