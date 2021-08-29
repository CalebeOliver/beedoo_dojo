import { Gaveta } from "./Gaveta"
import { Compartimento } from "./protocolos"

describe('Gaveta', () => {
  const criarSut = () => {
    const compartimentos: Compartimento[] = []

    const sut = new Gaveta(compartimentos)

    return { sut }
  }

  test('deve recuperar o total disponível', () => {
    const { sut } = criarSut()

    const valor = 100
    const quantidade = 100

    sut.compartimentos = [{ valor, quantidade }]

    expect(sut.recuperarTotalDisponivel()).toEqual(valor * quantidade)
  })

  test('deve ser capaz de recuperar as notas disponíveis e suas quantidades', () => {
    const { sut } = criarSut()

    const valor = 100
    const quantidade = 100

    sut.compartimentos = [{ valor, quantidade }]

    expect(sut.recuperarQuantidadeDeNotasDisponiveis()).toEqual([{ valor, quantidade }])
  })

  test('deve ser remover notas da gaveta', () => {
    const { sut } = criarSut()

    const valor = 100
    const quantidade = 100
    const quantidadeARemover = 2

    sut.compartimentos = [{ valor, quantidade }]

    sut.removerNotas({ valor, quantidade: quantidadeARemover })

    expect(sut.recuperarQuantidadeDeNotasDisponiveis()).toEqual([{ valor, quantidade: quantidade - quantidadeARemover }])
  })
})