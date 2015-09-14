module powerbill.devices {
  'use strict';

  export class DevicesRun {
    /** @ngInject */
    constructor($rootScope: IMyRootScope, $log: ng.ILogService, DevicesService: any) {
      $log.debug('DevicesRun');

      $log.info('UGHulando...', $rootScope);

      //declare $rootScope.devices: Device;
      $rootScope.devices = DevicesService.getDevices();
    }
  }
}
