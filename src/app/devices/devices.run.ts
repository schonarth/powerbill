module powerbill.devices {
  'use strict';

  export class DevicesRun {
    /** @ngInject */
    constructor($log: ng.ILogService, DevicesService: any) {
      $log.debug('DevicesRun');

      $log.info('UGHulando...');
    }
  }
}
