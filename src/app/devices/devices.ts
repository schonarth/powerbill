module powerbill.devices {
	'use strict';

	export interface IDevicesScope extends ng.IScope {
		deviceTemplates: IDeviceTemplate[];
		devicesSet: IDevicesSet;
		editing: Device;
		showTemplate: any;
		editDevice: any;
		removeDevice: any;
		saveDevice: any;
	}

	interface IDevicesSet {
		[index: string]: Device;
	}

	export interface IDeviceTemplate extends ng.resource.IResource<IDeviceTemplate> {
		name: string;
		potency: number;
		timeOn: {
			days: number;
			hours: number;
			minutes: number;
		};

	}

	export class Device {
		constructor(t: IDeviceTemplate) {
			console.debug('Instanciando', t);
			this.name = t.name[this.language];
			this.potency = t.potency;
			this.timeOn = t.timeOn;
			this.timestamp = Date.now();
		}

		// TODO: use parameterized value
		language: string = 'ptbr';
		$log: ng.ILogService;

		name: string;
		timestamp: number;
		potency: number;
		quantity: number;
		timeOn: {
			days: number;
			hours: number;
			minutes: number;
		};

		consumption: number;

		calculateConsumption(): void {
			var timeOn = (this.timeOn.days * (this.timeOn.hours + (this.timeOn.minutes / 60)));
			var kwh = this.potency * this.quantity;
			var consumption = kwh * timeOn / 1000;

			console.debug('Calculating %s consumption: %s kwh @ %s hours/month = %s', this.name, kwh, timeOn, consumption);

			this.consumption = consumption;
		}

		getConsumption(): number {
			if (!this.consumption) {
				this.calculateConsumption();
			}

			return this.consumption;
		}
	}
}
