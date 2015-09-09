module contadeluz.aparelhos {
	'use strict';

	// TODO: colocar num lugar decente.
	export interface IMyRootScope extends ng.IScope {
		aparelhos: IAparelhoTemplate[];
	}

	export interface IAparelhoTemplate {
		nome: string;
		potenciaPadrao: number;
		horasUsoPadrao: number;
	}

	export class Aparelho {
		constructor(t: IAparelhoTemplate) {
	//			console.debug("Instanciando" t);
			this.nome = t.nome;
			this.potencia = t.potenciaPadrao;
			this.tempoUso = {
				dias: 0,
				horas: t.horasUsoPadrao,
				minutos: 0
			};
		}

		nome: string;
		potencia: number;
		quantidade: number;
		tempoUso: {
			dias: number;
			horas: number;
			minutos: number
		};

		private consumo: number;

		calculaConsumo(): void {
			var tempo = (this.tempoUso.dias * (this.tempoUso.horas + (this.tempoUso.minutos / 60)));
			var kwh = this.potencia * this.quantidade;
			var consumo = kwh * tempo / 1000;

			// console.debug(kwh, tempo, consumo);

			this.consumo = consumo;
		}

		getConsumo(): number {
			if (!this.consumo) {
				this.calculaConsumo();
			}

			return this.consumo;
		}
	}

	var app = angular.module('contadeluz.aparelhos', []); // ['ngResource', 'ui.bootstrap']);

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

	app.run(function($rootScope: IMyRootScope, $log: ng.ILogService, AparelhosFactory: any){

		$log.info('Angulando...', $rootScope);

		//declare $rootScope.aparelhos: Aparelho;
		$rootScope.aparelhos = AparelhosFactory.getAparelhos();
	});

	app.factory('AparelhosFactory', function(){
		return {
			getAparelhos: function(): IAparelhoTemplate[]{
				var aparelhos: IAparelhoTemplate[] = [];
				aparelhos.push({
					nome: 'Ar condicionado',
					potenciaPadrao: 1400,
					horasUsoPadrao: 0
				});

				return aparelhos;
			},
			getAparelho: function(template: IAparelhoTemplate): Aparelho{
				return new Aparelho(template);
			}
		};
	});
}
