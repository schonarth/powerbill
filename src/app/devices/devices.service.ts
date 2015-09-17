module powerbill.devices {
  'use strict';

  export class DevicesService {

    //static $inject = ['$log'];
    public $log: ng.ILogService;

    /* @ngInject */
    constructor(_$log_: ng.ILogService) {
      this.$log = _$log_;
    } // */

    getDevices = function(): IDeviceTemplate[] {
      var devices: IDeviceTemplate[] = [];
      this.$log.debug('Getting device templates...', devices);
      devices.push({
        name: 'Air conditioner',
        defaultPotency: 1400,
        defaultHoursOn: 0
      });

      this.$log.debug('Returning device templates...', devices);
      return devices;
    }

    /** @ngInject */
    getDevice = function(template: IDeviceTemplate): Device {
      return new Device(template);
    }
  }
}
