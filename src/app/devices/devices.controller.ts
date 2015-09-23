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
      $scope.deviceTemplates = DevicesService.getDevices().query();
      $scope.devicesSet = {};
      $log.debug('Got', $scope.deviceTemplates);

      $scope.showTemplate = function(template: IDeviceTemplate) {
        $scope.editing = new Device(angular.copy(template));
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
        updateTotal();
      };

      $scope.removeDevice = function(device: Device) {
        delete $scope.devicesSet[$scope.editing.timestamp];
        delete $scope.editing;
      };

      function updateTotal() {
        var sum = 0;
        for (var i in $scope.devicesSet) {
          sum += $scope.devicesSet[i].getConsumption();
        }
        $scope.total = sum;
      }
    }
    //DevicesService.getDevices();

    /* * @ngInject * /
    getDevice = function(template: IDeviceTemplate): Device {
      return DevicesService.getDevice(template);
    }; // */
  }
}
