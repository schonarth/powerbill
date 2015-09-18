module powerbill.devices {
	'use strict';

	export interface IDevicesScope extends ng.IScope {
		deviceTemplates: IDeviceTemplate[];
		editing: Device;
		showTemplate: any;
		editDevice: any;
		removeDevice: any;
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
}
