import { InvalidValueError } from '../errors/invalid-value-error'
import { UnavaiableValueError } from '../errors/unavaiable-value-error'
import { CaixaEletronico } from './CaixaEletronico'
import { IGaveta } from './protocolos'

describe('Teste Caixa Eletronico Dojo', () => {
    const makeSut = () => {
        class GavetaDuble implements IGaveta {
            compartimentos = [
                { valor: 100, quantidade: 2 },
                { valor: 50, quantidade: 2 },
                { valor: 20, quantidade: 2 },
                { valor: 10, quantidade: 2 }
            ]
            recuperarTotalDisponivel = () => 360

        }

        const gavetaDuble = new GavetaDuble()

        const sut = new CaixaEletronico(gavetaDuble)

        return { sut, gavetaDuble }
    }

    test('Deve lançar uma exceção caso o valor fornecido não seja um numero inteiro', () => {
        const { sut } = makeSut()
        expect(() => sut.sacar(0.1)).toThrowError(new InvalidValueError())
    })

    test('Deve lançar uma exceção caso o valor solicitado seja maior que o disponível', () => {
        const { sut, gavetaDuble } = makeSut()
        jest.spyOn(gavetaDuble, 'recuperarTotalDisponivel').mockReturnValueOnce(0)

        expect(() => sut.sacar(1)).toThrowError(new UnavaiableValueError())
    })

    test('ao sacar 10 deve retornar 10', () => {
        const { sut } = makeSut()

        const VALOR_SAQUE = 10
        const sacado = sut.sacar(VALOR_SAQUE)
        expect(sacado).toEqual(10)
    })

    test('verifica se valor passado é multiplo de 10', () => {
        const { sut } = makeSut()
        const VALOR_SAQUE = 15
        const sacado = sut.sacar(VALOR_SAQUE)
        expect(sacado).toEqual('Ná há notas disponíveis para o valor informado.')
    })

    test('dado que valor passado 110 deve retornar 1 nota de 100 e uma de 10', () => {
        const { sut } = makeSut()
        const VALOR_SAQUE = 110
        const sacado = sut.sacar(VALOR_SAQUE)
        expect(sacado).toEqual('Entregar 1 nota de R$100,00 e 1 nota de R$ 10,00.')
    })

})
