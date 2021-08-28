import { InvalidValueError } from '../errors/invalid-value-error'
import { UnavaiableValueError } from '../errors/unavaiable-value-error'
import { CaixaEletronico } from './CaixaEletronico'
import { IFormatadorMoeda, IGaveta } from './protocolos'

describe('Teste Caixa Eletronico Dojo', () => {
    const makeSut = () => {
        class FormatadorMoedaDuble implements IFormatadorMoeda {
            formatar = (valor: number) => Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL' }).format(valor)
        }

        class GavetaDuble implements IGaveta {
            compartimentos = [
                { valor: 100, quantidade: 2 },
                { valor: 50, quantidade: 2 },
                { valor: 20, quantidade: 2 },
                { valor: 10, quantidade: 2 }
            ]
            recuperarTotalDisponivel = () => 360
            recuperarQuantidadeDeNotasDisponiveis = () => this.compartimentos
        }

        const gavetaDuble = new GavetaDuble()
        const formatadorMoedaDuble = new FormatadorMoedaDuble()

        const sut = new CaixaEletronico(gavetaDuble, formatadorMoedaDuble)

        return { sut, gavetaDuble, formatadorMoedaDuble }
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
        const { sut, formatadorMoedaDuble } = makeSut()

        const VALOR_SAQUE = 10
        const sacado = sut.sacar(VALOR_SAQUE)
        expect(sacado).toEqual(`Entregar 1 nota de ${formatadorMoedaDuble.formatar(VALOR_SAQUE)}.`)
    })

    test('verifica se valor passado é multiplo de 10', () => {
        const { sut } = makeSut()
        const VALOR_SAQUE = 15
        const sacado = sut.sacar(VALOR_SAQUE)
        expect(sacado).toEqual('Ná há notas disponíveis para o valor informado.')
    })

    test('dado que valor passado 110 deve retornar 1 nota de 100 e uma de 10', () => {
        const { sut, formatadorMoedaDuble } = makeSut()
        const VALOR_SAQUE = 110
        const sacado = sut.sacar(VALOR_SAQUE)
        expect(sacado).toEqual(`Entregar 1 nota de ${formatadorMoedaDuble.formatar(100)} e 1 nota de ${formatadorMoedaDuble.formatar(10)}.`)
    })

    test('Ao sacar 30, Entregar 1 nota de R$20,00 e 1 nota de R$ 10,00.', () => {
        const { sut, formatadorMoedaDuble } = makeSut()

        expect(sut.sacar(30)).toEqual(`Entregar 1 nota de ${formatadorMoedaDuble.formatar(20)} e 1 nota de ${formatadorMoedaDuble.formatar(10)}.`)
    })

    test('Ao sacar 80, Entregar 1 nota de R$50,00 1 nota de R$ 20,00 e 1 nota de R$ 10,00.', () => {
        const { sut, formatadorMoedaDuble } = makeSut()

        expect(sut.sacar(80)).toEqual(`Entregar 1 nota de ${formatadorMoedaDuble.formatar(50)}, 1 nota de ${formatadorMoedaDuble.formatar(20)} e 1 nota de ${formatadorMoedaDuble.formatar(10)}.`)
    })
})