import { UnavaiableValueError } from '../errors/unavaiable-value-error'
import { InvalidValueError } from '../errors/invalid-value-error'
import { UnavaiableNotesForValueError } from '../errors/unavaiable-notes-for-value-error'
import { IGaveta, IFormatadorMoeda } from './protocolos';
export class CaixaEletronico {
    constructor(private gaveta: IGaveta, private formatadorMoeda: IFormatadorMoeda) { }

    sacar(valor_saque: number) {
        if (!Number.isInteger(valor_saque)) throw new InvalidValueError()

        const totalDisponivel = this.gaveta.recuperarTotalDisponivel()

        if (valor_saque > totalDisponivel) {
            throw new UnavaiableValueError()
        }

        let valorRestante = valor_saque

        const result = this.gaveta.recuperarQuantidadeDeNotasDisponiveis()
            .map(nota => {
                let quantidade = Math.trunc(valorRestante / nota.valor)

                if (quantidade > nota.quantidade) {
                    quantidade = nota.quantidade
                }

                valorRestante -= nota.valor * quantidade

                return ({ valor: nota.valor, quantidade })
            });

        const resultAmount = result.map((note) => note.valor * note.quantidade).reduce((previous, current) => previous + current)

        if (resultAmount < valor_saque) {
            throw new UnavaiableNotesForValueError()
        }

        const notasValidas = result.filter(({ quantidade }) => quantidade > 0)

        return notasValidas
            .map(({ valor, quantidade }, indice) => {
                let retornar = `${quantidade} nota${quantidade > 1 ? 's' : ''} de ${this.formatadorMoeda.formatar(valor)}`

                if (indice === 0) {
                    retornar = "Entregar " + retornar
                }
                if (indice + 1 === notasValidas.length) {
                    retornar = retornar + '.'
                }
                if (indice + 1 === notasValidas.length - 1) {
                    retornar = retornar + ' e '
                }
                if (indice + 1 < notasValidas.length - 1) {
                    retornar += ', '
                }

                return retornar
            })
            .join('')
    }
}



// Desenvolva um programa que simule a entrega de notas quando um cliente efetuar um saque em um caixa
// eletrônico. Os requisitos básicos são os seguintes:
// ● Entregar o menor número de notas;
// ● É possível sacar o valor solicitado com as notas disponíveis;
// ● Saldo do cliente infinito;
// ● Quantidade de notas infinito (pode-se colocar um valor finito de cédulas para aumentar a dificuldade do
// problema);

// Notas disponíveis de R$ 100,00; R$ 50,00; R$ 20,00 e R$ 10,00

// Exemplos:
// Valor do Saque: R$ 30,00 – Resultado Esperado: Entregar 1 nota de R$20,00 e 1 nota de R$ 10,00.
// Valor do Saque: R$ 80,00 – Resultado Esperado: Entregar 1 nota de R$50,00 1 nota de R$ 20,00 e 1 nota de R$
// 10,00