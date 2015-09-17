/// <reference path="../../../.tmp/typings/tsd.d.ts" />

/// <reference path="devices.ts" />
/// <reference path="devices.config.ts" />
/// <reference path="devices.run.ts" />
/// <reference path="devices.service.ts" />
/// <reference path="devices.controller.ts" />

module powerbill.devices {
  'use strict';

  angular.module('powerbill.devices', [])
    .config(DevicesConfig)
    .run(DevicesRun)
    .service('DevicesService', DevicesService)
    .controller('DevicesController', DevicesController);
}
