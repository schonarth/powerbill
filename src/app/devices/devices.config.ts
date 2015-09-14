module powerbill.devices {
  'use strict';

  export class DevicesConfig {
    /** @ngInject */
    constructor($logProvider: ng.ILogProvider, $locationProvider: ng.ILocationProvider) {
      // enable log
      $logProvider.debugEnabled(true); // TODO: importar constante
      $locationProvider.hashPrefix('!');
    }
  }
}
