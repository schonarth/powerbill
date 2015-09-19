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
      $scope.devicesSet = {};
      $log.debug('Got', $scope.deviceTemplates);

      $scope.showTemplate = function(template: IDeviceTemplate) {
        $scope.editing = new Device(template);
        $log.debug('Creating %o from %o', $scope.editing, template);
      };

      $scope.editDevice = function(device: Device) {
        $log.debug('Editing', device);
        $scope.editing = device;
      };

      $scope.saveDevice = function() {
        $scope.editing.calculateConsumption();
        $scope.devicesSet[$scope.editing.timestamp] = $scope.editing;
        delete $scope.editing;
      };

      $scope.removeDevice = function(device: Device) {
        delete $scope.devicesSet[$scope.editing.timestamp];
        delete $scope.editing;
      };
    }
    //DevicesService.getDevices();

    /* * @ngInject * /
    getDevice = function(template: IDeviceTemplate): Device {
      return DevicesService.getDevice(template);
    }; // */
  }
}
