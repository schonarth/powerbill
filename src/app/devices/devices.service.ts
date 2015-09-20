module powerbill.devices {
  'use strict';

  export class DevicesService {

    public $log: ng.ILogService;
    public $resource: ng.resource.IResourceService;

    /* @ngInject */
    constructor(_$log_: ng.ILogService, _$resource_: ng.resource.IResourceService) {
      this.$log = _$log_;
      this.$resource = _$resource_;
    }

    /* @ngInject */
    getDevices = function(): ng.IPromise<IDeviceTemplate[]> {
      //var devices: IDeviceTemplate[] = [];

      var devices = this.$resource('app/devices/device-templates.json');
      this.$log.debug('Getting device templates...', devices);

      return devices;
    }

    /** @ngInject */
    getDevice = function(template: IDeviceTemplate): Device {
      return new Device(template);
    }
  }
}
