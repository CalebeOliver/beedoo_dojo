import { InvalidValueError } from '../errors/invalid-value-error'
import { CaixaEletronico } from './CaixaEletronico'

describe('Teste Caixa Eletronico Dojo', () => {

    const sut = new CaixaEletronico()

    test('Deve lançar uma exceção caso o valor fornecido não seja um numero inteiro', () => {
        expect(()=>sut.sacar(10.9)).toThrowError(new InvalidValueError())
    })

    test('ao sacar 10 deve retornar 10', () => {
        const VALOR_SAQUE = 10;
        const sacado = sut.sacar(VALOR_SAQUE);
        expect(sacado).toEqual(10);
    });

    test('verifica se valor passado é multiplo de 10', () => {
        const VALOR_SAQUE = 15;
        const sacado = sut.sacar(VALOR_SAQUE);
        expect(sacado).toEqual('Ná há notas disponíveis para o valor informado.')
    })

    test('dado que valor passado 110 deve retornar 1 nota de 100 e uma de 10', () => {
        const VALOR_SAQUE = 110;
        const sacado = sut.sacar(VALOR_SAQUE);
        expect(sacado).toEqual('Entregar 1 nota de R$100,00 e 1 nota de R$ 10,00.')
    })

})
