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
			this.timestamp = Date.now();
		}

		name: string;
		timestamp: number;
		potency: number;
		quantity: number;
		timeOn: {
			days: number;
			hours: number;
			minutes: number
		};

		consumption: number;

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
}
