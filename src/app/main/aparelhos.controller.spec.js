(function() {
	'use strict';

	describe("Conta de Luz", function() {
		beforeEach(module('contadeluz'));

		var $rootScope, scope, AparelhosFactory;

		beforeEach(inject(function(_$rootScope_, _AparelhosFactory_) {
			$rootScope = _$rootScope_;
			AparelhosFactory = _AparelhosFactory_;
			$rootScope.aparelhos = AparelhosFactory.getAparelhos();

			//scope = $rootScope.$new();

			// declara o controller e injeta o novo scope
			//$controller('NomeDoController', {$scope: scope});
		}));

		it("roda a app", function() {
			console.info("Rodando app angular...");
			expect($rootScope).not.toBe(undefined);
			expect($rootScope).not.toBe(null);
		});

		it("tem a lista de aparelhos", function() {
			var aparelhos = $rootScope.aparelhos;
			console.debug("Aparelhos", aparelhos);
			expect(aparelhos).not.toBe(undefined);
			expect(aparelhos.length).toBeGreaterThan(0);
		});

		it("um template de aparelho tem suas propriedades básicas", function() {
			var aparelho = $rootScope.aparelhos[0];
			console.debug("Checando template de aparelho", aparelho);
			expect(aparelho).not.toBe(undefined);
			expect(aparelho.nome).not.toBe(undefined);
			expect(aparelho.potenciaPadrao).not.toBe(undefined);
			expect(aparelho.horasUsoPadrao).not.toBe(undefined);
		});

		it("calcula o consumo de um aparelho instanciado", function(){
			var aparelho = AparelhosFactory.getAparelho($rootScope.aparelhos[0]);
			console.debug("Instanciado aparelho", aparelho);
			aparelho.tempoUso.dias = 1;
			aparelho.tempoUso.horas = 2;
			aparelho.quantidade = 1;

			var consumo = aparelho.getConsumo();
			console.log("Consumo do " + aparelho.nome + " = " + consumo);
			expect(consumo).toBeGreaterThan(0);
		})
	});
})();
