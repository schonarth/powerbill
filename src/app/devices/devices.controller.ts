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

      $scope.showTemplate = function(template: any) {
        $log.debug('Editing', template);
        $scope.editing = angular.copy(template);
      };
    }
    //DevicesService.getDevices();

    /* * @ngInject * /
    getDevice = function(template: IDeviceTemplate): Device {
      return DevicesService.getDevice(template);
    }; // */
  }
}
