module powerbill.devices {
	'use strict';

	// TODO: colocar num lugar decente.
	export interface IMyRootScope extends ng.IScope {
		devices: IDeviceTemplate[];
	}

	export interface IDeviceTemplate {
		name: string;
		defaultPotency: number;
		defaultHoursOn: number;
	}

	export class Device {
		constructor(t: IDeviceTemplate) {
	//			console.debug("Instanciando" t);
			this.name = t.name;
			this.potency = t.defaultPotency;
			this.timeOn = {
				days: 0,
				hours: t.defaultHoursOn,
				minutes: 0
			};
		}

		name: string;
		potency: number;
		quantity: number;
		timeOn: {
			days: number;
			hours: number;
			minutes: number
		};

		private consumption: number;

		calculateConsumption(): void {
			var tempo = (this.timeOn.days * (this.timeOn.hours + (this.timeOn.minutes / 60)));
			var kwh = this.potency * this.quantity;
			var consumption = kwh * tempo / 1000;

			// console.debug(kwh, tempo, consumption);

			this.consumption = consumption;
		}

		getConsumption(): number {
			if (!this.consumption) {
				this.calculateConsumption();
			}

			return this.consumption;
		}
	}

	var app = angular.module('powerbill.devices', []); // ['ngResource', 'ui.bootstrap']);

	app.config(function($logProvider: ng.ILogProvider, $locationProvider: ng.ILocationProvider){

	// *
		$logProvider.debugEnabled(true); // TODO: importar constante
		$locationProvider.hashPrefix('!');
		/*
		$routeProvider.when('/login', {
			templateUrl: '/...',
			controller: 'LoginController'
		}).otherwise({
			redirectTo: '/login'
		});
		// */
	});

	app.run(function($rootScope: IMyRootScope, $log: ng.ILogService, DevicesFactory: any){

		$log.info('Angulando...', $rootScope);

		//declare $rootScope.devices: Device;
		$rootScope.devices = DevicesFactory.getDevices();
	});

	app.factory('DevicesFactory', function(){
		return {
			getDevices: function(): IDeviceTemplate[]{
				var devices: IDeviceTemplate[] = [];
				devices.push({
					name: 'Air conditioner',
					defaultPotency: 1400,
					defaultHoursOn: 0
				});

				return devices;
			},
			getDevice: function(template: IDeviceTemplate): Device{
				return new Device(template);
			}
		};
	});
}
