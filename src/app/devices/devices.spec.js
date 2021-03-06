(function() {
	'use strict';

	describe("Power Bill", function() {
		beforeEach(module('powerbill'));

		var $rootScope, scope, DevicesService;

		beforeEach(inject(function(_$rootScope_, _DevicesService_) {
			$rootScope = _$rootScope_;
			DevicesService = _DevicesService_;
			$rootScope.devices = DevicesService.getDevices();
		}));

		it("runs the app", function() {
			console.info("Running Angular app...");
			expect($rootScope).not.toBe(undefined);
			expect($rootScope).not.toBe(null);
		});

		it("has a devices list", function() {
			var devices = $rootScope.devices;
			console.debug("Devices", devices);
			expect(devices).not.toBe(undefined);
			expect(devices.length).toBeGreaterThan(0);
		});

		it("has device templates with their own basic properties", function() {
			var device = $rootScope.devices[0];
			console.debug("Checking device template", device);
			expect(device).not.toBe(undefined);
			expect(device.name).not.toBe(undefined);
			expect(device.defaultPotency).not.toBe(undefined);
			expect(device.defaultHoursOn).not.toBe(undefined);
		});

		it("calculates the consumption of a device instance", function(){
			var device = DevicesService.getDevice($rootScope.devices[0]);
			device.timeOn.days = 1;
			device.timeOn.hours = 2;
			device.quantity = 1;

			var consumption = device.getConsumption();
			console.log(device.name + " consumption = " + consumption);
			expect(consumption).toBeGreaterThan(0);
		})
	});
})();
