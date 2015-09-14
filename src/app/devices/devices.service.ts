module powerbill.devices {
  'use strict';

  export class DevicesService {
    /** @ngInject */
    getDevices = function(): IDeviceTemplate[] {
      var devices: IDeviceTemplate[] = [];
      devices.push({
        name: 'Air conditioner',
        defaultPotency: 1400,
        defaultHoursOn: 0
      });

      return devices;
    }

    /** @ngInject */
    getDevice = function(template: IDeviceTemplate): Device {
      return new Device(template);
    }
  }
}
