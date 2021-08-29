import { FormatadorMoeda } from "./FormatadorMoeda"

describe('formatador de moedas', () => {
  test('deve retornar R$ 10,00 quando o valor 10 for fornecido', () => {
    const valorTeste = 10

    expect(FormatadorMoeda.formatar(valorTeste)).toEqual(`R$ ${valorTeste},00`)
  })
})