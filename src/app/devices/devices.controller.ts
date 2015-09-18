module powerbill.devices {
  'use strict';

  export class DevicesController {

    /* @ngInject */
    $scope: IDevicesScope;
    $log: ng.ILogService;

    // Internals
    DevicesService: any;

    /** @ngInject */
    constructor ($scope: IDevicesScope, $log: ng.ILogService, DevicesService: any) {
      $scope.deviceTemplates = DevicesService.getDevices();
      $log.debug('Got', $scope.deviceTemplates);

      $scope.showTemplate = function(template: IDeviceTemplate) {
        $log.debug('Creating', template);
        $scope.editing = new Device(template);
      };

      $scope.edit = function(device: Device) {
        $log.debug('Editing', device);
        $scope.editing = device;
      };
    }
    //DevicesService.getDevices();

    /* * @ngInject * /
    getDevice = function(template: IDeviceTemplate): Device {
      return DevicesService.getDevice(template);
    }; // */
  }
}
